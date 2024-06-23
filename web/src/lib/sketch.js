
export const sketch = (p) => {

    p.setup = () => {
        p.createCanvas(1920, 1080);
        let cStyle = document.getElementById("defaultCanvas0").style
        let w = document.getElementById("defaultCanvas0").parentElement.clientWidth
        cStyle.width = w + "px"
        cStyle.height = (w * 9 / 16) + "px"
        p.background(255)
    }
    p.draw = () => {
        p.textSize(24)
        p.strokeWeight(0);
        p.stroke(0,0,0)
        p.text("Siema Siema", 50, 50)
        let w = p.textWidth("dupa");
        //let obj = new presObj(200, 200, 200, 50);
        //obj.drawOutline(p)
    }
    p.windowResized = () => {
        let w = document.getElementById("defaultCanvas0").parentElement.clientWidth
        let cStyle = document.getElementById("defaultCanvas0").style
        cStyle.width = w + "px"
        cStyle.height = (w * 9 / 16) + "px"
    }
}