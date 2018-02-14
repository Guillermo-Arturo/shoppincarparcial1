
$(function() {

    $('#colorselector_2').colorselector({
        callback : function(value, color, title) {
        $("#colorValue").val(value);
        $("#colorColor").val(color);
        $("#colorTitle").val(title);
        }
    });
});