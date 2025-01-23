<script>
    import {
        faCircle,
        faEye,
        faImage,
        faShapes,
        faSquare,
        faT,
        faFilePdf,
        faDownload,
        faBackward
    } from "@fortawesome/free-solid-svg-icons";
    import { icon } from "@fortawesome/fontawesome-svg-core";
    import  ellipse from '../assets/ellipse.svg?raw';
    import triangle from '../assets/triangle.svg?raw';
    import triangle2 from '../assets/triangle2.svg?raw';
    import heart from '../assets/heart.svg?raw';
    import arrow from '../assets/arrow.svg?raw';
    import hyperlink from '../assets/link.svg?raw';
    import {
        _activeSlide,
        _presentation,
        _selectedObject,
    } from "../store/data.js";
    import { PresText } from "../lib/models/Text.js";
    import {
    CustomPath,
        PresCircle,
        PresEllipse,
        PresRect,
        PresTriangle,
        PresTriangle2,
    } from "../lib/models/Shapes.js";
    import { PresImage } from "../lib/models/Image.js";
    import EditBar from "./EditBar.svelte";


    export let ctx, draw, clear, disableSelected, savePresentation;

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
        let s = new PresText(currentPos.get("x"), currentPos.get("y"), 0, 0,"Text")
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
const customShape = (path = undefined) => {
    if(path === undefined){
        path = prompt("Paste object's path (i.e. M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80)")
    }
    let s = new CustomPath(currentPos.get('x'), currentPos.get('y'), 100, 100, path)
    presentation.slides[activeSlide].objects.push(s);
    presentation.slides[activeSlide].objects[
        presentation.slides[activeSlide].objects.length - 1
    ].draw(ctx);
    _presentation.set(presentation);
    selectedObject = s;
    disableSelected()
    s.onClick(ctx)

    changePosition();
}
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
        } else if (shape === "triangle2") {
            s = new PresTriangle2(
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
    const goToViewer = async () => {
        await savePresentation();
        window.location.replace('/viewer');
    }
    const exportPDF = async () => {
        await savePresentation();
        const res = confirm("PDF doesn't support animations.")
        if(res)
            window.location.replace('/exportpdf')
    }
</script>

<div class="menubar">
    <div class="presbar">
        <span class="back">
            <button on:click={() => {window.location.replace('/')}}>{@html icon(faBackward).html}</button>
            <div class="presbar__title">Go back to Menu</div>
        </span>
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
                }}>{@html ellipse}</button
            >
            <button
                on:click={() => {
                    return addShape("triangle");
                }}>{@html triangle}</button
            >
            <button
                on:click={() => {
                    return addShape("triangle2");
                }}>{@html triangle2}</button
            >
            <button
                on:click={() => {
                    return customShape("M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z");
                }}>{@html arrow}</button
            >
            <button
            on:click={() => {
                return customShape("M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z");
            }}>{@html hyperlink}</button
        >
            <button
                on:click={() => {
                    return customShape("M471.383 44.578C444.879 15.832 408.512 0 368.973 0c-29.555 0-56.621 9.344-80.45 27.77C276.5 37.07 265.605 48.45 256 61.73c-9.602-13.277-20.5-24.66-32.527-33.96C199.648 9.344 172.582 0 143.027 0c-39.539 0-75.91 15.832-102.414 44.578C14.426 72.988 0 111.801 0 153.871c0 43.3 16.137 82.938 50.781 124.742 30.992 37.395 75.535 75.356 127.117 119.313 17.614 15.012 37.579 32.027 58.309 50.152A30.023 30.023 0 0 0 256 455.516a30.03 30.03 0 0 0 19.785-7.43c20.73-18.129 40.707-35.152 58.328-50.172 51.575-43.95 96.117-81.906 127.11-119.305C495.867 236.81 512 197.172 512 153.867c0-42.066-14.426-80.879-40.617-109.289zm0 0");
                }}>{@html heart}</button
            >
            <button
                on:click={() => {
                    return customShape()
                }}>
                Custom
            </button>
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
            <input 
                type="color" 
                value={presentation.slides[activeSlide].background}
                on:input={(e) => {clear(); presentation.slides[activeSlide].changeBackground(e.target.value); draw(ctx);}}
            >
            <div class="presbar__title">Background</div>
        </span>
        <!--span>
            <button>{@html icon(faFilm).html}</button>
            <div class="presbar__title">Transitions</div>
        </span-->
        <span class="presbar__spacer">
            <button title="Download file" on:click={downloadPresentation}
                >{@html icon(faDownload).html}</button
            >
            <div class="presbar__title">Download</div>
        </span>
        <span>
            <button on:click={goToViewer}>{@html icon(faEye).html}</button>
            <div class="presbar__title">Viewer</div>
        </span>
        <span>
            <button on:click={exportPDF}>{@html icon(faFilePdf).html}</button>
            <div class="presbar__title">Export PDF</div>
        </span>
    </div>
    <EditBar ctx={ctx} selectedObject={selectedObject} draw={draw}/>

    <a bind:this={link} style="display: none"></a>
</div>

<style>
    .menubar {
        position: relative;
    }
    .back {
        position: absolute;
        left: 0;
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
        left: calc(47.5% - 250px);
        top: calc(45px);
        width: 250px;
        border: 1px solid black;
        z-index: 1;
        overflow: clip;
    }
    .shapes button {
        margin-top:1em;
        margin-bottom:1em;
    }
    .shapes svg {
        font-size: 22pt;
    }

    /*@media (max-width: 1023px) {
       .presbar { display: block;}
       .presbar__spacer { margin-left:0em}
       .back { display: none;}
    }*/
</style>
