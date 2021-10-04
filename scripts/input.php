<?php

function validateNumber($number) {
	if (isset($number) && is_numeric($number))  {
		return true;
	} else {
		return false;
	}
}

function validateTimeZoneOffset($time) {
	if (isset($time) && is_numeric($time) && (-12 * 60 <= $time) && (14 * 60 >= $time))  {
		return true;
	} else {
		return false;
	}
}

function validateY($y) {
	$y_max = 5;
	$y_min = -5;
	
	if (!isset($y))
		return false;
	
	$numY = str_replace(',', '.', $y);
	return (is_numeric($numY) && ($numY >= $y_min) && ($numY <= $y_max));
}

function validateR($r) {
	$r_max = 5;
	$r_min = 3;
	
	if (!isset($r)) 
		return false;
	
	$numR = str_replace(',', '.', $r);
	return (is_numeric($numR) && ($numR >= $r_min) && ($numR <= $r_max));
}

function validateX($x) {
	if (isset($x)) {
		if ($x == -2) {
			return true;
		} else {
			if ($x == -1.5) {
				return true;
			} else {
				if ($x == -1) {
					return true;
				} else {
					if ($x == -0.5) {
						return true;
					} else {
						if ($x == 0) {
							return true;
						} else {
							if ($x == 0.5) {
								return true;
							} else {
								if ($x == 1) {
									return true;
								} else {
									if ($x == 1.5) {
										return true;
									} else {
										if ($x == 2) {
											return true;
										} else {
											return false;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

function validate($x, $y, $r) {
	return (validateX($x)&&validateY($y)&&validateR($r));
}

function checkTriangle($x, $y, $r) {
	return (($x >= 0) && ($y >= 0) && ($x*2 + $y - $r <= 0));
}

function checkRectangle($x, $y, $r) {
	return (($x <= 0) && ($y >= 0) && ($x >= -$r) && ($y <= $r));
}

function checkCircle($x, $y, $r) {
	return (($x >= 0) && ($y <= 0) && ($x*$x+$y*$y <= $r*$r));
}

function checkHit($x, $y, $r) {
	return (checkTriangle($x, $y, $r)||checkRectangle($x, $y, $r)||checkCircle($x, $y, $r));
}

$start = microtime(true);
$r = $_GET["r"];
$x = $_GET["x"];
$y = $_GET["y"];
$t = $_GET['time'];
$maxLen = 8;

if (!(validateNumber($r) && validateNumber($x) && validateNumber($y) && validateTimeZoneOffset($t) && validate($x, $y, $r))) {
	echo "Некорректно введены данные!";
	exit;
} 

// на попадание проверяются уже обрезанные числа (координаты)

if (strlen($r) > $maxLen) {
	$r = substr($r, 0, $maxLen);
}

if (strlen($y) > $maxLen) {
	$y = substr($y, 0, $maxLen);
}

$isValid = validate($x, $y, $r) ? 'Ок' : 'Fake zone'; 
$hit = $isValid ? checkHit($x, $y, $r) : false;
$hit = $hit ? 'Попадание' : 'Промах';
$current_time = date('H:i:s', time()-$t*60);;
$script_time = (microtime(true)-$start);

$jsonData = "{".
	"\"x\":\"$x\",".
	"\"y\":\"$y\",".
	"\"r\":\"$r\",".
	"\"currentTime\":\"$current_time\",".
	"\"scriptTime\":\"$script_time\",".
	"\"hit\":\"$hit\"";
	
$jsonScriptData = $jsonData .	"," .	// необходимо для записи данных в localStorage при выполнении запроса по url в обход валидации на js
	"\"script\":\"<script> localStorage.setItem(localStorage.length, '" . $jsonData . "}') </script>\"". 
	"}";

header('Access-Control-Allow-Origin: *');
echo $jsonScriptData;

?>
