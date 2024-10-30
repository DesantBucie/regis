import {SVG, G, Rect} from "@svgdotjs/svg.js";

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
        this.w = w;
        this.h = h
        this.isMouseDown = false;
        this.rotation = 0

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
     * @param {number} rotation
     */
    rotate(matrix = null){
        for(let i = 0; i < 5; i++) {
            ///this.objects[i].node.setAttribute('transform',
                //`rotate(${rotation}, ${(this.objects[0].x() + this.rectShift + (this.w / 2))}, ${(this.objects[0].y() + this.rectShift + (this.h / 2))})`);
            //this.objects[i].rotate(rotation - this.rotation, Number(this.objects[0].x()) + (this.w / 2), Number(this.objects[0].y()) + (this.h / 2))
            this.objects[i].attr('transform', matrix);
        }
        //this.rotation = rotation;
    }
    /**
     * Update squares to follow object
     * @param {number} x
     * @param {number} y
     */
    updateRects(x, y, matrix) {
        x -= this.rectShift
        y -= this.rectShift
        let xyTab = [[x, y], [x, y + this.h], [x + this.w, y + this.h], [x + this.w, y]]
        for(let i = 0; i < 4; i++){
            //this.rotate(undefined)
            this.objects[i]
                .move(xyTab[i][0], xyTab[i][1])
            this.objects[i].attr('transform', matrix)
            //this.rotate(this.rotation)

        }
        this.objects[4].move(x + (this.w / 2), y - 30)
        this.objects[4].attr('transform', matrix)
    }
    /**
     * Function that handles drawing of the group
     * @param {SVG} ctx
     * @param {number} x
     * @param {number} y
     */
    draw(ctx, x, y) {

        this.updateRects(x, y)

        for(let i = 0; i < 4; i++){
            this.objects[i]
                .size(15 , 15)
                .fill({color: "#0085dedd"})
        }
        this.objects[4]
            .size(15, 15)
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
