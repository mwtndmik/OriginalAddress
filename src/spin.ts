export function dispLoading(msg:string):Promise<string>{
  return new Promise((resolve, reject)=>{
    // 画面表示メッセージ
    var dispMsg = "<div class='loadingMsg'>" + msg + "</div>";
    // ローディング画像が表示されていない場合のみ出力
    //if(isNull(document.querySelector("#loading"))){
      document.body.insertAdjacentHTML('beforeend', "<div id='loading'>" + dispMsg + "</div>");
    //}
    resolve("OK")
  })
  }

export async function removeLoading(){
    document.getElementById("loading").remove();
}