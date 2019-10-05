
/**
 * 天気予報情報を外部から取得
 * 
 * ＜非同期通信の歴史＞
 * XMLHttpRequest: 昔の非同期通信API。XMLを使っていこう！って考えが全盛だった時代のもの。コールバック地獄が発生する問題。
 * fetch: XMLThhpRequestに変わる新しい非同期通信API。コールバック地獄が発生しないように下記のpromiseで処理できる。
 * promise, then, catch: コールバック地獄を解消・・・と思いきや、ちょっとはマシになったけど、やっぱりプロミス地獄が発生する問題が・・・
 * async/await: プロミス地獄が発生しないようにプログラムをかける新しい書き方。Javaのtry-catchの文法っぽくかける。内部的にはpromise。
 * 
 * この関数は async/await で書いてます。この書き方がイマドキのやりかたです。
 * ですが、ネットの情報や書籍によっては、古いやり方で乗っていることも多いですので、上記の歴史と言葉は覚えておいてください。
 */
async function fetchWeather() {

    // 天気予報WebAPIをコールして、JSONを取得
    // http://weather.livedoor.com/weather_hacks/webservice

    // ですが、自PC（127.0.0.1）からのアクセスはセキュリティの制限のため、
    // テスト用に
    //  http://weather.livedoor.com/forecast/webservice/json/v1?city=280010
    // の結果jsonを、保存したものを取得するカタチにしています。

    try {
        let cityId = "280010"
        let url = `//weather.livedoor.com/forecast/webservice/json/v1?city=${cityId}`
        // let url = "./js/test/weather.json"

        const response = await fetch(url, {
            method: 'GET'
        })

        if (response.ok) {
            // APIコール正常時の処理
            const data = await response.json()
            console.log(data) // ← ブラウザの開発ツール > Console に表示されます。JSONの構造を確認してください。
            showWeather(data)
        } 
        else {
            // ４xx,5xxの時は、例外を発生させてエラー処理をする
            throw new Error('Network response was not ok.');
        }
    }
    catch(e) {
        // APIコール失敗時の処理
        console.log(e.message)
        showWeatherError(e)
    }
}

function showWeatherError(e) {
    let output = document.getElementById('output')

    // 初期化するならば、内容を空にする
    output.innerHTML = ""

    let message = document.createElement('p')
    message.className = "error"
    message.innerHTML = e.message
    output.appendChild(message)
} 

function showWeather(data) {

    // --------------------------------------------------
    // createElementで動的生成する方法
    // --------------------------------------------------
    // メリット：この一連の処理の中で、JavaScriptのエレメントオブジェクトとして即座に参照できる。inputタグなどはこちらが良いかも。
    // デメリット：HTMLデザイン通りに再現するときにめんどくさい
    // --------------------------------------------------

    // let output = document.getElementById('output')

    // // 初期化するならば、内容を空にする
    // output.innerHTML = ""

    // let pre = document.createElement('pre')
    // pre.innerHTML = JSON.stringify(data)
    // output.appendChild(pre)


    // --------------------------------------------------
    // テンプレートリテラル
    // --------------------------------------------------
    // メリット：HTMLデザイン通りに再現しやすい。表示のみのコンテンツだったら、こちらが良い。多くのフレームワークでも「テンプレート」で実装することが多い。
    // デメリット：この一連の処理の中で、JavaScriptのエレメントとして、即座に参照できない。一度、描画を待たないといけない。
    // --------------------------------------------------

    // 天気タイトル
    let weather_title = document.getElementById('weather_title')
    weather_title.innerHTML = `
    <h1>${data.title}</h1>
    <p>${data.publicTime}</p>
    `

    // 天気予報
    let weather_forecasts = document.getElementById('weather_forecasts')
    weather_forecasts.innerHTML = ``
    for(let i = 0; i < data.forecasts.length; i++) {
        let item = data.forecasts[i]
        weather_forecasts.innerHTML += `
        <div class="col-md-4">
            <div class="row">
                <div class="col-xs-12 mx-auto">
                    <h2>${item.dateLabel}</h2>
                    <p>${item.date}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 mx-auto">
                    <p>
                        <img src="${item.image.url}" alt="${item.image.title}" />
                    </p>
                    <p>${item.telop}</p>
                </div>
            </div>
        </div>
    `
    }

    // ピンポイント天気リンク
    let weather_pinpointLocations = document.getElementById('weather_pinpointLocations')
    weather_pinpointLocations.innerHTML = ``
    for(let i = 0; i < data.pinpointLocations.length; i++) {
        let item = data.pinpointLocations[i]
        weather_pinpointLocations.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td><a href="${item.link}" target="_black">リンク</a></td>
        </tr>
    `
    }
    // 天気フッター
    let weather_footer = document.getElementById('weather_footer')
    weather_footer.innerHTML = `
    Weather Data by <span>${data.copyright.title}</span>
    `

} 