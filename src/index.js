import 'babel-polyfill'
import Vue from 'vue/dist/vue.esm.js'
import Eth from 'ethjs'

let eth

new Vue({
  el: '#app',
  data: {
    errorMessage: null,
  },
  methods: {
    login: function() {
      var app = this

      if (typeof web3 === 'undefined') {
        alert('Please install MetaMask')
        return
      }

      eth = new Eth(web3.currentProvider)

      eth.accounts()
        .then((accounts) => {
          if (accounts.length <= 0) {
            this.errorMessage = 'Please unlock MetaMask account'
            throw this.errorMessage
          }
          return eth.net_version()
        })
        .then((netVersion) => {
          if (netVersion !== '3') {
            this.errorMessage = 'Please connect MetaMask to Ropsten Test Network'
            throw this.errorMessage
          }
          alert('ok') // TODO
        })
        .catch((e) => {
          if (this.errorMessage != null) {
            alert(this.errorMessage)
            this.errorMessage = null
          }
          throw e
        })
    },
  },
})