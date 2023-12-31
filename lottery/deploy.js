require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  // remember to change this to your own phrase!  process.env.KEY_PHRASE,
  // remember to change this to your own endpoint!
  process.env.KEY_PHRASE,
  "https://sepolia.infura.io/v3/4968a4b2c0f54bf7b20e5b11ffddf93e",
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
