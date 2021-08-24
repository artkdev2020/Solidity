//const { assert } = require('chai');

const ArtKDevToken = artifacts.require("ArtKDevToken");


/*require('chai')                             // chai
.use(require('chai-as-promised'))
.should()*/

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('ArtKDevToken', (accounts) => {
  let token;
  before(async () => {
    token = await ArtKDevToken.deployed();
  })

  it('initializes the contract with the correct values', async () => {
    tokenName = await token.name()
    assert.equal(tokenName, 'ArtKDev', 'has is correct name')
    tokenSymbol = await token.symbol()
    assert.equal(tokenSymbol, 'AKD', 'has is correct symbol')
    tokenStandard = await token.standard()
    assert.equal(tokenStandard, 'ArtKDev Token v1.0', 'has is correct standard')
    decimal = await token.decimal()
    assert.equal(decimal, 4, 'has is correct decimal')
  });

  it('allocates the initial supply upon deployment', async () => {
    totalSupply = await token.totalSupply();
    // assert total supply
    assert.equal(totalSupply.toNumber(), 1000000, 'totalSupply is correct')

    // allocate balanceOf admin
    const adminBalance = await token.balanceOf(accounts[0])
    assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account')
  });

  it('transfer token ownership', async () => {
    // function transfer testing
    balanceBefore = await token.balanceOf(accounts[1])
    result = await token.transfer(accounts[1], 250000, { from: accounts[0] })

    balanceAfter = await token.balanceOf(accounts[1])
    assert.equal(balanceBefore.toNumber(), 0, 'correct balance before')
    assert.equal(balanceAfter.toNumber(), 250000, 'correct balance after transfer')
    balance = await token.balanceOf(accounts[0])
    assert.equal(balance.toNumber(), 750000, 'correct balance in sending account')

    // event result testing
    transferEvent = result.logs[0]
    assert.equal(result.logs.length, 1, "logs length is correct")
    //console.log(result.logs.length)
    //console.log(result)
    assert.equal(transferEvent.args._from, accounts[0], "logs _from account is correct")
    assert.equal(transferEvent.args._to, accounts[1], "logs _to account is correct")
    assert.equal(transferEvent.args._value.toNumber(), 250000, "logs _value account is correct")
    assert.equal(transferEvent.event, 'Transfer', "logs event name is correct")
    // need add chai require
    /*await token.transfer(accounts[1], 9999999999999999999999).should.be.rejected;*/
  });

  it('apprtove tokens for delegates transfer', async () => {
    result = await token.approve(accounts[1], 1000, {from: accounts[0]})

    transferEvent = result.logs[0]
    assert.equal(result.logs.length, 1, "logs length is correct")
    //console.log(result.logs.length)
    //console.log(transferEvent)
    assert.equal(transferEvent.args._owner, accounts[0], "logs _owner account is correct")
    assert.equal(transferEvent.args._sender, accounts[1], "logs _sender account is correct")
    assert.equal(transferEvent.args._value.toNumber(), 1000, "logs _value account is correct")
    assert.equal(transferEvent.event, 'Approval', "logs event name is correct")

    app = await token.allowance(accounts[0],accounts[1])
    assert.equal(app.toNumber(), 1000, 'allowance is correact')
  });

  it('HANDLES delegates token transfer', async () => {

    fromAccount = accounts[2]
    toAccount = accounts[3]
    apendingAccount = accounts[4]
    await token.transfer(fromAccount, 1000, {from: accounts[0]})
    // approve sendingAccount to sends from fromAccount
    await token.approve(apendingAccount, 100, {from: fromAccount})

    balanceBefore = await token.balanceOf(toAccount)

    result = await token.transferFrom(fromAccount, toAccount, 100, { from: apendingAccount })

    balanceAfter = await token.balanceOf(toAccount)
    balanceAfterFrom = await token.balanceOf(fromAccount)
    allowanceAfter = await token.allowance(fromAccount, apendingAccount)
    assert.equal(balanceAfter.toNumber() - balanceBefore.toNumber(), 100, 'balance after transfer from corecct added')
    assert.equal(balanceAfterFrom.toNumber(), 900, 'balance from after transfer corecct')
    assert.equal(allowanceAfter.toNumber(), 0, 'balance after transfer from corecct added')
    
    transferEvent = result.logs[0]

    assert.equal(result.logs.length, 1, "logs length is correct")
    assert.equal(transferEvent.args._from, fromAccount, "logs _owner account is correct")
    assert.equal(transferEvent.args._to, toAccount, "logs _sender account is correct")
    assert.equal(transferEvent.args._value.toNumber(), 100, "logs _value account is correct")
    assert.equal(transferEvent.event, 'Transfer', "logs event name is correct")

    // FAILURE : should.be.rejected transferFrom  
    //await token.approve(apendingAccount, 100, {from: fromAccount})
    //await token.transferFrom(fromAccount, toAccount, 1000, { from:apendingAccount }).should.be.rejected
    //await token.transferFrom(fromAccount, toAccount, 200, { from:apendingAccount }).should.be.rejected
    //await token.transferFrom(fromAccount, toAccount, 100, { from:fromAccount }).should.be.rejected
  });
})