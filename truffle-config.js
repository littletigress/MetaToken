const path = require("path");
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const { infuraKey, mnemonic } = require('./secrets.json');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    },
    // rinkeby: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
    //   network_id: 4
    // }
  },
  compilers: {
    solc: {
      version: "0.6.9",
    }
  }
};
