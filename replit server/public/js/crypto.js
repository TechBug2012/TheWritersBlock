var Web3 = require('web3');
var web3 = new Web3();

if (typeof web3 != 'undefined') {
         console.log("Using web3 detected from external source like Metamask")
         this.web3 = new Web3(web3.currentProvider)
      } else {
         console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
         this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

const contract = web3.eth.contract([[{"constant": false,"inputs": [{"name": "amount","type": "uint256"},{"name": "receiver","type": "address"}],"name": "payWriter","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "kill","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "balance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"}]]);
var contractInstance = contract.at("0x8ac6f809862eae42fefafcca212efb61607e13e0");

// when the form is submitted, call the payWriter function
function payUser(addr, amt) {
  contractInstance.payWriter(addr, amt, {
    gas: 300000,
    from: web3.eth.accounts[0],
    value: web3.toWei(amt, 'ether')
  }, (err, result) => {
    cb()
  });
}

var vuePay = new Vue({
  el: '#ethb',
  data: {
    output: ''
  },
  methods: {
    pay () {
      payUser("0xB942e23ad7C7a7F5e47B4aA9856b0601B26006C1", this.$refs.ethamount.value); // putting my address temporarily
    }
  }
});
