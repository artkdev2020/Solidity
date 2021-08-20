const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', ([deployer, bayer, seller]) => {
    let token, ethSwap

    before(async () => {
        token = await Token.new()
        ethSwap = await EthSwap.new(token.address)
        // transfer all tokens
        await token.transfer(ethSwap.address, tokens('1000000')) 
    })

    describe('Token deployment', async () => {
        it('Token has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'DApp Token')
            //console.log(name)
        })
    })

    describe('EthSwap deployment', async () => {
        it('EthSwap has a name', async () => {
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
            //console.log(name)
        })

        it('EthSwap has a tokens', async () => {
            let balance = await token.balanceOf(ethSwap.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })


   

})

