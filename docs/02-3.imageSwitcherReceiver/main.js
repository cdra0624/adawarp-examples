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

peer.on('connection', function(conn) {
    connectedData = conn;
    document.getElementById("peer-id").innerHTML = conn.peer;
    conn.on('data', function(data){
        console.log(data);
        document.getElementById("receive_message").innerHTML = data;
        switchImage(data);
    });
});

peer.on('call', function(call){
    connectedCall = call;
    document.getElementById("peer-id").innerHTML = call.peer;
    call.answer(localStream);
 
    call.on('stream', function(stream){
        var url = URL.createObjectURL(stream);
        document.getElementById("peer-video").src = url;
    });
});

function displayMyCamera(){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        document.getElementById("my-video").src = URL.createObjectURL(stream);
    }, function() { alert("Error!"); });
}

function switchImage(command)
{
  if (command == 'pro') {
    document.getElementById("pro").style.display="block";
    document.getElementById("go").style.display="none";
    document.getElementById("warp").style.display="none";
  }
  else if (command == 'go') {
    document.getElementById("pro").style.display="none";
    document.getElementById("go").style.display="block";
    document.getElementById("warp").style.display="none";
  }
  else if (command == 'warp') {
    document.getElementById("pro").style.display="none";
    document.getElementById("go").style.display="none";
    document.getElementById("warp").style.display="block";
  } 
  else {
    document.getElementById("pro").style.display="none";
    document.getElementById("go").style.display="none";
    document.getElementById("warp").style.display="none";
  }
}
