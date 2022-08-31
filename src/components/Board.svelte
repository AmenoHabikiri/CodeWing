<script>
    import io from 'socket.io-client';
    export let color;
    export let size;
    // export let state;
    // console.log(size);
    import { onMount } from "svelte";
    var timeout;
    var socket = io.connect("https://lit-ocean-60441.herokuapp.com/");
    var ctx;
    var isDrawing = false;
    
    onMount(() => {
        drawOnCanvas();
    });
    socket.on("canvas-data", function(data){

        var root = this;
        var interval = setInterval(function(){
            if(root.isDrawing) return;
            root.isDrawing = true;
            clearInterval(interval);
            var image = new Image();
            var canvas = document.querySelector('#board');
            var ctx = canvas.getContext('2d');
            image.onload = function() {
                ctx.drawImage(image, 0, 0);

                root.isDrawing = false;
            };
            image.src = data;
        }, 200)
    })
    const drawOnCanvas = () => {
        var canvas = document.querySelector('#board');
        ctx = canvas.getContext('2d');
        // var ctx = ctx;

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            // console.log(mouse.x, last_mouse.x, e.pageX, this.offsetLeft, canvas.width)
            mouse.x = (e.pageX - this.offsetLeft) ;
            mouse.y = (e.pageY - this.offsetTop-650);
        }, false);


        /* Drawing on Paint App */
        // console.log(size);
        ctx.lineWidth = size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        canvas.addEventListener('mousedown', function(e) {
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var root = this;
        console.log(root);
        var onPaint = function() {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();

            
            var base64ImageData = canvas.toDataURL("image/png");
            socket.emit("canvas-data", base64ImageData);
        };
    }

</script>


<div class="sketch" id="sketch">
    <canvas class="board" id="board"></canvas>
</div>


<style>
    .board {
    width: 100%;
    height: 100%;
}

.sketch {
    width: 100%;
    height: 100%;
}
</style>