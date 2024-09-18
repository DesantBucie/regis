<script>
    import {faFolderOpen, faFile, faCloud} from "@fortawesome/free-solid-svg-icons"
    import {icon} from "@fortawesome/fontawesome-svg-core"

    import { Presentation } from "../lib/models/Presentation";
    import {_presentation} from '../store/data';

    let accepted = '.lac'
    let files;


    const readFile = async (file) => {
        const text = await file.text();
        localStorage.setItem('filePresentation', text);
        window.location.replace("/editor")
    }
    const newPresentation = () => {
        localStorage.clear()
        window.location.replace('/editor')
    }
    const resume = () =>{
        window.location.replace('/editor')
    }
    $: if (files) {
        readFile(files[0])
    }
</script>

<div class="startScreen">
   <button on:click={newPresentation} class="startScreen_button">
        {@html icon(faFile).html} New Presentation
   </button>
   {#if localStorage.getItem('presentation')}
   <button on:click={resume} class="startScreen_button">
        {@html icon(faCloud).html} Resume last
   </button>
   {/if}
    <label class="startScreen_button startScreen_button--label">
        {@html icon(faFolderOpen).html} Open File
        <input type="file" bind:files accept={accepted}>
    </label>
</div>

<style lang="scss">
    .startScreen{
      display: flex;
      justify-content: center;
      align-items: center;
      height:70vh;
    }
    .startScreen_button {
        font-size:14pt;
        font-weight: 400;
        display: inline;
        padding:1.2em;
        margin:1em;
        border:1px solid #333;
        border-radius: 20px;
        background: #eee;
        transition: 500ms;
        cursor:pointer;
    }
    .startScreen_button--label {
        padding: 1.1em;
    }
    .startScreen_button:hover {
        /*color:rebeccapurple;*/
        /*scale:105%;*/
    }
    input[type="file"] {
        display: none;
    }
</style>