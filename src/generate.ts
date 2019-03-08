const Mnemonic = require('bitcore-mnemonic');

export class MnemonicIterator{
    mnemonic:any; //Mnemonic
    index:number = 0;
    addressSeed:any; //HDPublicKey
    constructor(mnemonic:any){
        this.mnemonic = mnemonic
        this.addressSeed = mnemonic.toHDPrivateKey().derive( "m/44'/0'/0'/0" ).hdPublicKey;
    }

    toAddress():string{
        return this.addressSeed.derive( "m/" + this.index.toString() ).publicKey.toAddress().toString();
    }

    toNext(){
        if(this.index < 20){
            this.index += 1;
        }
        else{
            this.mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
            this.addressSeed = this.mnemonic.toHDPrivateKey().derive( "m/44'/0'/0'/0" ).hdPublicKey;
            this.index = 0;
        }
    }

    toString():string {
        return this.mnemonic.toString();
    }

    toPrivateKey():string{
        return this.mnemonic.toHDPrivateKey().derive( "m/44'/0'/0'/0/" + this.index.toString() ).privateKey.toString();
    }
}

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

export function searchMnemonic(searchString:string):MnemonicIterator{
    let mnemonic = new MnemonicIterator(new Mnemonic(Mnemonic.Words.ENGLISH));
    while( mnemonic.toAddress().slice(1,searchString.length+1) !== searchString){
            mnemonic.toNext();   
    }
    
    return mnemonic;
}