const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";
const CHANGED_MESSAGE = "Bye, there!";

beforeEach(async () => {
  // GET A LIST OF ALL ACCOUNTS
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default message", async () => {
   const message = await inbox.methods.message().call()
   assert.equal(message, INITIAL_STRING);
  });
  it("deploys a contract", async () => {
   await inbox.methods.setMessage(CHANGED_MESSAGE).send({ from : accounts[0]})
   const message = await inbox.methods.message().call()
    assert.equal(message, CHANGED_MESSAGE);
  });
});
