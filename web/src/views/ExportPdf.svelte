<script>
    import {onMount} from "svelte";
    import {SVG} from "@svgdotjs/svg.js";

    import {_presentation} from "../store/data.js";
    import {Presentation} from "../lib/models/Presentation.js";

    import { jsPDF } from 'jspdf';
    import 'svg2pdf.js'
    import { arial } from './fonts/Arial.js';
    import { arialBold } from './fonts/Arial_Bold.js';
    import { arialItalic } from './fonts/Arial_Italic.js';
    import { arialBoldItalic } from './fonts/Arial_BoldItalic.js';

    let w, h, ctx, viewer, presentation;

    let activeSlide = 0;

    _presentation.subscribe(p => {
        presentation = p;
    })

    const draw = () => {
        let o = presentation.slides[activeSlide].objects;
        ctx.css('background', presentation.slides[activeSlide].background)
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
            .size(w, (w * 9 / 16))
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
    const fileName = prompt("Enter a file name for presentation");
    if(fileName != null){
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [ctx.node.clientWidth, ctx.node.clientHeight],
        });
        
        
        doc.addFileToVFS("Arial.ttf", arial);
        doc.addFont("Arial.ttf", "Arial", "normal");
        doc.setFont("Arial");

        doc.addFileToVFS("ArialBold.ttf", arialBold);
        doc.addFont("ArialBold.ttf", "Arial", "bold");
        doc.setFont("Arial")

        doc.addFileToVFS("ArialItalic.ttf", arialItalic);
        doc.addFont("ArialItalic.ttf", "Arial", "italic");
        doc.setFont("Arial")

        doc.addFileToVFS("ArialBoldItalic.ttf", arialBoldItalic);
        doc.addFont("ArialBoldItalic.ttf", "Arial", "bolditalic");
        doc.setFont("Arial")

        for(let i = 0; i < presentation.slides.length - 1; i++){
            await doc.svg(ctx.node)
            await doc.addPage()
            changeActiveSlide()
        }
        await doc.svg(ctx.node)
        await doc.save(fileName+'.pdf')
        
    }
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