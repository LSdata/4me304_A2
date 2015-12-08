/**
 *	This class handles the results printed in the Wikipedia-widget.	
 *
 *	@student	Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */
function WikipediaWidgetResult(parent) {

	//---------------------------------------------------
	//	Private properties
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _thisW = this;

	/**
	 *	...
	 *
	 *	@default {DOMElement}
	 */
	var _parentW = document.getElementById(parent);
		
	/**
	 *	...
	 *
	 *	@default {null}
	 */
	var _tableW = document.createElement("table");

	//---------------------------------------------------
	//	Public static methods
	//---------------------------------------------------

	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	WikipediaWidgetResult.prototype.appendW = function(data) {
		disposeChildrenW(_parentW);
		appendWbox(data);
	}
	
	/**
	 *	...
	 *
	 *	@return {undefined}
	 */
	WikipediaWidgetResult.prototype.removeW = function(loading) {
		loading = loading || false;
		disposeChildrenW(_tableW);
		disposeChildrenW(_parentW);

		if (loading) {
			createLoaderW();
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
	function disposeChildrenW(element) {
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
	function createLoaderW() {
		var loader = document.createElement("div");
		loader.setAttribute("class", "loader");

		_parentW.appendChild(loader);
	}
	
	/**
	 *	Displays the Wikipedia search result
	 *
	 *	@return {undefined}
	 */
	function appendWbox(data) {
		appendRowW("td", data);
	}
		
	/**
	 *	Creates elements for displaying the Wikipedia result
	 *
	 *	@return {undefined}
	 */
	function appendRowW(type, a) {
		var tr = document.createElement("tr");
		var divW = document.createElement("div");
		var ta = document.createElement(type); //<tr><td><div>scroll overflow within the div</div></td></tr>
		
		ta.innerHTML += a;
		
		divW.appendChild(ta); 
		divW.setAttribute("id", "wText");

		tr.appendChild(divW);
		_tableW.appendChild(tr);
		_parentW.appendChild(_tableW);
	}
	
}