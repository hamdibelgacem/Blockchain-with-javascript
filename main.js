const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash= ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }
    createGenesisBlock(){
        return new Block(0, "29/12/2017", "Genesis block", "0");
    }

    getLatestBlock(){
      return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        // invalid block
        for(let i=1; i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        // else isValid block
        return true;
    }

}

let blockchain = new Blockchain();
blockchain.addBlock(new Block(1,"01/01/2018",{amount: 4}));
blockchain.addBlock(new Block(2, "02/01/2018", {amount: 8}));

console.log('is blockchain is valid?'+blockchain.isChainValid())
// change the data of block 1
blockchain.chain[1].data = {amount: 100};
console.log('is blockchain valid?'+ blockchain.isChainValid())

//console.log(JSON.stringify(blockchain,null,4));