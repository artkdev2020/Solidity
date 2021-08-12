const { assert } = require('chai');
const { contracts_build_directory } = require('../truffle-config');

var Color = artifacts.require("Color");

require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

contract('Color', async (accounts) => {

    describe('deployment', async() => {
        let color
        before(async () => {
            color = await Color.deployed()
        }) 

        it('deploys successfully', async () => {       
            const address = color.address

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })
})
