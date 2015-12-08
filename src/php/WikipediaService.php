<?php

  /*
   *	author: Linnea Strågefors <ls223@student.lnu.se>
   *	date: 2015-12-08
   *	course: Social Media Echosystems (4ME304)
   */

	$searchW = $_GET['searchW'];
    $url = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=".$searchW;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_HTTPGET, TRUE);
	curl_setopt($ch, CURLOPT_POST, FALSE);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    
	
	$response = json_decode(curl_exec($ch), true);
    curl_close ($ch);
		
		foreach ($response['query']['pages'] as $extract) {
			$text = $extract['extract'];												
		}

		echo json_encode($text);
	
