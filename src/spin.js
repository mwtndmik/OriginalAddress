"use strict";
exports.__esModule = true;
var $ = require("jquery");
function dispLoading(msg) {
    // 画面表示メッセージ
    var dispMsg = "<div class='loadingMsg'>" + msg + "</div>";
    // ローディング画像が表示されていない場合のみ出力
    if ($("#loading").length == 0) {
        $("body").append("<div id='loading'>" + dispMsg + "</div>");
    }
}
exports.dispLoading = dispLoading;
function removeLoading() {
    $("#loading").remove();
}
exports.removeLoading = removeLoading;
