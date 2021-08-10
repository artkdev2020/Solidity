const { assert } = require('chai');

const News = artifacts.require("News");     // dependencies
                                            // connect smart contract
require('chai')                             // chai
.use(require('chai-as-promised'))
.should()

contract('News', ([deployer, author, tipper]) => {
    let news

    before(async () => {
        news = await News.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            
            const address = news.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await news.name()
            assert.equal(name, "ArtKDev development")
        })
    })

   

    describe('posts', async () => {
        let result, postCount
        before(async () => {
            result = await news.createPost('This is my first post', { from: author})
            postCount = await news.postCount()
        })

        it('creates posts', async () => {

            const event  = await result.logs[0].args
            // success
            assert.equal(postCount, 1)
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, 'This is my first post', 'content is correct')
            assert.equal(event.tipAmount, '0', 'tipAmount is correct')
            assert.equal(event.author, author, 'author is correct')

            await news.createPost('', { from: author}).should.be.rejected;
        })

        it('lists posts', async () => {
            const post = await news.posts(postCount);
             // success
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.content, 'This is my first post', 'content is correct')
            assert.equal(post.tipAmount, '0', 'tipAmount is correct')
            assert.equal(post.author, author, 'author is correct')
        })

        it('allows users to tip posts', async () => {
            // Track the author balance before purchase
            let oldAuthorBalance
            oldAuthorBalance = await web3.eth.getBalance(author)
            oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

            result = await news.tipPost(postCount, { from :tipper, value: web3.utils.toWei('1', 'Ether')})
            const event  = await result.logs[0].args
            // success
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, 'This is my first post', 'content is correct')
            assert.equal(event.tipAmount, web3.utils.toWei('1', 'Ether'), 'tipAmount is correct')
            assert.equal(event.author, author, 'tipper is correct')

            // Check that author received funds
            let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('1', 'Ether')
            tipAmount = new web3.utils.BN(tipAmount)

            const expectedBalance = oldAuthorBalance.add(tipAmount)
            // success
            assert.equal(expectedBalance.toString(), newAuthorBalance.toString(), 'Amount is correct')

            // Failure : Tries to tip a post that does not exist
            await news.tipPost(99, { from :tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
        })
    })
})