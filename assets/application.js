var watchedPoint;
var PMS = "http://192.168.0.200:32400";

function loadPage(url)
{
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.send();
}

atv.player.playerTimeDidChange = function(time)
{
        if (time>watchedPoint)
        {
            watchedPoint = watchedPoint * 2; // hack to stop it from repeatedly setting the Watched Flag.
            //atv.loadURL(PMS + "/:/scrobble?key=" + atv.sessionStorage['ratingKey'] + "&identifier=com.plexapp.plugins.library"); //Crap can't use atv.page loader
            loadPage(PMS + "/:/scrobble?key=" + atv.sessionStorage['ratingKey'] + "&identifier=com.plexapp.plugins.library"); // So we'll roll our own :)
        }
};

atv.player.willStartPlaying = function()
{	
        watchedPoint = parseInt(atv.sessionStorage['duration']); // Grab video duration from python server.
        watchedPoint = ((watchedPoint/100000)*95); // Calculate the 95% time point in seconds.
};

atv.config = { 
    "doesJavaScriptLoadRoot": true,
    "DEBUG_LEVEL": 4
};

atv.onAppEntry = function()
{
    fv = atv.device.softwareVersion.split(".");
    firmVer = fv[0] + "." + fv[1];
    if (parseFloat(firmVer) >= 5.1)
    {
        atv.loadURL("http://trailers.apple.com/plexconnect.xml");
    }
    else
    {
        atv.loadURL("http://trailers.apple.com/plexconnect_oldmenu.xml");
    }
}
