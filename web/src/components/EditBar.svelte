<script>
    import {
        faArrowDown,
        faArrowUp,
        faAlignLeft,
        faAlignCenter,
        faAlignRight,
        faTrash,
        faSquare,
        faCopy

    } from "@fortawesome/free-solid-svg-icons";
    import { icon } from "@fortawesome/fontawesome-svg-core";
    import { PresText } from "../lib/models/Text";
    import { _presentation, _activeSlide } from "../store/data";
    import { onMount } from "svelte";
    import { PresImage } from "../lib/models/Image";
    import AnimationBar from "./AnimationBar.svelte";

    export let selectedObject, ctx, draw;

    let presentation, activeSlide, editbar, currentHeight,
    measurementButton,
    animateToggle = false;

    _presentation.subscribe((p) => {
        presentation = p;
    });

    _activeSlide.subscribe((a) => {
        activeSlide = a;
    });
    onMount(() => {
        currentHeight = editbar.clientHeight;
    });
    const deleteObject = () => {
        for (
            let i = 0;
            i < presentation.slides[activeSlide].objects.length;
            i++
        ) {
            if (
                selectedObject.id ===
                presentation.slides[activeSlide].objects[i].id
            ) {
                selectedObject.onClick(ctx);
                presentation.slides[activeSlide].objects[i].object.remove();
                presentation.slides[activeSlide].objects.splice(i, 1);
                console.log(presentation.slides[activeSlide].objects);
            }
            _presentation.set(presentation);
        }
    };

    const moveFront = () => {
        const currentIndex =
            presentation.slides[activeSlide].objects.indexOf(selectedObject);

        if (
            currentIndex <
            presentation.slides[activeSlide].objects.length - 1
        ) {
            const temp =
                presentation.slides[activeSlide].objects[currentIndex + 1];
            presentation.slides[activeSlide].objects[currentIndex + 1] =
                presentation.slides[activeSlide].objects[currentIndex];
            presentation.slides[activeSlide].objects[currentIndex] = temp;
        }
        draw(ctx);
    };
    const moveBack = () => {
        const currentIndex =
            presentation.slides[activeSlide].objects.indexOf(selectedObject);

        if (currentIndex > 0) {
            const temp =
                presentation.slides[activeSlide].objects[currentIndex - 1];
            presentation.slides[activeSlide].objects[currentIndex - 1] =
                presentation.slides[activeSlide].objects[currentIndex];
            presentation.slides[activeSlide].objects[currentIndex] = temp;
        }
        draw(ctx);
    };

    const duplicateObject = () => {
        
        const cI =
            presentation.slides[activeSlide].objects.indexOf(selectedObject);

        const dup = Object.assign(Object.create(Object.getPrototypeOf(selectedObject)), selectedObject)
        dup.x += 50;
        dup.y += 50;
        dup.updateObject();

        presentation.slides[activeSlide].objects.splice(cI, 0, dup);
        _presentation.set(presentation);
        presentation.slides[activeSlide].objects[cI].draw(ctx)
        
    }

    const fonts = [
        "Arial",
        "Arial Black",
        "Comic Sans MS",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida",
        "Microsoft Sans Serif",
        "Palatino Linotype",
        "Tahoma",
        "Times New Roman",
        "Trebuchet MS",
        "Verdana",
    ];
    const strokelevels = ["0", "5", "10", "15", "20"];

    const animateToggleMenu = () => {
        animateToggle = !animateToggle;
    }
</script>

