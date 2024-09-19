<script>
    import {
        faArrowUp,
        faArrowDown,
        faXmark,
        faPlus
    } from "@fortawesome/free-solid-svg-icons";
    import { icon } from "@fortawesome/fontawesome-svg-core";

    import Sortable from 'sortablejs';
    import {onMount} from "svelte";
    import {Slide} from "../lib/models/Slide.js";

    import {_activeSlide, _presentation} from "../store/data.js";

    export let clear, draw;
    let presentation;
    let slideBar;
    let activeSlide;

    _presentation.subscribe((p) => {
        presentation = p;
    })

    _activeSlide.subscribe((a) => {
        activeSlide = a;
    })

    onMount(() => {
        /*let slideList = Sortable.create(slideBar, {
            animation: 150,
            ghostClass: 'blue-background-class',
            dataIdAttr: 'data-id',
            onUpdate: ((e) => {
                let sorted = slideList.toArray()
                console.log(sorted)
                presentation.slides.sort((a,b) =>  {
                    const result =  sorted.indexOf(a.internalName)
                    console.log(result)
                    return sorted.indexOf(a.internalName) - sorted.indexOf(b.internalName);
                })
                console.log(presentation)
                presentation.slides.forEach((e, index) =>{ e.internalName = "slide" + (index+1)})
                _presentation.set(presentation)
            })
        });*/

    });

    const addNewSlide = () => {
        presentation.no_Slides++
        presentation.slides.push(new Slide("slide"+presentation.no_Slides, "slide"+presentation.no_Slides))
        _presentation.set(presentation)
    }

    const changeActiveSlide = (e) => {
        clear()
        _activeSlide.set(parseInt(e.target.value))
        draw()

    }
    const removeSlide = (e) => {
        presentation.slides.splice(parseInt(e.currentTarget.value), 1);
        presentation.no_Slides--;
        _presentation.set(presentation);
    }

    const moveUp = () => {
        if (activeSlide > 0) {
            const temp = presentation.slides[activeSlide - 1];
            presentation.slides[activeSlide - 1] = presentation.slides[activeSlide];
            presentation.slides[activeSlide] = temp;
            activeSlide--;
            _presentation.set(presentation);
            _activeSlide.set(activeSlide);
        }
    }
    const moveDown = () => {
        if (activeSlide < presentation.slides.length - 1) {
            const temp = presentation.slides[activeSlide + 1];
            presentation.slides[activeSlide + 1] = presentation.slides[activeSlide];
            presentation.slides[activeSlide] = temp;
            activeSlide++;
            _presentation.set(presentation);
            _activeSlide.set(activeSlide);
        }
    } 
</script>
<div class="slidebar">
    <div bind:this={slideBar}>
        {#each presentation.slides as slide, i}
            <div class="slidebar__wrapper">
                
                {#if i !== activeSlide}
                    <button class="slidebar__remove-button" value={i} on:click={(e) => { return removeSlide(e)}}>{@html icon(faXmark).html}</button>
                    <button  class="slidebar__slide" value={i} on:click={changeActiveSlide}>
                        {slide.name}
                    </button>
                {:else}
                    <button class="slidebar__remove-button--corected" value={i} on:click={(e) => { return removeSlide(e)}}>{@html icon(faXmark).html}</button>
                    <button on:click={moveUp} class="slidebar__up">{@html icon(faArrowUp).html}</button>
                    <button on:click={moveDown} class="slidebar__down">{@html icon(faArrowDown).html}</button>
                    <button class="slidebar__slide slidebar__slide--active" value={i} >
                        {slide.name}
                    </button>
                {/if}
            </div>

        {/each}

    </div>
    <button class="slidebar__slide--addNew" on:click={addNewSlide}>
        {@html icon(faPlus).html}
    </button>
</div>

<style>
    .slidebar{
        
        background: #eee;
        padding:1em;
        border-radius: 10px;
        margin:1em;
        overflow-y: auto;
        min-width: 150px;
        max-height: 75vh;
        
    }
    .slidebar__wrapper {
        margin-top: -20px;
    }
    .slidebar__slide {
        display: flex;
        justify-content: center;
        align-items: center;
        width:150px;
        height:50px;
        border: 0px solid black;
        border-radius:10px;
        background: #747bff;
        color:black;
        margin-top:1em;
        font-weight: 400;
    }
    .slidebar__up {
        position: relative;
        padding:0;
        top:30px;
        left:0px;
        width:25px;
        height:25px;
        background:red;
        border-radius: 180px;
    }
    .slidebar__down {
        position: relative;
        padding:0;
        top:80px;
        left:-30px;
        width:25px;
        height:25px;
        background:red;
        border-radius: 180px; 
    }
    .slidebar__slide--active {
        background: rgb(193, 38, 193);
    }
    .slidebar__slide--addNew {
        background: #ccc;
        cursor: pointer;
        margin-top:1em;
    }
    .slidebar__remove-button {
        position: relative;
        padding:0;
        top:30px;
        left:70px;
        width:25px;
        height:25px;
        background:red;
        border-radius: 180px;
    }
    .slidebar__remove-button--corected {
        position: relative;
        padding:0;
        top:30px;
        left:100px;
        width:25px;
        height:25px;
        background:red;
        border-radius: 180px;
    }
</style>