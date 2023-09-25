const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());
const assert = require("assert");
const { interface, bytecode } = require("../compile");
// updated ganache and web3 imports added for convenience

// contract test code will go here
let accounts;
let inbox;
const INITIAL_STRING = "Hi there!";
const CHANGED_STRING = "Bye baby";
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("it has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it("set a new message", async () => {
    await inbox.methods.setMessage(CHANGED_STRING).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, CHANGED_STRING);
  });
});

// beforeEach(() => {
//   // Get a list of all accounts
//   web3.eth.getAccounts().then((fetchedAccounts) => {
//     console.log(fetchedAccounts);
//   });
// });
