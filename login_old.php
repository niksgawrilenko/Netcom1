<?php
require "db2.php";

$data = $_POST;
if (isset($data['do_login']))
{
$errors = array();
$user = R::findOne('users','email = ?', array($data['email']));
if ($user){
    if (password_verify($data['password' ] , $user->password)){
     //vse horoho  , $user->password
     $_SESSION['logged_user']=$user;
       echo '<div style="color:green;">AVTIEISAVAN</div><hr>';

  } else {  
    $errors[]='Неверно введен пароль';
  }
} else {
   $errors[]='не найдено пользователя';
}
if (! empty($errors)){
     echo '<div style="color:red;">'.array_shift($errors).'</div><hr>';
}
/*
   $errors= array();
      if( trim($data['login']) == '')
      {
       $errors[] = 'vvedit login';
      } 
      if(trim($data['email']) == '')
      {
        $errors[] = 'vvedit email';
      } 
      if(trim($data['password']) == '')
      {
        $errors[] = 'vvedit password';
      } 
      if(trim($data['password2']) != $data['password'] )
      {
        $errors[] = 'Повторный пароль введен неверно';
      } 

            if(R::count('users',"login = ? OR email = ? ", array ( $data['login'] ,$data['email']) )>0 )
      {
        $errors[] = 'Пользователь с такими данными уже есть';
      } 



    if(empty($errors) ){
    // horocho
        $user = R::dispense( 'users' );
    $user->name = $data['login'];
    $user->email = $data['email'];
    $user->password = $data['password'];
    $user->password2 = $data['password2'];
    R::store( $user ); 
    echo '<div style="color:green;">Отправлено</div><hr>';


     } else  
      { 
       echo '<div style="color:red;">'.array_shift($errors).'</div><hr>';
      } 


      */
}
?>
<!DOCTYPE html>
<html lang="ru"  >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="skript.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link href="style.css" rel="stylesheet">

    <title>NETтелеком</title>
</head>
    
<body class="body">
    <div class="topnav">
        <a href="signup.php"><b>Главная</b></a>
        <a href="inter.html"><b>Интернет</b></a>
        <a href="telik.html"><b>Телевидение</b></a>
        <a href="oborud.html"><b>Оборудование</b></a>
        <a href="signup2.php"><b>Личный кабинет</b></a>

    </div>
    </br>
    <div class="fon">
        <img class="fon" src="log.png" alt="альтернативный текст" width="1340" height="150" />
    </div>



    <br><br><br><br>
    <div class="cover">
        <h2 class="contact">Авторизация</h2>
        <form name="form" method="POST" action="login.php" id="contactform">
            <p class="contact"><label for="email">Введите ваш логин</label></p>
            <input  name="email" id="email"  placeholder="email" required="" tabindex="1" type="text" value="<?php echo $data['email']; ?>">


            <p class="contact"><label for="password">Ваш пароль</label></p>
            <input name="password" id="password" type="password" ><br>


       
            <button class="button" name="do_login" type="submit" id="button">Войти</button><br><br>
        </form>
    </div>
    



    <br><br>  <br><br>
    <div class="footer">
    <br>
        <footer id="myFooter">
            <div class="container">
                <ul>
                    <a href="signup.php">Главная</a>
                    <a href="inter.html">Интернет</a>
                    <a href="telik.html">Телевидение </a>
                    <a href="oborud.html">Оборудование</a>
                </ul>

            </div>
            <div class="container">

                <div class="aaa">
                    <a>Мы в соц-сетях:  .</a>
                    <a href="https://www.facebook.com/profile.php?id=100023029292803"><img src="f.png" width="50px" height="50px"></a>
                    <a href="https://twitter.com/explore"><img src="t.png" width="50px" height="50px"></a>
                    <a href="https://www.instagram.com/niks.gawrilenko/?hl=uk"><img src="i.png" width="50px" height="50px"></a>
                    <a href="https://vk.com/id224301660"><img src="v.webp" width="50px" height="50px"></a>
                </div>

            </div>
            <br><br>
            <p class="footer-copyright">© 2020 NetСom company</p>
        </footer>
    </div>





</body>
</html>
</form>
</html>
