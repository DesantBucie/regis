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
     */
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.object = new Image()
            .load("https://klasycznebuty.pl/userdata/public/gfx/7715/skora-licowa%2C-skora-groszkowa%2C-goodyear-welted.jpg")
    }
}
