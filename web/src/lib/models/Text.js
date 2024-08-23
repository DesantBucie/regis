import {PresObj} from "./PresObject.js";
import {SVG, Text, Rect, ForeignObject} from "@svgdotjs/svg.js";
import {guidGenerator} from "../browser-uid.js";

export class PresText extends PresObj {
    /**
     *
     * @param {number} x - x position on canvas
     * @param {number} y - y position on canvas
     * @param {String} text - text
     */
    constructor(x, y, text) {

        super(x, y, 200, 150);

        this.guid = guidGenerator();
        const string = `<body xmlns="http://www.w3.org/1999/xhtml" ><div id="` + this.guid + `" contenteditable="true" style="color:black;">Text</div></body>`;

        this.object = new ForeignObject()
            .move(this.x, this.y)
            .size(100 , 100)
            .add(SVG(string, true))
        //.add(`<div xmlns="http://www.w3.org/1999/xhtml" contenteditable="true" style="color:black;">Text</div>`)
        this.lines = 1;
    }

    /**
     *
     * @param {SVG} ctx - context of svg canvas
     */
    draw(ctx) {
        //first draw the object...
        this.object
            //.css('user-select', 'none')
            .move(this.x, this.y)
            .size(this.w, this.h)
            .css('display', 'block')
            //.css('text-align', 'left')
            .font({family: 'Helvetica', size: 40})
            .attr('tabindex','0')
            .addTo(ctx)

        console.log(this.object.node.width)
        this.w = this.object.node.children[0].clientWidth;
        this.h = this.object.node.children[0].clientHeight;

        this.outline.w = this.w
        this.outline.h = this.h
        this.outline.updateRects(this.x, this.y)
        super.draw(ctx)
    }
    onClick(ctx) {
        super.onClick(ctx);
    }

    onKeyDown(e){

        if(e.keyCode === 8){
            this.object.text(this.object.text().slice(0, -1))
        }
        if(e.keyCode === 13){
            this.object.add.tspan()
        }
        if(e.keyCode !== 8 && e.keyCode !== 16  && e.keyCode !== 91 && e.keyCode !== 13 ) {
            console.log(e)
            this.object.text(this.object.text() + e.key);
        }
        this.w = this.object.node.getBBox().width;
        this.h = this.object.node.getBBox().height;
        this.object
            .size(this.w, this.h)
    }
}
