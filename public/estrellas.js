

var io = io.connect('/');
function estrella() {
    for (i = 0; i < document.getElementsByName("rating").length; i++) {
        if (document.getElementsByName("rating")[i].checked == true) {
            var ratingValue = document.getElementsByName("rating")[i].value;
            break;
        }
    }
    var url = window.location.href
    console.log(ratingValue, url);
   io.emitter("rating",{ratingValue});
}
