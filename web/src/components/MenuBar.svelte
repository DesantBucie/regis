<script>

    import {faT, faShapes, faImage, faCircle, faSquare, faFolderOpen} from '@fortawesome/free-solid-svg-icons';
    import {icon} from "@fortawesome/fontawesome-svg-core";
    export let objects;
    export let ctx;


    let shapes;
    let input;
    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse} from "../lib/models/Shapes.js";
    import {PresImage} from "../lib/models/Image.js";

    const toggleShapes = () => {
        if(shapes.style.display !== 'block') {
            shapes.style.display = 'block';
        }
        else {
            shapes.style.display = 'none';
        }
    }

    const addTextBox = () => {
        objects.push(new PresText(900, 500, "Text"))
        objects[objects.length - 1].draw(ctx)
    }

    const addImage =() => {
        const reader = new FileReader();
        if(input.files[0]){
            reader.readAsDataURL(input.files[0]);
        }
        reader.onloadend = () => {
            const img = new PresImage(100, 100, 200, 200, reader.result.toString());
            objects.push(img);
            objects[objects.length - 1].draw(ctx);
        }
    }
    const addShape = (shape) => {
        let s;
        if(shape === "circle") {
            s = new PresCircle(150, 150, 50);
        }
        else if(shape === "square"){
            s = new PresRect(150, 150, 100, 100);
        }
        objects.push(s);
        objects[objects.length - 1].draw(ctx);
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