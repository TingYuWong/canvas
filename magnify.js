const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
resize()

const maxRadius = 10
const minRadius = 2
const field = 100
// const colorArr = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']
// const color = Math.floor(Math.random()*16777215).toString(16)

var mouse = { x: undefined, y: undefined }
function interact(e) {
    mouse.x = e.x
    mouse.y = e.y
    console.log(mouse)
}
window.addEventListener('mousemove', interact)
function resize() {
    init()
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)


function detectField(hoverX, x, hoverY, y, r) {
    if(r > maxRadius) return false
    if(hoverX - x < field && hoverY - y < field && hoverX - x > -field && hoverY - y > -field) {
        return true
    }
    return false
}



function Circle(x, y, r, dx, dy, color) {
    this.x = x
    this.y = y
    this.r = r
    this.dx = dx
    this.dy = dy
    this.color = color
    this.fill = this.x < 700

    this.draw = function draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.r, Math.PI * 2, false)
        c.strokeStyle = `${this.color}`
        c.fillStyle = `${this.color}`
        c.stroke()
        if(this.fill) c.fill()
    }

    this.update = function draw() {
        if(this.x + this.r > window.innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx
        }
        if(this.y + this.r > window.innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        if(detectField(mouse.x, this.x, mouse.y, this.y, this.r)) {
            this.r += 1
        } else {
            if(this.r > minRadius) this.r -= 1
        }

        this.draw()
    }
}

var circleArr = []
var circle
function init() {
    circleArr = []
    const colorArr = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']

    for(let i = 0; i < 500; i++) {
        const r = 2
        const x = Math.random() * (window.innerWidth - r * 2 ) + r
        const y = Math.random() * (window.innerHeight - r * 2 ) + r
        const dx = Math.random() * 5
        const dy = Math.random() * 3
        const color = colorArr[Math.floor(Math.random() * colorArr.length)]
        console.log(color)
        circleArr.push(new Circle(x, y, r, dx, dy, color))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for(let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
    }
}

init()
// animate()