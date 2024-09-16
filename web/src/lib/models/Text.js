import {PresObj} from "./PresObject.js";
import {Text} from "@svgdotjs/svg.js";

export class PresText extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {String} text - text
     */
    constructor(x, y, text) {

        super(x, y, 100, 50);
        //this.guid = guidGenerator();
        //const string = `<body xmlns="http://www.w3.org/1999/xhtml" ><div contenteditable="true" style="color:black;">Text</div></body>`;

        //this.object = new ForeignObject()
        //    .move(this.x, this.y)
        //    .size(100 , 100)
        //    .add(SVG(string, true))
        //.add(`<div xmlns="http://www.w3.org/1999/xhtml" contenteditable="true" style="color:black;">Text</div>`)
        this.object = new Text()
            .text("Text")
            .font({size:20, anchor:'start'})
        this.lines = 1;
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     */
    draw(ctx) {
        super.draw(ctx);
        const bbox = this.object.node.getBBox();
        console.log(bbox)
        this.w = bbox.width;
        this.h = bbox.height;
        this.updateObject()


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
    }

    /**
     * Change text alignment
     * @param align {string}
     */
    changeTextAlign(align) {
        this.object.font({anchor: align});
    }

    /**
     * Change text font
     * @param font {string}
     */
    changeFont(font){
        this.object.font({family:font});
    }

    onKeyDown(e){
        let ignoreKeys = [
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
        if(!ignoreKeys.includes(e.key)) {
            e.preventDefault()
            console.log(e)
            this.object.text(this.object.text().slice(0, -1) + e.key + '|');
        }
        /*this.w = this.object.node.getBBox().width;
        this.h = this.object.node.getBBox().height;
        this.object
            .size(this.w, this.h)*/
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
                anchor: this.object.attr('anchor'),
                fill: this.object.attr('fill'),
                strokeWidth: this.object.attr('stroke-width'),
                stroke: this.object.attr('stroke'),
                fontSize: this.object.attr('font-size'),
                fontFamily: this.object.attr('font-family'),
            }
        }
    }
    static fromJSON(json) {
        //const text = Object.create(PresText.prototype);
        const text = new PresText(json.x, json.y, json.text)
        text.object
            .text(json.text)
            .stroke({
            color: json.attributes.stroke,
            width: json.attributes.strokeWidth
            })
            .fill(json.attributes.fill)
            .font({
                size:json.attributes.size,
                anchor:json.attributes.anchor,
                family:json.attributes.fontFamily,
            });
        return text;
    }
}
