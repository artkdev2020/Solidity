//const { assert } = require('chai');

const ArtToken = artifacts.require("ArtToken");
const ArtKDevTokenSale = artifacts.require("ArtKDevTokenSale");


/*require('chai')                             // chai
.use(require('chai-as-promised'))
.should()*/

function tokens(n) {
  return web3.utils.toWei(n, 'ether')
}

contract('ArtKDevTokenSale', (accounts) => {
  let tokenContract, tokenSale, tokenPrice, buyer;
  
  //console.log(ArtToken)

  before(async () => {
    tokenPrice = 10000000000000
    tokenContract = await ArtToken.new()
    //console.log(tokenContract)
    tokenSale = await ArtKDevTokenSale.new(tokenContract.address, tokenPrice);

    await token.transfer(tokenSale.address, tokens('1000000')) 

    
    buyer = accounts[1];
  })

  describe('Token deployment', async () => {
    it('Token has a name', async () => {
        const name = await tokenContract.name()
        assert.equal(name, 'ArtKDev', 'coin name is correct')
    })
  })

  describe('ArtKDevTokenSale deployment', async () => {
    it('deployed contract', async () => {
      let address = tokenSale.address
      assert.notEqual(address, 0x0, 'has correct address')
      assert.notEqual(address, '', 'has correct address')
      assert.notEqual(address, null, 'has correct address')
      assert.notEqual(address, undefined, 'has correct address')
  
      price = await tokenSale.price()
      assert.equal(price.toNumber(), tokenPrice, 'token price correct')
    })

    it('ArtKDevTokenSale has a tokens', async () => {
      let balance = await tokenContract.balanceOf(tokenSale.address)

      let balanceDeveloper = await tokenContract.balanceOf(accounts[0])
      console.log(balanceDeveloper.toNumber())
      console.log(balance.toNumber())
      assert.equal(balance.toNumber(), 1000000)
    })
  })

  it('token buying', async () => {

    numberOfTokens = 10
    let result = await tokenSale.buyToken(numberOfTokens, {from: buyer, value: numberOfTokens * tokenPrice} )

    eventBuy = result.logs[0]
    assert.equal(result.logs.length, 1, "logs length is correct")
    //console.log(eventBuy)
    assert.equal(eventBuy.args._buyer, buyer, "logs _buyer account is correct")
    assert.equal(eventBuy.args._amount.toNumber(), 10, "logs _amount account is correct")
    assert.equal(eventBuy.event, 'Sell', "logs event name is correct")

    amount =  await tokenSale.tokenSold()
    //console.log(amount.toNumber())
    assert.equal(amount.toNumber(), numberOfTokens, 'token price correct')

    // Failure
    /*await tokenSale.buyToken(numberOfTokens, {from: buyer, value: 1 } ).should.be.rejected
    await tokenSale.buyToken(1000001, {from: buyer, value: numberOfTokens * tokenPrice } ).should.be.rejected*/
    
  });
  

  
 
})