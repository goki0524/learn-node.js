// child_processで簡潔にノンブロッキング操作を行える
var exec = require("child_process").exec;

function start(response){
    console.log("Request handler 'start' was called");
    
    // 匿名コールバック関数の中で,responseを使用する（コールバック関数が呼ばれてからresponseに書き込む）
    exec("ls -lah", function(error, stdout, stderr){
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write(stdout);
        response.end();
    });

    // ノンブロッキング確認用のコード（時間のかかる処理が終了したら,コールバック関数が呼ばれる）
    // exec("find /",
    // { timeout: 10000, maxBuffer: 20000*1024 },
    // function (error, stdout, stderr) {
    //   response.writeHead(200, {"Content-Type": "text/plain"});
    //   response.write(stdout);
    //   response.end();
    // });
}

function upload(response){
    console.log("Request handler 'upload' was called");
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hello Upload");
    response.end();
}

exports.start = start;
exports.upload = upload;