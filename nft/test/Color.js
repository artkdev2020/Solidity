/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { assert } = require("chai");
const { contracts_build_directory } = require("../truffle-config");

var Color = artifacts.require("Color");

require("chai") // chai
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("Color", async (accounts) => {
  let color;
  before(async () => {
    color = await Color.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = color.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      let name = await color.name();
      assert.equal(name, "Color");
    });

    it("has a symbol", async () => {
      let symbol = await color.symbol();
      assert.equal(symbol, "COLOR");
    });

    it("only owner", async () => {
      let owner = await color.owner();
      assert.equal(owner, accounts[0]);
    });
  });

  describe("minting", async () => {
    it("creates a new token", async () => {
      const result = await color.mint("#EC058E");
      const totalSupply = await color.totalSupply();
      // SUCCESS
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      //console.log(event)
      assert.equal(event.tokenId.toNumber(), 1, "id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      // new coin
      const coinCount = await color.coinsCount();
      assert.equal(coinCount.toNumber(), 1, "coins Counter is correct");
      // object coin
      const coin = await color.coins(1);
      //console.log(coin)
      assert.equal(coin.id.toNumber(), 1, "id in coin is correct");
      assert.equal(coin.name, "#EC058E", "name in coin is correct");
      assert.equal(coin.price.toNumber(), 0, "color price in coin is correct");
      assert.equal(coin.isForSale, false, "isForSale in coin is correct");

      //FAILURE : cannot mint color twice
      await color.mint("#EC058E").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("//lists color", async () => {
      // Mint 3 token
      await color.mint("000000");
      await color.mint("FFFFFF");
      await color.mint("5386E4");

      const totalSupply = await color.totalSupply();

      let _color;
      let result = [];

      for (var i = 1; i <= totalSupply; i++) {
        _color = await color.colors(i - 1);
        result.push(_color);
      }

      let expected = ["#EC058E", "000000", "FFFFFF", "5386E4"];
      // SUCCESS
      assert.equal(result.join(","), expected.join(","));
    });
  });

  describe("Coin Change", async () => {
    it("openSale", async () => {
      await color.sale(1, true, { from: accounts[0] });

      // look if status change
      const coinAfter = await color.coins(1);
      assert.equal(coinAfter.isForSale, true, "status sale is correct");
      //console.log(coinAfter.isForSale)
    });

    it("changePrice", async () => {
      let payAmount;
      payAmount = web3.utils.toWei("0.01", "Ether");
      payAmount = new web3.utils.BN(payAmount);

      await color.changePrice(1, payAmount, { from: accounts[0] });

      /*let newAuthorBalance
            newAuthorBalance = await web3.eth.getBalance(author)
            newAuthorBalance = new web3.utils.BN(newAuthorBalance)

            let tipAmount
            tipAmount = web3.utils.toWei('1', 'Ether')
            tipAmount = new web3.utils.BN(tipAmount)*/

      // look if price change
      const coinAfter = await color.coins(1);

      let newCoinPrice;
      newCoinPrice = coinAfter.price;
      newCoinPrice = new web3.utils.BN(newCoinPrice);
      //console.log(newCoinPrice.toString())
      assert.equal(
        newCoinPrice.toString(),
        "10000000000000000",
        "price sale is correct"
      );
    });
  });

  describe("transfer coin", async () => {
    it("transfer", async () => {
      // get old color owner
      const oldOwner = await color.ownerOf(1);

      let oldBalance = await web3.eth.getBalance(accounts[0]);
      oldBalance = new web3.utils.BN(oldBalance);

      let payAmount;
      payAmount = web3.utils.toWei("0.01", "Ether");
      payAmount = new web3.utils.BN(payAmount);

      // event sale
      let result = await color.transfer(accounts[0], 1, {
        from: accounts[1],
        value: payAmount,
      });

      // SUCCESS
      const event = result.logs[2].args;
      assert.equal(result.logs[2].event, "Sale", "id is correct");
      assert.equal(event._tokenId, 1, "id is correct");
      assert.equal(
        event._value.toString(),
        "10000000000000000",
        "value is correct"
      );
      assert.equal(event._owner, accounts[0], "from is correct");

      //get new owner
      const newOwner = await color.ownerOf(1);
      assert.equal(newOwner, accounts[1], "owner is correct");

      // need checks balance ???
      let newBalance = await web3.eth.getBalance(accounts[0]);
      newBalance = new web3.utils.BN(newBalance);

      //FAILURE : cannot mint color twice
      await color.transfer(accounts[0], 1, {
        from: accounts[1],
        value: payAmount,
      }).should.be.rejected;
      // cannot transfer color if isForSale false
      await color.transfer(accounts[0], 2, {
        from: accounts[2],
        value: payAmount,
      }).should.be.rejected;

      await color.sale(2, true, { from: accounts[0] });
      await color.changePrice(2, payAmount, { from: accounts[0] });
      // no owner send
      await color.transfer(accounts[1], 2, {
        from: accounts[2],
        value: payAmount,
      }).should.be.rejected;

      payAmount = web3.utils.toWei("0.001", "Ether");
      payAmount = new web3.utils.BN(payAmount);
      // no enough money
      await color.transfer(accounts[0], 1, {
        from: accounts[1],
        value: payAmount,
      }).should.be.rejected;
    });
  });
});
