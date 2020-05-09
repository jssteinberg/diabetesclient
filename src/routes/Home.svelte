<script>
	import { onMount } from "svelte"
	import Chart from "chart.js"
	import getBg from "../getBg.js"

	let bgLoaded = false
	let canvasEl

	// This function is sent as callback -- runs after data is loaded from API
	function renderChart (bg) {
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

		bgLoaded = true
	}

	function load() {
		bgLoaded = false

		// Calls method from imported file to load data from API. Sends callback `renderChart` function
		getBg(renderChart)
	}

	// onMount tells the component has been mounted to the DOM -- it's safe to manipulated DOM
	onMount(async () => {
		load()
	})
</script>

<h1>Standard BG values</h1>

{#if bgLoaded}
	<button on:click={load}>Reload standard BG values from API</button> 
{:else}
	<p>Loading data from API ...</p>
{/if}

<canvas bind:this={canvasEl}></canvas> 
