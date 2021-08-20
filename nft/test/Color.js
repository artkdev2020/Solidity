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

        it('only owner', async () => {
            let owner = await color.owner()
            assert.equal(owner, accounts[0])
        })
    })

    describe('minting', async() => {
        it('creates a new token', async () => {  
            const result = await color.mint('#EC058E')
            const totalSupply = await color.totalSupply()
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            //console.log(event)
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')

            // new color owner
            const colorOwner = await color.colorOwner('#EC058E')
            const ownerToken = await color.ownerOf(1)
            
            console.log(colorOwner)
            console.log(ownerToken)
            assert.equal(colorOwner, accounts[0], 'owner is correct')

            //FAILURE : cannot mint color twice 
            await color.mint('#EC058E').should.be.rejected

            // 
        }) 
    })

    describe('indexing', async() => {
        it('//lists color', async () => {  
            // Mint 3 token
            await color.mint('000000')
            await color.mint('FFFFFF')
            await color.mint('5386E4')

            const totalSupply = await color.totalSupply()

            let _color
            let result = []

            for(var i = 1; i <= totalSupply; i++) {
                _color = await color.colors(i - 1);
                result.push(_color)
            }

            let expected = ['#EC058E', '000000', 'FFFFFF', '5386E4']
            // SUCCESS
            assert.equal(result.join(','), expected.join(','))   
        }) 
    })
})
