const Tsubaki = require('../../Tsubaki.js');
const Command = require('../Command.js');
const random = require('random-animal');

/** The dog command */
class Dog extends Command {
  /** Create the command */
  constructor() {
    super('dog', 'Will give a random picture of a dog.');
  }

  /**
   * @param {Discord.Message} message The sent command
   * @param {string[]} args The arguments in the command
   * @param {Discord.Client} bot The instance of the discord client
   * @param {sqlite.Database} db The instance of the database
   */
  execute(message, args, bot, db) {
    random.dog().then(
      (url) => message.channel.sendTemp(url, 30000)
    ).catch((err) => {
      console.error;
      message.channel.sendTemp(Tsubaki.Style.errorGeneric(), 10000);
    });
  }
}

module.exports = Dog;
