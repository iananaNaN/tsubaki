const Tsubaki = require("../../Tsubaki.js");
const Discord = require("discord.js");

let _super = require("../Command.js").prototype;
let method = Ban.prototype = Object.create(_super);

method.constructor = Ban;

function Ban() {
  _super.constructor.apply(this, ["ban", "Will ban mentioned user for a week.", " <@mention> [reason]"]);
}

method.executeAdmin = function (message, args, bot) {
  let userToBan = message.mentions.users.first();
  if (userToBan == "" || userToBan === undefined) return message.channel.send({ embed: Tsubaki.Style.unknownUser() });
  let userID = userToBan.id;

  let isBannable = message.guild.member(userToBan).bannable;

  let reason = args.slice(1).join(" ");

  if (isBannable || userID.bannable) {
    message.guild.member(userToBan.id).send(":hammer: You have been {0} by {1} {2}"
      .format(Tsubaki.Style.bold("banned")), Tsubaki.Style.bold(message.author), (reason.length > 0 ? " for: " + Tsubaki.Style.bold(reason) : "!"));
    
    if (reason.length > 0) {
      message.guild.member(userToBan).ban(7, reason);
    } else {
      message.guild.member(userToBan).ban(7);
    }

    message.channel.send(":hammer: {0} has been {1} by {2} {3}"
      .format(userToBan.username, Tsubaki.Style.bold("banned"), Tsubaki.Style.bold(message.author.tag),
      (reason.length > 0 ? "for: " + Tsubaki.Style.bold(reason) : "!")));
  } else if (!isBannable || !(userID.bannable)) {
    message.channel.send({ embed: Tsubaki.Style.error("You can't ban that user!") });
  } else {
    message.channel.send("Bigger Problem Inside")
  }
}

method.execute = function (message, args, bot) {
  this.delete(message);
  if (message.member !== undefined && message.member.hasPermission(Tsubaki.adminPermission)) {
    this.executeAdmin(message, args, bot, points);
  } else {
    return message.channel.send({ embed: Tsubaki.Style.error("You don't have permission for that!") });
  }  
}

module.exports = Ban;