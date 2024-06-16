<?php
require 'db.php';
require 'functions.php';
?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?=$config['name'];?></title>
	<?php require 'links.php';?>
	<style type="text/css">
		.image-container {
    position: relative;
    display: inline-block;
}

.image-container img {
    display: block;
    width: 100%;
}

.image-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,.21), #000a1a); /* Replace with your color and transparency */
    pointer-events: none; /* Ensures that the overlay does not interfere with interactions */
}

		.search-input{
			background: #000814;
			color: white;
			border-radius: 64px;
			border: 0;
			outline: none;
			padding-left: 31px;
		}
		.some-font{
			font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
		}
		.h-bg:hover,.l-bg{
			background: #001433;
		}

		.menu-button.active{
			position: relative;
		}
		.menu-button.active::after{
			content: '';
			height: 100%;
			width: 4px;
			border-top-right-radius: 6px;
			border-bottom-right-radius: 6px;
			background-color: var(--active);
			position: absolute;
			top: 0;
			left: 0;
		}
		.play-btn2{
			width: 30px;
			height: 30px;
			border-radius: 6px;
			padding-top: 5px;
			cursor: pointer;
		}
		.hover-light:hover{
			background: rgba(255, 255, 255, 0.16);
		}
		.n-text-color{
			color: hsl(215, 15%, 75%);
		}
		.rounded-top-xl{
			border-top-right-radius: 0.75rem;
			border-top-left-radius: 0.75rem;
		}

		.rounded-bottom-xl{
			border-bottom-right-radius: 0.75rem;
			border-bottom-left-radius: 0.75rem;
		}
	</style>
</head>
<body>
<div id="root"></div>
<?php
$files = [
	'jsx/index.jsx'
];

foreach($files as $file){
	echo "<script type='text/babel'>".file_get_contents($file)."</script>";
}
?>
</body>
</html>