const { assert } = require('chai');
const { contracts_build_directory } = require('../truffle-config');

var Color = artifacts.require("Color");

require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

contract('Color', async (accounts) => {
    let color
    before(async () => {
        color = await Color.deployed()
    }) 

    describe('deployment', async() => {
        it('deploys successfully', async () => {       
            const address = color.address

            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            let name = await color.name()
            assert.equal(name, 'Color')
        })

        it('has a symbol', async () => {
            let symbol = await color.symbol()
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async() => {
        it('creates a new token', async () => {  
            const result = await color.mint('#EC058E')

            const totalSupply = await color.totalSupply()
            console.log(totalSupply)
            // SUCCESS
            assert.equal(totalSupply, 1)
        
        })

        
    })
})
