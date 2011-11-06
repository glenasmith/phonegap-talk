/*

	Some sample OSDC schedule data pulled from a Google spreadsheet

	// From http://mikeymckay.github.com/google-spreadsheet-javascript/sample.html?url=https://spreadsheets.google.com/pub?key=0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc&hl=en&output=html
      localStorage.clear();
      var sample_url = "https://spreadsheets.google.com/pub?key=0Ago31JQPZxZrdHF2bWNjcTJFLXJ6UUM5SldEakdEaXc&hl=en&output=html";
      var url_parameter = document.location.search.split(/\?url=/)[1]
      var url = url_parameter || sample_url;
      var googleSpreadsheet = new GoogleSpreadsheet();
      googleSpreadsheet.url(url);
      googleSpreadsheet.load(function(result) {
        $('#results').html(JSON.stringify(result).replace(/,/g,",\n"));
      });
    


*/

var osdcData = {"url":"https://spreadsheets.google.com/feeds/cells/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic",
"key":"0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc",
"jsonUrl":"http://spreadsheets.google.com/feeds/cells/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic?alt=json-in-script",
"googleUrl":{"sourceIdentifier":"https://spreadsheets.google.com/feeds/cells/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic",
"url":"https://spreadsheets.google.com/feeds/cells/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic",
"key":"0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc",
"jsonCellsUrl":"http://spreadsheets.google.com/feeds/cells/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic?alt=json-in-script",
"jsonListUrl":"http://spreadsheets.google.com/feeds/list/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic?alt=json-in-script",
"jsonUrl":"http://spreadsheets.google.com/feeds/cells/0AsIKXTGzbbNtdDYwZGF3NGtFeVZCRGJDTzhLLTI1YWc/od6/public/basic?alt=json-in-script"},
"data":["Time",
"Length",
"Room 1",
"Room 2",
"Room 3",
"11/14/2011 9:00:00",
"210",
"Pentaho Visualisation Workshop",
"OSIA MiniConf",
"PHP MiniConf",
"11/14/2011 12:30:00",
"60",
"Break for Lunch",
"#N/A",
"#N/A",
"11/14/2011 13:30:00",
"210",
"GeoTools Workshop",
"0",
"0",
"11/15/2011 9:00:00",
"210",
"GR8 MiniConf",
"Agile Workshop",
"Arduino Workshop*",
"11/15/2011 12:30:00",
"60",
"Break for Lunch",
"#N/A",
"#N/A",
"11/15/2011 13:30:00",
"210",
"0",
"Go Workshop",
"0",
"11/16/2011 9:00:00",
"30",
"Registration",
"#N/A",
"#N/A",
"11/16/2011 9:30:00",
"60",
"Senator Kate Lundy - Keynote",
"#N/A",
"#N/A",
"11/16/2011 10:30:00",
"30",
"Break for Refreshments",
"#N/A",
"#N/A",
"11/16/2011 11:00:00",
"60",
"Alexander Zangerl - Practical Online Anonymity with Open Source Software and Open Services",
"Steve Dalton - Messaging with Bunnies: RabbitMQ",
"Graham Weldon - An introduction to Titanium",
"11/16/2011 12:00:00",
"30",
"Robin Sheat - Koha: Bringing libraries into the present day",
"#N/A",
"Glen Smith - Fake your way as a Mobile Developer Rockstar with PhoneGap",
"11/16/2011 12:30:00",
"60",
"Break for Lunch",
"#N/A",
"#N/A",
"11/16/2011 13:30:00",
"60",
"Dan Bentley - Opening a Closed World",
"Arjen Lentz - SQL Locking and Transactions",
"Paris Buttfield-Addison & Chris Neugebauer - Design for developers: making beautiful Android apps",
"11/16/2011 14:30:00",
"30",
"Evan Leybourn - Free as in Kittens",
"Rusty Russell - CCAN: C Code Archive. Like CPAN, Before It Got Popular!",
"Andrew McMillan - Free Software in the Android Ecosystem",
"11/16/2011 15:00:00",
"30",
"Break for Refreshments",
"#N/A",
"#N/A",
"11/16/2011 15:30:00",
"30",
"Nariman Habili - Open-source tools for field data collection and analysis at Geoscience Australia",
"Adam Harvey - What's new in PHP 5.4",
"Peter Serwylo - Wii Homebrew: Running and writing software for the Wii. ",
"11/16/2011 16:00:00",
"60",
"Brendan Scott - Negotiating Contracts Involving Open Source",
"#N/A",
"#N/A",
"11/16/2011 18:00:00",
"120",
"Dinner",
"#N/A",
"#N/A",
"11/17/2011 9:00:00",
"60",
"Damian Conway - Keynote",
"#N/A",
"#N/A",
"11/17/2011 10:00:00",
"30",
"Break for Refreshments",
"#N/A",
"#N/A",
"11/17/2011 10:30:00",
"60",
"Paul King - Groovy Testing for Agile Teams",
"Bernard Duggan - Erlang in production: \"I wish I'd known that when I started\" ",
"Sridhar Dhanapalan - Australia's Toughest Linux Deployment",
"11/17/2011 11:30:00",
"60",
"Jason Shepherd - JBoss AS7",
"Jacinta Richardson - Perl Best Practices",
"Arjen Lentz - Real Brain Hacking",
"11/17/2011 12:30:00",
"60",
"Break for Lunch",
"#N/A",
"#N/A",
"11/17/2011 13:30:00",
"60",
"Paul Marrington - Unifying the Software Development Lifecycle Using Open Source and Domain Specific Languages",
"Edward Schofield - Python for R&D",
"Sebastiano Armeli Battana - Getting started with Selenium 2",
"11/17/2011 14:30:00",
"30",
"Cliffano Subagio - Continuous Delivery Using Jenkins",
"Kazuaki Maeda - Structured Data Representation for Ruby, Groovy and Scala",
"Olly Betts - The Art of Writing Small Programs",
"11/17/2011 15:00:00",
"30",
"Break for Refreshments",
"#N/A",
"#N/A",
"11/17/2011 15:30:00",
"30",
"Discussion Panel",
"#N/A",
"#N/A",
"11/17/2011 16:00:00",
"60",
"Lightning Talks",
"#N/A",
"#N/A",
"11/17/2011 18:00:00",
"120",
"Drinks",
"#N/A",
"#N/A",
"11/18/2011 9:00:00",
"60",
"Brian Catto - Keynote",
"#N/A",
"#N/A",
"11/18/2011 10:00:00",
"30",
"Break for Refreshments",
"#N/A",
"#N/A",
"11/18/2011 10:30:00",
"60",
"Graham Weldon - Building 3D Apps with Javascript",
"Paul King - Groovy and Concurrency with GPars",
"Stewart Smith - Dropping ACID: Eating Data in a Web 2.0 Cloud World.",
"11/18/2011 11:30:00",
"60",
"Ben Teese - The Return of JavaScript: 3 Open-Source Projects that are driving JavaScript's renaissance",
"Stewart Mackenzie - Lifting Scala's functional and object styles to concurrent programming",
"#N/A",
"11/18/2011 12:30:00",
"60",
"Break for Lunch",
"#N/A",
"#N/A",
"11/18/2011 13:30:00",
"60",
"Marc Fasel - Joys and Pains of Node.js in the Enterprise",
"Craig Aspinall - Groovy Baby!",
"Tim Serong - Cross-Distribution Packaging Made Easy",
"11/18/2011 14:30:00",
"30",
"Stewart Smith - Drizzle 7, GA and Supported: Current & Future Features ",
"Michael Neale - Coping with errors - we are doing it wrong",
"Stephen Roberts - Predicting the Flow of Tsunamis and Floods using the FOSS environment ANUGA",
"11/18/2011 15:00:00",
"30",
"Break for Refreshments",
"#N/A",
"#N/A",
"11/18/2011 15:30:00",
"60",
"Lightning Talks",
"#N/A",
"#N/A",
"11/18/2011 16:30:00",
"60",
"Tony Beal - Keynote",
"#N/A",
"#N/A"]}
