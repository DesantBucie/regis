import {Slide} from "./Slide.js";

export class Presentation {
    constructor() {
        this.title = ''
        this.author = ''
        this.no_Slides = 1
        this.aspect = '16x9'
        this.slides = [ new Slide("slide1") ]
    }
}