/**
 *	This class handles the website's YouTube-widget.	
 *
 *	@student	Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */
function YoutubeWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Reference to the DOM element used to input  
	 *	the search query
	 *
	 *	@default {DOMElement}
	 */
	var _queryValue = document.getElementById("youtube-query");
	
	/**
	 *	Reference to the object that handles the YouTube 
	 *	data. For more information see YoutubeWidgetResult.
	 *
	 *	@default {YoutubeWidgetResult}
	 */
	var _resultTableY = new YoutubeWidgetResult("page-middle-youtube-result-wrapper");

	
	//	Private properties
	//---------------------------------------------------
	
	/*	The class constructor.
	 *	
	 *	@return {undefined}
	 */
	function initY() {
		searchSubmitY();
		createVideo();
	}

	/*	Using Google's event handler to attach a listener 
	 *	to the widget's search button.
	 *	
	 *	@return {undefined}
	 */
	function searchSubmitY() {
		var element = document.getElementById("youtube-submit-btn");
		google.maps.event.addDomListener(element, "click", onSearchClickY);
	}

	/*	This mode is activated when the user makes a 
	 *	search (clicking on the search button). 
	 *	Old information can be cleand up and new can be presented.
	 *	
	 *	@param	{event}	The event that triggered this method.
	 */
	function onSearchClickY(event) {
		event.preventDefault(); // Since we are using AJAX, we do not send the form data.
		removeResultY();
		searchResultY();
	}

	/*	Removes old results presented in the DOM structure.
	 *	
	 *	@return {undefined}
	 */
	function removeResultY() {
		_resultTableY.removeY(true);
	}

	/**
	 *	This method retrieves YouTube-information from the 
	 *	local proxy. For more information see 
	 *	YoutubeService.php (src/php). The method uses 
	 *	jQuery to perform the AJAX call, just like any 
	 *	other widget.
	 *
	 *	@return {undefined}
	 */
	function searchResultY() {
		var query = _queryValue.value || _queryValue.placeholder;
		$.get('src/php/YoutubeService.php?searchY=' + query, onResultFinishY);
	}

	/**
	 *	This method is activated when the information 
	 *	is derived from the proxy. The information is 
	 *	converted from a string to a JSON object
	 *
	 *	@param	{String}	The result data.
	 *
	 *	@return {undefined}
	 */
	function onResultFinishY(search) {
		if (search){
			try{
				JSON.parse(search);
				search = JSON.parse(search);
				_resultTableY.appendY(search);
			}catch(e){
				_resultTableY.appendY("No search result found for this keyword");
			}
		}
	}

	initY();
	
}