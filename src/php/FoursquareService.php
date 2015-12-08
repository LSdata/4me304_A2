<?php

  /*
   *	author: Linnea Strågefors <ls223@student.lnu.se>
   *	date: 2015-12-08
   *	course: Social Media Echosystems (4ME304)
   */
		
	$lat = "56.8770413"; //Växjö lattitude coordinate
	$lon = "14.8092744"; //Växjö longitude 
	$clientID = <KEY>;
	$clientSecret = <KEY>;
	$date = date('Ymd'); //current date on format YYYYMMDD, ex 20151202
	$query = $_GET['searchQuery'];
		
	$url = 'https://api.foursquare.com/v2/venues/search?ll=' .
									$lat . ',' . $lon . '&client_id='.$clientID.'&client_secret='.$clientSecret.
									'&v='.$date.'&m=foursquare&limit=10&query='.$query;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	$response = json_decode(curl_exec($ch), true);
    curl_close ($ch);
    
    $venueArr = array();
    $count = 0;
    if ($response['meta']['code'] == 200) {
        $venueArr[$count] = array();
        foreach ($response['response']['venues'] as $venue) {
            if(isset($venue['name'])) $venueArr[$count]['name'] = $venue['name'];
            if(isset($venue['location']['address'])) $venueArr[$count]['address'] = $venue['location']['address'] ;
            if(isset($venue['location']['city'])) $venueArr[$count]['city'] = $venue['location']['city'] ;

            
            foreach($venue['categories'] as $category){
                if(isset($category['name'])) $venueArr[$count]['category'] = $category['name'];
            }
            $count++;
        }
    }
	echo json_encode($venueArr);
	
?>
