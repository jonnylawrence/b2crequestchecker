<template>
	<div class="container">
		<div class="row">
			<div class="col">
				<v-toolbar app color="brown darken-4" dark></v-toolbar>
				<h2>B2C String Builder</h2>
				<b>App ID:  </b>
				<input type="text" v-model="appid" /></b>
				<br /><b>Client Secret:  </b>
				<input type="text" v-model="client_secret" />
				<br /><b>Token length in days:</b>
				<input type="text" v-model="token_length" />
				<br />

				<b>Tenant:  </b>
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

				<b>Level of Access:  </b>
				<input v-model="radiosLoA" type="radio" value="L1" id="L1" />
				<label for="L1">L1</label>:
				<input v-model="radiosLoA" type="radio" value="L2" id="L2" />
				<label for="L2">L2</label>:
				<input v-model="radiosLoA" type="radio" value="L3" id="L3" />
				<label for="L3">L3</label>
				<br />

				<b>Language: </b>
				<input v-model="radiosLocale" type="radio" value="en-GB" id="en-GB" />
				<label for="en-GB">en-GB</label>:
				<input v-model="radiosLocale" type="radio" value="zh-ZK" id="zh-HK" />
				<label for="zh-HK">zh-HK</label>:
				<br />

				<b>Branding: </b>
				<input v-model="radiosBranding" type="radio" value="europe" id="europe" />
				<label for="europe">europe</label>:
				<input v-model="radiosBranding" type="radio" value="hongkong" id="hongkong" />
				<label for="hongkong">hong kong</label>
				<br />

				<h4>JWT Token</h4>
				<textarea v-model.lazy="textbox" cols="40" style="height: 250px;"></textarea>
				<button class="default" v-on:click="encodeJWT">Encode JWT</button>
			</div>
			<div
				class="col"
			>{{radiosTenant}}&client_assertion={{client_assertion}}&&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&clientid={{appid}}&nonce=NONCE&prompt=login&redirect_uri={{redirect_uri}}&response_mode=form_post&response_type=id_token&scope=openid+profile&state=STATE&ui_locales={{radiosLocale}}&rp-app={{radiosBranding}}</div>
		</div>
	</div>
</template>

<script>
	import AuthService from "@/services/AuthService";
	export default {
		data() {
			return {
				appid: "",
				client_secret: "",
				token_length: "1",
				radiosLoA: "L2",
				redirect_uri: "http://localhost",
				textbox: '{ "LoALevelRequest":"L2","iss": "https://uat-account.np.bupaglobal.com/neubgdat01atluat01b2c01.onmicrosoft.com/b2c_1a_bupa-uni-uat-signinsignup/oauth2/v2.0/authorize?","aud": "http://localhost","exp": "1567543089","iat": "1567456689","nbf": "1567456689" ',
				jwttoken: "base64signedtoken",
				radiosTenant: "[SELECT]",
				radiosLocale: "en-GB",
				radiosBranding: "europe",
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
					clientid: this.client_secret,
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