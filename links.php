<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#085a9d">
<link rel="icon" type="image/png" href="images/coat.png">
<link rel="stylesheet" type="text/css" href="../resources/w3css/w3.css">
<link rel="stylesheet" type="text/css" href="../resources/w3css/tailwind.css">
<link href="../resources/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="../assets/css/custom-style.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../assets/css/style.css">

<script type="text/javascript" src="../resources/vendor/jquery/jquery.min.js"></script>
<link rel="stylesheet" href="../resources/fontawesome/css/all.min.css">

<!--====== Default CSS ======-->
<link rel="stylesheet" href="../resources/w3css/default.css">


<!--====== Style CSS ======-->
<link rel="stylesheet" href="../assets/css/style.css">

<link rel="stylesheet" type="text/css" href="../resources/toastify/src/toastify.css">
<script type="text/javascript" src="../resources/toastify/src/toastify.js"></script>

<link rel="stylesheet" type="text/css" href="../vendor/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../semantic/semantic.min.css">

<!--<script type="text/javascript" src="exportTable.js"></script>-->
<script type="text/javascript" src="../resources/react.js"></script>
<script type="text/javascript" src="../resources/react-dom.js"></script>
<script type="text/javascript" src="../resources/babel.js"></script>
<script type="text/javascript" src="../resources/prop-types.js"></script>
<link rel="stylesheet" href="../assets/style.css">
<script type="text/javascript" src="../resources/material-ui.js"></script>
<script type="text/javascript" src="./nicEdit.js"></script>
<script type="text/javascript" src="./Strings.js"></script>
<style type="text/css">
	:root{
		--active: #9c27b0;
	}
	@font-face{
		font-family: googleRoboto;
		src:url('../fonts/Roboto/Roboto-Regular.ttf');
	}
	@font-face{
		font-family: robotLight;
		src:url('../fonts/Roboto/Roboto-Light.ttf');
	}
	@font-face{
		font-family: openSans;
		src:url('../fonts/Open_Sans/OpenSans-Regular.ttf');
	}
	@font-face{
		font-family: sansmedium;
		src:url('./fonts/sans_medium.ttf');
	}
	@font-face{
		font-family: sourceSans;
		src:url('../fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf');
	}
	body{
		font-family: Arial, Helvetica, sans-serif;
	}
	.sansmedium{
		font-family: sansmedium !important;
	}
	.mid-size{
		font-size: .875rem;
	}
	.w3-grey{
		background: #9eb1bb !important;
	}
	.tp.w3-grey{
		border-left: 3px solid red ;
	}
	.tp{

	}
	.block{
		display: block;
	}
	thead{
		border-top-left-radius: 8px !important;
		border-top-right-radius: 8px !important;
		cursor: pointer;
	}
	.form-control.sw{
		padding-left: 40px !important;min-height: 47px !important;
	}
	.pointer{
		cursor: pointer;
	}
	.rounded-left{
		border-radius: 0 !important;
		border-bottom-left-radius: 6px !important;
		border-top-left-radius: 6px !important;
	}
	.rounded-right{
		border-radius: 0 !important;
		border-bottom-right-radius: 26px !important;
		border-top-right-radius: 26px !important;
	}
	.bcenter{
        display: inline-flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
    .btn-succes,.some-padding:hover{
    	background: #023e8a;
    	color: white;
    	cursor: pointer;
    }
    .some-padding{
        padding:12px 16px !important
    }
    .ms-shadow{
    	box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.12) 0px 0px 2px;
    }
    .absolute-bottom{
    	position:absolute;
    	bottom: 0;
    	left: 0;
    	width: 100%;
    	background: linear-gradient(rgba(0, 0, 0, .0),rgba(0, 0, 0, .8));
    	border-bottom-left-radius: 8px;
    	border-bottom-right-radius: 8px;
    }
    .border-0{
    	border: none;
    }
    .outline-0{
    	outline: none;
    }
    .product{
    	color: black;
    }
    .product:hover{
    	cursor: pointer;
    	box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 3px, rgba(0, 0, 0, 0.12) 0px 0px 3px;
    	color:#023e8a;
    }
    .hide-scroll::-webkit-scrollbar {
		display: none;
	}

	.hide-scroll {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.image-container {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
	}

	.image-container .img {
		height: 160px;
		margin: 10px;
	}
	.p-co img{
		display: block !important;
	}
	.top-right-links a{
			padding-left: 12px;
			padding-right: 12px;
			color: white;
		}
		.top-right-links a:hover{
			color: var(--red);
		}
		.middle-links a {
			color: black;
			padding-left: 12px;
			padding-right: 12px;
			padding-top: 7px;
			padding-bottom: 7px;
			font-weight: 400;
			border-radius: 6px;
		}
		.middle-links a:hover {
			cursor: pointer;
			color: #023e8a;
			font-weight: 400;
			background-color: #ddd;
		}
		a:hover {
			cursor: pointer;
			color: #01214b;
			font-weight: 400;
		}
		a{
			color: #023e8a;
		}
		.middle-links a.active{
			color: #023e8a;
			background: #ddd;
		}
		.rdrop{
			position: relative;
			display: inline-flex;
		}
		.rdrop .dropcontainer{
			position: absolute;
			bottom: -110px;
			min-width: 160px;
			left: 0;
			background: white;
			border: 1px solid var(--dark);
			border-radius: 4px;
		}
		.dropcontainer a{
			display: block;
		}
		.bold{
			font-weight: bold;
		}
		.rounded-1{
			border-radius: 8px;
		}
		.rounded-1 img{
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
		.dot{
			height: 8px;
			width: 8px;
			display: inline-block;
			background: whitesmoke;
			border-radius: 50%;
		}
		.dot:hover{
			background-color: #ccc;
			cursor: pointer;
		}
		.dot.wide{
			height: 8px;
			width: 24px;
			display: inline-block;
			background: whitesmoke;
			border-radius: 4px;
		}
		.animate-opacity{-webkit-animation:opac1 .4s;animation:opac1 .4s}
		@-webkit-keyframes opac1{from{opacity:0} to{opacity:1}}
		@keyframes opac1{from{opacity:0} to{opacity:1}}
</style>
<script type="text/javascript">
	function _(id) {
        return document.getElementById(id);
    }

    function Toast(text) {
        Toastify({
            text: text,
            gravity: "top",
            position: 'center',
            backgroundColor:"#dc3545",
            background:"#01796f"
        }).showToast();
    }
</script>