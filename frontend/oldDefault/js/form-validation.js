$(document).ready(function() {
  $('#submit').click(function(){
    var name = $("#inputUser").val();
    var pass = $("#inputPass").val();

    if(name.length == "")
    {
      $("#inputUser").focus();
      showError ()
      return false
    }

    else if(pass.length == "")
    {
      $("#inputPass").focus();
      showError ()
      return false
    }

  });

  let nameStat;
  let passStat;
  $("#inputUser").on('input', function() {
    userName = $("#inputUser").val();

    if(userName.length == 0){
      nameStat = 0;
    }else{
      nameStat = 1;
    }
    showMessage()
  });

  $("#inputPass").on('input', function() {
    userPass = $("#inputPass").val();

    if(userPass.length == 0){
      passStat = 0;
    }else{
      passStat = 1;
    }
    showMessage()
  });

  function showMessage(){
    if(nameStat == 1 && passStat == 1){
      showSuccess ()
    }else{
      showError ()
    }
  }

  function showError () {
    stopFunction();
    $('.notification').removeClass('_visible');
    $(".notification__message_success").removeClass('_active');
    $(".notification__message_failed").addClass('_active');
    hideNotification ()
  }

  function showSuccess () {
    stopFunction();
    $('.notification').removeClass('_visible');
    $(".notification__message_success").addClass('_active');
    $(".notification__message_failed").removeClass('_active');
    hideNotification ()
  }


  let timeOut;

  function stopFunction() {
    clearTimeout(timeOut);
  }

  function hideNotification () {
    timeOut = setTimeout(function () {
      $('.notification').removeClass('_visible');
      $(".notification__message_success").removeClass('_active');
      $(".notification__message_failed").removeClass('_active');
    }, 3000)
  }
});