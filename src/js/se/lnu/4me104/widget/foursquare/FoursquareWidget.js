/**
 *	This class handles the website's Foursquare-widget.	
 *
 *	@student	Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */
function FoursquareWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Reference to the DOM element used to input  
	 *	the search query
	 *
	 *	@default {DOMElement}
	 */
	var _elmQueryValue = document.getElementById("foursquare-query");
	
	/**
	 *	Reference to the object that handles the Foursquare 
	 *	data. For more information see FoursquareWidgetResult.
	 *
	 *	@default {FoursquareWidgetResult}
	 */
	var _resultTableF = new FoursquareWidgetResult("page-right-foursquare-result-wrapper");

	
	//	Private properties
	//---------------------------------------------------
	
	/*	The class constructor.
	 *	
	 *	@return {undefined}
	 */
	function initiate() {
		searchSubmit();
	}

	/*	Using Google's event handler to attach a listener 
	 *	to the widget's search button.
	 *	
	 *	@return {undefined}
	 */
	function searchSubmit() {
		var element = document.getElementById("foursquare-submit-btn");
		google.maps.event.addDomListener(element, "click", onSearchClick);
	}

	/*	This mode is activated when the user makes a 
	 *	search (clicking on the search button). 
	 *	Old information can be cleand up and new can be presented.
	 *	
	 *	@param	{event}	The event that triggered this method.
	 */
	function onSearchClick(event) {
		event.preventDefault(); // Since we are using AJAX, we do not send the form data.
		removeResultF();
		searchResult();
	}

	/*	Removes old results presented in the DOM structure.
	 *	
	 *	@return {undefined}
	 */
	function removeResultF() {
		_resultTableF.removeF(true);
	}

	/**
	 *	This method retrieves Foursquare-information from the 
	 *	local proxy. For more information see 
	 *	FoursquareService.php (src/php). The method uses 
	 *	jQuery to perform the AJAX call, just like any 
	 *	other widget.
	 *
	 *	@return {undefined}
	 */
	function searchResult() {
		var query = _elmQueryValue.value || _elmQueryValue.placeholder;
		$.get('src/php/FoursquareService.php?searchQuery=' + query, onSearchResultsFinish);
	}

	/*	This method is activated when the search query is completed.
	 *	The purpose of this method is to convert response data to JSON
	 *	and present the results via the CompareWidgetResult object.
	 *	
	 *	@param	{String}	Result data.
	 *	@return {undefined}
	 */
	function onSearchResultsFinish(search) {
		search = JSON.parse(search);
		_resultTableF.appendF(search);
	}

	initiate();
	
	}