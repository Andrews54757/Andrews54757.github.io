var element = document.getElementById("background");
var renderOptions = {
    autoResize: true,
    resolution: 2,
    clearBeforeRender: true,
    roundPixels: true
};

var width = window.innerWidth,
    height = window.innerHeight;
var half = (width / 2) - 50
var lenX = Math.ceil(width / 100);
var renderer = new PIXI.WebGLRenderer(width, height, renderOptions);
renderer.backgroundColor = 0xfbfbfb;
element.appendChild(renderer.view);
var stage = new PIXI.Container();
var timestamp = Date.now();
class Box {
    constructor(width, height, angle, velocity, i) {
        this.x = (i % lenX) * 100;
        this.y = Math.floor(i / lenX) * 100;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.velocity = velocity;
        this.goToLeft = false
        var rectangle = this.graphics = new PIXI.Graphics();

        rectangle.lineStyle(1, 0, 0.1);

        rectangle.drawRect(0, 0, width, height);
        rectangle.endFill();
        rectangle.position.set(this.x, this.y)
        stage.addChild(rectangle);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        this.graphics.position.set(x, y)
    }
    goto(s) {
        this.velocity = 3;
        this.goToLeft = s;
    }
    update() {
        if (this.velocity > 1) {
            if (this.goToLeft) {
                if (this.x + 50 < half) this.velocity = 1
            } else {
                if (this.x + 50 > half) this.velocity = 1
            }
        }
        this.x += (this.velocity * Math.cos(this.angle));
        this.y += (this.velocity * Math.sin(this.angle));

        this.graphics.position.set(this.x, this.y);
        if (this.x + this.width < 0) {
            this.x = width;
        }
        if (this.y + this.height < 0) {
            this.y = height;
        }
        if (this.x > width) {
            this.x = -this.width;
        }
        if (this.y > height) {
            this.y = -this.height;
        }

    }
}

var boxes = [];

for (var i = 0; i < 100; i++) {
    boxes.push(new Box(100, 100, 3.141 * 2 * Math.random(), 2, i))
}

var renderTime;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
var halfAmount = Math.round(boxes.length / 2);

function render() {
    renderTime = setTimeout(render, 20);
    var leftSide = [];
    var rightSide = [];
    shuffleArray(boxes);
    var movingLeft = 0,
        movingRight = 0;

    boxes.forEach((box) => {
        box.update()
        if (box.x > half - 50) {
            if (box.velocity === 3) movingRight++;
            rightSide.push(box);
        } else {
            if (box.velocity === 3) movingLeft++;
            leftSide.push(box);
        }
    })
    if (leftSide.length > rightSide.length + 2) {
        var a = leftSide.length - halfAmount - movingLeft;

        for (var i = 0; i < a; ++i) {
            leftSide[i].goto(false)
        }
    } else if (rightSide.length > leftSide.length + 2) {
        var a = rightSide.length - halfAmount - movingRight;

        for (var i = 0; i < a; ++i) {
            rightSide[i].goto(true)

        }
    }

    renderer.render(stage);
}

render();
