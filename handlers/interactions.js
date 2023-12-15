function loadCommands(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Commands", "Working");
  
    let commandsArray = [];
    let developerArray = [];
  
    const commandsFolder = fs.readdirSync("./commands");
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
  
          for (const file of commandFiles) {
              const commandFile = require(`../commands/${folder}/${file}`)
              client.commands.set(commandFile.data.name, commandFile)
  
              if(commandFile.developer) developerArray.push(commandFile.data.toJSON());
              else commandsArray.push(commandFile.data.toJSON());
  
          table.addRow(file, "yes");
          continue;
          }
    }

    client.application.commands.set(commandsArray);   
    return console.log(table.toString())
  }
  
  
  module.exports = { loadCommands }