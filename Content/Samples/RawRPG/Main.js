/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="LoadMapHandler.ts" />
/// <reference path="Game.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game = null, resourceSheet = new eg.Graphics.Assets.ImageSource("/Content/Samples/RawRPG/images/wood_tileset_3.png", 512, 512), resources = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, 32, 32), loadMapHandler;

    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create our game
    game = new RawRPG.Game(canvas);

    // Our LoadMapHandler takes in the default properties to build a default "map", it will also allow you to
    // load in maps that are created in the MapBuilder.  All of these numbers in this multi-dimensional reference
    // the array index of our resource map ("resources") that was instantiated above
    loadMapHandler = new RawRPG.LoadMapHandler(game.Map.Scenery, new eg.Vector2d(canvas.width / 2, canvas.height / 2), 27, 47, new eg.Size2d(32, 32), "/Content/Samples/RawRPG/images/wood_tileset_3.png", [
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 170, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 171, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 154, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 6, 7, 0, 154, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 22, 22, 23, 0, 154, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 48, 49, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 22, 22, 23, 0, 154, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 65, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 22, 22, 22, 23, 0, 154, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 156, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 81, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 38, 38, 38, 39, 0, 154, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 139, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 141, 142, 142, 142, 142, 142, 143, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 157, 158, 158, 158, 158, 158, 159, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 173, 174, 174, 174, 174, 174, 175, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155],
        [155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155, 155]
    ]);
})($, window);
//@ sourceMappingURL=Main.js.map
