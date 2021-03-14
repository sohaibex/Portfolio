<?PHP

function getUserIP()
{
    // Get real visitor IP behind CloudFlare network
    if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
              $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
              $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
    }
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}
?>
<html lang="fr">

<meta http-equiv="content-type" content="text/html;charset=UTF-8" />

<head>
  <meta charset="utf-8">
  <title>Windows</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" href="favicon.ico" />
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" />

</head>

<body>

  <div class="clock" id="clock">
    <div class="time" id="time">12:44:23 AM</div>
    <div class="date" id="date">Sunday, August 10, 2019</div>
    <h3 style="color:white">Your IP Address <?php $user_ip = getUserIP();

echo $user_ip; ?> </h3>
  </div>
  <div class="login-cover" id="loginCover"></div>
  <div class="login">
    <div>
      <div class="image"></div>
      <div class="name">Sohaib EL MEDIOUNI</div>
      <div class="password">
        <input type="password" placeholder="Password" value="r4ndomp4ss@!"></input>
        <span class="button" id="mySpan" onclick="MyClick()">&#10132;</span>
      </div>
    </div>
    <span class="power" id="power"></span>
  </div>

</body>
<script>
  document.getElementById("loginCover").addEventListener("click", function(e) {
    document.getElementById(e.srcElement.id).className += " slideUp";
  }, false);

  document.getElementById("power").addEventListener("click", function(e) {
    document.getElementById('loginCover').className = "login-cover";
  }, false);

  time = document.getElementById('time');
  date = document.getElementById('date');

  setInterval(function() {
    d = new Date();
    date.innerHTML = d.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    time.innerHTML = d.toLocaleTimeString();
  }, 1000);

  function MyClick() {
    window.location.href = "sohaib.html";
  }
</script>


</html>