var socket = null;

function initialize() {
	var canvas = document.getElementById("board");
	var ctx = canvas.getContext("2d");
	var img = document.getElementById("background_img");
	ctx.drawImage(img, 0, 0);
	socket = new WebSocket("ws://localhost:8080/WebsocketHome/websocket/story/notifications");
	socket.onmessage = onSocketMessage;
	console.log("");
}

function drag(ev) {
	var bounds = ev.target.getBoundingClientRect();
	var draggedSticker = {
		sticker: ev.target.getAttribute("data-sticker"),
		offsetX: ev.clientX - bounds.left,
		offsetY: ev.clientY - bounds.top
	};
	var draggedText = JSON.stringify(draggedSticker);
	ev.dataTransfer.setData("text", draggedText);
}

function drop(ev) {
	ev.preventDefault();
	var bounds = document.getElementById("board").getBoundingClientRect();
	var draggedText = ev.dataTransfer.getData("text");
	var draggedSticker = JSON.parse(draggedText);
	console.log(draggedSticker);
	var stickerToSend = {
		action: "add",
		x: Math.round(ev.clientX - draggedSticker.offsetX - bounds.left),
		y: Math.round(ev.clientY - draggedSticker.offsetY - bounds.top),
		sticker: draggedSticker.sticker
	};
	socket.send(JSON.stringify(stickerToSend));
	log("Sending Object " + JSON.stringify(stickerToSend));
}

function allowDrop(ev) {
	ev.preventDefault();
}

function onSocketMessage(event) {
	if (event.data) {
		var receivedSticker = JSON.parse(event.data);
		log("Received Object: " + JSON.stringify(receivedSticker));
		if (receivedSticker.action === "add") {
			var imageObj = new Image();
			imageObj.onload = function() {
				var canvas = document.getElementById("board");
				var context = canvas.getContext("2d");
				context.drawImage(imageObj, receivedSticker.x, receivedSticker.y);
			};
			imageObj.src = "images/stickers/" + receivedSticker.sticker;
		}
	}
}

function toggleLog() {
	var log = document.getElementById("logContainer");
	if (!log.getAttribute("style")) {
		log.setAttribute("style", "display:block;");
	} else {
		log.setAttribute("style", "");
	}
}

var logCount = 0;
function log(logstr) {
	var logElement = document.getElementById("log");
	logElement.innerHTML = "<b>[" + logCount + "]: </b>" + logstr + "<br>" + logElement.innerHTML;
	logCount++;
}

window.onload = initialize;