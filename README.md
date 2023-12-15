# Discord Bot Vault
A Discord bot that stores files locally and allows you to access it within Discord via password.

## Installation
Step 1:
- Download the latest version of the bot in the [releases tab](https://github.com/The-Bunny-Official/discord-vault/releases).

Step 2:
- Open the folder and create a config.json
- Edit the config.json according to config.example.json

Step 3:
- Install all packages using: `npm i`

Step 4:
- Run the bot using `node .`

## Usage
`/list [password]` - Lists all the files available. <br>
[password] - Vault password set in the config.

`/upload [password] [file] (rename)` - Upload a file to the vault.<br>
[password] - Vault password set in the config.
[file] - File to upload to vault.
(rename) - Rename the file. (Optional)

`/vault` - Displays the `Vault Modal`

`Vault Modal [password] [item]` - Displays a vault item.
[password] - Vault password set in the config.
[item] - Name of item to grab, case sensitive, requires file extension.
  
