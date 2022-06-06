const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

const { interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider())
let accounts
let contract

const INITIAL_MESSAGE = 'Hi there!'

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()

  // Create a new contract
  contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
  const getMessage = () => contract.methods.message().call()

  it('should deploy the contract', () => {
    assert.ok(contract.options.address)
  })

  it('has a default message', async () => {
    const defaultMessage = await getMessage()
    assert.equal(defaultMessage, INITIAL_MESSAGE)
  })

  it('should change the message', async () => {
    await contract.methods.setMessage('any-message').send({ from: accounts[0] })
    const contractMessage = await getMessage()
    assert.equal(contractMessage, 'any-message')
  })
})
