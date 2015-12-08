/**
 *	This file initiates	the YouTube Player
 *
 *	@student: Linnea Strågefors <ls223aa.student.lnu.se>
 *	@license	Creative Commons
 *	@since		2015-12-08
 */

	// This function loads the YouTube API code
	function createVideo() {

	// Load the Youtube IFrame Player API asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	}
	
	// This function is called by YouTube API when the code is downloaded.
	// An <iframe> and YouTube player are created.
	function onYouTubeIframeAPIReady() {
	  player = new YT.Player('player', {
		height: '195',
		width: '320',
		videoId: 'kPHIZRKzSHA' //default video of Växjö is displayed at start
	  });

	}
	
	// This function plays a specific video,
	// that the users selects from the search list.
	function playVideoId(videoID) {
        player.loadVideoById(videoID);
    }
	
	

