
var networkState = null, 
	remoteSiteLoaded = false,
	urlBase = "https://docs.google.com/spreadsheet/pub?key=0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc&output=html";



function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
}

function onResume() {
	// App is stopped and started
	 
}

function loadRemoteSiteContent() {
		if (remoteSiteLoaded === false) {
			if (typeof(navigator.network) === "undefined") {
				return false;
			} else if(navigator.network.connection.type === Connection.NONE || (device.platform.startsWith("iP") && navigator.network.connection.type === Connection.UNKNOWN)) {
				// iPhone/iPad returns "UNKNOWN" when no connected, but Android returns that for 3G!
				return false;
				
			} else {
				
				//TODO: Load remote site here
				
				
			}
		remoteSiteLoaded = true;
		return true;
}




$(document).ready(function() {
	
	$.mobile.minScrollBack = 1000;
	
	$('.m-page').live('swiperight',function(event){
		 $.mobile.changePage( "#m-home", { transition: "slide", reverse: true} );
	 });
	
	$('#m-home').live('pagebeforehide', checkPageTransitionsAreOk);
	
	setTimeout(function() {
		loadRemoteSiteContent();
	}, 1000);
	
	$("#m-menu-box-left").click(function() { $.mobile.changePage( "#m-schedule"); pageTuning(); });
	$("#m-menu-box-centre").click(function() { $.mobile.changePage( "#m-speakers"); pageTuning(); });
	$("#m-menu-box-right").click(function() { $.mobile.changePage( "#m-sessions"); pageTuning(); });
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
});







