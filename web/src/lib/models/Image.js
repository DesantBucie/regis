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
}
