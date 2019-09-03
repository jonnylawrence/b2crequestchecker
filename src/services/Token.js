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
    item["exp"] = today.setDate(today.getDate() + exp);
    item["nbf"] = Date.now();
    item["iat"] = Date.now();

    json_packet.push(item);

    return json_packet[0];
  }
};
