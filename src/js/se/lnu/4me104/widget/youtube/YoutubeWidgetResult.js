/**
 *	This class handles the results printed in the YouTube-widget.	
 *
 *	@student	Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */

function YoutubeWidgetResult(parent) {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@default {null}
	 */

	var _thisY = this;

	/**
	 *	...
	 *
	 *	@default {DOMElement}
	 */
	var _parentY = document.getElementById(parent);

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _tableY = document.createElement("table");

	//---------------------------------------------------
	//	Public static methods
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	YoutubeWidgetResult.prototype.appendY = function(data) {
		disposeChildrenY(_parentY);
		appendBodyY(data);
		createRemoveButtonY();
	}

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	YoutubeWidgetResult.prototype.removeY = function(loading) {
		loading = loading || false;
		disposeChildrenY(_tableY);
		disposeChildrenY(_parentY);

		if (loading) {
			createLoaderY();
		}
	}

	//---------------------------------------------------
	//	Private methods
	//---------------------------------------------------

	
	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	function disposeChildrenY(element) {
		var child = null;
		while (element.firstChild) {
			child = element.firstChild;
			element.removeChild(child);
			child = null;
		}
	}
	
	/**
	 *	Creates a loading icon and adds it to the DOM 
	 *	structure.
	 *
	 *	@return {undefined}
	 */
	function createLoaderY() {
		var loader = document.createElement("div");
			loader.setAttribute("class", "loader");

		_parentY.appendChild(loader);
	}

	/**
	 *	Retreives the search result, i.e. the video title and the video ID.
	 *	Sends the results to be printed in table rows.
	 *
	 *	@return {undefined}
	 */
	function appendBodyY(data) {

		//check if there is a search results for the keyword
		if (!dataExistsY(data[0]['title'])) {
            appendRowY("td", "No search result for this keyword","");
        } else {
				
			//max 5 YouTube suggestions
			var dataLen = data.length;
			if (dataLen > 5) {
                dataLen = 5;
            }
			
			//display the title of the search results in table rows
			for(var i=0; i<dataLen; i++){
				var suggestion = "<b>" + data[i]['title'] + "</b>";
				appendRowY("td", suggestion, data[i]['id']);
			}
		}
	}

	/**
	 *	Validate the search result.
	 *	Check if there is any search result.
	 *
	 *	@return {boolean}
	 */
	function dataExistsY(data) {
        if (data == undefined) {
            return false;
        }else return true;
    }
	
	/**
	 *	Create table rows for the search results.
	 *	If a row is selected by the user, the video will play in
	 *	the YouToube Player initiated in youtubeModule.js.
	 *
	 *	@return {undefined}
	 */
	function appendRowY(type, title, id) {
		var tr = document.createElement("tr");

		var ta = document.createElement(type);
			ta.innerHTML = title;

		tr.appendChild(ta);
		
		tr.setAttribute("id","trY");
		
		// a google listener is attatched to each talbe row.
		// when a row is selected, the video will play the video ID
		google.maps.event.addDomListener(tr, "click", function(event){
			playVideoId(id);
		});

		_tableY.appendChild(tr);
		_parentY.appendChild(_tableY);
	}

	/**
	 *	Create a remove button after the search results
	 *
	 *	@return {undefined}
	 */		
	function createRemoveButtonY() {
		var buttonY = document.createElement("button");
		buttonY.setAttribute("id", "removeBtn");
			buttonY.innerHTML = "Remove result";
			google.maps.event.addDomListener(buttonY, "click", function(event){
				_thisY.remove(false);
			});

		_parentY.appendChild(buttonY);
	}	
}