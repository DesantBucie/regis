<script>
    import {onMount} from "svelte";
    import {SVG} from '@svgdotjs/svg.js'
    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse} from "../lib/models/Shapes.js";


    let files, container, accepted, ctx;
    let w, h, ratio;

    let objects = [
        new PresRect(100, 100, 100, 100),
        new PresText(300, 200, 0, 0, "Text"),
        new PresCircle(500, 500, 50),
        new PresEllipse(700, 100, 100, 100)
    ]

    const draw = () => {
        objects[0].changeFill("#ddaa78", ctx)
        for(let i = 0; i < objects.length; i++){
            objects[i].draw(ctx, ratio)
        }
    }

    onMount(() => {
        w = container.clientWidth
        ctx = SVG().addTo(container).size(w, w * 9 / 16)
        ratio = w / 1920;
        addEventListener('resize', () => {
            w = container.clientWidth;
            h = w * 9 / 16
            ratio = w / 1920;
            ctx.size(w, h)
            draw();
        });
        draw();
    })

</script>

<button class="editor__imgbutton">Add TextBox</button>
<label class="editor__imgbutton">Image
    <input type="file" bind:files accept={accepted}>
</label>

<div id="container" class="container" contenteditable="true" bind:this={container}>

</div>

<style>
    .container{
        width:100%;
        margin:1em;
        background: white;
    }
    .container svg {
        width: 100%;
    }
    .editor__imgbutton {
        font-size:11pt;
        display: inline;
        padding:1em;
        margin:1em;
        border:1px solid #333;
        border-radius: 20px;
        background: #222;
        transition: 500ms;
        cursor:pointer;
    }
</style>