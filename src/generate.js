"use strict";
exports.__esModule = true;
var Mnemonic = require('bitcore-mnemonic');
var MnemonicIterator = /** @class */ (function () {
    function MnemonicIterator(mnemonic) {
        this.index = 0;
        this.mnemonic = mnemonic;
        this.addressSeed = mnemonic.toHDPrivateKey().derive("m/44'/0'/0'/0").hdPublicKey;
    }
    MnemonicIterator.prototype.toAddress = function () {
        return this.addressSeed.derive("m/" + this.index.toString()).publicKey.toAddress().toString();
    };
    MnemonicIterator.prototype.toNext = function () {
        if (this.index < 20) {
            this.index += 1;
        }
        else {
            this.mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
            this.addressSeed = this.mnemonic.toHDPrivateKey().derive("m/44'/0'/0'/0").hdPublicKey;
            this.index = 0;
        }
    };
    MnemonicIterator.prototype.toString = function () {
        return this.mnemonic.toString();
    };
    MnemonicIterator.prototype.toPrivateKey = function () {
        return this.mnemonic.toHDPrivateKey().derive("m/44'/0'/0'/0/" + this.index.toString()).privateKey.toString();
    };
    return MnemonicIterator;
}());
exports.MnemonicIterator = MnemonicIterator;
/*
export function searchMnemonic(searchString:string):Promise<MnemonicIterator>{
    return new Promise((resolve, reject) => {
        let mnemonic = new MnemonicIterator(new Mnemonic(Mnemonic.Words.ENGLISH));
        while( mnemonic.toAddress().slice(1,searchString.length+1) !== searchString){
            mnemonic.toNext();
        }
    
        resolve(mnemonic);
    })
}
*/
function searchMnemonic(searchString) {
    var mnemonic = new MnemonicIterator(new Mnemonic(Mnemonic.Words.ENGLISH));
    while (mnemonic.toAddress().slice(1, searchString.length + 1) !== searchString) {
        mnemonic.toNext();
    }
    return mnemonic;
}
exports.searchMnemonic = searchMnemonic;
