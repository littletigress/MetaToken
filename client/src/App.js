import React, { Component } from "react";
import MetaCoin from "./contracts/MetaCoin.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      balanceValue: undefined,
      counterValue: undefined,
      depositAmount: undefined,
      withdrawAmount: undefined,
      account: null,
      web3: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MetaCoin.networks[networkId];
      const instance = new web3.eth.Contract(
        MetaCoin.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      web3.eth.defaultAccount = accounts[0];
      

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3: web3, account: accounts[0], contract: instance }, this.runInitialState);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runInitialState = async () => {
    const { account, contract } = this.state;

    this.updateBalance()
    this.updateCounter()
  };

  async handleClick(event) {
    const { account, contract } = this.state;

    await contract.methods.addCounter().send({from: account});
    this.updateCounter();
  }

  handleChange(event) {
    switch(event.target.name) {
        case "deposit":
            this.setState({"depositAmount": event.target.value})
            break;
        case "withdraw":
            this.setState({"withdrawAmount": event.target.value})
            break;
        default:
            break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    switch(event.target.name) {
      case "doDeposit":
          this.handleDeposit();
          break;
      case "doWithdraw":
          this.handleWithdraw();
          break;
      default:
          break;
    }
  }

  async handleDeposit() {
    const { account, contract, depositAmount, web3 } = this.state;

    let amount = web3.utils.toWei(depositAmount);
    await contract.methods.depositMoney().send({from: account, value: amount});
    
    this.updateBalance();
  }

  async handleWithdraw() {
    const { account, contract, withdrawAmount, web3 } = this.state;

    let amount = web3.utils.toWei(withdrawAmount);
    await contract.methods.withdrawMoney(account, amount).send({from: account});

    this.updateBalance();
    this.updateCounter();
  }

  async updateBalance() {
    const { account, contract, web3} = this.state;

    let balance = await contract.methods.getBalance().call({from: account});
    balance = web3.utils.fromWei(balance);

    this.setState({ balanceValue: balance });
  }

  async updateCounter() {
    const { account, contract, web3} = this.state;

    let counter = await contract.methods.getCounter().call({from: account});

    this.setState({ counterValue: counter });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Balance : <span>{this.state.balanceValue} ETH</span></h2>
        <h3>Withdraw Counter : <span>{this.state.counterValue}</span></h3>
        <button class="button" onClick={this.handleClick.bind(this)}>Add Counter</button>
        <div class="grid-container">
          <div class="grid-item">
            <form 
              name="doDeposit"
              onSubmit={this.handleSubmit}>
              <label for="deposit">Deposit</label>
              <input 
                type="text" 
                id="deposit" 
                name="deposit" 
                placeholder="Deposit amount in ETH.."
                onChange={this.handleChange.bind(this)}></input>
              <input type="submit" value="Deposit"></input>
            </form>
          </div>
          <div class="grid-item">
            <form 
              name="doWithdraw"
              onSubmit={this.handleSubmit}>
              <label for="withdraw">Withdraw</label>
              <input 
                type="text" 
                id="withdraw" 
                name="withdraw" 
                placeholder="Withdraw amount in ETH.."
                onChange={this.handleChange.bind(this)}></input>
              <input type="submit" value="Withdraw"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
