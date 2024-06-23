<script>
    import {faFolderOpen, faFile} from "@fortawesome/free-solid-svg-icons"
    import {icon} from "@fortawesome/fontawesome-svg-core"

    let accepted = '.json'
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
    <a href="/editor"><div class="startScreen_button">
        {@html icon(faFile).html} New Presentation
    </div></a>
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