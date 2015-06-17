var libSources = {
'reveal' : [ 'lib/reveal.js/', 'https://rawgit.com/hakimel/reveal.js/master/' ],
};

function getLibFile(lib, file)
{
	return libSources[lib][0] + file;
}

function addScript(lib, script)
{
	document.write('<script type="text/javascript" src="' + getLibFile(lib, script) + '"></' + 'script>');
}

function addCSS(lib, css, extra)
{
	document.write('<link rel="stylesheet" type="text/css" href="' + getLibFile(lib, css) + '"' + (extra || '') + '>');
}
