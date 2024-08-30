<script>

    import {faT, faShapes, faImage, faCircle, faSquare, faFolderOpen} from '@fortawesome/free-solid-svg-icons';
    import {icon} from "@fortawesome/fontawesome-svg-core";
    import {_presentation, _activeSlide} from "../store/data.js";

    export let ctx, draw, clear;

    let presentation, activeSlide;
    _presentation.subscribe((p) => {
        presentation = p;
    })

    _activeSlide.subscribe((a) =>{
        activeSlide = a;
    })
    let shapes;
    let input;
    let currentPos = new Map();
    currentPos.set("x", 100);
    currentPos.set("y", 100);
    currentPos.set('signX', 1)
    currentPos.set("signY", 1)

    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse} from "../lib/models/Shapes.js";
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
        clear()
        draw()
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
        presentation.slides[activeSlide].objects.push(s);
        presentation.slides[activeSlide].objects[presentation.slides[activeSlide].objects.length-1].draw(ctx);
        changePosition()
    }

</script>

<div class="menubar">
    <button title="Textbox" on:click={addTextBox}>{@html icon(faT).html}</button>
    <button title="Shapes" on:click={toggleShapes}>{@html icon(faShapes).html}</button>
    <div bind:this={shapes} class="shapes">
        <button on:click={() => {return addShape("circle")}}>{@html icon(faCircle).html}</button>
        <button on:click={() => {return addShape("square")}}>{@html icon(faSquare).html}</button>
    </div>
    <button><label class="startScreen_button">
        {@html icon(faFolderOpen).html}
        <input type="file" on:change={addImage} bind:this={input}>
    </label></button>
</div>

<style>
    .menubar {
        position: relative;
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