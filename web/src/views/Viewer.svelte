<script>
    import {onMount} from "svelte";
    import {SVG} from "@svgdotjs/svg.js";

    import {_presentation} from "../store/data.js";
    import {Presentation} from "../lib/models/Presentation.js";

    let w, h, ctx, viewer, presentation;

    let activeSlide = 0;

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
    /**
     *
     * @param arrow {string}
     */
    const changeActiveSlide = (arrow) => {
        clear()
        if (arrow === 'left' && activeSlide > 0) {
            activeSlide--;
        }
        if(arrow === 'right' && activeSlide < presentation.slides.length - 1) {
            activeSlide++;
        }
        console.log(activeSlide)
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

        /*ctx.on('keydown', (e) => {
            console.log('keydown');
            if (e.key === 'ArrowRight') {
                changeActiveSlide('right')
            }
            if(e.key === 'ArrowLeft') {
                changeActiveSlide('left')
            }
        })*/
        await openPresentation()
        addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                changeActiveSlide('right')
            }
            if(e.key === 'ArrowLeft') {
                changeActiveSlide('left')
            }
        })
        addEventListener('resize', () => {
            w = viewer.clientWidth;
            h = w * 9 / 16
            ctx.size(w, h)
        });
        draw();
    })

</script>

<div bind:this={viewer}>

</div>