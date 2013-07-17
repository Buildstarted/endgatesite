/// <reference path="jquery-2.0.1.js" />
/// <reference path="jquery-2.0.1.intellisense.js" />

(function (window, $) {

    var treeViewIcons = $(".treeViewIcon"),
        moduleHolders = $(".moduleHolder"),
        baseModuleItem = moduleHolders.first(),
        selectedItem = moduleHolders.find(".selected"),
        currentParent = selectedItem.parent();

    if (treeViewIcons.parent().hasClass("closed")) {
        treeViewIcons.first().click();
    }

    while (currentParent[0] !== baseModuleItem[0]) {
        currentParent.removeClass("closed");
        currentParent = currentParent.parent();
    }

})(window, $);