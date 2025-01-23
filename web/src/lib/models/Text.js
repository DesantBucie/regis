import {PresObj} from "./PresObject.js";
import {Text} from "@svgdotjs/svg.js";

import textWrap from 'svg-text-wrap'

export class PresText extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {number} w - width
     * @param {number} h - height
     * @param {String} text - text
     */
    constructor(x, y, w, h, text) {

        super(x, y, w, h);
        this.object = new Text()
            .text(text)
            .font({size:20, family: "Arial"})
    }

wrapText(){
    let text = this.object.text();
    const textArray = textWrap(text, this.w - 10, {'font-size': this.object.attr('font-size')});
    text = textArray.join('\n')

    this.object.text(text);
    const bbox = this.object.node.getBBox();
    this.h = bbox.height;
    this.outline.h = bbox.height;
    this.updateObject()
}
    /**
     *
     * @param {SVG} ctx - context of svg canvas
     */
    draw(ctx) {
        
        super.draw(ctx);
        const bbox = this.object.node.getBBox();
        if(this.w === 0){ 
            this.w = bbox.width;
            this.outline.w = bbox.width;
            this.h = bbox.height;
            this.outline.h = bbox.height;
        }
        this.setTextPosition(this.object.attr('text-anchor').toString());
        //i know it's stupid, but it fixes text not wrapping.
        //this.object.text(this.object.text())
    }

    drawNoEvent(ctx) {
        super.drawNoEvent(ctx)
        this.object.text(this.object.text())
        this.setTextPosition(this.object.attr('text-anchor').toString());
    }
onClick(ctx) {
    super.onClick(ctx);
    if(this.selected) {
        this.object.text(this.object.text() + '|')
        ctx.on('keydown', (e) => {
            this.onKeyDown(e)
        })
    }
    else {
        this.object.text(this.object.text().slice(0, -1))
        ctx.off('keydown', null)
    }
}
    changeTextSize(size) {
        this.object.font({size: size});
        const bbox = this.object.node.getBBox();
        this.h = bbox.height;
        this.outline.h = bbox.height;
        this.updateObject()
    }
    toggleFontWeight(){
        if(this.object.attr('font-weight') == 'bold'){
            this.object.font({weight: ''});
        }
        else {
            this.object.font({weight: 'bold'});
        }
    }
    toggleFontItalics(){
        if(this.object.attr('font-style') == 'italic'){
            this.object.font({style: ''});
        }
        else {
            this.object.font({style: 'italic'});
        }
    }
    toggleFontUnderline() {
        if(this.object.attr('text-decoration') == 'underline'){
            this.object.attr('text-decoration', '');
        }
        else {
            this.object.attr('text-decoration', 'underline');
        }
    }
    /**
     * Change text alignment
     * @param align {string}
     */
    changeTextAlign(align) {
        this.object.font({anchor: align});
        this.setTextPosition(align);
    }
    getTextPosition(align){
        if(align === 'start')
            return this.x
        if(align === 'middle')
            return this.x + (this.w / 2) - this.object.node.getBBox().width / 2;
        if(align === 'end'){
            return this.x + this.w - this.object.node.getBBox().width;
        }
    }
    /**
     * Set text middle or right
     * @param align {string}
     */
    setTextPosition(align) {
        if(align === 'start')
            this.object.x(this.x)
        if(align === 'middle')
            this.object.x(this.x + (this.w / 2) - this.object.node.getBBox().width / 2);
        if(align === 'end'){
            this.object.x(this.x + this.w - this.object.node.getBBox().width)
        }
    }
    /**
     * Change text font
     * @param font {string}
     */
    changeFont(font){
        this.object.font({family:font});
    }
    /**
     * @param {PointerEvent} e - event
     * @param {SVG} ctx - SVG context
     * @param {number} index
     */
    resize(e, ctx, index) {
        super.resize(e, ctx, index)
        this.wrapText()
        this.setTextPosition(this.object.attr('text-anchor').toString());
    }
    /**
    *
    * @param {PointerEvent} e
    * @param {SVG} ctx
    * @param {number} offsetX
    * @param {number} offsetY
    */
    onMousemove(e, ctx, offsetX, offsetY) {
        const align = this.object.attr('text-anchor').toString();
        if(align === 'middle')
            super.onMousemove(e, ctx, offsetX - (this.w / 2) + (this.object.node.getBBox().width / 2), offsetY);
        if(align === 'end')
            super.onMousemove(e, ctx, offsetX - this.w + this.object.node.getBBox().width, offsetY);
        if(align === 'start') 
            super.onMousemove(e, ctx, offsetX, offsetY);
        this.setTextPosition(this.object.attr('text-anchor').toString());
    }
onKeyDown(e){
    const ignoreKeys = [
        'Enter',
        'Return',
        'Alt',
        'Meta',
        'Control',
        'Ctrl',
        'Shift',
        'Escape',
        'Backspace',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
        'ArrowUp',
    ]
    if(e.keyCode === 8){
        this.object.text(this.object.text().slice(0, -2) + '|')
    }
    if(e.keyCode === 13){
        this.object.text(this.object.text().slice(0,-1) + '\n' + '|')
    }
    if(e.metaKey === true && e.key === 'v'){
        
    }
    if(!ignoreKeys.includes(e.key)) {
        e.preventDefault()
        this.object.text(this.object.text().slice(0, -1) + e.key + '|');
    }
    this.wrapText()
    this.setTextPosition(this.object.attr('text-anchor').toString())
}
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            object: this.constructor.name,
            text: this.object.text(),
            attributes: {
                anchor: this.object.attr('text-anchor'),
                fill: this.object.attr('fill'),
                strokeWidth: this.object.attr('stroke-width'),
                stroke: this.object.attr('stroke'),
                fontSize: this.object.attr('font-size'),
                fontFamily: this.object.attr('font-family'),
                fontWeight: this.object.attr('font-weight'),
                fontStyle: this.object.attr('font-style'),
                textDecoration: this.object.attr('text-decoration'),
            },
            animation: this.animation
        }
    }
    static fromJSON(json) {
        const text = new PresText(json.x, json.y, json.w, json.h, json.text)
        text.object
            .text(json.text)
            .stroke({
            color: json.attributes.stroke,
            width: json.attributes.strokeWidth
            })
            .fill(json.attributes.fill)
            .font({
                size:json.attributes.fontSize,
                anchor:json.attributes.anchor,
                family:json.attributes.fontFamily,
                weight:json.attributes.fontWeight,
                style: json.attributes.fontStyle
            })
            .opacity(json.attributes.opacity);
        text.animation = json.animation;
        text.object.attr('text-decoration', json.attributes.textDecoration)
        return text;
    }
}
