import {Outline} from './Outline.js'
import {SVG} from "@svgdotjs/svg.js";
import {_selectedObject} from "../../store/data.js";



/**
 * The class defining an basic object on canvas except text(for some stupid reason).
 * It should be used as abstract class.
 *
 * @class PresObj
 */
export class PresObj {
    static counter = 0;
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

        this.timing = {};
        this.animation = {};
        this.id = PresObj.counter++;
        this.opacity = 1;
    }

    /**
     * Change fill color of the object
     * @param {string} color - Either in hex or rgba
     */
    changeFill(color){
        this.object
            .fill(color)
    }
    changeOpacity(opacity) {
        this.object.opacity(opacity)
    }
    /**
     * Change stroke color of the object
     * @param {string} color - Either in hex or rgba
     */
    changeStrokeColor(color ){
        this.object.stroke({color: color})
    }
    /**
     * Change stroke width of the object
     * @param {number} width - non-negative number
     */
    changeStrokeWidth(width)  {
        this.object.stroke({width: width})
    }

    /**
     * Function to draw an object
     * @param {SVG} ctx
     */
    draw(ctx) {
        //this.object.node.setAttribute('transform', '');
        this.object
            .move(this.x, this.y)
            .css('cursor', 'pointer')
            .size(this.w, this.h)
            .on('click', (e) => {
                e.preventDefault();
                if(this.timing.end < 200) {
                    this.onClick(ctx)
                }
            })
            .on('mousedown',this.onMouseDown)
            .on('mouseup', this.onMouseUp)
            //.on('mousemove', (e) => { return this.onMousemove(e, ctx)})
            .addTo(ctx);
        //this.object.node.setAttribute('transform',
        //    `rotate(${this.rotation}, ${(this.x + (this.w / 2))}, ${(this.y + (this.h / 2))})`);
        //this.object.node.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        let handler

        this.object
            .on('mousedown', (r) => {
                let CTM = ctx.node.getScreenCTM();
                const offsetX = this.object.x() - ((r.clientX - CTM.e) / CTM.a);
                const offsetY = this.object.y() - ((r.clientY - CTM.f) / CTM.d);
                ctx.on('mousemove', handler = (e) => { return this.onMousemove(e, ctx, offsetX, offsetY )})
            })
            .on('mouseup', () => {
                ctx.off('mousemove', handler);
            })

        for(let i = 0; i < 4; i++){
            this.outline.objects[i]
                .on('mousedown', () => {
                    ctx
                        .on('mousemove' , handler = (e) => { return this.resize(e, ctx, i)})
                        .on('mouseup', () => {
                            ctx.off('mousemove', handler);
                        })
                        .on('mouseleave', () => {
                            ctx
                                .off('mousemove', handler);
                        })
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
     * Used for drawing on viewer
     * @param ctx
     */
    drawNoEvent(ctx) {
        this.object
            .move(this.x, this.y)
            .size(this.w, this.h)
            .addTo(ctx);
    }
    eventclean() {
        this.object.off('click')
            .off('mousemove')
            .off('mouseup')
            .off('mousedown')
    }
    /**
     *
     * @param {PointerEvent} e
     * @param {SVG} ctx
     * @param {number} offsetX
     * @param {number} offsetY
     */
    onMousemove(e, ctx, offsetX, offsetY) {
        if(this.mouseDown && this.selected) {
            let CTM = ctx.node.getScreenCTM()
            // Offset is calculated on mousedown effect. If it was
            // calculated here it would zero out.
            this.object.x(((e.clientX - CTM.e) / CTM.a) + offsetX);
            this.object.y(((e.clientY - CTM.f) / CTM.d) + offsetY);

            this.x = this.object.x()
            this.y = this.object.y()

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
            this.outline.draw(ctx, this.x, this.y)
            this.object.css('cursor', 'move')
            _selectedObject.set(this);
        }
        else {
            this.outline.remove()
            this.object.css('cursor', 'pointer')
            _selectedObject.set(null);
        }
        this.selected = !this.selected;
    }
    onMouseDown = () => {
        this.timing.start = performance.now()
        this.mouseDown = true;
    }
    onMouseUp = () => {
        this.timing.end = performance.now() - this.timing.start
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
            //left up
            if(index === 0){
                [this.x, this.y] = this.getCTMPosition(e, ctx)
                this.w += oldX - this.x;
                this.h += oldY - this.y;
            }
            // right up
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
    /*rotate(e, ctx){
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
    }*/

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            object: this.constructor.name,
            attributes: {
                fill: this.object.attr('fill'),
                strokeWidth: this.object.attr('stroke-width'),
                stroke: this.object.attr('stroke'),
                opacity: this.object.attr('opacity')
            },
            animation: this.animation
        }
    }
    static fromJSON(json){

    }
}
