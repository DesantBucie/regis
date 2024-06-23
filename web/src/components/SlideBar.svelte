<script>
    import Sortable from 'sortablejs';
    import {onMount} from "svelte";
    import {Slide} from "../lib/models/Slide.js";

    import {_activeSlide, _presentation} from "../store/data.js";

    let presentation
    let slideBar
    let activeSlide

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
        _activeSlide.set(parseInt(e.target.value))
    }
</script>
<div class="slidebar">
    <div bind:this={slideBar}>
        {#each presentation.slides as slide, i}
            {#if i + 1 !== activeSlide}
                <button data-id={"slide" + (i + 1)} class="slidebar__slide" value={i + 1} on:click={changeActiveSlide}>
                    {#if slide.name === "" }
                        Slide {i + 1}
                    {:else}
                        {slide.name}
                    {/if}
                </button>
            {:else}
                <button data-id={"slide" + (i + 1)} class="slidebar__slide slidebar__slide--active" value={i + 1} on:click={changeActiveSlide}>
                    {#if slide.name === "" }
                        Slide {i + 1}
                    {:else}
                        {slide.name}
                    {/if}
                </button>
                {/if}
        {/each}

    </div>
    <button class="slidebar__slide slidebar__slide--addNew" on:click={addNewSlide}>
        Add new
    </button>
</div>

<style>
    .slidebar{
        background: #eee;
        border: 1px #666 solid;
        padding:1em;
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
</style>