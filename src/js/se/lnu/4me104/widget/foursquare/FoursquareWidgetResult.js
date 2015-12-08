/**
 *	This class handles the results printed in the Foursquare-widget.	
 *
 *	@student	Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */
function FoursquareWidgetResult(parent) {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _thisF = this;

	/**
	 *	...
	 *
	 *	@default {DOMElement}
	 */
	var _parentF = document.getElementById(parent);

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _tableF = document.createElement("table");

	//---------------------------------------------------
	//	Public static methods
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	FoursquareWidgetResult.prototype.appendF = function(data) {
		
		disposeChildrenF(_parentF);
		appendBodyF(data);
		createRemoveButtonF();
	}
	
	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	FoursquareWidgetResult.prototype.removeF = function(loading) {
		loading = loading || false;
		disposeChildrenF(_tableF);
		disposeChildrenF(_parentF);

		if (loading) {
			createLoaderF();
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
	function disposeChildrenF(element) {
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
	function createLoaderF() {
		var loader = document.createElement("div");
			loader.setAttribute("class", "loader");

		_parentF.appendChild(loader);
	}

	/**
	 *	Retreives data from the Foursquare API search result 
	 *	Sends the results to be printed in table rows.
	 *
	 *	@return {undefined}
	 */	
	function appendBodyF(data) {
		
		//check if there is a search results for the keyword
		if (!dataExists(data[0]['name'])) {
            appendRowF("td", "No search result for this keyword");
        } else {
			
			//max 10 results
			var dataLen = data.length;
			if (dataLen > 10) {
                dataLen = 10;
            }

			//display the search results in table rows
			for(var i=0; i<dataLen; i++){
				var vendor = "<b>" + data[i]['name'] + "</b>";

				if (dataExists(data[i]['category'])) {
                    vendor += "<br><i>Category: </i>"+ data[i]['category'];
                }
				if (dataExists(data[i]['address'])) {
                    vendor += "<br><i>Address: </i>"+ data[i]['address'];
                }
				if (dataExists(data[i]['city'])) {
                    vendor += "<br><i>Stad: </i>"+ data[i]['city'];
                }
				appendRowF("td", vendor);
			}
		}
	}
	
	/**
	 *	Validate the search result.
	 *	Check if there is any search result.
	 *
	 *	@return {boolean}
	 */
	function dataExists(data) {
        if (data == undefined) {
            return false;
        }else return true;
    }

	/**
	 *	Creates table rows for the search results.
	 *
	 *	@return {undefined}
	 */	
	function appendRowF(type, a) {
		var tr = document.createElement("tr");

		var ta = document.createElement(type);
			ta.innerHTML = a;

		tr.appendChild(ta);

		_tableF.appendChild(tr);
		_parentF.appendChild(_tableF);
	}
	
	/**
	 *	Creates a remove button after the search results
	 *
	 *	@return {undefined}
	 */		
	function createRemoveButtonF() {
		var buttonF = document.createElement("button");
			buttonF.innerHTML = "Remove result";
			google.maps.event.addDomListener(buttonF, "click", function(event){
				_thisF.remove(false);
			});

		_parentF.appendChild(buttonF);
	}
	
}