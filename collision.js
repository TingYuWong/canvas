const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')

function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
window.addEventListener('resize', resize)

var mouse = { x: undefined, y: undefined }
function interact(e) {
    mouse.x = e.x
    mouse.y = e.y
    // console.log(mouse)
}
window.addEventListener('mousemove', interact)

function Circle(x, y, r, dx, dy, color) {
    this.x = x
    this.y = y
    this.r = r
    this.dx = dx
    this.dy = dy
    this.color = color

    this.draw = function draw() {
        c.beginPath()
        c.arc(this.x, this.y ,this.r, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    this.update = function update() {
        // do something

        this.draw()
    }
}

function getDistance(x1, x2, y1, y2) {
    const xDistance = x2 - x1
    const yDistance = y2 - y1
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

let circleOne, circleTwo
function init() {
    circleOne = new Circle(300, 300, 50, 0, 0, '#06d6a0')
    circleTwo = new Circle(undefined, undefined, 10, 0, 0, '#ffd166')
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // update
    circleOne.update()
    circleTwo.x = mouse.x
    circleTwo.y = mouse.y
    if(getDistance(circleTwo.x, circleOne.x, circleTwo.y, circleOne.y) <= circleOne.r + circleTwo.r) {
        circleOne.color = '#4895ef'
    } else {
        circleOne.color = '#06d6a0'
    }
    circleTwo.update()
}

resize()
init()
animate()