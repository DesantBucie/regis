import {SVG, Rect, Text, G} from '@svgdotjs/svg.js';
import {PresObj} from "./models/PresObject.js";

/**
 * The class defining a Shape on canvas
 *
 * @class PresShape
 * @extends PresObj
 */
export class PresShape extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w = 0, h = 0) {
        super(x, y, w, h);
        //this.shape = new Rect()
        this.object = new Rect()
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
