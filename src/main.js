"use strict";
exports.__esModule = true;
var generate_1 = require("./generate");
var file_saver_1 = require("file-saver");
var spin = require("./spin");
function getSearchString() {
    var idname = "searchString";
    var element = document.getElementById(idname);
    return element.value.replace(/\s+/g, "");
}
function setAddress(text) {
    var idname = "foundAddress";
    var element = document.getElementById(idname);
    element.value = text;
}
function getMnemonic() {
    var idname = "mnemonic";
    var element = document.getElementById(idname);
    return element.value;
}
function setMnemonic(text) {
    var idname = "mnemonic";
    var element = document.getElementById(idname);
    element.value = text;
}
function isDownloadChecked() {
    var idname = "downloadCheckbox";
    var element = document.getElementById(idname);
    return element.checked;
}
function addCalcTime() {
    var text = getSearchString();
    var time = calcTime(text);
    var idname = "displayTime";
    var displayString;
    if (text.length == 0) {
        displayString = "";
    }
    else if (!isValidBase58(text)) {
        document.getElementById(idname).style.color = "red";
        displayString = "include invalid string, can use 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    }
    else {
        document.getElementById(idname).style.color = "black";
        displayString = "take about " + calcTime(text);
    }
    document.getElementById(idname).innerHTML = displayString;
}
function calcTime(text) {
    if (text.length === 1) {
        return "1 sec";
    }
    else if (text.length === 2) {
        return "1 min";
    }
    else if (text.length === 3) {
        return "20 min";
    }
    else {
        return (20 * (Math.pow(58, (text.length - 4)))).toString() + " hours";
    }
}
function showPriv() {
    var idname = "mnemonic";
    var element = document.getElementById(idname);
    element.setAttribute("type", "text");
}
function hidePriv() {
    var idname = "mnemonic";
    var element = document.getElementById(idname);
    element.setAttribute("type", "password");
}
function copyAddress() {
    var id = "foundAddress";
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied generated BTC Address: " + copyText.value);
}
function copyMnemonic() {
    var id = "mnemonic";
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied Mnemonic (Pass Phrase)");
}
function isValidBase58(text) {
    return text.match(/[^123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]/) === null;
}
function onClickStart() {
    var searchString = getSearchString();
    if (searchString.length == 0 || !isValidBase58(searchString)) {
        addCalcTime();
    }
    else {
        var isDownload_1 = isDownloadChecked();
        var wait_1 = function (milliseconds) { return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); }); };
        Promise.resolve()
            .then(function () { return spin.dispLoading("Generating<br>Reload if you restart."); })
            .then(function () { return wait_1(1000); })
            .then(function () { return onClickGenerate(searchString); })
            .then(function () { return spin.removeLoading(); })
            .then(function () { if (isDownload_1)
            onClickDownload(); });
    }
}
function onClickGenerate(searchString) {
    var mnemonic = generate_1.searchMnemonic(searchString);
    setAddress(mnemonic.toAddress());
    setMnemonic(mnemonic.toString());
    //change startButton to success comment
    var startButton = document.getElementById("startButton");
    var change = document.createElement("div");
    change.className = "alert alert-success";
    change.setAttribute("role", "alert");
    change.textContent = "Success!";
    startButton.parentNode.replaceChild(change, startButton);
    document.getElementById("downloadAlert").innerHTML = "After import mnemonic to wallet, you have to generate address " + mnemonic.index.toString() + " times on wallet app.";
}
function onClickDownload() {
    if (getMnemonic().length == 0) {
        document.getElementById("downloadAlert").innerHTML = "Not generated yet.";
    }
    else {
        var searchString = getSearchString();
        var mnemonicString = getMnemonic();
        var blob = new Blob([mnemonicString], { type: "text/plain;charset=utf-8" });
        file_saver_1.saveAs(blob, searchString + "-mnemonic.txt");
    }
}
// document.getElementById("searchString").onkeyup = () => addCalcTime();
// document.getElementById("copyAddress").onclick = () => copyAddress();
// document.getElementById("passEye").onmousedown = () => showPriv();
// document.getElementById("passEye").onmouseup = () => hidePriv();
// document.getElementById("passEye").onmouseout = () => hidePriv();
// document.getElementById("copyPriv").onclick = () => copyMnemonic();
// document.getElementById("startButton").onclick = () => onClickStart();
// document.getElementById("downloadMnemonic").onclick = () => onClickDownload();
console.log(isValidBase58("V"));
console.log(!isValidBase58("O"));
console.log(!isValidBase58("-"));
console.log(!isValidBase58("-k"));
console.log(isValidBase58("VK"));
console.log(!isValidBase58("VKO"));
console.log(!isValidBase58("ON"));
console.log(!isValidBase58("ONI"));
