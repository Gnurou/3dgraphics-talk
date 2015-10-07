var libSources = {
'reveal' : [ 'lib/reveal.js/', 'https://rawgit.com/hakimel/reveal.js/master/' ],
'three' : [ 'lib/three.js/', 'https://rawgit.com/mrdoob/three.js/r71/' ],
'threex.windowresize' : [ 'lib/threex.windowresize/', 'https://rawgit.com/jeromeetienne/threex.windowresize/master/' ],
'tween' : [ 'lib/tween.js/', 'https://rawgit.com/tweenjs/tween.js/master/' ],
'raphael' : [ 'lib/raphael/', 'https://rawgit.com/DmitryBaranovskiy/raphael/master/' ],
};

function getLibFile(lib, file, path)
{
	var idx;

	if (window.location.protocol === 'file:') {
		idx = 0;
	} else {
		idx = 1;
		path = null;
	}

	var r = (path || '') + libSources[lib][idx] + file;
	return r;
}

function addScript(lib, script, path)
{
	document.write('<script type="text/javascript" src="' + getLibFile(lib, script, path) + '"></' + 'script>');
}

function addCSS(lib, css, extra)
{
	document.write('<link rel="stylesheet" type="text/css" href="' + getLibFile(lib, css) + '"' + (extra || '') + '>');
}
