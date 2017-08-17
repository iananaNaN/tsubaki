const Tsubaki = require("../../Tsubaki.js");
const Discord = require("discord.js");

let _super = require("../Command.js").prototype;
let method = Playing.prototype = Object.create(_super);

method.constructor = Playing;

function Playing() {
  _super.constructor.apply(this, ["playing", "Set the game of the " + Tsubaki.name + ". If left empty, it will revert to default.", " [game]"]);
}

method.executeAdmin = function (message, args, bot, db) {
  Tsubaki.setPlaying(args.join(" "));
}

method.execute = function (message, args, bot, db) {
  if (message.member !== undefined && (message.member.id === Tsubaki.ianId || message.member.id === Tsubaki.davidId)) {
    this.executeAdmin(message, args, bot, db);
  } else {
    return message.channel.send({ embed: Tsubaki.Style.notFound() });
  }
}

module.exports = Playing;