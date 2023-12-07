import {Rect, Circle, Ellipse} from "@svgdotjs/svg.js";
import {PresObj} from "./PresObject.js";

/**
 * The class defining a Shape on canvas
 *
 * @class PresShape
 * @extends PresObj
 */
class PresShape extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w = 0, h = 0) {
        super(x, y, w, h);
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     * @param {number} ratio - scaling ratio
     */
    draw(ctx, ratio) {
        super.draw(ctx, ratio)
    }
}

export class PresRect extends PresShape {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.object = new Rect()
    }

}
export class PresCircle extends PresShape {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} r - circle radius
     */
    constructor(x, y, r) {
        super(x, y, r * 2, r * 2);

        this.object = new Circle()
    }
    draw(ctx,ratio){
        super.draw(ctx, ratio)
        this.object
            .move(this.x * ratio, this.y * ratio)
            .addTo(ctx)
    }

}

export class PresEllipse extends PresShape {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.object = new Ellipse()
    }
    draw(ctx, ratio){
        super.draw(ctx, ratio)
        this.object
            .move(this.x * ratio, this.y * ratio)
            .addTo(ctx)
    }
}