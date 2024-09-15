<script>

    import {faT, faShapes, faImage, faCircle, faSquare, faFolderOpen, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
    import {icon} from "@fortawesome/fontawesome-svg-core";
    import {_presentation, _activeSlide, _selectedObject} from "../store/data.js";


    export let ctx, draw, clear;

    let presentation, activeSlide, selectedObject;
    _presentation.subscribe((p) => {
        presentation = p;
    })

    _activeSlide.subscribe((a) =>{
        activeSlide = a;
    })
    _selectedObject.subscribe((o) =>{
        selectedObject = o;
    })
    let shapes;
    let input;
    let currentPos = new Map();
    currentPos.set("x", 100);
    currentPos.set("y", 100);
    currentPos.set('signX', 1)
    currentPos.set("signY", 1)

    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse, PresTriangle} from "../lib/models/Shapes.js";
    import {PresImage} from "../lib/models/Image.js";

    const changePosition = () => {
        // sign is 1 or -1.
        currentPos.set("x", (currentPos.get("x") + 30 * currentPos.get("signX")));
        currentPos.set("y", (currentPos.get("y") + 30 * currentPos.get("signY")));
        // setting the sign
        if(currentPos.get("x") > 1800) { currentPos.set("signX", -1); }
        if(currentPos.get("x") < 100) { currentPos.set("signX", 1); }
        if(currentPos.get("y") < 100) { currentPos.set("signY", 1); }
        if(currentPos.get("y") > 900) { currentPos.set("signY", -1); }
    }
    const toggleShapes = () => {
        if(shapes.style.display !== 'block') {
            shapes.style.display = 'block';
        }
        else {
            shapes.style.display = 'none';
        }
    }

    const addTextBox = () => {
        presentation.slides[activeSlide].objects.push(new PresText(currentPos.get('x'), currentPos.get('y'), "Text"));
        presentation.slides[activeSlide].objects[presentation.slides[activeSlide].objects.length-1].draw(ctx);
        changePosition()
    }

    const addImage =() => {
        const reader = new FileReader();
        if(input.files[0]){
            reader.readAsDataURL(input.files[0]);
        }
        reader.onloadend = () => {
            const img = new PresImage(currentPos.get('x'), currentPos.get('y'), 200, 200, reader.result.toString());
            presentation.slides[activeSlide].objects.push(img);
            presentation.slides[activeSlide].objects[presentation.slides[activeSlide].objects.length-1].draw(ctx);
            _presentation.set(presentation);
            changePosition()
        }
    }
    const addShape = (shape) => {
        let s;
        if(shape === "circle") {
            s = new PresCircle(currentPos.get('x'), currentPos.get('y'), 50);
        }
        else if(shape === "square"){
            s = new PresRect(currentPos.get('x'), currentPos.get('y'), 100, 100);
        }
        else if(shape === 'triangle'){
            s = new PresTriangle(currentPos.get('x'), currentPos.get('y'), 100, 100);
        }
        else if(shape === 'ellipse'){
            s= new PresEllipse(currentPos.get('x'), currentPos.get('y'), 100, 80);
        }
        presentation.slides[activeSlide].objects.push(s);
        presentation.slides[activeSlide].objects[presentation.slides[activeSlide].objects.length-1].draw(ctx);
        _presentation.set(presentation);
        changePosition()
    }

    const savePresentation = () => {
        const saved =  JSON.stringify(Object.create(presentation));
        console.log(saved);
        localStorage.setItem("presentation", saved);
    }
    const deleteObject = () => {
        for(let i = 0; i < presentation.slides[activeSlide].objects.length; i++) {
            if(selectedObject.id === presentation.slides[activeSlide].objects[i].id){
                selectedObject.onClick(ctx)
                presentation.slides[activeSlide].objects[i].object.remove();
                presentation.slides[activeSlide].objects.splice(i, 1);
                console.log(presentation.slides[activeSlide].objects)
            }
        }
    }
    const fonts = [
        'Arial',
        'Arial Black',
        'Comic Sans MS',
        'Courier New',
        'Georgia',
        'Impact',
        'Lucida',
        'Microsoft Sans Serif',
        'Palatino Linotype',
        'Tahoma',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana',
    ]
</script>

<div class="menubar">
    <button on:click={savePresentation}>Save Presentation</button>
    <button title="Textbox" on:click={addTextBox}>{@html icon(faT).html}</button>
    <button title="Shapes" on:click={toggleShapes}>{@html icon(faShapes).html}</button>
    <div bind:this={shapes} class="shapes">
        <button on:click={() => {return addShape("circle")}}>{@html icon(faCircle).html}</button>
        <button on:click={() => {return addShape("square")}}>{@html icon(faSquare).html}</button>
        <button on:click={() => {return addShape("ellipse")}}>Eli</button>
        <button on:click={() => {return addShape("triangle")}}>{@html icon(faTriangleExclamation).html}</button>
    </div>
    <button><label class="startScreen_button">
        {@html icon(faImage).html}
        <input type="file" on:change={addImage} bind:this={input}>
    </label></button>


        <div class="editbar">
            {#if selectedObject !== null}
            {#if selectedObject instanceof PresText}
                <div><input type="number" on:change={(e) => {return selectedObject.changeTextSize(e.target.value)}}
                            value={selectedObject.object.attr("font-size")}><br/>Font Size</div>
                <div>
                    <select on:input={(e) => {return selectedObject.changeFont(e.target.value)}}>
                        {#each fonts as font}
                            <option value={font}>{font}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <button class="text-align" on:click={(e) => {return selectedObject.changeTextAlign("start")}}>Left</button>
                    <button class="text-align" on:click={(e) => {return selectedObject.changeTextAlign("middle")}}>Center</button>
                    <button class="text-align" on:click={(e) => {return selectedObject.changeTextAlign("end")}}>Right</button>
                </div>

            {/if}
        <div><input type="color"
                    on:input={(e) => { return selectedObject.changeFill(e.target.value)}}
                    value={selectedObject.object.fill()}><br/>Fill
        </div>
            <div><select on:input={(e) => {return selectedObject.changeStrokeWidth(e.target.value)}}>
                <option value="0">None</option>
                <option value="4">Level 1</option>
                <option value="10">Level 2</option>
                <option value="15">Level 3</option>
                <option value="20">Level 4</option>
            </select>
        <br/>Stroke Size</div>
        <div><input type="color" on:input={(e) => {return selectedObject.changeStrokeColor(e.target.value)}}
        value={selectedObject.object.attr('stroke')}><br/>Stroke Color</div>
        <button on:click={deleteObject}>Delete</button>
            {/if}
        </div>
</div>

<style>
    .menubar {
        position: relative;
    }
    .editbar {
        min-height:6vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .shapes {
        color:black;
        display: none;
        position: absolute;
        background: white;
        left:calc(50% - 155px);
        width: 300px;
        height: 300px;
        border: 1px solid black;
        z-index: 1;
        overflow: clip;
    }
    .shapes svg {
        font-size:22pt;
    }
</style>