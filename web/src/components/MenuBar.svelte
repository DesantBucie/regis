<script>

    import {faT, faShapes, faImage, faCircle, faSquare, faFolderOpen} from '@fortawesome/free-solid-svg-icons';
    import {icon} from "@fortawesome/fontawesome-svg-core";
    export let objects;
    export let ctx;


    let shapes;
    let file;
    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse} from "../lib/models/Shapes.js";
    import {PresImage} from "../lib/models/Image.js";

    const addTextBox = () => {
        objects.push(new PresText(900, 500, "Text"))
        objects[objects.length - 1].draw(ctx)
    }

    const toggleShapes = () => {
        if(shapes.style.display !== 'block') {
            shapes.style.display = 'block';
        }
        else {
            shapes.style.display = 'none';
        }
    }
</script>

<div class="menubar">
    <button title="Textbox" on:click={addTextBox}>{@html icon(faT).html}</button>
    <button title="Shapes" on:click={toggleShapes}>{@html icon(faShapes).html}</button>
    <div bind:this={shapes} class="shapes">
        {@html icon(faCircle).html}
        {@html icon(faSquare).html}
    </div>
    <button><label class="startScreen_button">
        {@html icon(faFolderOpen).html}
        <input type="file" bind:this={file}>
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