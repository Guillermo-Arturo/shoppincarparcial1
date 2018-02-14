function changePin(){
    var color = $('#colorColor').val();
    var symbol = $('#character').val();
    var message = $('#message').val();

    sessionStorage.colorPin = color.substring(1,7);
    sessionStorage.characterPin = symbol;
    sessionStorage.messagePin = message;
}