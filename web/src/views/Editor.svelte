<script>
    import {onMount} from "svelte";
    import Paper, {view, PointText, Color, Point} from 'paper'
    import {generateUid} from '../lib/browser-uid.js';

    let editor, container, files
    let accepted = '.jpg, .jpeg, .png'
    let objects = []
    const setCanvasSize = () => {
        editor.width = 1920
        editor.height = 1080
        editor.style.width = container.clientWidth + 'px'
        editor.style.height = (container.clientWidth * 9) / 16 + 'px'
    }
    const objectOnClick = (t) => {
        console.log(t)
        if(t.target.selected === true){

            t.target.selected = false;
        }
        else {
            t.target.selected = true;
        }
        view.update();
    }
    const objectOnMouseDown = (t) => {
        t.target.flag = true;
    }
    const objectOnMouseUp = (t) => {
        t.target.flag = false;
    }
    const objectOnMouseMove = (t) => {
        console.log(t);
        if(t.target.selected === true
            && t.target.flag === true) {
            t.target.position = [t.point.x, t.point.y]
            view.update()
        }
    }
    const createObject = () => {
        let t = new PointText({
            content: "My Text",
            position: view.center
        });
        t.onClick = objectOnClick
        t.onMouseDown = objectOnMouseDown
        t.onMouseUp = objectOnMouseUp
        t.onMouseMove = objectOnMouseMove
        objects.push(t);
        view.update()
    }
    let uid = generateUid()

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
        Paper.setup(editor)
        let path = new Paper.Path();
        // Give the stroke a color

        path.strokeColor = Color.random();
        let start = new Paper.Point(100, 100);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path.lineTo(start.add([ 200, -50 ]));
        //path.selected = true;
        // Draw the view now:
        //view.draw();

    })
</script>
<button class="editor__imgbutton" on:click={createObject}>Add TextBox</button>
<label class="editor__imgbutton">Image
    <input type="file" bind:files accept={accepted}>
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