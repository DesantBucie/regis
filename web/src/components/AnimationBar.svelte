<script>
    export let selectedObject, animateToggle, animateToggleMenu;

    import {
        faArrowDown,
        faArrowUp,
        faAlignLeft,
        faAlignCenter,
        faAlignRight,
        faTrash,
        faSquare,
        faXmark
    } from "@fortawesome/free-solid-svg-icons";
    import { icon } from "@fortawesome/fontawesome-svg-core";

    const addAnimation = (animationName) => {
        
        selectedObject.animation = {};

        if(animationName === 'opacity')
            selectedObject.animation.opacity = 1;
        if(animationName === 'scale')
            selectedObject.animation.scale = 1;
        if(animationName === 'slideLeft')
            selectedObject.animation.slideLeft = 1;
        if(animationName === 'slideTop')
            selectedObject.animation.slideTop = 1;
        if(animationName === 'rotate')
            selectedObject.animation.rotate = 1;

        animateToggleMenu();
    }
</script>
<div class="animbar">
{#if animateToggle && selectedObject !== null}
        <span>
            <button 
            class={selectedObject.animation.rotate === 1 ? "selected" : ""}
            on:click={() => {addAnimation('rotate')}}>
                {@html icon(faSquare, {classes: 'fa-rotate'}).html}
            </button>
            <div>Rotate</div>
        </span>
        <span>
            <button 
            class={selectedObject.animation.slideTop === 1 ? "selected" : ""}
            on:click={() => {addAnimation('slideTop')}}>
                {@html icon(faSquare, {classes: 'fa-topsliding', }).html}
            </button>
            <div>Slide Top</div>
        </span>
        <span>
            <button
            class={selectedObject.animation.slideLeft === 1 ? "selected" : ""} 
            on:click={() => {addAnimation('slideLeft')}}>
                {@html icon(faSquare, {classes: 'fa-leftsliding'}).html}
            </button>
            <div>Slide Left</div>
        </span>
        <span>
            <button 
            class={selectedObject.animation.scale === 1 ? "selected" : ""}
            on:click={() => {addAnimation('scale')}}>
                {@html icon(faSquare, {classes: 'fa-beat' , styles: {'--fa-beat-scale': '0.75', '--fa-animation-duration': '2s'}, }).html}
            </button>
            <div>Scale</div>
        </span>
        <span>
            <button
            class={selectedObject.animation.opacity === 1 ? "selected" : ""}
            on:click={() => {addAnimation('opacity')}}>
                {@html icon(faSquare, {classes: 'fa-fade', styles:{'--fa-animation-duration': '2s'}}).html}
            </button>
            <div>Opacity</div>
        </span>
        <span>
            <button
            on:click={() => {selectedObject.animation = {}; animateToggleMenu()}}
            >
                {@html icon(faTrash).html}
            </button>
            <div>Remove animation</div>
        </span>
        <span>
            <button class="--red" on:click={animateToggleMenu}>{@html icon(faXmark).html}</button>
            <div>Exit</div>
        </span>
    {/if}
</div>

<style>
    .animbar {
        min-height: 5vh;
        display: flex;
        align-items: stretch;
        justify-content: center;
    }
    .animbar div {
        font-size: 8pt;
        padding: 0em .1em;
    }
</style>