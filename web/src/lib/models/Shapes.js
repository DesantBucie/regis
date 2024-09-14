import {Rect, Circle, Ellipse, SVG, Polygon} from "@svgdotjs/svg.js";
import {PresObj} from "./PresObject.js";

/**
 * The class defining a Shape on canvas
 *
 * @class PresShape
 * @extends PresObj
 */
class PresShape extends PresObj {
    /**
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
     */
    draw(ctx) {
        super.draw(ctx)
    }

    static fromJSON(data) {
        const LUT = new Map([
            ['PresRect', PresRect],
            ['PresCircle', PresCircle],
            ['PresEllipse', PresEllipse],
            ['PresTriangle', PresTriangle]
        ]);
    }
}
class PresPolygon extends PresObj {

}

export class PresTriangle extends PresPolygon {
    /**
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w, h) {
        super(x,y,w,h);
        this.object = new Polygon();
    }
    draw(ctx){

        super.draw(ctx);
        console.log()
        this.object.plot([[this.x, this.y], [this.x+this.w/2, this.y+this.h],[this.x+this.w, this.y]]);
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
    /**
     * @param {object} ctx
     */
    draw(ctx){
        super.draw(ctx)
        this.object
            .move(this.x, this.y)
            .addTo(ctx)
    }

    /**
     * @param {PointerEvent} e
     * @param {SVG} ctx
     * @param {number} index
     */
    resize(e, ctx, index) {
        if(this.outline.isMouseDown) {
            let oldX = this.x;
            let oldY = this.y;
            let oldW = this.w;
            let oldH = this.h;
            this.object.node.setAttribute('transform',
                `rotate(0)`);
            if(index === 0){
                [this.x, this.x] = this.getCTMPosition(e, ctx)
                this.w += oldX - this.x;
                this.h = this.w;
            }
            if(index === 3) {
                [this.w, this.y] = this.getCTMPosition(e, ctx)
                this.w -= this.x
                this.h = this.w
            }
            if(index === 2){
                [this.w, this.h] = this.getCTMPosition(e, ctx);
                this.w -= this.x
                this.h = this.w
            }
            if(index === 1) {
                [this.x, this.h] = this.getCTMPosition(e, ctx);
                this.w += oldX - this.x;
                this.h = this.w
            }

            if(this.w < 15) {
                this.w = oldW;
                this.x = oldX;
            }
            if(this.h < 15) {
                this.h = oldH;
                this.y = oldY;
            }
            this.object.node.setAttribute('transform',
                `rotate(${this.rotation}, ${(this.x + (this.w / 2))}, ${(this.y + (this.h / 2))})`);
            this.outline.h = this.h;
            this.outline.w = this.w;
            this.outline.updateRects(this.x, this.y)
            this.updateObject()
        }
    }

}

export class PresEllipse extends PresShape {
    /**
     * @constructor
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width of the object
     * @param {number} h - height of the object
     */
    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.object = new Ellipse()
    }
    /**
     * @param {object} ctx
     */
    draw(ctx){
        super.draw(ctx)
        this.object
            .move(this.x, this.y)
            .addTo(ctx)
    }
}
