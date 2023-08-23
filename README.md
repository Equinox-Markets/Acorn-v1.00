<div align="center">
<h1><strong> Equinox Vaults </strong></h1>

<br></br>



</div>




## Built With

- [![React][react.js]][react-url]
- [![typescript]][typescript-url]
- [![AntDesign]][antdesign-url]
- [![web3react]][web3react-url]
- [![prettier]][prettier-url]
- [![ESLint]][eslint-url]

## Installation

### Make sure you have the following ready:

- [node.js](https://nodejs.org/) installed (developped on LTS v18)
- [typescript](https://www.typescriptlang.org/) installed (developped on v5.1.6)
- [yarn](https://yarnpkg.com/) installed
- [MetaMask](https://metamask.io/) (or any web3 compatible wallet) installed in your browser

### Once your config is ready, create a new repo, open your favorite code editor, and clone the repo with the following cmd:

```bash
git clone https://github.com/Equinox-Markets/Equinox-Vaults.git .
```

### Install all package dependancies by running:

```bash
yarn install
```

<b>IMPORTANT: Double check your package.json to make sure you've installed the exact same version for all @web3-react packages. Since the version 8+ is still in beta, it may not be automatically installed.</b>

### Add your API keys in the .env file:

Create a .env file at the root of your project and copy the content of the .env.example file into it. Then, fill in the following variables:

```js
REACT_APP_INFURA_KEY = "your API key here";
...
REACT_APP_WALLETCONNECT_PROJECT_ID = "Project id needed for WalletConnect v2";
```

### start the dApp:

```bash
yarn start
```

## Features:

- [x] Web3 Wallet (Metamask / Wallet connect / Coinbase)
- [x] Chain selector
- [x] Wallet balance
- [x] Sign Messages & Transfer Native
- [ ] Hook to query user's Token Balances
- [ ] Hook to query user's NFTs

<br></br>

# Enjoy!!!

### ⭐️ ... and don't forget to leave a star if you like it! ⭐️

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React_v18.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/typescript_v5.1.6-375BD2?style=for-the-badge&logo=typescript&logoColor=61DAFB
[typescript-url]: https://www.typescriptlang.org/
[web3react]: https://img.shields.io/badge/@web3react_v8.2-006600?style=for-the-badge&logo=web3-react&logoColor=4FC08D
[web3react-url]: https://github.com/Uniswap/web3react#readme
[antdesign]: https://img.shields.io/badge/AntDesign_v5.6.4-FF0000?style=for-the-badge&logo=AntDesign&logoColor=61DAFB
[antdesign-url]: https://ant.design/
[prettier]: https://img.shields.io/badge/Prettier-360D3A?style=for-the-badge&logo=Prettier&logoColor=61DAFB
[prettier-url]: https://prettier.io/
[eslint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=61DAFB
[eslint-url]: https://eslint.org/
