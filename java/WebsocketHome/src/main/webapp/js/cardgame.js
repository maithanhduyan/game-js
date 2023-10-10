"use strict";
var Game = {};

Game.fps = 30;
Game.socket = null;


Game.initialize = function() {
	//var canvas = document.getElementById('playground');

	if (window.location.protocol == 'http:') {
		Game.connect('ws://' + window.location.host + '/WebsocketHome/websocket/cardgame');
	} else {
		Game.connect('wss://' + window.location.host + '/WebsocketHome/websocket/cardgame');
	}
}

Game.connect = (function(host) {
	if ('WebSocket' in window) {
		Game.socket = new WebSocket(host);
		console.log('WebSocket connected.');
	} else if ('MozWebSocket' in window) {
		Game.socket = new MozWebSocket(host);
		console.log('WebSocket connected.');
	} else {
		console.log('Error: WebSocket is not supported by this browser.');
		return;
	}
});




Game.initialize();