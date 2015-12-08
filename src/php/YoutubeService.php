<?php

  /*
   *	author: Linnea Strågefors <ls223@student.lnu.se>
   *	date: 2015-12-08
   *	course: Social Media Echosystems (4ME304)
   */

if ($_GET['searchY']) {
  $query = $_GET['searchY'];

  require_once 'Google/Client.php';
  require_once 'Google/autoload.php';

  $MAX_RESULT=6; //list max 5 video suggestions

  $DEVELOPER_KEY = <KEY>;

  $client = new Google_Client();
  $client->setDeveloperKey($DEVELOPER_KEY);

  // Defines an object that will be used to make all API requests
  $youtube = new Google_Service_YouTube($client);

  try {
    // Calls the search.list method to retrieve results matching the specified
    // query term.
    $searchResponse = $youtube->search->listSearch('id,snippet', array(
      'q' => $query,
      'maxResults' => $MAX_RESULT,
    ));

    $videos = array();
    $count = 0;
	
    // Add each result to the appropriate list, and then display the lists of
    // matching videos, channels, and playlists.
	foreach ($searchResponse['items'] as $searchResult) {
		if ($searchResult['id']['kind'] == 'youtube#video') {
			$videos[$count] = array();
			$videos[$count]['title'] = $searchResult['snippet']['title'];
			$videos[$count]['id'] = $searchResult['id']['videoId'];
			$count++;
      }
    }

  } catch (Google_Service_Exception $e) {
    $videos .= '<p>A service error occurred: <code>%s</code></p>'.htmlspecialchars($e->getMessage());
  } catch (Google_Exception $e) {
    $videos .= '<p>An client error occurred: <code>%s</code></p>' . htmlspecialchars($e->getMessage());
  }
  	echo json_encode($videos);
}else echo json_encode(null);

?>

