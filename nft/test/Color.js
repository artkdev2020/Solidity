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
            const colorName = await color.colorsName(1)
            const ownerToken = await color.ownerOf(1)  
            //console.log(colorName)
            //console.log(ownerToken)
            assert.equal(colorName, '#EC058E', 'color name is correct')
            assert.equal(ownerToken, accounts[0], 'owner is correct')
            //FAILURE : cannot mint color twice 
            await color.mint('#EC058E').should.be.rejected
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

    describe('trunsfering', async() => {
        it('transfer', async () => {  
            // get old color owner
            const oldOwner = await color.ownerOf(1)
            // transfer
            const result = await color.trunsfer("0x4F7CCfd2e0629C334Aa5ef9E5dd91371FB90C603", 1)
            //get new owner
            const newOwner = await color.ownerOf(1)
            // SUCCESS
            assert.equal(newOwner, '0x4F7CCfd2e0629C334Aa5ef9E5dd91371FB90C603', 'owner is correct')

            const event = result.logs[0].args
            console.log(result)
            console.log(event)
    
            //FAILURE : cannot mint color twice 
            await color.trunsfer("0xf9eF33f1fc3FD3bBaBc2A8b552ce64d10cC0cC2e", 1).should.be.rejected

        }) 
    })
})
