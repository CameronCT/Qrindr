<?php

date_default_timezone_set('America/Los_Angeles');
if (file_exists('mysql.php'))
    require 'mysql.php';
else
    require 'mysql.docker.php';
