import React, { Component } from 'react'
import Web3 from 'web3'
// import { ABI } from './abi.js'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }
  async loadBlockchainData() {
    let web3;
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    const accounts = await web3.eth.getAccounts()
    web3.eth.defaultAccount = accounts[0]
    const balance = await web3.eth.getBalance(accounts[0])
    this.setState({ account: accounts[0] , balance: web3.utils.fromWei(balance) })
  }
  setAmount (event){
    this.setState({amount: event.target.value});
  }
  setToAddress(event){
    this.setState({toAddress: event.target.value});
  }

  async createTransaction() {
    let web3;
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    let addr = this.state.account
    web3.eth.personal.unlockAccount(addr);
    const toAddress = this.state.toAddress;
    const amount = this.state.amount;
    const amountToSend = web3.utils.toWei(amount);
    var send = await web3.eth.sendTransaction({ from:addr,to:toAddress, value:amountToSend });
    const balance = await web3.eth.getBalance(addr)
    this.setState({balance: web3.utils.fromWei(balance) })
  }
  //
  // createToken(){
  //   let web3;
  //   if (typeof web3 !== 'undefined') {
  //     web3 = new Web3(web3.currentProvider);
  //   } else {
  //     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  //   }
  //   let contract = new web3.eth.Contract(ABI, this.state.account)
  // }

  constructor(props) {
    super(props)
    this.state = { account: '', balance: 0 }
  }

  render() {
    return (
        <div style={{display : 'grid', justifyContent: 'center'}}>
          <div className="container">
            <p>Your balance: {this.state.balance} ETH</p>
            <p>Your account: {this.state.account}</p>
            <input type="text" placeholder='amount' onChange={this.setAmount.bind(this)}/>
            <input type="text" placeholder='address to send' onChange={this.setToAddress.bind(this)}/>
            <button onClick={this.createTransaction.bind(this)}>send</button>
          </div>
        </div>
    );
  }
}

export default App;
