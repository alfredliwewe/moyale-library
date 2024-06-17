<?php
session_start();
require '../db.php';
require '../functions.php';


if (isset($_POST['username_login'], $_POST['password'])) {
	$data = getData("students", ['email' => $_POST['username_login']]);
	$data = $data == null ? getData("students", ['email' => $_POST['username_login']]) : $data;

	if ($data == null) {
		echo json_encode([
			'status' => false,
			'message' => "Username is not registered",
			'type' => 'email'
		]);
	}
	else{
		if ($data['password'] == md5($_POST['password'])) {
			$_SESSION['user_id'] = $data['id'];
			$_SESSION['data'] = $data;

			echo json_encode(['status' =>true]);
		}
		else{
			echo json_encode([
				'status' => false,
				'message' => "Password is incorrect",
				'type' => 'password'
			]);
		}
	}
}
?>