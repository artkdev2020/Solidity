const { assert } = require('chai');

const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

function tokens(n) {
    return web3.utils.toWei(n, 'Ether');
}

contract('TokenFarm', async ([owner, investor]) => {
    let daiToken, dappToken, tokenFarm;

     before(async () => {
         // load Contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)
         // Transfer all Dapp tokens to farm
         await dappToken.transfer(tokenFarm.address, tokens('1000000'));

         // Send tokens to investor
         await daiToken.transfer(investor, tokens('100'), { from: owner });
    }) 

    describe('Mock Dai deployment', async () => {
        it('has a name', async () => {
            let name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('DApp Token deployment', async () => {
        it('has a name', async () => {
            let name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
            let name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        })
    })

    describe('contract has tokens', async () => {
        it('has a tokens', async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address);   
            assert.equal(balance.toString(), tokens('1000000'), 'tokens is correct');
        })
    })

    describe('farming tokens', async () => {
        it('rewards investors for staking mDai tokens', async () => {
            let result
            //  check investor balance before staking 
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor balance before is no correct ')

            await daiToken.approve(tokenFarm.address, tokens('100'), { from : investor })
            await tokenFarm.stakeTokens(tokens('100'), { from : investor })

            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'investor balance after transaction no correct ')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('100'), 'Farm balance after transaction  no correct ')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'no have staking ')

            // Issue Tokens
            await tokenFarm.issueTokens( {from: owner})

            // Check balance after issuance
            result = await dappToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor Dapp Token wallet balance correct after issuance')

            // only owner can issue  tokens
            await tokenFarm.issueTokens( {from: investor}).should.be.rejected

            await tokenFarm.unstakeTokens( {from: investor })

            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('100'), 'investor balance after staking ')

            result = await daiToken.balanceOf(tokenFarm.address)
            console.log(result.toString())
            assert.equal(result.toString(), tokens('0'), 'investor balance before is no correct ')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('0'), 'tokenFarm balance  correct ')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'false', 'investor stocing status  correct after staking')


        })
    })


})




