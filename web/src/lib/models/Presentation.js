import {Slide} from "./Slide.js";

export class Presentation {
    toJSON(){
        return {
            title: this.title,
            author: this.author,
            no_Slides: this.no_Slides,
            aspect: this.aspect,
            slides: this.slides.map(o => o.toJSON()),
        }
    }

    constructor() {
        this.title = ''
        this.author = ''
        this.no_Slides = 1
        this.aspect = '16x9'
        this.slides = [ new Slide("slide1") ]
    }

    static fromJSON(json) {
        const presentation = Object.create(Presentation.prototype);

        return Object.assign(presentation, {
            title: json.title,
            author: json.author,
            no_Slides: json.no_Slides,
            aspect: json.aspect,
            slides: json.slides.map(o => Slide.fromJSON(o)),
        })
    }
}