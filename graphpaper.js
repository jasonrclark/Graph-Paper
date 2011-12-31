$(document).ready(function() {
    wireUpEvents();
    extractDefaultsFromDocument();
    setInitialSize();
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

function onSizeChanged() {
    updateTitle();
    updateContainerWidth();
    showNewCells();
}

function updateTitle() {
    document.title = columnCount() + "x" + rowCount();
}

function updateContainerWidth() {
    $(".container").width(columnCount() * columnWidth);
}

function showNewCells() {
    $(".hidden").fadeIn("slow", function(e) {
        $(".hidden").removeClass("hidden");
    });
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

function wireUpEvents() {
    $(".container").click(function(e) { $(e.target).toggleClass("clicked"); });
    $("#wider").click(function(e) { wider(); });
    $("#taller").click(function(e) { taller(); });
    $("#expand").click(function(e) { expand(); });
    $("#expandTen").click(function(e) { expand(10); showNewCells(); });
    $(".changesize").click(function(e) { onSizeChanged(); });
}

function extractDefaultsFromDocument() {
    // capture initial cell markup
    newCellHtml = outerHtml($(".column div:first"));

    // show so the width is available on initial cell
     showNewCells();
    columnWidth = $(".column div:first")[0].offsetWidth;
    
    // capture columns
    var firstColumn = $(".column:first");
    var innerColumn = firstColumn.html();
    var outerColumn = outerHtml(firstColumn.clone());
    var containerHtml = outerColumn.replace(innerColumn, "---");
    
    var containerParts = containerHtml.split("---");
    newColumnHtmlStart = containerParts[0];
    newColumnHtmlEnd = containerParts[1];
}

function setInitialSize() {
    setTimeout(function() {
            expand(9);
            onSizeChanged();
    }, 500);
}