<script>
    import {faFolderOpen, faFile} from "@fortawesome/free-solid-svg-icons"
    import {icon} from "@fortawesome/fontawesome-svg-core"

    let accepted = ['.json']
    let files;

    $: if (files) {
        fetch('/presentation-file', {
            method: 'POST',
            body: files[0]
        }).then(resp => resp.json()
        ).then(success => console.log(success)
        ).catch(err => console.log(err)
        );
    }
</script>

<div class="startScreen">
    <div class="startScreen_button">
        {@html icon(faFile).html} New Presentation
    </div>
    <label class="startScreen_button">
        {@html icon(faFolderOpen).html} Open File
        <input type="file" bind:files accept={accepted}>
    </label>
</div>

<style lang="scss">
    .startScreen{
        display: flex;
    }
    .startScreen_button {
        font-size:14pt;
        display: inline;
        padding:1.3em;
        margin:1em;
        border:1px solid #333;
        border-radius: 20px;
        background: #222;
        transition: 500ms;
        cursor:pointer;
    }
    .startScreen_button:hover {
        color:rebeccapurple;
        scale:105%;
    }
    input[type="file"] {
        display: none;
    }
</style>