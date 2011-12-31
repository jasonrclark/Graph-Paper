var GraphPaper = (function() {
    var columnWidth;
    var newCellHtml;
    var newColumnHtmlStart;
    var newColumnHtmlEnd;

    var mouseIsDown = false;
    
    var columns = 1;
    var rows = 1;

    function init() {
        $(document).ready(function() {
            wireUpEvents();
            extractDefaultsFromDocument();
            setInitialSize();
        });
    };
    
    function taller(times) {
        times = defaultTimes(times);
        $(".column").each(function (i,e) { 
            $(e).append($(newCells(times))); 
        });
        rows += times;
    }

    function wider(times) {
        times = defaultTimes(times);
        $(".container").append(newColumns(times));
        columns += times;
    }
    
    function defaultTimes(times) {
        return (typeof times !== "number") ? 1 : times;
    }

    function expand(times) {
        wider(times);
        taller(times);
    }

    function repeat(str, times) {
        return new Array(times + 1).join(str);
    }

    function newCells(times) {
        return repeat(newCellHtml, times);
    }

    function newColumns(times) {
        return repeat(
            newColumnHtmlStart + newCells(rows) + newColumnHtmlEnd,
            times);
    }

    function onSizeChanged() {
        updateTitle();
        updateContainerWidth();
        showNewCells();
    }

    function updateTitle() {
        document.title = columns + "x" + rows;
    }

    function updateContainerWidth() {
        $(".container").width(columns * columnWidth);
    }

    function showNewCells() {
        $(".hidden").fadeIn("slow", function(e) {
            $(".hidden").removeClass("hidden");
        });
    }

    // for convenience, patch jQuery with outerHtml support
    $.fn.outerHtml = function() {
        return $("<div>").append(this.clone()).html();   
    }

    function setMouseDown() { 
        mouseIsDown = true; 
    }
    
    function setMouseUp() { 
        mouseIsDown = false; 
    }
    
    function toggleCell(e) {
        $(e.target).toggleClass("clicked");
    }
    
    function markCell(e) {
        $(e.target).addClass("clicked");
    }
    
    function markCellIfMouseDown(e) {
        if (mouseIsDown)
            markCell(e);
        return false; // prevent propagation so body mousemove can clear mousedown
    }

    function wireUpEvents() {
        $(".container").
            click(toggleCell).
            mousemove(markCellIfMouseDown).
            mousedown(setMouseDown).
            mouseup(setMouseUp);
        
        // if we've left the container, clear our mouse setting
        $(document.body).mousemove(setMouseUp);
        
        $("#wider").click(wider);
        $("#taller").click(taller);
        $("#expand").click(expand);
        $("#expandTen").click(function(e) { expand(10); });
        
        $(".changesize").click(onSizeChanged);
    }

    function extractDefaultsFromDocument() {
        // capture initial cell markup
        newCellHtml = $(".column div:first").outerHtml();

        // show so the width is available on initial cell
        showNewCells();
        columnWidth = $(".column div:first")[0].offsetWidth;
        
        // capture initial column markup
        var firstColumn = $(".column:first");
        var innerColumn = firstColumn.html();
        var outerColumn = firstColumn.clone().outerHtml();
        var containerHtml = outerColumn.replace(innerColumn, "---");
        
        var containerParts = containerHtml.split("---");
        newColumnHtmlStart = containerParts[0];
        newColumnHtmlEnd = containerParts[1];
    }

    function setInitialSize() {
        setTimeout(
            withShow(function() { expand(9); }), 
            500);
    }
    
    function withShow(func) {
        return function() {
            func();
            onSizeChanged();
        };
    }
    
    return {
        init: init,
        taller: withShow(taller),
        wider: withShow(wider),
        expand: withShow(expand),
    }
})();

GraphPaper.init(document);