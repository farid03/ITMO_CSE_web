<?php

function validateY($y) {
	$y_max = 5;
	$y_min = -5;
	
	if (!isset($y))
		return false;
	
	$numY = str_replace(',', '.', $y);
	return is_numeric($numY) && $numY >= $y_min && $numY <= $y_max;
}

function validateR($r) {
	$r_max = 5;
	$r_min = 3;
	
	if (!isset($r)) 
		return false;
	
	$numR = str_replace(',', '.', $r);
	return is_numeric($numR) && $numR >= $r_min && $numR <= $r_max;
}

function validateX($x) {
	return isset($x);
}

function validate($x, $y, $r) {
	return validateX($x)&&validateY($y)&&validateR($r);
}

function checkTriangle($x, $y, $r) {
	return $x >= 0 && $y >= 0 && $x*2 + $y - $r <= 0;
}

function checkRectangle($x, $y, $r) {
	return $x <= 0 && $y >= 0 && $x >= -$r && $y <= $r;
}

function checkCircle($x, $y, $r) {
	return $x >= 0 && $y <= 0 && $x*$x+$y*$y <= $r*$r;
}

function checkHit($x, $y, $r) {
	return checkTriangle($x, $y, $r)||checkRectangle($x, $y, $r)||checkCircle($x, $y, $r);
}

$start = microtime(true);
$r = $_GET["r"];
$x = $_GET["x"];
$y = $_GET["y"];
$isValid = validate($x, $y, $r) ? 'Ок' : 'Fake zone'; 
$hit = $isValid ? checkHit($x, $y, $r) : false;
$hit = $hit ? 'Попадание' : 'Промах';
$current_time = date('H:i:s', time()-$_GET['time']*60);;
$script_time = (microtime(true)-$start);

$jsonData = "{".
	"\"x\":\"$x\",".
	"\"y\":\"$y\",".
	"\"r\":\"$r\",".
	"\"currentTime\":\"$current_time\",".
	"\"scriptTime\":\"$script_time\",".
	"\"hit\":\"$hit\"".
	"}";

header('Access-Control-Allow-Origin: *');
echo $jsonData;

?>
