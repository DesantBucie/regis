<script>
    import {onMount} from "svelte";
    import {SVG} from "@svgdotjs/svg.js";

    import {_presentation} from "../store/data.js";
    import {Presentation} from "../lib/models/Presentation.js";
    import { PresText } from "../lib/models/Text.js";

    let w, h, ctx, viewer, presentation;

    let activeSlide = 0;
    let i = 0;
    let counter = 0;

    _presentation.subscribe(p => {
        presentation = p;
    })

    const draw = (skip = null) => {
        let o = presentation.slides[activeSlide].objects;
        ctx.css('background', presentation.slides[activeSlide].background)
        for(let i = 0; i < o.length; i++){
            o[i].drawNoEvent(ctx)
            if(skip === null){
                if(o[i].animation.scale === 1){
                    o[i].object.scale(0.001, o[i].x, o[i].y);
                    counter++
                }
                if(o[i].animation.opacity === 1){
                    console.log("Opacity");
                    o[i].opacity = parseFloat(o[i].object.attr('opacity'));
                    o[i].object.opacity(0);
                    counter++
                }
                if(o[i].animation.slideLeft === 1){
                    o[i].object.x(-2000);
                    counter++
                }
                if(o[i].animation.slideTop === 1){
                    o[i].object.y(-1200);
                    counter++;
                }
                if(o[i].animation.rotate === 1){
                    //o[i].object.y(-1200);
                    counter++;
                }
            }
            
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
    const drawExitScreen = () => {
        clear()
        ctx.text("Press Space to exit!").font({size: 40}).move(50, 50);
    }
    const slideLeft = (o) => {
        if(o instanceof PresText){
            o.object.animate(1000).move(o.getTextPosition(o.object.attr('text-anchor')), o.y)
        }
        else {
            o.object.animate(1000).move(o.x, o.y);
        }
    }
    const slideTop = (o) => {
        if(o instanceof PresText){
            o.object.animate(1000).move(o.getTextPosition(o.object.attr('text-anchor')), o.y)
        }
        else {
            o.object.animate(1000).move(o.x, o.y);
        }
    }
    const opacityAnimation = (o) => {
        o.object.animate(1000).opacity(o.opacity);
    }
    const scaleAnimation = (o) => {
        o.object.animate(1000).scale(1000, o.x, o.y);
    }
    const rotateAnimation = (o) => {
        o.object.animate(1000).rotate(360, o.x + o.w / 2, o.y + o.h / 2);
    }
    /**
     *
     * @param arrow {string}
     */
    const changeActiveSlide = (arrow) => {
        
        if (arrow === 'left' && activeSlide > 0) {
            clear()
            activeSlide--;
            draw()
        }
        if(arrow === 'right') { 
            if (activeSlide < presentation.slides.length - 1 && counter === 0) 
            {
                clear()
                activeSlide++;
                i = 0;
                draw()
            }
            else if(activeSlide == presentation.slides.length - 1 && counter === 0){
                drawExitScreen()
            }
            else {
                let o = presentation.slides[activeSlide].objects;
                for(; i < o.length; i++){
                    console.log(Object.keys(o[i].animation));
                    console.log(i);
                    if(Object.keys(o[i].animation).length === 0){
                        console.log("doesnt work??")
                        continue;
                    }
                    else {
                        console.log("Tutaj");
                        if(o[i].animation.slideLeft === 1)
                            slideLeft(o[i]);
                        if(o[i].animation.slideTop === 1)
                            slideTop(o[i]);
                        if(o[i].animation.opacity === 1)
                            opacityAnimation(o[i]);
                        if(o[i].animation.scale === 1)
                            scaleAnimation(o[i]);
                        if(o[i].animation.rotate === 1)
                            rotateAnimation(o[i]);

                        counter--;
                        i++;
                        break;
                    }
                }
            }
        }

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
        alert("Press Space to exit, use Arrows to move");
        w = viewer.clientWidth - 1
        ctx = SVG()
            .addTo(viewer)
            .size(w, w * 9 / 16)
            .viewbox(0, 0, 1920, 1080)
            .attr('tabindex', '0')
            .attr('class', 'svg');
        

        await openPresentation()
        addEventListener('keydown', (e) => {
            console.log(e);
            if (e.key === 'ArrowRight') {
                changeActiveSlide('right')
            }
            if(e.key === 'ArrowLeft') {
                changeActiveSlide('left')
            }
            if(e.key === " ") {
                window.location.replace('/editor')
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

<div class="viewer" bind:this={viewer}>

</div>
<div class="viewerPanel">
    <button class="red" on:click={() => {window.location.replace('/editor')}}>Exit</button>
    <button class="dark" on:click={() => {changeActiveSlide('left')}} >Prev</button>
    <button class="dark" on:click={() => {changeActiveSlide('right')}} >Next</button>
</div>
<style>
    .viewer {
        border: 3px solid black;
        width:95%;
        margin:auto;
    }
    .viewerPanel {
        background-color: #9c9c9c;
        padding:1em;
        border-radius: 1em;
        margin:1em auto;
        width:95%;
    }
    .red {
        float:left;
        background-color: red;
    }
    .dark {
        background-color: #2c2c2c;
        color:white;
    }
</style>