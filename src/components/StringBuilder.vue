<template>
	<div class="container px-lg-5">
		<div class="row">
			<div class="col-6">
				<h2>B2C String Builder</h2>
				<b>Tenant:</b>
				<input
					v-model="radiosTenant"
					type="radio"
					value="https://uat-account.np.bupaglobal.com/neubgdat01atluat01b2c01.onmicrosoft.com/b2c_1a_bupa-uni-uat-signinsignup/oauth2/v2.0/authorize"
					id="uat"
				/>
				<label for="uat">UAT</label>:
				<input
					v-model="radiosTenant"
					type="radio"
					value="https://nft-account.np.bupaglobal.com/neubgdat01atlnft01b2c01.onmicrosoft.com/b2c_1a_bupa-uni-nft-signinsignup/oauth2/v2.0/authorize"
					id="nft"
				/>
				<label for="nft">NFT</label>
				<br />
				<b>App ID:</b>
				<input type="text" v-model="appid" />
				<br />
				<b>Client Secret:</b>
				<input type="text" v-model="client_secret" />
				<br />
				<b>Redirect URI (your site):</b>
				<input type="text" v-model="redirect_uri" />
				<br />
				<b>Token length in days:</b>
				<input type="text" v-model="token_length" />
				<br />

				<b>Level of Access:</b>
				<input v-model="radiosLoA" type="radio" value="L1" id="L1" />
				<label for="L1">L1</label>:
				<input v-model="radiosLoA" type="radio" value="L2" id="L2" />
				<label for="L2">L2</label>:
				<input v-model="radiosLoA" type="radio" value="L3" id="L3" />
				<label for="L3">L3</label>
				<br />

				<b>Language:</b>
				<input v-model="radiosLocale" type="radio" value="en-GB" id="en-GB" />
				<label for="en-GB">en-GB</label>:
				<input v-model="radiosLocale" type="radio" value="zh-ZK" id="zh-HK" />
				<label for="zh-HK">zh-HK</label>:
				<br />

				<b>Branding:</b>
				<input v-model="radiosBranding" type="radio" value="europe" id="europe" />
				<label for="europe">europe</label>:
				<input v-model="radiosBranding" type="radio" value="hongkong" id="hongkong" />
				<label for="hongkong">hong kong</label>
				<br />
				<br />
				<button class="default" v-on:click="encodeJWT">Encode JWT</button>
				<textarea v-model="textbox" cols="60" style="height: 250px;"></textarea>
				<br />
				<br />
				<small>Author: Jon Sutcliffe V1.0, developed using the client Javascript VUE framework and node.js</small>
			</div>
			<div class="col-6">
				<button class="default" v-on:click="randomstring">Generate Nonce/State</button>
				<br />
				<textarea v-model="urlrequest" cols="60" style="height: 570px;"></textarea>
			</div>
		</div>

		<br />
	</div>
</template>

<script>
	import AuthService from "@/services/AuthService";
	import Token from "@/services/Token";
	export default {
		data() {
			return {
				appid: "",
				client_secret: "",
				token_length: "1",
				radiosLoA: "L2",
				redirect_uri: "http://localhost",
				textbox: "{}",
				jwttoken: "base64signedtoken",
				radiosTenant: "[SELECT TENANT]",
				radiosLocale: "en-GB",
				radiosBranding: "europe",
				fontColorObject: { color: "blue" },
				multiselect: [],
				client_assertion: "JWTtoken",
				urlrequest: "B2C CONNECTION STRING",
				nonce: "NONCE",
				state: "STATE"
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
					"&client_assertion=" +
					this.client_assertion +
					"&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&clientid=" +
					this.appid +
					"&nonce=" +
					this.nonce +
					"&prompt=login&redirect_uri=" +
					this.redirect_uri +
					"&response_mode=form_post&response_type=id_token&scope=openid+profile&state=" +
					this.state +
					"&ui_locales=" +
					this.radiosLocale +
					"&rp-app=" +
					this.radiosBranding;
			}
			// nonce: function() {
			// 	this.urlrequest = "POW!!";
			// }
		},
		methods: {
			async encodeJWT() {
				this.textbox = JSON.stringify(
					Token.create({
						LoALevelRequest: this.radiosLoA,
						iss: this.radiosTenant,
						aud: this.redirect_uri,
						exp: this.token_length
					})
				);
				const response = await AuthService.register({
					clientid: this.client_secret,
					jwttoken: this.textbox
				});

				this.client_assertion = response.data;
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
			}
		}
	};
</script>

<style scoped>
</style>