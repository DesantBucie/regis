<script>
    import {onMount} from "svelte";

    import Sortable from 'sortablejs';

    let objectBar
    export let objects;
    onMount(() => {

        Sortable.create(objectBar, {
            animation: 150,
            ghostClass: 'blue-background-class'
        })
    })
</script>

<div id="objectbar" bind:this={objectBar}>
    {#each objects as object}
        <div class="object">{object.constructor.name}</div>
    {/each}
</div>

<style>
    .object{
        margin:0.3em;
        padding:.5em;
        border:1px solid black;
    }
    /*#objectbar {
        background: #333;
        list-style: none;
        color:black;
    }
    #objectbar li {
        border: 1px solid #aaa;
        padding:0.5em;
        width:100%;
    }*/
</style>