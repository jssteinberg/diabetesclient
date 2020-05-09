<script>
	import { onMount } from "svelte";
	import Chart from "chart.js";

	let bg, canvasEl

	onMount(async () => {
		getBg()
	})

	function getBg() {
		fetch("https://diabetessimapi.herokuapp.com/")
			.then(res => res.json())
			.then(function (res) {
				bg = res
				renderChart()
			});
	}

	function renderChart() {
		var ctx = canvasEl.getContext("2d");
		var chart = new Chart(ctx, {
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

	function reload() {
		bg = false
		getBg()
	}
</script>

<h1>Standard BG values</h1>

{#if bg}

	<button on:click={reload}>Reload standard BG values from API</button> 

{:else}

	<p>Loading data from API ...</p>

{/if}

<canvas bind:this={canvasEl}></canvas> 
