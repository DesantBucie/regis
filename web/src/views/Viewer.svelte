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
    onMount(() => {
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
        if(localStorage.getItem("presentation")){
            presentation = Presentation.fromJSON(JSON.parse(localStorage.getItem("presentation")));
            console.log(presentation);
            _presentation.set(presentation);
        }
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