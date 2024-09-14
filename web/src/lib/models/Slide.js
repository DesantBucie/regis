import {PresText} from "./Text.js";

export class Slide {

    /**
     * @param internalName{string}
     * @param name {string}
     */
    constructor(internalName,  name = "Empty Slide",) {
        /**
         * @type {PresObj[]}
         */
        this.objects = []
        this.internalName = internalName
        this.name = name
        this.background = "#ffffff";
    }

    /**
     * @param color{string}
     */
    changeBackground(color) {
        this.background = color;
    }

    toJSON() {
        return {
            internalName: this.internalName,
            name: this.name,
            background: this.background,
            objects: this.objects.map(o => o.toJSON()),
        }
    }
}