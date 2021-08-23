//const { assert } = require('chai');

const ArtKDevToken = artifacts.require("ArtKDevToken");


/*require('chai')                             // chai
.use(require('chai-as-promised'))
.should()*/

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('ArtKDevToken', (accounts) => {
  it('see the total supply upon deployment', async () => {
    token = await ArtKDevToken.deployed();
    totalSupply = await token.totalSupply();

    console.log(totalSupply)

    //assert.equal(totalSupply.toNumber(), 1000000, 'totalSupply is correct')


  })


})