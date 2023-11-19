<script>
    import {onMount, setContext} from "svelte";
    import p5 from 'p5/lib/p5';
    //setContext(p5, 'p5');
    import {sketch} from    "../lib/sketch.js";
    let files, container, accepted, editor;

    let objects = []

    const createObject = () => {}

    /*const draw = () => {
        let ctx = editor.getContext("2d");
        objects.push(new presText(960, 540, 0, 0, ctx, "Dupa"))

        ctx.clearRect(0,0, 1920, 1080);
        ctx.font = '60px Hevletica'
        //ctx.fillText("Dziekan skurwysyn", pos[0], pos[1]);

        for(let i = 0; i < objects.length; i++){
            objects[i].draw();
            objects[i].drawOutline();
        }

        window.requestAnimationFrame(draw);
    }*/
    onMount(() => {
        //setCanvasSize();
        //window.p5 = p5;
        //window.requestAnimationFrame(draw);
        new p5(sketch, container);
    })
</script>

<button class="editor__imgbutton" on:click={createObject}>Add TextBox</button>
<label class="editor__imgbutton">Image
    <input type="file" bind:files accept={accepted}>
</label>

<div class="container" bind:this={container}>

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