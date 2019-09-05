<template>
	<v-app>
		<div class="container px-lg-5">
			<v-toolbar>
				<v-toolbar-title>Documentation</v-toolbar-title>

				<div class="flex-grow-1"></div>

				<v-toolbar-items>
					<v-btn to="/" exact>Home</v-btn>
					<v-btn to="/document" exact>Document</v-btn>
				</v-toolbar-items>
			</v-toolbar>
		</div>
	</v-app>
</template>
<script>
	export default {
		data() {
			return {};
		}
	};
</script>