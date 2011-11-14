
var networkState = null, 
	remoteSiteLoaded = false,
	urlBase = "https://docs.google.com/spreadsheet/pub?key=0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc&output=html";

// A world of Global variables
var	scheduleItems = [],
	scheduleItemsById = {},
	speakers = {}, // map speaker to list of scheduleItem info
	sessions = []; // map session to scheduleItem info

function onDeviceReady() {
	//document.addEventListener("resume", onResume, false);
}

function onResume() {
	// App is stopped and started
	 
}


function showSession( urlObj, options )
{
	
	var scheduleId = urlObj.hash.replace( /.*session=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" );
	
	
	var session = scheduleItemsById[ scheduleId ];
	
	if ( session ) {
		var $page = $( pageSelector ),
			$header = $page.children( ":jqmData(role=header)" ),
			$content = $page.children( ":jqmData(role=content)" )

		$header.find( "h1" ).html( session.speaker + " - " + session.topic);

		// Inject the category items markup into the content element.
		var sessionDetail = Handlebars.compile($("#sessionDetailTemplate").html());
		$content.html( sessionDetail(session) );

		$page.page();

		options.dataUrl = urlObj.href;

		$.mobile.changePage( $page, options );
	}
}


$(document).bind( "pagebeforechange", function( e, data ) {

	if ( typeof data.toPage === "string" ) {
	
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#sessionDetail/;
		if ( u.hash.search(re) !== -1 ) {

			showSession( u, data.options );

			e.preventDefault();
		}
	}
});


function extractSessionInfo(id, textToParse, room, scheduleItem, existingSpeakers, existingSessions) {
	
	if (textToParse.indexOf("-") > -1) {

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
	
	var now = new Date();
	var foundRightNowItem = false;
	
	
	$(scheduleItems).each(function(idx,nextScheduleItem) {
		
		
		nextScheduleItem.style = (idx % 2 == 0) ? "even" : "odd";
		
		var html = scheduleTemplate(nextScheduleItem);
		
		if (!foundRightNowItem) {
			
			var arr = nextScheduleItem.time.split(/[- :\/]/),
		    nextTime = new Date(arr[2], arr[1]-1, arr[0], arr[3], arr[4], arr[5]);
			
			if (now.getTime() < nextTime.getTime()) {
				$("#rightNow").append(html);
				foundRightNowItem = true;
			}
		}
		
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
    navigator.camera.getPicture(function (imageData) {
    	var image = document.getElementById(ele);
        image.src = "data:image/jpeg;base64," + imageData;
    }, function (message) {
        alert('Camera Failure: ' + message);
    }, {
        quality: 25
    });
}




$(document).ready(function() {
	
	if ($.mobile != undefined) { // for unit testing
		$.mobile.minScrollBack = 1000;
	}
		
	$('.m-page').live('swiperight',function(event){
		 $.mobile.changePage( "#home", { transition: "slide", reverse: true} );
	 });
	
	
	setTimeout(function() {
		renderSchedule();
	}, 2000);
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
	
	
});







