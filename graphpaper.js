$(document).ready(function() {
    $(".container").click(function(e) { $(e.target).toggleClass("clicked"); });
    $("#wider").click(function(e) { wider(); });
    $("#taller").click(function(e) { taller(); });
    $("#expand").click(function(e) { expand(); });
    $("#expandTen").click(function(e) { expand(10); });
    $(".changesize").click(function(e) { updateTitle(); });
    
    extractDefaultsFromDocument();
});

var columnWidth;
var newCellHtml;
var newColumnHtmlStart;
var newColumnHtmlEnd;

function taller(times) {
   var result = repeat(newCell, times);
    $(".column").each(function (i,e) { $(e).append($(result)); });
}

function wider(times) {
    var result = repeat(newColumn, times);
    $(".container").append(result);
    updateContainerWidth();
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
    return newCellHtml;
}

function newColumn() {
    return newColumnHtmlStart + 
        repeat(newCell, rowCount()) +
        newColumnHtmlEnd;
}

function updateTitle() {
    document.title = columnCount() + "x" + rowCount();
}

function updateContainerWidth() {
    $(".container").width(columnCount() * columnWidth);
}

function columnCount() { 
    return $(".column").length; 
}

function rowCount() { 
    return $(".column:first div").length; 
}

function outerHtml(j) {
    return $("<div>").append(j.clone()).html();   
}

function extractDefaultsFromDocument() {
    var firstCell = $(".column div:first");
    columnWidth = firstCell[0].offsetWidth;
    newCellHtml = outerHtml(firstCell);
    
    var firstColumn = $(".column:first");
    var innerColumn = firstColumn.html();
    var outerColumn = outerHtml(firstColumn.clone());
    var containerHtml = outerColumn.replace(innerColumn, "---");
    
    var containerParts = containerHtml.split("---");
    newColumnHtmlStart = containerParts[0];
    newColumnHtmlEnd = containerParts[1];
}