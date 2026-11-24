
// input = 77FFFF
// where first 2 digits (8bits) are angle mapped 0 to 360, amd the last 4 bits (16bits) are distance from center, 512 pixels.
//Scratch that, we get distances from each of the vertexs, from current point.
// output requires,
// musics intstruments some 16 bits, so 1 hex char
// pitch - 200Hz to 900Hz so 10 bits or 3 hex chars
// volume - 10 db to 500db so 9 bits or 3 hex chars
// timbre mode - 10 so 4 bits or 1 hex char
// reverb - 0 to 1 so 4 bits or 1 hex char
// and some layering information
// like cominbination of max 4 instruments,  so N C R where N = 16 and R = 4 aka some 11 bits or 3 hex chars
// and the layer of timbre effects same as instruments, so 3 hex chars
// Import tone.js and processing.js
//
//


var inStar = true
const P = (x, y) => ({ x, y })
const body = document.body
const trail = document.getElementById("trail")
const star = document.getElementById("star")
const starRect = document.getElementById("starsvg").getBoundingClientRect()
const back = document.getElementById("back")
var mouse = P(window.innerWidth / 2, window.innerHeight / 2)
var trailer = P(window.outerWidth / 2, window.outerHeight / 2)
var relative = P(mouse.x - starRect.left, mouse.y - starRect.top)


function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

// these are coords with respect to the bounding box client.
// therefore, dist =  dist(relative.xY, fivePointCoords)
points = [
    [306, 0],
    [606, 226],
    [495, 595],
    [120, 595],
    [6, 226],
] // array of 5  points

locator = {
    anger: distance(points[0][0], points[0][1], relative.x, relative.y),
    joy: distance(points[1][0], points[1][1], relative.x, relative.y),
    disgust: distance(points[2][0], points[2][1], relative.x, relative.y),
    sorrow: distance(points[3][0], points[3][1], relative.x, relative.y),
    fear: distance(points[4][0], points[4][1], relative.x, relative.y),
}

function hashterize(locator) {
    return {} // the hex FE7750436C7A
}

function play(hex) {
    // with tone.js
}

play(hashterize(locator))

function normalize(distance) {

    return distance / (locator.anger+locator.joy+locator.disgust+locator.sorrow+locator.fear)
	
}
body.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX
    mouse.y = e.clientY
    relative.x = mouse.x - starRect.left
    relative.y = mouse.y - starRect.top
    if (inStar) {
	// console.log(relative.x, relative.y)
locator = {
    anger: distance(points[0][0], points[0][1], relative.x, relative.y),
    joy: distance(points[1][0], points[1][1], relative.x, relative.y),
    disgust: distance(points[2][0], points[2][1], relative.x, relative.y),
    sorrow: distance(points[3][0], points[3][1], relative.x, relative.y),
    fear: distance(points[4][0], points[4][1], relative.x, relative.y),
}
nlocator = {
    anger: normalize(locator.anger),
    joy: normalize(locator.joy),
    disgust: normalize(locator.disgust),
    sorrow: normalize(locator.sorrow),
    fear: normalize(locator.fear),
}
	    console.log(nlocator.anger+nlocator.joy+nlocator.disgust+nlocator.sorrow+nlocator.fear)

    }
})

function animateTrail() {
    trailer.x += (mouse.x - trailer.x) * 0.1 // Adjust the 0.1 for more or less stagger
    trailer.y += (mouse.y - trailer.y) * 0.1

    trail.style.left = trailer.x - 75 / 2 + "px"
    trail.style.top = trailer.y - 75 / 2 + "px"
    // THIS CODE HAS BEEN COMMENTED OUT FOR SLOWING DOWN PERFORMANCE. I can be uncommented for lagged trails and more aesthetics.
    // if(inStar){
    //     blur.style.opacity = 0.6;
    // }else{
    //     blur.style.opacity = 0;
    // }

    // if (mouse.x!==trailer.x&&mouse.y!==trailer.y) { // do not use this code. it dose not work.
    requestAnimationFrame(animateTrail)
    // console.log(
    //   `Is inside? ${inStar}. current coords: (${mouse.x}, ${mouse.y}), relative position ${relative.x}, ${relative.y})`
    // );
    // }
}

animateTrail()
back.addEventListener("mousemove", function (e) {
    inStar = false
})
star.addEventListener("mousemove", function (e) {
    inStar = true
})
