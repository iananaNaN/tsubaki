const Tsubaki = require("../../Tsubaki.js");
const Cmds = require("../utility/Cmds.js");

var _super = require("../Command.js").prototype;
var method = Help.prototype = Object.create(_super);

method.constructor = Help;

function Help() {
  _super.constructor.apply(this, "help", "Displays the command list.", "");
}

method.execute = function (message) {
  _super.delete();
  let cmds = Tsubaki.commands;

  let description = Tsubaki.Style.bold("Tsubaki Command List") + "\n\n"
    + "Do " + Tsubaki.Style.bold(Cmds.getUsage()) + " and replace " + Tsubaki.Style.bold("[command]") + " with any command you want to learn more about." + "\n";
  for (let i = 0, lenI = cmds.length; i < lenI; i++) {
    description += "\n" + Tsubaki.Style.bold(cmds[i][0] + ": ");

    for (let j = 1, lenJ = cmds[i].length; j < lenJ; j++) {
      description += Tsubaki.Style.code(cmds[i][j]) + " ";
    }
  }

  var guildEmbed = new Discord.RichEmbed()
    .setDescription(description)
    .setColor(Tsubaki.green)
  message.channel.send({ embed: guildEmbed });
}

module.exports = Help;