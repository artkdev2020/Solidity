const { assert } = require('chai');

const EthSwap = artifacts.require("EthSwap");

require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

contract('EthSwap', ([deployer, bayer, seller]) => {
    let ethSwap

    before(async () => {
        ethSwap = await EthSwap.deployed()
    })

    describe('deployment', async () => {
        it('deploy successfully', async () => {

            const address = ethSwap.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })



    })

})

