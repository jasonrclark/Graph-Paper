$(document).ready(function() {
    $(".column").click(function(e) {
        $(e.target).toggleClass("clicked");
    });
});