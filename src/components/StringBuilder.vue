<template>
	<v-app>
		<!-- Check that the SDK client is not currently loading before accessing is methods -->
		<div v-if="!$auth.loading">
			<!-- show login when not authenticated -->
			<v-btn v-if="!$auth.isAuthenticated" @click="login">Log in</v-btn>
			<!-- show logout when authenticated -->
			<v-btn v-if="$auth.isAuthenticated" @click="logout">Log out</v-btn>
		</div>

		<div v-if="$auth.isAuthenticated">
			<div class="container px-lg-5">
				<jonheader></jonheader>
				<div class="row">
					<div class="col-6">
						<v-radio-group v-model="radiosTenant" label="Tenant" row>
							<v-radio
								name="radiosTenant"
								value="https://uat-account.np.bupaglobal.com/neubgdat01atluat01b2c01.onmicrosoft.com/b2c_1a_bupa-uni-uat-signinsignup/oauth2/v2.0/authorize"
								key="UAT"
								label="UAT"
							/>
							<v-radio
								name="radiosTenant"
								value="https://nft-account.np.bupaglobal.com/neubgdat01atlnft01b2c01.onmicrosoft.com/b2c_1a_bupa-uni-nft-signinsignup/oauth2/v2.0/authorize"
								key="NFT"
								label="NFT"
							/>
						</v-radio-group>
						<v-radio-group
							v-model="radiosLoA"
							label="Authentication Level"
							row
							hint="Different authentication workflows will be executed by the B2C based on this Level of Access"
						>
							<v-radio
								name="radiosLoA"
								value="L1"
								key="L1"
								label="L1"
								hint="Different authentication workflows will be executed by the B2C based on this Level of Access"
							/>
							<v-radio name="radiosLoA" value="L2" key="L2" label="L2" />
							<v-radio name="radiosLoA" value="L3" key="L3" label="L3" />
						</v-radio-group>
						<v-text-field v-model="token_length" label="Token Length [days]" required></v-text-field>
						<v-text-field v-model="appid" label="Client ID/App ID" required></v-text-field>

						<ValidationObserver v-slot="{ valid, passes  }">
							<form @encodeJWT.prevent="passes(encodeJWT)">
								<ValidationProvider rules="required">
									<v-text-field v-model="redirect_uri" label="Redirect URI (your site)" required></v-text-field>
								</ValidationProvider>
								<ValidationProvider rules="required">
									<v-text-field v-model="client_secret" label="Client Secret" required></v-text-field>
								</ValidationProvider>

								<v-btn :disabled="!valid" v-on:click="encodeJWT" elevation="10" rounded>Encode JWT</v-btn>
								<br />
							</form>
						</ValidationObserver>
						<br />

						<v-radio-group v-model="radiosLocale" label="Locale" row>
							<v-radio name="radiosLocale" value="en-GB" key="en-GB" label="en-GB" />
							<v-radio name="radiosLocale" value="zh-ZK" key="zh-ZK" label="zh-ZK" />
						</v-radio-group>

						<v-radio-group v-model="radiosBranding" label="Branding" row>
							<v-radio name="radiosLocale" value="europe" key="europe" label="Europe" />
							<v-radio name="radiosLocale" value="hongkong" key="hongkong" label="Hong Kong" />
							<v-radio name="radiosLocale" value="jontestbrand" key="jontestbrand" label="Test" />
						</v-radio-group>

						<v-textarea v-model="textbox" full-width outlined cols="60" auto-grow></v-textarea>
						<br />
					</div>
					<div class="col-6">
						<v-btn v-on:click="randomstring" elevation="10" rounded>Generate Nonce/State</v-btn>
						<br />
						<v-textarea v-model="urlrequest" outlined cols="60" auto-grow></v-textarea>
						<v-btn v-on:click="connectb2c" elevation="10" rounded>Connect</v-btn>
					</div>
				</div>

				<br />
			</div>
		</div>
	</v-app>
</template>


<script>
	import AuthService from "@/services/AuthService";
	import Token from "@/services/Token";
	import jonheader from "@/components/Header.vue";

	export default {
		components: {
			jonheader
		},
		data() {
			return {
				appid: "",
				client_secret: "",
				token_length: "1",
				radiosLoA: "L2",
				redirect_uri: "",
				textbox: "{}",
				jwttoken: "base64signedtoken",
				radiosTenant: "[SELECT_TENANT]",
				radiosLocale: "en-GB",
				radiosBranding: "europe",
				fontColorObject: { color: "blue" },
				multiselect: [],
				client_assertion: "JWTtoken",
				urlrequest: "B2C CONNECTION STRING",
				nonce: "NONCE",
				state: "STATE",
				Json: ""
			};
		},
		computed: {
			propertywatch() {
				return `${this.appid}|${this.radiosTenant}|${this.client_assertion}|${this.clientid}|${this.nonce}|${this.redirect_uri}|${this.state}|${this.client_assertion}|${this.radiosLocale}|${this.radiosBranding}`;
			}
		},
		watch: {
			propertywatch: function() {
				this.urlrequest =
					this.radiosTenant +
					"?client_assertion=" +
					this.client_assertion +
					"&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&client_id=" +
					this.appid +
					"&nonce=" +
					this.nonce +
					"&prompt=login&redirect_uri=" +
					encodeURIComponent(this.redirect_uri) +
					"&response_mode=form_post&response_type=id_token&scope=openid+profile&state=" +
					this.state +
					"&ui_locales=" +
					this.radiosLocale +
					"&rp-app=" +
					this.radiosBranding;
			}
		},
		methods: {
			// Log the user in
			login() {
				this.$auth.loginWithRedirect();
			},
			// Log the user out
			logout() {
				this.$auth.logout({
					returnTo: window.location.origin
				});
			},
			async encodeJWT() {
				let jwtret = Token.create({
					LoALevelRequest: this.radiosLoA,
					iss: this.radiosTenant,
					aud: this.redirect_uri,
					exp: this.token_length
				});
				this.textbox = jwtret;
				// this.Json = jwtret.replace(/(\r\n|\n|\r)/gm);
				const response = await AuthService.register({
					clientid: this.client_secret,
					jwttoken: this.textbox
				});

				this.client_assertion = response.data;

				// var JsonObject = JSON.parse(response.data);
				// console.log(JsonObject);
				// console.log("wwefwe");
			},
			gen_random: function(x) {
				var s = "";

				while (s.length < x && x > 0) {
					var r = Math.random();
					s +=
						r < 0.1
							? Math.floor(r * 100)
							: String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65));
				}
				return s;
			},
			randomstring: function() {
				this.nonce = this.gen_random(24);
				this.state = this.gen_random(24);
			},
			connectb2c: function() {
				window.open(this.urlrequest, "_blank");
			}
		}
	};
</script>

<style>
</style>