<div class="editbar" bind:this={editbar}>
    {#if selectedObject !== null 
    && animateToggle === false}
        {#if selectedObject instanceof PresText}
            <div>
                <input
                    type="number"
                    on:change={(e) => {
                        return selectedObject.changeTextSize(e.target.value);
                    }}
                    value={selectedObject.object.attr("font-size")}
                />
                <div>Font size</div>
            </div>
            <div>
                    <select
                        on:input={(e) => {
                            return selectedObject.changeFont(e.target.value);
                        }}
                    >
                        {#each fonts as font}
                            {#if selectedObject.object.attr("font-family") === font}
                                <option value={font} selected>{font}</option>
                            {:else}
                                <option value={font}>{font}</option>
                            {/if}
                        {/each}
                    </select>
                
                <div>Font Family</div>
            </div>
            <span>
                <button
                    class="text-align"
                    on:click={(e) => {
                        return selectedObject.changeTextAlign("start");
                    }}>{@html icon(faAlignLeft).html}</button
                >
                <div>Left</div>
            </span>
            <span>
                <button
                    class="text-align"
                    on:click={(e) => {
                        return selectedObject.changeTextAlign("middle");
                    }}>{@html icon(faAlignCenter).html}</button
                >
                <div>Center</div>
            </span>
            <span>
                <button
                    class="text-align"
                    on:click={(e) => {
                        return selectedObject.changeTextAlign("end");
                    }}>{@html icon(faAlignRight).html}</button
                >
                <div>Right</div>
            </span> 
            <span>
                <button on:click={() => {return selectedObject.toggleFontWeight()}}>B</button>
                <div>Bold</div>
            </span>
            <span>
                <button on:click={() => {return selectedObject.toggleFontItalics()}}>I</button>
                <div>Italics</div>
            </span>
            <span>
                <button on:click={() => {return selectedObject.toggleFontUnderline()}}>U</button>
                <div>Underline</div>
            </span>
        {/if}
        {#if !(selectedObject instanceof PresImage)}
        <span>
            <input
                type="color"
                on:input={(e) => {
                    return selectedObject.changeFill(e.target.value);
                }}
                value={selectedObject.object.fill()}
            />
            <div>Fill</div>
        </span>

        <span>
            <input type="number" min="0" max="1" step="0.01"
                value={selectedObject.object.attr('opacity')}
                on:input={(e) => {
                    return selectedObject.changeOpacity(e.target.value)
                }}>
            <div>Opacity</div>
        </span>
        <div>
            <select
                on:input={(e) => {
                    return selectedObject.changeStrokeWidth(e.target.value);
                }}
            >
                {#each strokelevels as level, i}
                    {#if selectedObject.object.attr("stroke-width") === parseInt(level)}
                        <option value={level} selected>Level {i}</option>
                    {:else}
                        <option value={level}>Level {i}</option>
                    {/if}
                {/each}
            </select>
            <div>Stroke level</div>
        </div>
        <div>
            <input
                type="color"
                on:input={(e) => {
                    return selectedObject.changeStrokeColor(e.target.value);
                }}
                value={selectedObject.object.attr("stroke")}
            />
            <div>Stroke color</div>
        </div>
        {/if}
        <span>
            <button bind:this={measurementButton} on:click={moveFront}>{@html icon(faArrowUp).html}</button>
            <div>Move Front</div>
        </span>
        <span>
            <button on:click={moveBack}>{@html icon(faArrowDown).html}</button>
            <div>Move back</div>
        </span>
        <span>
            <button on:click={animateToggleMenu}>{@html icon(faSquare, {classes: 'fa-fade', styles:{'--fa-animation-duration': '2s'}}).html}</button>
            <div>Animate</div>
        </span>
        <span>
            <button on:click={deleteObject}>{@html icon(faTrash).html}</button>
            <div>Delete</div>
        </span>
    {/if}
    <AnimationBar selectedObject={selectedObject} animateToggle={animateToggle} animateToggleMenu={animateToggleMenu}/>
</div>

<style>
    .editbar {
        min-height: 5vh;
        display: flex;
        align-items: stretch;
        justify-content: center;
    }
    .editbar div {
        font-size: 8pt;
        padding: 0em .1em;
    }
    .selected {
        background-color: #C7C7CA;
        border: 1px solid #646cff;
    }
</style>
