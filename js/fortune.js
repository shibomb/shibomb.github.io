// alert('hello');

let seizaData = [
    {name: "山羊座", startDate: "0000", lucky: 99},
    {name: "水瓶座", startDate: "0120"},
    {name: "魚座", startDate: "0219"},
    {name: "牡羊座", startDate: "0321"},
    {name: "牡牛座", startDate: "0420"},
    {name: "双子座", startDate: "0521"},
    {name: "蟹座", startDate: "0622"},
    {name: "獅子座", startDate: "0723"},
    {name: "乙女座", startDate: "0823"},
    {name: "天秤座", startDate: "0923"},
    {name: "蠍座", startDate: "1024"},
    {name: "射手座", startDate: "1123"},
    {name: "山羊座", startDate: "1222"},
    {name: "水瓶座", startDate: "9999"},
]

function execFortune() {
    // input
    let birthday = document.getElementById('birthday');
    console.log(birthday.value)

    let monthDate = getMonthDate(birthday.value)
    console.log("monthDate:" + monthDate)

    let seiza = searchSeiza(monthDate)

    // output
    let output = document.getElementById('output');
    // output.innerHTML = seiza.name

    // json test
    let json = {
        name: "shibahara",
        hobby: ["DQW", "FF14", "DQ10"],
        age: 42,
        family: {
            yomehan: "shiho",
            musume: "emma"
        }
    } 
    console.log(json)
    console.log(json.name)
    console.log(json.hobby)
    console.log(json.family)

    json.age = 43
    console.log(json.age)

    // create html tag 
    let div1 = document.createElement('div')
    div1.innerHTML = seiza.name
    output.appendChild(div1)

    let p1 = document.createElement('p')
    p1.innerHTML = seiza.startDate
    div1.appendChild(p1)
}

function getMonthDate(dateString) {
    let ret = ""

    // ...
    // todo 
    // search: javascript String 分割
    // ...
    ret = dateString.replace(/-/g, "")
    ret = ret.substr(-4,4)

    return ret;
}

function searchSeiza(monthDate) {
    let ret = {name: "dummy", startDate: "9999"}

    // debug
    // console.log(seizaData);   
    // console.log(seizaData[0]);
    // console.log(seizaData[0].name);
    // console.log(seizaData[0].startDate);
    // console.log(monthDate);

    // search
    for (let i = 0; i < seizaData.length-1; i++) {
        console.log(seizaData[i]);
        console.log(seizaData[i].startDate);
        if (seizaData[i].startDate <= monthDate
            && monthDate < seizaData[i+1].startDate) {
            ret = seizaData[i]
            break
        }
    }

    return ret;
}
