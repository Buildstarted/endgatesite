/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var AudioHandling;
(function (AudioHandling) {
    // Generic animation class that allows me to display temporary animations in the viewport
    var Animation = (function () {
        function Animation(imageSrc, x, y, spriteSheetWidth, spriteSheetHeight, frameWidth, frameHeight, fps, frameCount, onComplete, repeat, rotateRandomly) {
            if (typeof repeat === "undefined") { repeat = true; }
            if (typeof rotateRandomly === "undefined") { rotateRandomly = false; }
            this._spriteSheet = new eg.Graphics.Assets.ImageSource(imageSrc, spriteSheetWidth, spriteSheetHeight);

            // To create our animation, we pass in our sprite sheet that we want to use for the animation, the fps (frames per second),
            // our animation frame size, and how many frames the animation is
            this._animation = new eg.Graphics.SpriteAnimation(this._spriteSheet, fps, new eg.Size2d(frameWidth, frameHeight), frameCount);

            // Wire up the animations OnComplete handler to trigger the passed in function once the animation has finished.
            this._animation.OnComplete.Bind(onComplete);

            // We now create our Sprite2d which is used to display our animation onto the canvas, this is what eventually gets added to the Scene
            this.Graphic = new eg.Graphics.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);

            if (rotateRandomly) {
                this.Graphic.Rotation = Math.random() * (Math).twoPI + -Math.PI;
            }

            // By default the animation is stopped, meaning even if it has update called on it the frames will not start moving
            // Therefore here we're saying that the animation is ready to play
            this._animation.Play(repeat);
        }
        Animation.prototype.Update = function (gameTime) {
            // Update the animation so that it plays
            this._animation.Update(gameTime);
        };
        return Animation;
    })();
    AudioHandling.Animation = Animation;
})(AudioHandling || (AudioHandling = {}));
//@ sourceMappingURL=Animation.js.map
