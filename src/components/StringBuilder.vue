<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<h2>B2C String Builder</h2>Client ID:
				<input type="text" v-model="clientid" />

				<h4>Language</h4>
				<input v-model="radiosPreset" type="radio" value="UK-en" id="uk-en" />
				<label for="rollout">English</label>
				<br />

				<input v-model="radiosPreset" type="radio" value="CH-ZK" id="ch-zk" />
				<label for="retreat">Standard Chinese</label>
				<br />
				<p>
					<strong>Radios:</strong>
					{{radiosPreset}}
				</p>

				<h4>JWT Claims</h4>
				<textarea v-model.lazy="textbox" cols="30" style="height: 150px;"></textarea>
				<button class="default" v-on:click="encodeJWT">Encode JWT</button>
				<p v-bind:style="fontColorObject">{{jwttoken}}</p>
			</div>
			<div
				class="col"
			>URL {{url}}&clientid={{clientid}}&lang={{radiosPreset}}&client_assertion={{client_assertion}}</div>
		</div>
	</div>
</template>

<script>
	import AuthService from "@/services/AuthService";
	export default {
		data() {
			return {
				url: "https:/tenantname/",
				clientid: "",
				textbox: '{ "iss": "me", "aud": "me", "expirey": "now" }',
				jwttoken: "base64signedtoken",
				radiosPreset: "UK-en",
				fontColorObject: { color: "blue" },
				multiselect: [],
				client_assertion: "JWTtoken"
			};
		},
		watch: {
			textbox: function() {
				this.fontColorObject.color = "red";
			}
		},
		methods: {
			async encodeJWT() {
				const response = await AuthService.register({
					clientid: this.clientid,
					jwttoken: this.textbox
				});
				console.log(response.data);

				this.client_assertion = response.data;
			}
		}
	};
</script>

<style scoped>
</style>