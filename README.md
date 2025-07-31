# Adventurers' Arena

**Adventurers' Arena** is a strategy-based board game where two players, each controlling a team of five unique adventurers, compete to conquer the enemy’s base. This game combines tactical decision-making and adventurous gameplay.

### Demo video
https://vimeo.com/1039377287?share=copy

## Key Features
- **2-Player Gameplay** 
- **Unique Adventurer Roles and Abilities of Pieces**

## Objective
The goal is to strategically maneuver your pieces and place one on your opponent's base to win the game.

## Game Rules
1. Each player starts with five pieces, each having unique abilities.
2. Players take turns moving one piece at a time on the board.
3. A piece must reach the opponent's base to win the game.
4. All pieces are unique, having their own attack power, health, move range, and special abilities.

## Technologies Used
- **Frontend:** Vite ( React )
- **Backend:** Node.js, Express.js, Socket.io
- **Blockchain:** Foundry
- **Smart contract Connection:** Ethers.js


## Installation and Running

1. Clone the repository:
   ```bash
   git clone <repo-address>
   cd <repo-name>
   ```
2. Split terminal into 2 ( For client and server )
3. Terminal 1 and 2 both: Install dependencies
   ```bash
   npm install
   ```
4. Use .env.development file to know the variables needed to run the files (API Key is not provided, but rest variables are there for local development). Change the .env.development file to .env file or create a new .env file with the variables needed.

5. If in server folder, run the server:
   ```bash
   npm run start
   ```
6. If in client folder, run the client:
   ```bash
   npm run dev
   ```
7. The ports should now be working and ready to work on.
8. Go to respective client port and the game should be working.

## The Game

### Important Points
1. You do not need to connect a wallet to play but connecting wallet allows you to select the skins. If both players have their wallet connected, they can agree to register the winner.
2. Zoom in/out if unable to see all pieces and map according to your comfort.
3. Read the How-to-play on Home page to know about the instructions.
4. For the online site, it may happen that the server does not respond due to being inactive after a period of inactivity as it was hosted on a free tier.

## Creating and Joining room
A player can create room and get the room code which can then be shared with the other player, and both can jump into a game.

## Connect Wallet and Skins
A player can choose to connect their wallet. The code is set up to connect to etherlink testnet . Although it is also set to ask permission to add the testnet if not present in user's metamask, if facing issue, make sure to add and switch to etherlink testnet before connecting wallet. Else if connected wallet but not on etherlink testnet, you will be able to see current skins and the ones for collab but will be unable to buy the skins through smart contract.

### Current skins
Shows the current equipped skins of the player. Go to lobby, reload page, and come back if you want to change to default skins after changing the skins.

### Available skins
Shows the current available skins you can buy and apply.

### Collab skins
Shows the skins that are provided through some web3 collaboration. Right now there is volcano map which you can get if you have the Shape Keys NFTs on shape mainnet.

## Registering the winner
If both players have their wallet connected, then after one player wins, both players can choose to agree and register the winning of the winner on blockchain. The option is provided on the same screen which shows who won after the game ends.

## Contract
Contract address : 0x9E08806eaB4111322Df0Bb6186B0210F68346aAB   
Deployed on Etherlink Testnet