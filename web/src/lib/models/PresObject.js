import {Outline} from './Outline.js'
import {SVG} from "@svgdotjs/svg.js";

/**
 * The class defining an basic object on canvas.
 * It should be used as abstract class.
 *
 * @class PresObj
 */
export class PresObj {
    /**
     * @constructor
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
        this.rotation = 0;

        this.outline = new Outline(this.x, this.y, this.w, this.h)
        this.object = null
        this.selected = false
        this.mouseDown = false
    }

    /**
     * Change fill color of the object
     * @param {string} color - Either in hex or rgba
     */
    changeFill(color){
        this.object
            .fill(color)
    }

    /**
     * Function to draw an object
     * @param {SVG} ctx
     */
    draw(ctx ) {
        this.object.node.setAttribute('transform', '');
        this.object
            .move(this.x, this.y)
            .css('cursor', 'pointer')
            .size(this.w, this.h)
            .on('click', () => {
                this.onClick(ctx)
            })
            .on('mousedown', this.onMouseDown)
            .on('mouseup', this.onMouseUp)
            //.on('mousemove', (e) => { return this.onMousemove(e, ctx)})
            .addTo(ctx);
        //this.object.node.setAttribute('transform',
        //    `rotate(${this.rotation}, ${(this.x + (this.w / 2))}, ${(this.y + (this.h / 2))})`);
        //this.object.node.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        let handler

        this.object
            .on('mousedown', () => {
                ctx.on('mousemove', handler = (e) => { return this.onMousemove(e, ctx)})
            })
            .on('mouseup', () => {
                ctx.off('mousemove', handler);
            })

        for(let i = 0; i < 4; i++){
            this.outline.objects[i]
                .on('mousedown', () => {
                    ctx
                        .on('mousemove' , handler = (e) => { return this.resize(e, ctx, i)})
                })
                //very interesting results if we remove that 4 lines.
                .on('mouseup', () => {
                    ctx
                        .off('mousemove', handler);
                })
        }
        this.outline.objects[4]
            .on('mousedown', () => {
                ctx
                    .on('mousemove' , handler = (e) => { return this.rotate(e, ctx)})
                    .on('mouseup', () => {
                        ctx.off('mousemove', handler)
                    })
            })

    }

    /**
     *
     * @param {PointerEvent} e
     * @param {SVG} ctx
     */
    onMousemove(e, ctx) {
        if(this.mouseDown && this.selected) {
            let CTM = ctx.node.getScreenCTM()
            this.object.x(((e.clientX - CTM.e) / CTM.a) - (this.w / 2));
            this.object.y(((e.clientY - CTM.f) / CTM.d) - (this.h / 2));

            this.object.rotate(-this.rotation);

            //de-rotate to move
            //this.object.node.setAttribute('transform', 'rotate(0)');
            //this.object.move(this.object.x(), this.)
                //.addTo(ctx)
            // rotate after move
            //this.object.node.setAttribute('transform',
            //    `rotate(${this.rotation}, ${(this.x + (this.w / 2))}, ${(this.y + (this.h / 2))})`);
            this.object.rotate(this.rotation);
            this.outline.updateRects(this.object.x(), this.object.y())
            this.outline.group.addTo(ctx)
            e.preventDefault();
        }
    }
    /**
     *
     * @param {SVG} ctx - context of svg canvas
     */
    onClick (ctx){
        if(!this.selected){
            this.outline.draw(ctx)
            this.object.css('cursor', 'move')
        }
        else {
            this.outline.remove()
            this.object.css('cursor', 'pointer')
        }
        this.selected = !this.selected;
    }
    onMouseDown = () => {
        this.mouseDown = true;
    }
    onMouseUp = () => {
        this.mouseDown = false;
    }
    getCTMPosition(e, ctx){
        let CTM = ctx.node.getScreenCTM()
        return [
            ((e.clientX - CTM.e) / CTM.a),
            ((e.clientY - CTM.f) / CTM.d)
        ]
    }
    updateObject(){
        this.object
            .move(this.x, this.y)
            .size(this.w, this.h)
            //.addTo(ctx)
        this.outline.updateRects(this.x, this.y)
        //this.outline.group.addTo(ctx)
    }
    /**
     * @param {PointerEvent} e - event
     * @param {SVG} ctx - SVG context
     * @param {number} index
     */
    resize(e, ctx, index) {
        if(this.outline.isMouseDown) {

            let oldX = this.x;
            let oldY = this.y;
            let oldW = this.w;
            let oldH = this.h;
            if(index === 0){
                [this.x, this.y] = this.getCTMPosition(e, ctx)
                this.w += oldX - this.x;
                this.h += oldY - this.y;
            }
            if(index === 3) {
                [this.w, this.y] = this.getCTMPosition(e, ctx)
                this.w -= this.x
                this.h += oldY - this.y;
            }
            if(index === 2){
                [this.w, this.h] = this.getCTMPosition(e, ctx);
                this.w -= this.x
                this.h -= this.y
            }
            if(index === 1) {
                [this.x, this.h] = this.getCTMPosition(e, ctx);
                this.w += oldX - this.x;
                this.h -= this.y
            }

            if(this.w < 15) {
                this.w = oldW;
                this.x = oldX;
            }
            if(this.h < 15) {
                this.h = oldH;
                this.y = oldY;
            }

            this.outline.x = this.x
            this.outline.y = this.y;
            this.outline.h = this.h;
            this.outline.w = this.w;
            this.updateObject()
        }
    }
    /**
     * @param {PointerEvent} e - event
     * @param {SVG} ctx - SVG context
     */
    rotate(e, ctx){
        if(this.outline.isMouseDown) {

            const [mouseX, mouseY] = this.getCTMPosition(e, ctx)

            const angle = Math.atan2(mouseY - this.y, mouseX - this.x) //* (180 / Math.PI);
            console.log(angle);
            this.outline.x = this.x
            this.outline.y = this.y;
            this.outline.h = this.h;
            this.outline.w = this.w;
            //this.object.node.setAttribute('transform',
            //    `rotate(${this.rotation}, ${(this.x + (this.w / 2))}, ${(this.y + (this.h / 2))})`);
            //this.object.node.setAttribute('transform',
            //    `matrix(${Math.cos(angle)}, ${Math.sin(angle)}, ${- Math.sin(angle)}, ${Math.cos(angle)}, ${this.x + (this.w / 2)}, ${this.y + (this.h / 2)})`);
            //this.object.rotate(this.rotation)
            this.object.rotate(angle * (180/Math.PI) - this.rotation, this.x + (this.w / 2), this.y + (this.h / 2))
            this.rotation = angle * (180/Math.PI)
            this.outline.rotate(this.rotation)
        }
    }
}
