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


    let presentation, activeSlide;

    let timing = {};

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
        let o = presentation.slides[activeSlide].objects;
        for(let i = 0; i < o.length; i++){
            o[i].draw(ctx)
        }
    }
    const clear = () => {
        let o = presentation.slides[activeSlide].objects;
        for(let i = 0; i < o.length; i++){
            if(o[i].selected){
                o[i].onClick(ctx);
            }
            o[i].object.remove();
        }
    }
    onMount(() => {
        w = container.clientWidth
        ctx = SVG()
            .addTo(container)
            .size(w, w * 9 / 16)
            .viewbox(0, 0, 1920, 1080)
            .attr('tabindex', '0')
            .attr('class', 'svg')
        ctx.on('mousedown', (e) => {
            timing.start = performance.now();
        })
        ctx.on('mouseup', () => {
            timing.stop = performance.now() - timing.start;

            /*if(timing.stop < 200){
                for(let i = 0; i < presentation.slides[activeSlide-1].objects.length; i++) {
                    if(presentation.slides[activeSlide-1].objects[i].selected) {
                        presentation.slides[activeSlide-1].objects[i].onClick();
                    }
                }
            }*/
        })
        addEventListener('resize', () => {
            w = container.clientWidth;
            h = w * 9 / 16
            ctx.size(w, h)
        });
        draw();
    })

</script>

{#if window.outerWidth > 1024}
    <MenuBar  ctx={ctx} clear={clear} draw={draw}/>

<div class="editor">
    <SlideBar clear={clear} draw={draw}/>
    <div id="container" class="container" bind:this={container}>
    </div>
    <!--ObjectBar objects={presentation.slides[activeSlide].objects} /-->
</div>
{:else}
    <div>
        <h1>Przepraszamy ale twój ekran jest zbyt wąski, aby aplikacja poprawnie działała</h1>
    </div>
{/if}
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