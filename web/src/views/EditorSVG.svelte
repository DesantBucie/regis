<script>
    import {onMount} from "svelte";
    import {SVG} from '@svgdotjs/svg.js'
    import { _selectedObject } from "../store/data.js";

    import MenuBar from "../components/MenuBar.svelte";
    import SlideBar from "../components/SlideBar.svelte";

    import {Presentation} from "../lib/models/Presentation.js";
    import {_presentation, _activeSlide} from "../store/data.js";
    import { isCreateWritableSupported } from "../lib/runOnStart.js";


    let presentation, activeSlide, selectedObject, fail = false;

    let timing = {};

    _presentation.subscribe((p) =>{
        presentation = p
    })
    _activeSlide.subscribe((a) =>{
        activeSlide = a;
    })
    _selectedObject.subscribe(s => {
        selectedObject = s;
    })

    let container, ctx, editor;
    let w, h;

    const draw = () => {
        let o = presentation.slides[activeSlide].objects;
        ctx.css('background', presentation.slides[activeSlide].background)
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
            o[i].eventclean()
            o[i].object.remove();
        }
    }
    const savePresentation = async () => {

        const root = await navigator.storage.getDirectory();
        
        const fileHandle = await root.getFileHandle("regis.json", {create:true});
        const writable = await fileHandle.createWritable()
        const save = JSON.stringify(Object.create(presentation));

        await writable.write(save);
        await writable.close();   
        
    };

    const openPresentation = async () => {
        try {
            const root = await navigator.storage.getDirectory();
            const fileHandle = await root.getFileHandle('regis.json');
            const file = await fileHandle.getFile();
            const jsonString = await file.text();

            presentation = Presentation.fromJSON(JSON.parse(jsonString));
            _presentation.set(presentation);
        }
        catch(err) {
            if(err.name === "NotFoundError")
                console.log("No save");
        } 
        draw();
    }
    const disableSelected = () => {
        for(let i = 0; i < presentation.slides[activeSlide].objects.length; i++) {
            if(presentation.slides[activeSlide].objects[i].selected 
            && presentation.slides[activeSlide].objects[i] == selectedObject) {
                presentation.slides[activeSlide].objects[i].onClick(ctx);
            }
        }
    }
    onMount(async () => {
        
        setInterval(savePresentation, 10000);
    
        ctx = SVG()
            .addTo(container)
            //.size(w, w * 9 / 16)
            .viewbox(0, 0, 1920, 1080)
            .attr('tabindex', '0')
            .css('border', '1px solid black');

        ctx.on('mousedown', (e) => {
            timing.start = performance.now();
        })
        ctx.on('mouseup', () => {
            timing.stop = performance.now() - timing.start;

            if(timing.stop < 200){
                disableSelected();
            }
        })
        if(await isCreateWritableSupported())
            await openPresentation();
        else
            fail = true;
    })

</script>

{#if window.outerWidth > 1365 && !fail}
    <MenuBar ctx={ctx} clear={clear} draw={draw} disableSelected={disableSelected} savePresentation={savePresentation}/>

<div class="editor" bind:this={editor}>
    <SlideBar clear={clear} draw={draw}/>
    <div id="container" class="container" bind:this={container}>
    </div>
</div>
{/if}
{#if window.outerWidth <= 1365}
    <h2>The screen is too small to work properly. Open this website on laptop or tablet</h2>
{/if}
{#if fail}
    <div>
        <h2>This browser doesn't fully support OPFS. Use Firefox based or Chrome based browsers.</h2>
        <h2>Things like viewer, PDF export, autosave, won't work.</h2>
    </div>
{/if}
<style>
    .editor {
        display: flex;
    }
    .container{
        width: 85%;
        background: white;
        aspect-ratio: 16/9;
    }
</style>