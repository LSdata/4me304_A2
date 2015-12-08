/**
 *	This class handles the website's Wikipedia-widget.	
 *
 *	@student	Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */

function WikipediaWidget() {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	Reference to the DOM element used to input  
	 *	the search query
	 *
	 *	@default {DOMElement}
	 */
	var _queryW = document.getElementById("wikipedia-query");
	
	/**
	 *	Reference to the object that handles the Wikipedia 
	 *	data. For more information see WikipediaWidgetResult.
	 *
	 *	@default {WikipediaWidgetResult}
	 */	
	var _resultW = new WikipediaWidgetResult("page-right-wikipedia-result-wrapper");

	
	//	Private properties
	//---------------------------------------------------
	
	/*	The class constructor.
	 *	
	 *	@return {undefined}
	 */
	function initW() {
		searchSubmitW();
	}
	
	/*	Using Google's event handler to attach a listener 
	 *	to the Wikipedia information box.
	 *	
	 *	@return {undefined}
	 */
	function clickListener(query) {
		var element = document.getElementById("page-right-wikipedia-result-wrapper");
		google.maps.event.addDomListener(element, "click", onclick);
	}

	/*	This mode is activated when the user clicks in the
	 *	Wikipedia information box.
	 *	
	 *	@param	{event}	The event that triggered this method.
	 */
	function onclick(event) {
		event.preventDefault(); // Since we are using AJAX, we do not send the form data.
		var query = _queryW.value || _queryW.placeholder;
		window.open("https://en.wikipedia.org/wiki/" + query);
	}
		
	/*	Using Google's event handler again to attach a
	 *	listener to the widget's search button.
	 *	
	 *	@return {undefined}
	 */
	function searchSubmitW() {
		var element = document.getElementById("wikipedia-submit-btn");
		google.maps.event.addDomListener(element, "click", onSearchClickW);
	}
	
	/*	This mode is activated when the user makes a 
	 *	search (clicking on the search button). 
	 *	Old information can be cleand up and new can be presented.
	 *	
	 *	@param	{event}	The event that triggered this method.
	 */
	function onSearchClickW(event) {
		event.preventDefault(); // Since we are using AJAX, we do not send the form data.
		removeResultW();
		searchResultW();

	}

	/*	Removes old results presented in the DOM structure.
	 *	
	 *	@return {undefined}
	 */
	function removeResultW() {
		_resultW.removeW(true);
	}

	/**
	 *	This method retrieves Wikipedia-information from the 
	 *	local proxy. For more information see 
	 *	WikipediaService.php (src/php). The method uses 
	 *	jQuery to perform the AJAX call, just like any 
	 *	other widget.
	 *
	 *	@return {undefined}
	 */
	function searchResultW() {
		var query = _queryW.value || _queryW.placeholder;
		$.get('src/php/WikipediaService.php?searchW=' + query, wResultFinish);
		clickListener();
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
	function wResultFinish(extract) {
		if(extract=="null"){
				_resultW.appendW("No search result found for this keyword");
		}else if (extract){
			try{
				JSON.parse(extract);
				extract = JSON.parse(extract);
				_resultW.appendW(extract);
			}catch(e){
				_resultW.appendW("No search result found for this keyword");
			}
		}
	}

	initW();
	
	}