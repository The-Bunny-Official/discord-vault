# Discord Bot Vault
A Discord bot that stores files locally and allows you to access it within Discord via password.

## Installation
Step 1:
- Download the latest version of the bot in the [releases tab](https://github.com/The-Bunny-Official/discord-vault/releases).

Step 2:
- Open the folder and create a config.json
- Edit the config.json according to config.example.json

Step 3:
- Create a folder titled "vault"

Step 4:
- Install all packages using: `npm i`

Step 5:
- Run the bot using `node .`

## Usage
`/list [password]` - Lists all the files available. <br>
[password] - Vault password set in the config.<br>

`/upload [password] [file] (rename)` - Upload a file to the vault.<br>
[password] - Vault password set in the config.<br>
[file] - File to upload to vault.<br>
(rename) - Rename the file. (Optional)<br>

`/vault` - Displays the `Vault Modal`

`Vault Modal [password] [item]` - Displays a vault item.<br>
[password] - Vault password set in the config.<br>
[item] - Name of item to grab, case sensitive, requires file extension.
  
