import {PresObj} from "./PresObject.js";
import {Text} from "@svgdotjs/svg.js";

export class PresText extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     * @param {String} text - text
     */
    constructor(x, y, w = 0, h = 0, text) {
        super(x, y, w, h);
        this.object = new Text()
            .text(text)
            .off('onclick')
            .attr('contenteditable', 'true')
        this.lines = 1;
    }
    resizeBottomRight(e, ctx, ratio) {

    }
    resizeUpLeft(e, ctx, ratio) {
        //
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     * @param {number} ratio - scaling ratio
     */
    draw(ctx, ratio) {
        //first draw the object...
        this.object
            .css('user-select', 'none')
            .move(this.x * ratio, this.y * ratio)
            .font({family: 'Helvetica', size: 40 * ratio})
            .addTo(ctx)
        // ...so we can calculate the text length
        // TODO text width and height not working
        this.w = this.object.node.getBoundingClientRect().width;
        this.h = this.object.node.getBoundingClientRect().height;

        // divide by ratio, so we can reverse the ratioing in super.draw()
        this.outline.w = this.w / ratio
        this.outline.h = this.h / ratio
        super.draw(ctx, ratio)
    }
}
