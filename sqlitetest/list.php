<?php
$result = [];
try {

    // 接続
    $pdo = new PDO('sqlite:../database/mydatabase.sqlite');

    // SQL実行時にもエラーの代わりに例外を投げるように設定
    // (毎回if文を書く必要がなくなる)
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // デフォルトのフェッチモードを連想配列形式に設定 
    // (毎回PDO::FETCH_ASSOCを指定する必要が無くなる)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // 選択 (プリペアドステートメント)
    $stmt = $pdo->prepare("SELECT * FROM fruit WHERE price = ?");
    $stmt->execute(['200']);
    $result = $stmt->fetchAll();

} catch (Exception $e) {

    echo $e->getMessage() . PHP_EOL;

}
?>
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <title>オレのフルーツ</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/style.css">

  </head>
  <body>
    <header>
        <h1>オレのフルーツ</h1>
    </header>

<main role="main">

    <div class="container">

        <div class="row">
          <div class="col-md-12">
              <table class="table">
                  <thead>
                      <tr>
                          <th style="width:3em;">Id</th>
                          <th style="width:auto;">Name</th>
                          <th style="width:auto;">Price</th>
                      </tr>
                  </thead>
                  <tbody id="output">
<?php foreach($result as $data) { ?>
                    <tr>
                        <td class="text-right">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" onchange="done('idididid')">
                            <?php echo $data['id'] ?>
                        </td>
                        <td>
                            <?php echo $data['name'] ?>
                        </td>
                        <td>
                            <?php echo $data['price'] ?>
                        </td>
                    </tr>
<?php } ?>
                </tbody>
            </table>
          </div>
        </div>
      </div>
  
</main>

<footer class="text-muted">
&copy;2019 shibomb.
</footer>

</html>

