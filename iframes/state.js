var scriptReady = false;
var initComplete = false;

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

function onKeyEvent(event) {
	// In an iFrame, get events from above...
	if (window != window.top)
		return;

	if (event.keyCode == 13)
		nextState();
}

function startFrame(independant = false) {
	scriptReady = true;

	/* In a frame and not independant? don't play */
	if (window != window.top && !independant)
		return;

	function _animate(time) {
		if (animate(time))
			requestAnimationFrame(_animate);
	}

	keepGoing = true;
	requestAnimationFrame(_animate);
}
