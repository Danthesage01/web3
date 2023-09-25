require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
//updated web3 and hdwallet-provider imports added for convenience
const { interface, bytecode } = require("./compile");
// deploy code will go here
const provider = new HDWalletProvider(
  process.env.KEY_PHRASE,
  "https://sepolia.infura.io/v3/4968a4b2c0f54bf7b20e5b11ffddf93e"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("account deploying from:", accounts[0]);

 const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: 1000000, from: accounts[0] });

   console.log("Contract deployed to:", result.options.address);
   provider.engine.stop()
};
deploy();

("0xc919AfD9de4032f84D9d57a71c1944A787232082");
