<script>
	import { onMount } from "svelte"
	import Chart from "chart.js"
	import getBg from "../getBg.js"

	let canvasEl
	let bg = Array(100)
	
	// Meal variables
	let meal_1 = '40'
	let meal_2 = '60'
	let meal_3 = '80'
	let meal_4 = '30'


	// This function is sent as callback -- runs after data is loaded from API
	function renderChart () {
		let ctx = canvasEl.getContext("2d");
		let chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: [...Array(bg.length).keys()],
				datasets: [
					{
						label: "Blood glucose level",
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgb(255, 99, 132)",
						fill: 'False',
						data: bg
					}
				]
			},
			options: {}
		});

	}

	function load(meal_1=30, meal_2=30, meal_3=30, meal_4=30) {
	// function load() {
		// Calls method from imported file to load data from API. Sends callback `renderChart` function
		// getBg(renderChart)
		var fetch_string = "http://127.0.0.1:4500/diabetes?m1=" + meal_1 + "&m2=" + meal_2 + "&m3=" + meal_3 + "&m4=" + meal_4
		console.log(fetch_string)
		fetch(fetch_string)
			.then(res => res.json())
			.then(function (res) {

			// Run callback if provided
				bg = res
			});
		renderChart()
	}

	// onMount tells the component has been mounted to the DOM -- it's safe to manipulate DOM
	onMount(async () => {
		load()
	})
</script>

<h1>Standard BG values</h1>

<p>For some reason you have to press twice on the button to load and plot.</p>

<input bind:value={meal_1}>
<input bind:value={meal_2}>
<input bind:value={meal_3}>
<input bind:value={meal_4}>

<button on:click={() => load(meal_1, meal_2, meal_3, meal_4)}>Show BG curve</button> 


<canvas bind:this={canvasEl}></canvas> 
