<script>
    import {onMount} from "svelte";
    import {SVG} from "@svgdotjs/svg.js";

    import {_presentation} from "../store/data.js";
    import {Presentation} from "../lib/models/Presentation.js";

    import { jsPDF } from 'jspdf';
    import 'svg2pdf.js'
    import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

    let w, h, ctx, viewer, presentation;

    let activeSlide = 0;
    let currentObject = 0;

    _presentation.subscribe(p => {
        presentation = p;
    })

    const draw = () => {
        let o = presentation.slides[activeSlide].objects;
        for(let i = 0; i < o.length; i++){
            o[i].drawNoEvent(ctx)
        }
    }
    const clear = () => {
        let o = presentation.slides[activeSlide].objects;
        for(let i = 0; i < o.length; i++){
            if(o[i].selected){
                o[i].onClick(ctx);
            }
            //o[i].eventclean()
            o[i].object.remove();
        }
    }
    const changeActiveSlide = () => {
        clear()
        activeSlide++;
        draw()
    }
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
    }
    onMount(async () => {
        w = viewer.clientWidth
        ctx = SVG()
            .addTo(viewer)
            .size(w, w * 9 / 16)
            .viewbox(0, 0, 1920, 1080)
            .attr('tabindex', '0')
            .attr('class', 'svg');
        

        await openPresentation()
        addEventListener('resize', () => {
            w = viewer.clientWidth;
            h = w * 9 / 16
            ctx.size(w, h)
        });
        draw();
        exportPDF();
    })


    const exportPDF = async () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [ctx.node.clientWidth, ctx.node.clientHeight]
        });

        for(let i = 0; i < presentation.slides.length - 1; i++){
            await doc.svg(ctx.node)
            await doc.addPage()
            changeActiveSlide()
        }
        await doc.svg(ctx.node)
        await doc.save('myPdf.pdf')
        
        window.location.replace('/editor')
        
    }
</script>

<div class="viewer" bind:this={viewer}>

</div>

<style>
    .viewer {
        border: 1px solid black;
    }
</style>