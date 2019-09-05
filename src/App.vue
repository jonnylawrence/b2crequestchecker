<template>
	<div id="app">
		<router-view />

		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<router-link class="nav-link" to="/">Home</router-link>
			<router-link class="nav-link" to="/Document">Document</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		name: "app"
	};
</script>

<style scoped>
</style>
