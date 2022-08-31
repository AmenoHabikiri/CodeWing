import { writable } from "svelte/store";

export const EditorStore = writable(null);

const messageStore = writable('');

// const socket = new WebSocket('wss://dae9057c.ngrok.io');

const socket = new WebSocket('wss://murmuring-caverns-51341.herokuapp.com/');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("It's open");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log(event.data);
    messageStore.set(JSON.parse(event.data));
});

const sendMessage = (message) => {
	if (socket.readyState <= 1) {
        console.log(message)
		socket.send(JSON.stringify(message));
	}
}


export default {
	subscribe: messageStore.subscribe,
	sendMessage
}
