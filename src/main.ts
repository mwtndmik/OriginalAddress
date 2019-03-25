import {searchMnemonic} from './generate';
import {saveAs} from 'file-saver';
import * as spin from './spin';

function getSearchString():string{
    const idname = "searchString";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    return element.value.replace(/\s+/g, "");
}


function setAddress(text:string){
    const idname = "foundAddress";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    element.value = text;
}

function getMnemonic():string{
    const idname = "mnemonic";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    return element.value;
}

function setMnemonic(text:string){
    const idname = "mnemonic";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    element.value = text;
}

function isDownloadChecked():boolean{
    const idname = "downloadCheckbox";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    return element.checked;
}

function addCalcTime():void{
    const text:string = getSearchString();
    const time = calcTime(text);
    const idname = "displayTime"
    let displayString:string;
    if(text.length == 0){
        displayString = "";
    }else if(!isValidBase58(text)){
        document.getElementById(idname).style.color = "red";
        displayString = "include invalid string, can use 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    }else{
        document.getElementById(idname).style.color = "black";
        displayString = "take about " + calcTime(text);
    }

    document.getElementById(idname).innerHTML = displayString;
  }

function calcTime(text:string):string{
    if(text.length === 1){
        return "1 sec";
    }else if(text.length === 2){
        return "1 min";
    } else if(text.length === 3){
        return "20 min";
    } else{
        return (20 * (58 ** (text.length - 4))).toString() + " hours"
    }
}

function showPriv(){
    const idname = "mnemonic";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    element.setAttribute("type", "text");
}

function hidePriv(){
    const idname = "mnemonic";
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById(idname);
    element.setAttribute("type", "password");
}

function copyAddress(){
    const id = "foundAddress"
    const copyText: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied generated BTC Address: " + copyText.value);
  }

function copyMnemonic(){
    const id = "mnemonic"
    const copyText: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied Mnemonic (Pass Phrase)");
}

function isValidBase58(text:string):boolean{
    return text.match(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]/) === null;
}

function onClickStart(){
    const searchString:string = getSearchString();
    if (searchString.length == 0 || !isValidBase58(searchString)){
        addCalcTime();
    }else{
        const isDownload = isDownloadChecked();
        const wait = (milliseconds:number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

        Promise.resolve()
        .then( () => spin.dispLoading("Generating<br>Reload if you restart.") )
        .then( () => wait(1000) )
        .then( () => onClickGenerate(searchString) )
        .then( () => spin.removeLoading() )
        .then( () => {if(isDownload) onClickDownload();} );
    }
}

function onClickGenerate(searchString: string){
    const mnemonic = searchMnemonic(searchString);
    setAddress(mnemonic.toAddress());
    setMnemonic(mnemonic.toString());
    //change startButton to success comment
    let startButton = document.getElementById("startButton");
    let change = document.createElement("div");
    change.className = "alert alert-success";
    change.setAttribute("role", "alert");
    change.textContent = "Success!";
    startButton.parentNode.replaceChild(change,startButton);
    document.getElementById("downloadAlert").innerHTML = "After import mnemonic to wallet, you have to generate address " + mnemonic.index.toString() + " times on wallet app.";
}

function onClickDownload(){
    if(getMnemonic().length == 0){
        document.getElementById("downloadAlert").innerHTML = "Not generated yet.";
    }else{
        const searchString = getSearchString();
        const mnemonicString = getMnemonic();
        const blob = new Blob([mnemonicString], {type: "text/plain;charset=utf-8"});
        saveAs(blob, searchString + "-mnemonic.txt");
    }
}

document.getElementById("searchString").onkeyup = () => addCalcTime();
document.getElementById("copyAddress").onclick = () => copyAddress();
document.getElementById("passEye").onmousedown = () => showPriv();
document.getElementById("passEye").onmouseup = () => hidePriv();
document.getElementById("passEye").onmouseout = () => hidePriv();
document.getElementById("copyPriv").onclick = () => copyMnemonic();
document.getElementById("startButton").onclick = () => onClickStart();
document.getElementById("downloadMnemonic").onclick = () => onClickDownload();
