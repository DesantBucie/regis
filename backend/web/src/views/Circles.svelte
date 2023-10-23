<script>
    import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons"
    import {icon} from "@fortawesome/fontawesome-svg-core"
    import {onMount} from "svelte";

    let canvas, canvasContainer
    /* Sets Canvas size */
    const setCanvasSize = () => {
        canvas.width = canvasContainer.clientWidth
        canvas.height = (canvasContainer.clientWidth * 9) / 16
    }


    onMount(() => {
        const ctx = canvas.getContext("2d");
        setCanvasSize()
        function Circle(x, y, dx, dy, radius) {
            this.x = x
            this.y = y
            this.dx = dx
            this.dy = dy
            this.radius = radius
            this.colour = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1.0)`

            this.draw = () => {
                ctx.beginPath();
                ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, false)
                ctx.strokeStyle = this.colour
                ctx.stroke()
            }

            this.update = () => {
                if(this.x + this.radius > canvas.width
                    || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if(this.y + this.radius > canvas.height
                    || this.y - this.radius < 0){
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                this.draw();
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for(let i = 0; i < circleArray.length; i++){
                circleArray[i].update()
            }
        }
        let circleArray = [];
        for(let i = 0; i < 200; i++){
            let radius = Math.random() * 30
            let x = ((canvas.width - radius) * Math.random());
            let y = ((canvas.height - radius) * Math.random());
            x < radius ? x = radius : x = x;
            y < radius ? y = radius : y = y;
            let dx = (Math.random() - 0.5)
            let dy = (Math.random() - 0.5)

            circleArray.push(new Circle(x, y, dx, dy, radius))
        }
        animate();
    })
</script>

<div bind:this={canvasContainer}>
    <canvas class="viewer" bind:this={canvas}>

    </canvas>
</div>
<button class="viewer__button">{@html icon(faArrowLeft).html}</button>
<button class="viewer__button">{@html icon(faArrowRight).html}</button>


<style>
    .viewer {
        background: white;
    }
</style>
