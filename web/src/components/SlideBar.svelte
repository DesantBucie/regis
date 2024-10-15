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

    import  {titleTemplate, contentTemplate, sectionTemplate, imageTemplate} from '../lib/templates.js';
    import { PresCircle, PresEllipse, PresRect, PresTriangle } from "../lib/models/Shapes.js";
    import { PresText } from "../lib/models/Text.js";
    import { PresImage } from "../lib/models/Image.js";

    export let clear, draw;
    let presentation;
    let slideBar;
    let activeSlide, templatesVisible = false;

    _presentation.subscribe((p) => {
        presentation = p;
    })

    _activeSlide.subscribe((a) => {
        activeSlide = a;
    })

    onMount(() => {

    });

    const addNewSlide = () => {
        presentation.no_Slides++
        presentation.slides.push(new Slide("slide"+presentation.no_Slides, "Empty Slide"))
        _presentation.set(presentation)
    }

    /**
     * 
     * @param template
     */
    const addTemplatedSlide = (template) => {
        let slide, temp;
        //presentation.no_Slides++
        if(template === 'title'){
            slide = new Slide( "slide"+presentation.no_Slides, "Title Slide")
            temp = titleTemplate; 
        }
        if(template === 'content'){
            slide = new Slide( "slide"+presentation.no_Slides, "Content Slide")
            temp = contentTemplate;
        }
        if(template === 'section'){
            slide = new Slide( "slide"+presentation.no_Slides, "Section Slide")
            temp = sectionTemplate;
        }
        if(template === 'image'){
            slide = new Slide("slide"+presentation.no_Slides, "Image Slide")
            temp = imageTemplate;
        }


        for(let i = 0; i < temp.length; i++){
            if(temp[i].object == 'PresText'){
                const txt = new PresText(temp[i].x, temp[i].y, temp[i].w, temp[i].h, temp[i].text)
                txt.changeTextSize(temp[i].attributes.fontSize);
                txt.changeTextAlign(temp[i].attributes.anchor);
                txt.changeFill(temp[i].attributes.fill);
                slide.objects.push(txt);
            }
            else {
                const rect = new PresRect(temp[i].x, temp[i].y, temp[i].w, temp[i].h);
                slide.objects.push(rect);
            }
        }
        presentation.slides.push(slide);
        _presentation.set(presentation);
    }

    const changeActiveSlide = (e) => {
        clear()
        _activeSlide.set(parseInt(e.target.value))
        draw()

    }
    const removeSlide = (e) => {
        const a = confirm("Are you sure ?");
        if(a){
            presentation.slides.splice(parseInt(e.currentTarget.value), 1);
            presentation.no_Slides--;
            _presentation.set(presentation);
        }
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
    const toggleSlides = () => {
        templatesVisible = !templatesVisible;
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
    <button class="slidebar__slide--addNew" on:click={toggleSlides}>
        {#if !templatesVisible}
            {@html icon(faPlus).html}
        {:else}
            {@html icon(faXmark).html}
        {/if}
    </button>
    {#if templatesVisible}
        <div class="slidebar__template">
            <button on:click={addNewSlide}>Empty</button>
            <button on:click={() => {return addTemplatedSlide('title')}}>Title</button>
            <button on:click={() => {return addTemplatedSlide('content')}}>Content</button>
            <button on:click={() => {return addTemplatedSlide('section')}}>Section</button>
            <button on:click={() => {return addTemplatedSlide('image')}}>Image</button>
        </div>
    {/if}
</div>

<style>
    .slidebar{
        
        background: #d7d6d6;
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
        font-size:11pt;
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
    .slidebar__template {
        display:grid;
        grid-template-columns: 1fr;
        width: 145px;
        margin-top:10px;
        border: black 1px solid;
        border-radius: 10px;
        background-color: #aaa;
    }
    .slidebar__template button {
        background-color: #aaa;
    }
</style>