const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
// resize()

const maxRadius = 10
const minRadius = 2
const field = 100
var circleArr = []
// const colorArr = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']
// const color = Math.floor(Math.random()*16777215).toString(16)

var mouse = { x: undefined, y: undefined }
function interact(e) {
    mouse.x = e.x
    mouse.y = e.y
    // console.log(mouse)
}
window.addEventListener('mousemove', interact)
// window.addEventListener('resize', resize)

function resize() {
    init()
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}


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
    // this.fill = this.r <= 70
    this.fill = true
    this.friction = 0.95

    this.draw = function draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.r, Math.PI * 2, false)
        c.strokeStyle = `${this.color}`
        c.fillStyle = `${this.color}`
        c.stroke()
        if(this.fill) c.fill()
    }

    this.update = function update() {
        if(this.r <= 0) return
        console.log('update', this.r)
        if(this.y + this.r + this.dy > window.innerHeight) {
            if(Math.abs(this.dy * this.friction) < 5 && this.r >= 1) this.r -= 1
            this.dy = -this.dy * this.friction
        } else {
            this.dy += 1
        }
        if(this.x + this.r > window.innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx
        }
        this.y += this.dy
        this.x += this.dx

        this.draw()
    }
}

var circleArr = []
function init() {
    circleArr = []
    // const colorArr = ['#EAC435', '#345995', '#03CEA4', '#FB4D3D', '#CA1551']
    const colorArr = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']

    for(let i = 0; i < 100; i++) {
        const r = Math.floor(Math.random() * 30)
        const x = Math.random() * (window.innerWidth - r * 2 ) + r
        const y = Math.random() * (window.innerHeight - r * 2 ) + r
        const dx = Math.random() * 5
        const dy = Math.random() * 3
        const color = colorArr[Math.floor(Math.random() * colorArr.length)]
        circleArr.push(new Circle(x, y, r, dx, dy, color))
    }
}

function animate() {
    requestAnimationFrame(animate)
    if(!circleArr.length) return
    if(!circleArr.filter(item => item.r > 0).length) return
    console.log('request frame')
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for(let i = 0; i < circleArr.length; i++) {
        circleArr[i].update()
    }
}

init()
animate()