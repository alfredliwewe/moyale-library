<?php 
//session_start();
$db = new mysqli("localhost", "root", "", "library");

$config = [];

$read= $db->query("SELECT * FROM config");
while ($row = $read->fetch_assoc()) {
	$config[$row['name']] = $row['value'];
}

?>