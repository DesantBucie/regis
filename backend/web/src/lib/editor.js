import {SVG, Rect, Text, Line} from '@svgdotjs/svg.js';

const Outline = (x, y, w, h, ctx, ratio) => {
    let rects = []
    const rectSize = 15;
    const rectShift = rectSize / 2;
    rects.push(new Rect().move(x - rectShift, y - rectShift))
    rects.push(new Rect().move(x + w - rectShift, y - rectShift))
    rects.push(new Rect().move(x - rectShift, y + h - rectShift))
    rects.push(new Rect().move(x + w - rectShift, y + h - rectShift))
    for(let i = 0; i < rects.length; i++) {
        rects[i]
            .size(15 * ratio, 15 * ratio)
            .move(rects[i].x() * ratio, rects[i].y() * ratio)
            .fill("rgb(0, 125, 200)")
            .addTo(ctx);
    }
}

/**
 * The class defining an object on canvas
 *
 * @class PresObj
 */
export class PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w = 0, h = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.selected = false
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     * @param {number} ratio - scaling ratio
     */
    onClick = (ctx, ratio) => {
        if(!this.selected){
            this.selected = true;
        }
        else {
            this.selected = false;
        }
        Outline(this.x, this.y, this.w, this.h, ctx, ratio)
    }
}
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
        this.shape = new Rect()
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     * @param {number} ratio - scaling ratio
     */
    draw(ctx, ratio) {
        this.shape.move(this.x * ratio, this.y * ratio)
            .size(this.w * ratio, this.h * ratio)
            //.on('click', () =>  Outline(this.x, this.y, this.w, this.y, ctx, ratio))
            .on('mousemove', (e) => {
                this.x = e.offsetX;
                this.y = e.offsetY;
                e.preventDefault();
                console.log(e)
            })
            .addTo(ctx);
    }
}

export class PresText extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     * @param {CanvasRenderingContext2D} ctx - context
     * @param {String} text - text
     */
    constructor(x, y, w = 0, h = 0, text) {
        super(x, y, w, h);
        this.txtObj = new Text().text(text)
        this.lines = 1;
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     * @param {number} ratio - scaling ratio
     */

    draw(ctx, ratio) {

        this.txtObj
            .move(this.x * ratio, this.y * ratio)
            .font({family: 'Helvetica', size: 20 * ratio})
            .addTo(ctx)
        this.w = this.txtObj.node.getComputedTextLength();
        //this.w = this.txtObj.node.clientWidth
        this.h = 30
        this.txtObj
            .move(this.x * ratio, this.y * ratio)
            .font({family: 'Helvetica', size: 20 * ratio})
            .on('click', () => Outline(this.x, this.y, this.w, this.h, ctx, ratio))
            .addTo(ctx)
    }
}