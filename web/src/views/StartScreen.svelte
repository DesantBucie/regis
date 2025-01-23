<script>
    import {faFolderOpen, faFile, faCloud} from "@fortawesome/free-solid-svg-icons"
    import {icon} from "@fortawesome/fontawesome-svg-core"

    import {_presentation} from '../store/data';

    import regis from '../assets/Regis.png';
    import { onMount } from "svelte";

    let accepted = '.regis'
    let files;

    let fileNames = [];

    onMount(async () => {
        await listDirectoryContents();
    })

    const listDirectoryContents = async (directoryHandle, depth) => {
        depth = depth || 1;
        directoryHandle = directoryHandle || await navigator.storage.getDirectory();
        const entries = await directoryHandle.values();
       
        for await (const entry of entries) {
            // Add proper indentation based on the depth
            const indentation = '    '.repeat(depth);

            if (entry.kind === 'directory') {
            // If it's a directory, log its name 
            // and recursively list its contents
            console.log(`${indentation}${entry.name}/`);
            await listDirectoryContents(entry, depth + 1);
            } else {
            // If it's a file, log its name
            //console.log(`${indentation}${entry.name}`);
            fileNames.push(entry.name);
            }
        }
        fileNames = fileNames
    }
const readFile = async (file) => {
    
    if(confirm("This will override any existing work in your cache")){
        const text = await file.text();

        const root = await navigator.storage.getDirectory();
        
        const fileHandle = await root.getFileHandle("regis.json", {create:true});
        const writable = await fileHandle.createWritable();
        

        await writable.write(text);
        await writable.close();   
        console.log("Saved");
        
        window.location.replace("/editor")
    }
}
    const newPresentation = () => {
        window.location.replace('/editor')
    }
   
    $: if (files) {
        readFile(files[0])
    }
</script>

<div>
    <div class="header">
        <img src={regis} alt="logo"/>
    </div>
    <div class="startScreen">
        <button on:click={newPresentation} class="startScreen_button">
                {@html icon(faFile).html} New Presentation/Resume
        </button>
        <label class="startScreen_button startScreen_button--label">
            {@html icon(faFolderOpen).html} Open File
            <input type="file" bind:files accept={accepted}>
        </label>
    </div>
    <!--div class="wrapper">
        <span>Saved files</span>
        <div class="fileList">
            {#each fileNames as fileName}
            <div class="fileList__tile">
                <div>{fileName}</div>
                <button class="fileList__tile--delete">Delete</button>
            </div>
            {/each}
        </div>
    </div-->
</div>

<style lang="scss">
    .header {
        height: 100px;
        text-align: left;
    }
    .header img {
        height: 100%;
    }
    .startScreen{
      display: flex;
      justify-content: center;
      align-items: center;
      height:20vh;
    }
    .startScreen_button {
        font-size:14pt;
        font-weight: 400;
        display: inline;
        padding:1.2em;
        margin:1em;
        color: white;
        border-radius: 1em;
        background: #2c2c2c;
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
    .wrapper {
        margin:auto;
        width:50%;
        max-width: 600px;
        text-align: left;
    }
    .wrapper span {
        font-size: 14pt;
        padding-left:1em;
    }
    .fileList {
        background: #9c9c9c;
        padding:1em;
        border-radius: 1em;
        
    }
    .fileList__tile {
        background-color: #2c2c2c;
        display: flex;
        justify-content: space-between;
        padding:0.5em 1em;
        margin:0.5em;
        color:white;
        border-radius: 1em;
    }
    .fileList__tile--delete {
        background-color: red;
        
    }
    input[type="file"] {
        display: none;
    }
</style>