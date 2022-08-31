<script>
    import io from "socket.io-client";
    const socket = io.connect('https://fathomless-wave-10975.herokuapp.com/');
    // console.log(videoGrid)
    const myPeer = new Peer(undefined, {
        host: "videocodewing.herokuapp.com",
        port:"443",
        secure:!0,
    });
    console.log("Hello")
    console.log(myPeer)
    console.log(socket)
    const myVideo = document.createElement("video");
    myVideo.muted = true;
    const peers = {};
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            addVideoStream(myVideo, stream);

            myPeer.on("call", (call) => {
                call.answer(stream);
                const video = document.createElement("video");
                call.on("stream", (userVideoStream) => {
                    addVideoStream(video, userVideoStream);
                });
            });

            socket.on("user-connected", (userId) => {
                connectToNewUser(userId, stream);
            });
        });

    socket.on("user-disconnected", (userId) => {
        if (peers[userId]) peers[userId].close();
    });

    myPeer.on("open", (id) => {
        socket.emit("join-room", window.location.href.split("/")[3].split("-")[1], id);
    });

    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
        });
        call.on("close", () => {
            video.remove();
        });

        peers[userId] = call;
    }

    function addVideoStream(video, stream) {
        var videoGrid = document.getElementById("grid")
        console.log(videoGrid)
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
        });
        videoGrid.append(video);
    }
    // export let color;
    // export let size;
    // export let state;
    // console.log(size);
    // import { onMount } from "svelte";
    // var timeout;
    // // var socket = io.connect("http://localhost:2000");
    // var ctx;
    // var isDrawing = false;

    // onMount(() => {
    //     drawOnCanvas();
    // });
    // socket.on("canvas-data", function(data){

    //     var root = this;
    //     var interval = setInterval(function(){
    //         if(root.isDrawing) return;
    //         root.isDrawing = true;
    //         clearInterval(interval);
    //         var image = new Image();
    //         var canvas = document.querySelector('#board');
    //         var ctx = canvas.getContext('2d');
    //         image.onload = function() {
    //             ctx.drawImage(image, 0, 0);

    //             root.isDrawing = false;
    //         };
    //         image.src = data;
    //     }, 200)
    // })
    // const drawOnCanvas = () => {
    //     return;
    // };
</script>

<div class="video-grid" id="grid">
</div>

<style>
    #grid {
        display: flex;
        flex-wrap: wrap;
        height: 40vh;
        overflow: scroll;
        overflow-y: scroll;
    }

    #grid > video {
        width: 50%;
    }
</style>
