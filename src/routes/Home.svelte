<script>
	import { onMount } from "svelte"
	import Chart from "chart.js"
	import getBg from "../getBg.js"

	let bgLoaded = false
	let canvasEl
	let bg
	
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

	function load() {
		// Calls method from imported file to load data from API. Sends callback `renderChart` function
		// getBg(renderChart)
		fetch("http://127.0.0.1:4500/diabetes?m1=30&m2=30&m3=30&m4=30")
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

<input value={meal_1}>
<input value={meal_2}>
<input value={meal_3}>
<input value={meal_4}>

<p>{meal_1}</p>
<p>{meal_2}</p>
<p>{meal_3}</p>
<p>{meal_4}</p>

<!-- {#if bgLoaded} -->
	<button on:click={load}>Reload standard BG values from API</button> 
<!-- {:else} -->
	<!-- <p>Loading data from API ...</p> -->
<!-- {/if} -->


<canvas bind:this={canvasEl}></canvas> 
