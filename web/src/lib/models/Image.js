import {Image} from "@svgdotjs/svg.js";
import {PresObj} from "./PresObject.js";


/**
 * Class defining Presentation Image
 *
 */
export class PresImage extends PresObj {

    /**
     * @constructor
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     * @param {string} blob
     */
    constructor(x, y, w, h, blob) {
        super(x, y, w, h);
        this.object = new Image()
            .load(blob)
    }

    toJSON() {
        console.log(this.object.node.href.baseVal)
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            object: this.constructor.name,
            imageBase64: this.object.node.href.baseVal
        }
    }
}
