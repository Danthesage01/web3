//updated web3 and hdwallet-provider imports added for convenience
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");

// deploy code will go here
const INITIAL_STRING = "Hi there!";
const { abi, env } = require("./compile");
const provider = new HDWalletProvider(
  process.env.KEY_PHRASE,
  "https://sepolia.infura.io/v3/4968a4b2c0f54bf7b20e5b11ffddf93e"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("account deploying from:", accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [INITIAL_STRING] })
    .send({ gas: 1000000, from: accounts[0] });

  console.log("Contract deployed to:", result.options.address);
  provider.engine.stop();
};
deploy();

