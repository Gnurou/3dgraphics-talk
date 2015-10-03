var stateAction = [];
var state = 0;
var keepGoing;
var requestedStep = 0;

function nextState() {
	if (state + 1 >= stateAction.length)
		return undefined;

	state += 1;

	return stateAction[state]() || ["", ""];
}

function initFrame() {
	state = 0;
	keepGoing = true;
	if (state >= stateAction.length)
		return undefined;

	ret = stateAction[state]() || ["", ""];
	for (var i = 0; i < requestedStep; i++) {
		ret = nextState();
	}

	return ret;
}

function finiFrame() {
	keepGoing = false;
	stop();
}

function onKeyEvent(event) {
	// In an iFrame, get events from above...
	if (window != window.top)
		return;

	if (event.keyCode == 13)
		nextState();
}

var scriptReady = false;

function startFrame() {
	scriptReady = true;

	initFrame();
	animate();

	/* Not in a frame, start playing */
	if (window != window.top)
		return;

	function _animate(time) {
		if (animate(time))
			requestAnimationFrame(_animate);
	}

	requestAnimationFrame(_animate);
}

var initComplete = false;