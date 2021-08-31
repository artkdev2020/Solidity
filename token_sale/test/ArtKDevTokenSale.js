//const { assert } = require('chai');

const ArtKDevTokenSale = artifacts.require("ArtKDevTokenSale");


/*require('chai')                             // chai
.use(require('chai-as-promised'))
.should()*/



contract('ArtKDevTokenSale', (accounts) => {
  let tokenSale, tokenPrice;
  before(async () => {
    tokenSale = await ArtKDevTokenSale.deployed();
    tokenPrice = 10000000000
  })

  it('deployed contract', async () => {

    let address = tokenSale.address
    assert.notEqual(address, 0x0, 'has correct address')
    assert.notEqual(address, '', 'has correct address')
    assert.notEqual(address, null, 'has correct address')
    assert.notEqual(address, undefined, 'has correct address')

    price = await tokenSale.price()
    assert.equal(price.toNumber(), tokenPrice, 'token price correct')
  });

  

  
 
})