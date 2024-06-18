<?php
session_start();
require '../../db.php';
require '../../functions.php';
//require '../../imageClass.php';
//require '../../includes/String.php';
$time = time();

if (isset($_GET['getSubjects'])) {
	$rows = [];

	$read = $db->query("SELECT * FROM subjects");
	while ($row = $read->fetch_assoc()) {
		array_push($rows, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($rows);
}
elseif (isset($_GET['getStudents'])) {
	$rows = [];

	$read = $db->query("SELECT * FROM students");
	while ($row = $read->fetch_assoc()) {
		array_push($rows, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($rows);
}
elseif(isset($_POST['new_subject_name'])){
	db_insert("subjects", [
		'name' => $_POST['new_subject_name']
	]);

	echo json_encode(['status' => true, 'message' => "Success"]);
}
elseif(isset($_POST['new_student_name'], $_POST['reg'], $_POST['phone'], $_POST['email'])){
	db_insert("students", [
		'name' => $_POST['new_student_name'],
		'phone' => $_POST['phone'],
		'email' => $_POST['email'],
		'reg' => $_POST['reg'],
		'school' => 1,
		'password' => md5("1234"),
		'status' => 'active',
	]);

	echo json_encode(['status' => true, 'message' => "Success"]);
}
elseif(isset($_POST['subject'], $_POST['new_book_title'], $_POST['author'], $_FILES['file'])){
	if (move_uploaded_file($_FILES['file']['tmp_name'], "../../uploads/".$_FILES['file']['name'])) {
		db_insert("books", [
			'title' => $_POST['new_book_title'],
			'author' => $_POST['author'],
			'image' => "default_cover.jpg",
			'file' => $_FILES['file']['name'],
			'subject' => $_POST['subject'],
			'date_added' => $time,
			'admin' => 1,
		]);

		echo json_encode(['status' => true, 'message' => "Success"]);
	}
	else{
		echo json_encode(['status' => false, 'message' => "Success"]);
	}
}
elseif (isset($_GET['getBooks'])) {
	$subjects = [];
	$read = $db->query("SELECT * FROM subjects");
	while ($row = $read->fetch_assoc()) {
		$subjects[$row['id']] = $row;
	}

	$admins = [];
	$read = $db->query("SELECT * FROM admins");
	while ($row = $read->fetch_assoc()) {
		$admins[$row['id']] = $row;
	}

	$rows = [];

	$read = $db->query("SELECT * FROM books");
	while ($row = $read->fetch_assoc()) {
		$row['admin_data'] = $admins[$row['admin']];
		$row['subject_data'] = $subjects[$row['subject']];
		array_push($rows, $row);
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($rows);
}