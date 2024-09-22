<script>
    import {
        faCircle,
        faEye,
        faImage,
        faShapes,
        faSquare,
        faT,
        faTriangleExclamation,
        faDownload,
    } from "@fortawesome/free-solid-svg-icons";
    import { icon } from "@fortawesome/fontawesome-svg-core";
    import {
        _activeSlide,
        _presentation,
        _selectedObject,
    } from "../store/data.js";
    import { PresText } from "../lib/models/Text.js";
    import {
        PresCircle,
        PresEllipse,
        PresRect,
        PresTriangle,
    } from "../lib/models/Shapes.js";
    import { PresImage } from "../lib/models/Image.js";
    import EditBar from "./EditBar.svelte";
    import { Presentation } from "../lib/models/Presentation.js";

    export let ctx, draw, clear, disableSelected;

    let presentation, activeSlide, selectedObject, link;
    _presentation.subscribe((p) => {
        presentation = p;
    });

    _activeSlide.subscribe((a) => {
        activeSlide = a;
    });
    _selectedObject.subscribe((o) => {
        selectedObject = o;
    });
    let shapes;
    let input;
    let currentPos = new Map();
    currentPos.set("x", 100);
    currentPos.set("y", 100);
    currentPos.set("signX", 1);
    currentPos.set("signY", 1);

    const changePosition = () => {
        // sign is 1 or -1.
        currentPos.set("x", currentPos.get("x") + 30 * currentPos.get("signX"));
        currentPos.set("y", currentPos.get("y") + 30 * currentPos.get("signY"));
        // setting the sign
        if (currentPos.get("x") > 1800) {
            currentPos.set("signX", -1);
        }
        if (currentPos.get("x") < 100) {
            currentPos.set("signX", 1);
        }
        if (currentPos.get("y") < 100) {
            currentPos.set("signY", 1);
        }
        if (currentPos.get("y") > 900) {
            currentPos.set("signY", -1);
        }
    };
    const toggleShapes = () => {
        if (shapes.style.display !== "block") {
            shapes.style.display = "block";
        } else {
            shapes.style.display = "none";
        }
    };

    const addTextBox = () => {
        let s = new PresText(currentPos.get("x"), currentPos.get("y"), "Text")
        presentation.slides[activeSlide].objects.push(
            s
        );
        presentation.slides[activeSlide].objects[
            presentation.slides[activeSlide].objects.length - 1
        ].draw(ctx);
        changePosition();
        selectedObject = s;
        disableSelected()
        s.onClick(ctx)
    };

    const addImage = () => {
        const reader = new FileReader();
        if (input.files[0]) {
            reader.readAsDataURL(input.files[0]);
        }
        reader.onloadend = () => {
            const img = new PresImage(
                currentPos.get("x"),
                currentPos.get("y"),
                200,
                200,
                reader.result.toString(),
            );
            presentation.slides[activeSlide].objects.push(img);
            presentation.slides[activeSlide].objects[
                presentation.slides[activeSlide].objects.length - 1
            ].draw(ctx);
            _presentation.set(presentation);
            changePosition();
            selectedObject = img;
            disableSelected()
            img.onClick(ctx)
        };
    };
    const addShape = (shape) => {
        let s;
        if (shape === "circle") {
            s = new PresCircle(currentPos.get("x"), currentPos.get("y"), 50);
        } else if (shape === "square") {
            s = new PresRect(
                currentPos.get("x"),
                currentPos.get("y"),
                100,
                100,
            );
        } else if (shape === "triangle") {
            s = new PresTriangle(
                currentPos.get("x"),
                currentPos.get("y"),
                100,
                100,
            );
        } else if (shape === "ellipse") {
            s = new PresEllipse(
                currentPos.get("x"),
                currentPos.get("y"),
                100,
                80,
            );
        }
        presentation.slides[activeSlide].objects.push(s);
        presentation.slides[activeSlide].objects[
            presentation.slides[activeSlide].objects.length - 1
        ].draw(ctx);
        _presentation.set(presentation);
        selectedObject = s;
        disableSelected()
        s.onClick(ctx)

        changePosition();
    };
    const downloadPresentation = () => {
        const fileName = prompt("Enter a file name");
        if (fileName !== null) {
            const blob = new Blob([JSON.stringify(presentation)], {
                type: "text/json",
            });
            link.download = fileName + ".regis";
            link.href = window.URL.createObjectURL(blob);
            link.dataset.downloadurl = [
                "text/json",
                link.download,
                link.href,
            ].join(":");

            const evt = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
            });

            link.dispatchEvent(evt);
            link.remove();
        }
    };

</script>

<div class="menubar">
    <div class="presbar">
        <!--span>Auto Saved</span-->
        <!--button on:click={savePresentation}>Save online</button-->
        <span>
            <button title="Textbox" on:click={addTextBox}
                >{@html icon(faT).html}</button
            >
            <div class="presbar__title">Textbox</div>
        </span>
        <span>
            <button title="Shapes" on:click={toggleShapes}
                >{@html icon(faShapes).html}</button
            >
            <div class="presbar__title">Shapes</div>
        </span>
        <div bind:this={shapes} class="shapes">
            <button
                on:click={() => {
                    return addShape("circle");
                }}>{@html icon(faCircle).html}</button
            >
            <button
                on:click={() => {
                    return addShape("square");
                }}>{@html icon(faSquare).html}</button
            >
            <button
                on:click={() => {
                    return addShape("ellipse");
                }}>Eli</button
            >
            <button
                on:click={() => {
                    return addShape("triangle");
                }}>{@html icon(faTriangleExclamation).html}</button
            >
        </div>
        <span>
            <button
                ><label class="startScreen_button">
                    {@html icon(faImage).html}
                    <input type="file" accept="image/*" on:change={addImage} bind:this={input} />
                </label></button
            >
            <div class="presbar__title">Image</div>
        </span>
        <span class="presbar__spacer">
            <button title="Download file" on:click={downloadPresentation}
                >{@html icon(faDownload).html}</button
            >
            <div class="presbar__title">Download</div>
        </span>
        <span>
            <a href="/viewer"><button>{@html icon(faEye).html}</button></a>
            <div class="presbar__title">Viewer</div>
        </span>
    </div>
    <EditBar ctx={ctx} selectedObject={selectedObject} draw={draw}/>

    <a bind:this={link} style="display: none"></a>
</div>

<style>
    .menubar {
        position: relative;
    }
    .presbar {
        display: flex;
        justify-content: center;
    }
    .presbar__title {
        font-size: 8pt;
    }
    .presbar span {
        padding: 0em .1em;
    }
    .presbar__spacer {
        margin-left:3em;
    }
    .shapes {
        color: black;
        display: none;
        position: absolute;
        background: white;
        left: calc(45% - 140px);
        top: calc(45px);
        width: 250px;
        padding: 1em;
        height: 40px;
        border: 1px solid black;
        z-index: 1;
        overflow: clip;
    }
    .shapes svg {
        font-size: 22pt;
    }
</style>
