import {G, Rect, Ellipse} from "@svgdotjs/svg.js";

import {faRotate} from "@fortawesome/free-solid-svg-icons"
import {icon} from "@fortawesome/fontawesome-svg-core"

/**
 *  Class representing outline group.
 */
export class Outline {
    rectShift = 7.5;
    cursors = ['nwse-resize', 'nesw-resize'];
    /**
     * Initialise Outline object
     * @constructor
     * @param {number} x - x
     * @param {number} y - y
     * @param {number} w - width
     * @param {number} h - height
     */
    constructor(x, y, w, h) {
        this.group = new G()
        this.objects = []
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h
        this.isMouseDown = false;

        for(let i = 0; i < 4; i++) {
            this.objects.push(new Rect())
            this.group.add(this.objects[i])
            this.objects[i]
                .css('cursor', this.cursors[i % 2])
                .on('mousedown', () => {this.isMouseDown = true })
                .on('mouseup', () => {this.isMouseDown = false})
        }
        this.objects.push(new Rect())
        this.group.add(this.objects[4])
        this.objects[4]
            .css('cursor', 'alias')
            .on('mousedown', () => {this.isMouseDown = true })
            .on('mouseup', () => {this.isMouseDown = false})

    }

    /**
     * Update squares to follow object
     * @param {number} x
     * @param {number} y
     * @param {number} ratio
     */
    updateRects(x, y, ratio) {
        this.x = x
        this.y = y
        this.objects[0].move((x - this.rectShift) * ratio , (y - this.rectShift) * ratio)
        this.objects[1].move((x - this.rectShift) * ratio, (y + this.h - this.rectShift) * ratio)
        this.objects[2].move((x + this.w - this.rectShift) * ratio, (y + this.h - this.rectShift) * ratio)
        this.objects[3].move((x + this.w - this.rectShift) * ratio, (y - this.rectShift) * ratio)
        this.objects[4].move((x + (this.w / 2) - this.rectShift) * ratio,(y - 30) * ratio)
    }
    updPosition({x, y, w, h, ratio}){

    }
    /**
     * Function that handles drawing of the group
     * @param {SVG} ctx
     * @param {number} ratio
     */
    draw(ctx, ratio) {
        this.updateRects(this.x, this.y, ratio)
        for(let i = 0; i < 4; i++){
            this.objects[i]
                .size(15 * ratio, 15 * ratio)
                .fill({color: "#0085dedd"})
        }
        this.objects[4]
            .size(15 * ratio, 15 * ratio)
            .fill({color: "#EEEE00dd"});
        this.group.addTo(ctx)
    }

    /**
     * Remove the group, used when object is unselected
     */
    remove(){
        this.group.remove()
    }
}
