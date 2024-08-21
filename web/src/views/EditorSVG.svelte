<script>
    import {onMount} from "svelte";
    import {SVG} from '@svgdotjs/svg.js'
    import {PresText} from "../lib/models/Text.js";
    import {PresCircle, PresRect, PresEllipse} from "../lib/models/Shapes.js";
    import {PresImage} from "../lib/models/Image.js";

    import MenuBar from "../components/MenuBar.svelte";
    import SlideBar from "../components/SlideBar.svelte";
    import ObjectBar from "../components/ObjectBar.svelte";

    import {_presentation, _activeSlide} from "../store/data.js";

    /**
     * @type {PresObj[]}
     */
    let objects = [
        new PresRect(100, 100, 100, 100),
        new PresText(300, 200, "Slide 1"),
        new PresCircle(500, 500, 50),
        new PresEllipse(700, 100, 100, 100),
        new PresImage(700, 700, 200, 200)
    ]

    let presentation, activeSlide;

    _presentation.subscribe((p) =>{
        presentation = p
    })
    _activeSlide.subscribe((a) =>{
        activeSlide = a;
    })

    let files, container, accepted, ctx;
    let w, h;

    $: activeSlide, draw();

    const draw = () => {
        let o = presentation.slides[activeSlide - 1].objects;
        console.log(o)
        for(let i = 0; i < o.length; i++){
            o[i].draw(ctx)
        }
    }

    const addTextBox = () => {
        presentation.slides[activeSlide - 1].objects
            .push(new PresText(900, 500, "Text"))
        //objects[objects.length - 1].draw(ctx)
    }
    onMount(() => {
        presentation.slides[0].objects = objects
        w = container.clientWidth
        ctx = SVG()
            .addTo(container)
            .size(w, w * 9 / 16)
            .viewbox(0, 0, 1920, 1080)
            .attr('tabindex', '0')
            .attr('class', 'svg')
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
        width: 100%;
    }
    .container{
        width: 100%;
        margin:1em;
        background: white;
        border: 1px solid black;
        overflow: hidden;
        aspect-ratio: 16/9;
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