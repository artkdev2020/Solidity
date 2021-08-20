const { assert } = require('chai');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', ([deployer, investor, seller]) => {
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

    describe('buyToken()', async () => {
        let result

        // purchase tokens before each example
        before(async () => {
            result = await ethSwap.buyToken({ from: investor, value: web3.utils.toWei('1', 'ether') }) 
        })

        it('Allows user to instantly purchase token from ethSwap for a fix price', async () => {
            
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('1000'), 'balance is correct')

            let ethSwapBalance
            // Check ethSwap balance after purchase
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999000'))

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'ether'), 'correct ethSwap ether balance')

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('1000').toString())
            assert.equal(event.rate.toString(), '1000')
        })
    })

    describe('sellTokens()', async () => {
        let result

        // purchase tokens before each example
        before(async () => {
            await token.approve(ethSwap.address, tokens('1000'), { from: investor })
            result = await ethSwap.sellToken(tokens('1000'), { from: investor }) 
        })

        it('Allows user to instantly sell token to ethSwap for a fixed price', async () => {
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), '0', 'balance is correct')

            let ethSwapBalance
            // Check ethSwap balance after purchase
            ethSwapBalance = await token.balanceOf(ethSwap.address)
        
            assert.equal(ethSwapBalance.toString(), tokens('1000000'))

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), '0', 'correct ethSwap ether balance')

            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.token, token.address)
            assert.equal(event.amount.toString(), tokens('1000').toString())
            assert.equal(event.rate.toString(), '1000')

            // Failure: investor can't sell more token then they have
            await ethSwap.sellToken(tokens('5000'), { from: investor }).should.be.rejected
        })
    })

   

})

