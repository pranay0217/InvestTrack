var webSocket   = null;
var ws_protocol = null;
var ws_hostname = null;
var ws_port     = null;
var ws_endpoint = null;
/**
 * Event handler for clicking on button "Connect"
 */
function onConnectClick() {
    var ws_protocol = document.getElementById("protocol").value;
    var ws_hostname = document.getElementById("hostname").value;
    var ws_port     = document.getElementById("port").value;
    var ws_endpoint = document.getElementById("endpoint").value;
	var ws_clientcode = document.getElementById("clientcode").value;
	var ws_apikey = document.getElementById("apikey").value;
	var ws_jwttoken = document.getElementById("jwttoken").value;
    openWSConnection(ws_protocol, ws_hostname, ws_port, ws_endpoint, ws_clientcode, ws_apikey, ws_jwttoken);
}
/**
 * Event handler for clicking on button "Disconnect"
 */
function onDisconnectClick() {
    webSocket.close();
}
/**
 * Open a new WebSocket connection using the given parameters
 */
function openWSConnection(protocol, hostname, port, endpoint, clientcode, apikey, jwttoken) {
    var webSocketURL = null;
    webSocketURL = protocol + "://" + hostname + "/" + endpoint + "?clientcode=" +clientcode + "&&apikey=" + apikey + "&&jwttoken=" + jwttoken;
    console.log("openWSConnection::Connecting to: " + webSocketURL);
    try {
        webSocket = new WebSocket(webSocketURL);
        webSocket.onopen = function(openEvent) {
            console.log("WebSocket OPEN: " + JSON.stringify(openEvent, null, 4));
            document.getElementById("btnSendSub").disabled       = false;
			document.getElementById("btnSendUnsub").disabled       = false;
			document.getElementById("btnSendHearbeat").disabled       = false;
            document.getElementById("btnConnect").disabled    = true;
            document.getElementById("btnDisconnect").disabled = false;
        };
        webSocket.onclose = function (closeEvent) {
            console.log("WebSocket CLOSE: " + JSON.stringify(closeEvent, null, 4));
            document.getElementById("btnSendSub").disabled       = true;
			document.getElementById("btnSendUnsub").disabled       = true;
			document.getElementById("btnSendHearbeat").disabled       = true;
            document.getElementById("btnConnect").disabled    = false;
            document.getElementById("btnDisconnect").disabled = true;
        };
        webSocket.onerror = function (errorEvent) {
            console.log("WebSocket ERROR: " + JSON.stringify(errorEvent, null, 4));
        };
        webSocket.onmessage = function (messageEvent) {
            var wsMsg = messageEvent.data;
            console.log("WebSocket MESSAGE: " + wsMsg);
            if (wsMsg.indexOf("error") > 0) {
                document.getElementById("incomingMsgOutput").value += "error: " + wsMsg.error + "\r\n";
            } else {
                document.getElementById("incomingMsgOutput").value += "message: " + wsMsg + "\r\n";
            }
        };
    } catch (exception) {
        console.error(exception);
    }
}

/**
 * Send a subscribe message to the WebSocket server
 */
function onSendSubscribeClick() {
    if (webSocket.readyState != WebSocket.OPEN) {
        console.error("webSocket is not open: " + webSocket.readyState);
        return;
    }
	var ws_clientcode = document.getElementById("clientcode").value;
	var ws_apikey = document.getElementById("apikey").value;
	var ws_jwttoken = document.getElementById("jwttoken").value;
	
    var msg = {
		"actiontype" : "subscribe",
		"feedtype": "order_feed",
		"jwttoken": ws_jwttoken,
		"clientcode": ws_clientcode,
		"apikey": ws_apikey
	}
    webSocket.send(JSON.stringify(msg));
}


/**
 * Send a unsubscribe message to the WebSocket server
 */
function onSendUnsubscribeClick() {
    if (webSocket.readyState != WebSocket.OPEN) {
        console.error("webSocket is not open: " + webSocket.readyState);
        return;
    }
	var ws_clientcode = document.getElementById("clientcode").value;
	var ws_apikey = document.getElementById("apikey").value;
	var ws_jwttoken = document.getElementById("jwttoken").value;
	
    var msg = {
		"actiontype" : "unsubscribe",
		"feedtype": "order_feed",
		"jwttoken": ws_jwttoken,
		"clientcode": ws_clientcode,
		"apikey": ws_apikey
	}
    webSocket.send(JSON.stringify(msg));
}

/**
 * Send a heartbeat message to the WebSocket server
 */
function onSendHeartbeatClick() {
    if (webSocket.readyState != WebSocket.OPEN) {
        console.error("webSocket is not open: " + webSocket.readyState);
        return;
    }
	var ws_clientcode = document.getElementById("clientcode").value;
	var ws_apikey = document.getElementById("apikey").value;
	var ws_jwttoken = document.getElementById("jwttoken").value;
	
    var msg = {
		"actiontype" : "heartbeat",
		"feedtype": "order_feed",
		"jwttoken": ws_jwttoken,
		"clientcode": ws_clientcode,
		"apikey": ws_apikey
	}
    webSocket.send(JSON.stringify(msg));
}