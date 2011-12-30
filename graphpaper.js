$(document).ready(function() {
    $(".container").click(function(e) { $(e.target).toggleClass("clicked"); });
    $("#wider").click(function(e) { wider(); });
    $("#taller").click(function(e) { taller(); });
    $("#expand").click(function(e) { expand(); });
    $("#expandTen").click(function(e) { expand(10); });
    $(".changesize").click(function(e) { updateTitle(); });
});

function taller(times) {
   var result = repeat(newCell, times);
    $(".column").each(function (i,e) { $(e).append($(result)); });
}

function wider(times) {
    var result = "";
    repeat(function() { result += newColumn(); }, times);
    $(".container").append(result);
}

function expand(times) {
    wider(times);
    taller(times);
}

function repeat(func, times) {
    var result = "";
    times = times || 1;
    for (var i = 0; i < times; i++) {
        result += func(); 
    }
    return result;
}

function newCell() {
    return "<div></div>";
}

function newColumn() {
    var result = "<div class=\"column\">";
    repeat(function() { result += "<div></div>"; }, rowCount());
    result += "</div>";
    return result;
}

function updateTitle() {
    document.title = columnCount() + "x" + rowCount();
}

function columnCount() { return $(".column").length; }
function rowCount() { return $(".column:first div").length; }

