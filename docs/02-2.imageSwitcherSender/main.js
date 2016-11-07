navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
var localStream;
var connectedCall;
 
var peer = new Adawarp();
var connectedData = null;

window.onload = function(){
    displayMyCamera();
    getMyID();
    peer.login();
    switchImage(null);
}

function getMyID() {
    peer.on('open', function(){
        document.getElementById("my-id").innerHTML = peer.id;
    });
}

function displayMyCamera(){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        document.getElementById("my-video").src = URL.createObjectURL(stream);
    }, function() { alert("Error!"); });
}

function callStart(){
    conn = peer.connect(peer_id);
    connectedData = conn;
    conn.on('open', function() {
        conn.send('HelloWorld');
    });
    var peer_id = document.getElementById("peer-id-input").value;
    var call = peer.call(peer_id, localStream);
    connectedCall = call;
    call.on('stream', function(stream){
        document.getElementById("peer-id").innerHTML = peer_id;
        var url = URL.createObjectURL(stream);
        document.getElementById("peer-video").src = url;
    });
}

function callEnd() {
    console.log("connection close");
    connectedCall.close();
    connectedData.close();
}

function sendPro() {
    console.log("Send Pro!");
    if (connectedData !== null) connectedData.send('pro');
}

function sendGo() {
    console.log("Send Go!");
    if (connectedData !== null) connectedData.send('go');
}

function sendWarp() {
    console.log("Send Warp!");
    if (connectedData !== null) connectedData.send('warp');
}