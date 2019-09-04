export default {
  create(json) {
    var json_packet = [];
    var LoALevelRequest = json["LoALevelRequest"];
    var iss = json["iss"];
    var aud = json["aud"];
    var exp = json["exp"];

    var today = new Date(); // Or Date.today()
    var item = {};
    item["LoALevelRequest"] = LoALevelRequest;
    item["iss"] = iss;
    item["aud"] = aud;
    item["exp"] = parseInt(today.getTime() / 1000 + 86400 * exp);
    item["nbf"] = parseInt(today.getTime() / 1000); // needs to be the number of seconds since 1970 unix epoch
    item["iat"] = parseInt(today.getTime() / 1000);

    json_packet.push(item);
    return JSON.stringify(json_packet[0]);
  }
};
