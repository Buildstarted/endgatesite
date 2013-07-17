/// <reference path="jquery-2.0.1.js" />
/// <reference path="jquery-2.0.1.intellisense.js" />

(function (window, $) {

    var treeViewIcons = $(".treeViewIcon");

    treeViewIcons.click(function (e) {
        $(this).parent().toggleClass("closed");
    });

})(window, $);