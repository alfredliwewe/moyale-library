<?php 
//session_start();
$db = new mysqli("localhost", "root", "", "library1");

$config = [];

$read= $db->query("SELECT * FROM config");
while ($row = $read->fetch_assoc()) {
	$config[$row['name']] = $row['value'];
}

?>