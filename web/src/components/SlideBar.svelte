<script>
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
        let slideList = Sortable.create(slideBar, {
            animation: 150,
            ghostClass: 'blue-background-class',
            onUpdate: (() => {
                let sorted = slideList.toArray()
                console.log(sorted)
                presentation.slides.sort((a, b) => {
                    return sorted.indexOf(a.internalName) - sorted.indexOf(b.internalName)
                })
                presentation.slides.forEach((e, index) =>{ e.internalName = "slide" + (index+1)})
                _presentation.set(presentation)
            })
        });

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
        presentation.slides.splice(parseInt(e.target.value))
        presentation.no_Slides--;
        _presentation.set(presentation);
    }
</script>
<div class="slidebar">
    <div bind:this={slideBar}>
        {#each presentation.slides as slide, i}
            <div class="slidebar__wrapper">
                <button class="slidebar__remove-button" value={i} on:click={removeSlide}>x</button>
                {#if i !== activeSlide}
                    <button data-id={"slide" + (i)} class="slidebar__slide" value={i} on:click={changeActiveSlide}>
                        {slide.name}
                    </button>
                {:else}
                    <button data-id={"slide" + (i)} class="slidebar__slide slidebar__slide--active" value={i} >
                        {slide.name}
                    </button>
                {/if}
            </div>

        {/each}

    </div>
    <button class="slidebar__slide slidebar__slide--addNew" on:click={addNewSlide}>
        Add new
    </button>
</div>

<style>
    .slidebar{
        background: #eee;
        padding:1em;
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
        border: 2px solid black;
        border-radius:10px;
        background: #747bff;
        color:black;
        margin-top:1em;
    }
    .slidebar__slide--active {
        background: purple;
    }
    .slidebar__slide--addNew {
        background: #ccc;
        cursor: pointer;
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
</style>