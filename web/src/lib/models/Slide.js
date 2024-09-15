import {PresText} from "./Text.js";
import {PresObj} from "./PresObject.js";
import {PresCircle, PresEllipse, PresRect, PresTriangle} from "./Shapes.js";
import {PresImage} from "./Image.js";

export class Slide {

    /**
     * @param internalName{string}
     * @param name {string}
     */
    constructor(internalName,  name = "Empty Slide") {
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

    static fromJSON(json) {
        const slide = Object.create(Slide.prototype);
        const LUT = new Map([
            ['PresRect', PresRect],
            ['PresCircle', PresCircle],
            ['PresEllipse', PresEllipse],
            ['PresTriangle', PresTriangle],
            ['PresText', PresText],
            ['PresImage', PresImage]
        ]);

        return Object.assign(slide, {
            internalName: json.internalName,
            name: json.name,
            background: json.background,
            objects: json.objects.map(o => {
                const ObjectClass = LUT.get(o.object); // Check if this returns the class

                // Debugging
                console.log(`Object type: ${o.object}`);
                console.log(`Matched Class:`, ObjectClass);

                if (ObjectClass && typeof ObjectClass.fromJSON === 'function') {
                    return ObjectClass.fromJSON(o);  // Call fromJSON
                } else {
                    throw new Error(`Unknown object type or missing fromJSON method for: ${o.object}`);
                }

            })
        })
    }
}