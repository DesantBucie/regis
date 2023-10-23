<script>
    import {onMount} from "svelte";
    import {paper, Raster ,view} from 'paper'
    import {generateUid} from '../lib/browser-uid.js';

    let editor, container, files
    let acceptedImgs = ['.jpg', '.jpeg', '.png']
    const setCanvasSize = () => {
        editor.width = container.clientWidth
        editor.height = (container.clientWidth * 9) / 16
    }
    let uid = generateUid()
    console.log(uid)
    onMount(() => {
        fetch('/api/v1/user', {
            method: 'POST',
            body: JSON.stringify({
                Uid: uid
            }),
        }).then(res => res.json()
        ).then(suc => console.log(suc)
        ).catch(err => console.error(err))

        //let ctx = editor.getContext("2d");
        setCanvasSize()
        //addEventListener("resize", setCanvasSize);
        paper.setup(editor)
        let path = new paper.Path();
        // Give the stroke a color
        path.strokeColor = 'black';
        let start = new paper.Point(100, 100);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path.lineTo(start.add([ 200, -50 ]));
        // Draw the view now:
        paper.view.draw();
    })

    $: if(files){

        console.log("sraka");
        /*let raster = new Raster({
            source: '/Users/dsnt/Documents/f8.png',
            position: view.center
        });*/
        

    }
</script>

<label class="editor__imgbutton">Image
    <input type="file" bind:files accept={acceptedImgs}>
</label>

<div class="container" bind:this={container}>
    <canvas class="editor" bind:this={editor}>

    </canvas>
</div>

<style>
    .editor {
        border: 2px solid red;
    }
    .container{
        width:100%;
        margin:1em;
        background: white;
    }
    .editor__imgbutton {
        font-size:11pt;
        display: inline;
        padding:1em;
        margin:1em;
        border:1px solid #333;
        border-radius: 20px;
        background: #222;
        transition: 500ms;
        cursor:pointer;
    }
</style>