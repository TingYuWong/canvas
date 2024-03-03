const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
resize()

const maxRadius = 25
const minRadius = 20
const field = 100
// const colorArr = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']
// const color = Math.floor(Math.random()*16777215).toString(16)

var mouse = { x: undefined, y: undefined }
function interact(e) {
    mouse.x = e.x
    mouse.y = e.y
}
window.addEventListener('mousemove', interact)
function resize() {
    init()
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
// window.addEventListener('resize', resize)


function detectField(hoverX, x, hoverY, y, r) {
    if(r > maxRadius) return false
    if(hoverX - x < field && hoverY - y < field && hoverX - x > -field && hoverY - y > -field) {
        return true
    }
    return false
}



function Circle(x, y, r, dx, dy, color, i) {
    this.x = x
    this.y = y
    this.r = r
    this.dx = dx
    this.dy = dy
    this.color = color
    this.index = i
    this.fill = true

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

        if(isOverlapped(this.x, this.y, this.r, this.index)) {
            this.dx = -this.dx
            this.dy = -this.dy

            console.log("overlapped!!")
        }

        this.draw()
    }
}

function getDistance(x1, x2, y1, y2) {
    const xDistance = x2 - x1
    const yDistance = y2 - y1
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function isOverlapped(x, y, r, i = -1) {
    for(let j  = 0; j < circleArr.length; j++) {
        if(i >= 0 && i == j) continue
        if(getDistance(x, circleArr[j].x, y, circleArr[j].y) - circleArr[j].r - r < 0) return true
    }
    return false
}

var circleArr = []
var circle
function init() {
    circleArr = []
    const colorArr = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']

    for(let i = 0; i < 300; i++) {
        const r = Math.floor(Math.random() * 10)
        let x = Math.random() * (window.innerWidth - r * 2 ) + r
        let y = Math.random() * (window.innerHeight - r * 2 ) + r
        const dx = Math.random() * 2
        const dy = Math.random() * 1.5
        
        const color = colorArr[Math.floor(Math.random() * colorArr.length)]

        if(i !== 0) {
            while(isOverlapped(x, y, r)) {
                console.log('regenerate')
                x = Math.random() * (window.innerWidth - r * 2 ) + r
                y = Math.random() * (window.innerHeight - r * 2 ) + r
            }
        }

        circleArr.push(new Circle(x, y, r, dx, dy, color, i))
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