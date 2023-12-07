import {Outline} from './Outline.js'

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
        this.x = x
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
     * @param {number} ratio
     */
    draw(ctx, ratio) {
        this.object.node.setAttribute('transform', '');
        this.object
            .move(this.x * ratio, this.y * ratio)
            .css('cursor', 'pointer')
            .size(this.w * ratio, this.h * ratio)
            .on('click', () => {
                this.onClick(ctx, ratio)
            })
            .on('mousedown', this.onMouseDown)
            .on('mouseup', this.onMouseUp)
            //.on('mousemove', (e) => { return this.onMousemove(e, ctx, ratio)})
            .addTo(ctx);
        this.object.node.setAttribute('transform',
            `rotate(${this.rotation}, ${(this.x + (this.w / 2)) * ratio}, ${(this.y + (this.h / 2)) * ratio})`);
        this.object.node.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        let handler

        this.object
            .on('mousedown', () => {
                ctx
                    .on('mousemove', handler = (e) => { return this.onMousemove(e, ctx, ratio)})
            })
            .on('mouseup', () => {
                ctx
                    .off('mousemove', handler);
            })

        for(let i = 0; i < 4; i++){
            this.outline.objects[i]
                .on('mousedown', () => {
                    ctx
                        .on('mousemove' , handler = (e) => { return this.resize(e, ctx, ratio, i)})
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
                    .on('mousemove' , handler = (e) => { return this.rotate(e, ctx, ratio)})
                    .on('mouseup', () => {
                        ctx.off('mousemove', handler)
                    })
            })

    }

    /**
     *
     * @param {PointerEvent} e
     * @param {SVG} ctx
     * @param {number} ratio
     */
    onMousemove(e, ctx, ratio) {
        if(this.mouseDown && this.selected) {
            let CTM = ctx.node.getScreenCTM()
            this.x = ((e.clientX - CTM.e) / CTM.a / ratio) - (this.w / 2);
            this.y = ((e.clientY - CTM.f) / CTM.d / ratio) - (this.h / 2);
            //de-rotate to move
            this.object.node.setAttribute('transform', '');
            this.object.move(this.x * ratio, this.y * ratio).addTo(ctx)
            // rotate after move
            this.object.node.setAttribute('transform',
                `rotate(${this.rotation}, ${(this.x + (this.w / 2)) * ratio}, ${(this.y + (this.h / 2)) * ratio})`);
            this.outline.updateRects(this.x, this.y, ratio)
            this.outline.group.addTo(ctx)
            e.preventDefault();
        }
    }
    /**
     *
     * @param {SVG} ctx - context of svg canvas
     * @param {number} ratio - scaling ratio
     */
    onClick (ctx, ratio){
        if(!this.selected){
            this.outline.draw(ctx, ratio)
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
    #getCTMPosition(e, ctx, ratio){
        let CTM = ctx.node.getScreenCTM()
        return [
            ((e.clientX - CTM.e) / CTM.a / ratio),
            ((e.clientY - CTM.f) / CTM.d / ratio)
        ]
    }
    #updateObject(ctx, ratio){
        this.object
            .move(this.x * ratio, this.y * ratio)
            .size(this.w * ratio, this.h * ratio)
            .addTo(ctx)
        this.outline.updateRects(this.x, this.y, ratio)
        this.outline.group.addTo(ctx)
    }
    /**
     * @param {EventPointer} e - event
     * @param {SVG} ctx - SVG context
     * @param {number} ratio
     * @param {number} index
     */
    resize(e, ctx, ratio, index) {
        if(this.outline.isMouseDown) {

            let oldX = this.x;
            let oldY = this.y;
            let oldW = this.w;
            let oldH = this.h;
            if(index === 0){
                [this.x, this.y] = this.#getCTMPosition(e, ctx, ratio)
                this.w += oldX - this.x;
                this.h += oldY - this.y;
            }
            if(index === 3) {
                [this.w, this.y] = this.#getCTMPosition(e, ctx, ratio)
                this.w -= this.x
                this.h += oldY - this.y;
            }
            if(index === 2){
                [this.w, this.h] = this.#getCTMPosition(e, ctx, ratio);
                this.w -= this.x
                this.h -= this.y
            }
            if(index === 1) {
                [this.x, this.h] = this.#getCTMPosition(e, ctx, ratio);
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
            this.#updateObject(ctx, ratio)
        }
    }
    /**
     * @param {EventPointer} e - event
     * @param {SVG} ctx - SVG context
     * @param {number} ratio
     */
    rotate(e, ctx, ratio){
        if(this.outline.isMouseDown) {

            const [mouseX, mouseY] = this.#getCTMPosition(e, ctx, ratio)

            const angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            this.rotation = angle * (180/Math.PI)
            this.outline.x = this.x
            this.outline.y = this.y;
            this.outline.h = this.h;
            this.outline.w = this.w;
            this.object.node.setAttribute('transform',
                `rotate(${this.rotation}, ${(this.x + (this.w / 2)) * ratio}, ${(this.y + (this.h / 2)) * ratio})`);
        }
    }
}
