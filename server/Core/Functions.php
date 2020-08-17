<?php

function curl_get_content(String $url){
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_USERAGENT, "API_GITHUB_FETCHER" );
      curl_setopt($ch, CURLOPT_URL, $url);
      $data = curl_exec($ch);
      curl_close($ch);
      return $data;
}