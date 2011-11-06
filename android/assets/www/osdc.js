
var networkState = null, 
	remoteSiteLoaded = false,
	urlBase = "https://docs.google.com/spreadsheet/pub?key=0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc&output=html";

// A world of Global variables
var	scheduleItems = [],
	scheduleItemsById = {},
	speakers = {}, // map speaker to list of scheduleItem info
	sessions = []; // map session to scheduleItem info

function onDeviceReady() {
	alert("Phonegap is ready!");
	//document.addEventListener("resume", onResume, false);
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
		}
		remoteSiteLoaded = true;
		return true;
}


//Load the data for a specific session, based on
//the URL passed in. Generate markup for the items in the
//category, inject it into an embedded page, and then make
//that page the current active page.
function showSession( urlObj, options )
{
	
	var scheduleId = urlObj.hash.replace( /.*session=/, "" ),

		// Get the object that represents the category we
		// are interested in. Note, that at this point we could
		// instead fire off an ajax request to fetch the data, but
		// for the purposes of this sample, it's already in memory.
		

		// The pages we use to display our content are already in
		// the DOM. The id of the page we are going to write our
		// content into is specified in the hash before the '?'.
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	

	
	var session = scheduleItemsById[ scheduleId ];
	console.log(session);
	
	
	if ( session ) {
		// Get the page we are going to dump our content into.
		var $page = $( pageSelector ),

			// Get the header for the page.
			$header = $page.children( ":jqmData(role=header)" ),

			// Get the content area element for the page.
			$content = $page.children( ":jqmData(role=content)" )

			

		

		// Find the h1 element in our header and inject the name of
		// the category into it.
		$header.find( "h1" ).html( session.speaker + " - " + session.topic);

		// Inject the category items markup into the content element.
		var sessionDetail = Handlebars.compile($("#sessionDetailTemplate").html());
		$content.html( sessionDetail(session) );

		// Pages are lazily enhanced. We call page() on the page
		// element to make sure it is always enhanced before we
		// attempt to enhance the listview markup we just injected.
		// Subsequent calls to page() are ignored since a page/widget
		// can only be enhanced once.
		$page.page();

		
		// We don't want the data-url of the page we just modified
		// to be the url that shows up in the browser's location field,
		// so set the dataUrl option to the URL for the category
		// we just loaded.
		options.dataUrl = urlObj.href;

		// Now call changePage() and tell it to switch to
		// the page we just modified.
		$.mobile.changePage( $page, options );
	}
}


//Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if ( typeof data.toPage === "string" ) {
		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#sessionDetail/;
		if ( u.hash.search(re) !== -1 ) {
			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			showSession( u, data.options );

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
	}
});


function extractSessionInfo(id, textToParse, room, scheduleItem, existingSpeakers, existingSessions) {
	
	if (textToParse.indexOf("-") > -1) {
		// ok we have a speaker
		var speakerAndTopic = textToParse.split(" - ");
		var speaker = $.trim(speakerAndTopic[0]);
		var topic = $.trim(speakerAndTopic[1]);
		var sessionInfo = { id: id, room: room, time: scheduleItem.time, minutes: scheduleItem.minutes,
							speaker: speaker, topic: topic,  text: textToParse }
		if (speaker in existingSpeakers) {
			existingSpeakers[speaker].push(sessionInfo);
		} else {
			existingSpeakers[speaker] = [ sessionInfo ];
		}
		
		existingSessions.push(sessionInfo);
		scheduleItemsById[id] = sessionInfo; 
		
		
	}
	
	
}


function renderSchedule() {
	
	var scheduleTemplate = Handlebars.compile($("#scheduleItem").html());
	var speakerTemplate = Handlebars.compile($("#speakerItem").html());
	var sessionTemplate = Handlebars.compile($("#sessionItem").html());
	
	var scheduleItem = {};
	
	
	$(osdcData.data).each(function(idx, element) {
		
		switch (idx % 5) {
		
		case 0: 
			scheduleItem.time = element;
			break;
			
		case 1:
			scheduleItem.minutes = element;
			break;
			
		case 2:
			scheduleItem.room1 = element;
			extractSessionInfo(idx, element, "Room 1", scheduleItem, speakers, sessions)
			break;
			
		case 3:
			scheduleItem.room2 = element;
			extractSessionInfo(idx, element, "Room 2", scheduleItem, speakers, sessions)
			break;
			
		case 4:
			scheduleItem.room3 = element;
			extractSessionInfo(idx, element, "Room 3", scheduleItem, speakers, sessions)
			scheduleItems.push(scheduleItem)
			scheduleItem = new Object()
			break;			
		
		}
		
		
	});
	
	//alert("Processed: " + scheduleItems.length + " entries");
	
	$(scheduleItems).each(function(idx,nextScheduleItem) {
		
		var html = scheduleTemplate(nextScheduleItem);
		$("#scheduleGrid").append(html);
		
	});
	
	sessions.sort(function(a, b) {
		if (a.topic < b.topic) return -1;
		if (a.topic == b.topic) return 0;
		if (a.topic > b.topic) return 1;
	}); // alpha sort? 
	 
	$(sessions).each(function(idx,nextSession) {
		
		var html = sessionTemplate(nextSession);
		$("#sessionList").append(html);
		
	});
	
	var speakerNames = Object.keys(speakers);
	speakerNames.sort();
	
	$(speakerNames).each(function(idx, speaker) {
		var html = speakerTemplate({ speaker : speaker, 
			count : speakers[speaker].length,
			id : speakers[speaker][0].id });
		
		$("#speakerList").append(html);
	
	});
		
}

function fetchImage(ele) {
	alert("Fetching image for " + ele);
    navigator.camera.getPicture(function (imageData) {
        
         alert("all good");
         $(ele).src('data:image/png;base64,' + imageData);
        
    }, function (message) {
        alert('camera failure: ' + message);
    }, {
        quality: 50
    });
}




$(document).ready(function() {
	
	$.mobile.minScrollBack = 1000;
	
	$('.m-page').live('swiperight',function(event){
		 $.mobile.changePage( "#home", { transition: "slide", reverse: true} );
	 });
	
	
	setTimeout(function() {
		loadRemoteSiteContent();
	}, 1000);
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	renderSchedule();
	
});







