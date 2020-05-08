<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import D3 from "./routes/D3.svelte";

</script>

<div class="app">
	<Router>
		<nav>
			<Link to="/">Chart.js</Link> –
			<Link to="d3">D3</Link>
		</nav>
		<div>
			<Route path="d3" component={D3} />
			<Route path="/">
				<Home />
			</Route>
		</div>
	</Router>
</div>

<style>
	.app {
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
</style>
