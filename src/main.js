"use strict";
exports.__esModule = true;
var generate_1 = require("./generate");
var file_saver_1 = require("file-saver");
var spin = require("./spin");
var $ = require("jquery");
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
        return (20 * Math.pow(58, (4 - text.length))).toString() + " hours";
    }
}
function showPriv() {
    var idname = "privateKey";
    var element = document.getElementById(idname);
    element.setAttribute("type", "text");
}
function hidePriv() {
    var idname = "privateKey";
    var element = document.getElementById(idname);
    element.setAttribute("type", "password");
}
function copyField(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
}
function isValidBase58(text) {
    return /[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]/.test(text);
}
function onClickStart() {
    var searchString = getSearchString();
    if (searchString.length == 0 || !isValidBase58(searchString)) {
        addCalcTime();
    }
    else {
        var isDownload = isDownloadChecked();
        spin.dispLoading("Generating<br>Reload if you want to restart.");
        var mnemonic = generate_1.searchMnemonic(searchString);
        setAddress(mnemonic.toAddress());
        setMnemonic(mnemonic.toString());
        $('startButton').replaceWith('<div class="alert alert-success" role="alert"><strong>Success!</strong> Generated your original BTC address!</a>.</div>');
        spin.removeLoading();
        document.getElementById("downloadAlert").innerHTML = "After import mnemonic to wallet, you have to generate address " + mnemonic.index.toString() + " times";
        if (isDownload) {
            var blob = new Blob([mnemonic.toString()], { type: "text/plain;charset=utf-8" });
            file_saver_1.saveAs(blob, searchString + "-mnemonic.txt");
        }
    }
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
