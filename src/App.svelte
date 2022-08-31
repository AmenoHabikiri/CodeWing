<script>
	import Message from "./components/Chat.svelte";
	import Header from "./components/Header.svelte";
	import SideNav from "./components/SideNav.svelte";
	import CodeEditor from "./components/CodeEditor.svelte";
	import Board from "./components/Board.svelte";
	import VideoGrid from "./components/VideoGrid.svelte";
	import InputOutput from "./components/InputOutput.svelte";
	let state = {
		color: "#000000",
		size: "5",
	};

	function changeColor(params) {
		console.log(params.target.value);
		state.color = params.target.value;
		console.log(state.color);
	}

	function changeSize(params) {
		console.log(params.target.value);
		state.size = params.target.value;
	}
</script>

<Header imageSrc="images/ShareCode.png" />

<div class="wrapper">
	<CodeEditor />
	<InputOutput />
	<SideNav />
	<Message />
</div>

<div class="super-container">
	<div class="container">
		<div class="tools-section">
			<!-- <div class="color-picker-container">
				Select Brush Color : &nbsp; 
				<input type="color" value={state.color} on:change={event => changeColor(event)}/>
			</div>
			
			<div class="brushsize-container">
				Select Brush Size : &nbsp; 
				<select value={state.size} on:change={event => changeSize(event)}>
					<option> 5 </option>
					<option> 10 </option>
					<option> 15 </option>
					<option> 20 </option>
					<option> 25 </option>
					<option> 30 </option>
				</select>
			</div> -->
			WhiteBoard
		</div>

		<div class="board-container">
			<Board color={state.color} size={state.size} />
		</div>
	</div>
	<div class="video-container">
		<VideoGrid />
	</div>
</div>

<!-- <style>
	
  </style> -->
<style>
	.super-container{
		display: flex;
		flex-direction: row;
		
	}
	.video-container{
		width: 100%;
		border: 3px solid black;
	}
	.wrapper {
		display: flex;
		height: 65%;
	}
	.container {
		position: relative;
		width: 100%;
		/* height: 100%; */
		background: linear-gradient(45deg, #03a9f4, #4caf50);
	}

	.color-picker-container {
		text-align: center;
		display: inline;
		color: white;
	}

	.brushsize-container {
		display: inline;
		color: white;
		margin-left: 12px;
	}

	.tools-section {
		text-align: center;
	}

	.board-container {
		width: 100%;
		height: 85%;
		margin: auto;
		margin-top: 1%;
		background: white;
	}
</style>
