const Tsubaki = require('../../Tsubaki.js');
const Discord = require('discord.js');

const Command = require('../Command.js');

class Say extends Command {
  constructor() {
    super('say', Tsubaki.name + ' will say any message given.', ' <message>');
  }

  execute(message, args, bot, db) {
    if (args.length == 0) {
      message.channel.send({ embed: Tsubaki.Style.warn('Please tell me what to say!') });
    } else {
      message.channel.send(args.join(' '), { tts: false });
    }
  }
}

module.exports = Say;