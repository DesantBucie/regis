<script>
    import {onMount} from "svelte";
    import {SVG} from '@svgdotjs/svg.js'
    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse} from "../lib/models/Shapes.js";
    import {PresImage} from "../lib/models/Image.js";

    import MenuBar from "../components/MenuBar.svelte";
    import SlideBar from "../components/SlideBar.svelte";
    import ObjectBar from "../components/ObjectBar.svelte";

    import {_presentation} from "../store/data.js";

    let presentation;
    _presentation.subscribe((p) =>{
        presentation = p
    })


    let files, container, accepted, ctx;
    let w, h;


    /**
     * @type {PresObj[]}
     */
    let objects = [
        new PresRect(100, 100, 100, 100),
        new PresText(300, 200, "Text"),
        new PresCircle(500, 500, 50),
        new PresEllipse(700, 100, 100, 100),
        new PresImage(700, 700, 200, 200)
    ]

    const draw = () => {
        objects[0].changeFill("#ddaa78")
        for(let i = 0; i < objects.length; i++){
            objects[i].draw(ctx)
        }
    }

    const addTextBox = () => {
        objects.push(new PresText(900, 500, "Text"))
        objects[objects.length - 1].draw(ctx)
    }
    onMount(() => {
        w = container.clientWidth
        ctx = SVG()
            .addTo(container)
            .size(w, w * 9 / 16)
            .viewbox(0, 0, 1920, 1080)
            .attr('tabindex', '0')
            //.attr('xmlns', 'http://www.w3.org/1999/xhtml');
        addEventListener('resize', () => {
            w = container.clientWidth;
            h = w * 9 / 16
            ctx.size(w, h)
        });
        draw();
    })

</script>

<MenuBar objects={objects} ctx={ctx}/>
<div class="editor">
    <SlideBar/>
    <div id="container" class="container" bind:this={container}>
    </div>
    <ObjectBar objects={objects} />
</div>

<style>
    .editor {
        display: flex;
    }
    .container{
        width:100%;
        margin:1em;
        background: white;
    }
    .container {
        border: 1px solid black;
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