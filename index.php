<!DOCTYPE html>
<html>

<head>

	<title>Tinderbook</title>
	<link rel="icon" type="png" href="img/book.png"> 
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

     <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>

	<div class="container-fluid">
		
		<div class="row">
			
			<nav class="navbar navbar-default">
				<div class="container-fluid barra">

					<ul class="nav navbar-nav">


						<li class="navbar-nav home"><a class="minititle reloadpage" href="javascript:void(0)"><span class="glyphicon glyphicon-fire"></span>TINDERBOOK</a></li>
    					  <!-- 	<li><a class="menu" href="#">Tab</a></li>
     						<li><a class="menu" href="#">Tab</a></li>
     						<li><a class="menu" href="#">Tab</a></li> -->
     					</ul>

     					<ul class="nav navbar-nav navbar-right">
     						<li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
     						<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
     						<li class="navstar"><a href="#"><span class="navstar glyphicon glyphicon-star"></span> Favorites</a></li>
     						<li>
     							<form class="navbar-form navbar-left" role="search">
     								<div class="form-group">
     									<input type="text" class="form-control" placeholder="Search">
     								</div>
     								<button type="submit" class="glyphicon glyphicon-search"></button>
     							</form>

     						</li>
     					</ul>
     				</div>
     			</nav>
     		

     			<div class="start active fundo col-xs-12 col-md-12">

     				<div class="arrows">
     					<div class="glyphicon glyphicon-menu-right left"></div>
     					<div class="glyphicon glyphicon-menu-right middle"></div>
     					<div class="glyphicon glyphicon-menu-right right"></div>
     				</div>
     				<button class="pstart">
     					<p id="pstarttxt">PRESS START</p>
     				</button>
     				<div class="arrows">
     					<div class="glyphicon glyphicon-menu-left right"></div>
     					<div class="glyphicon glyphicon-menu-left middle"></div> 
     					<div class="glyphicon glyphicon-menu-left left"></div>
     				</div>
     				<br>
     				<br>
     				<img id="coin" src="img/coin2.gif">

     			</div>

                    
     			<dic class="pagebooks">
     			</dic>	

                    
     			<div class="bookDiv">		
     			</div>


     			<!-- Buttons -->
     			<div class="row rowbuttons">
     				<div class="buttons col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4">
     					<div class="buttonsLD">

     						<button class="btn backlike"> 
     							<span class="glyphicon glyphicon-repeat"></span>
     							<!-- <br> -->
     							<span id="liketxt"><br></span>
     						</button>

     						<div class="divider"></div>

     						<button class="btn btnlike" id="btnlike">
     							<span class="glyphicon glyphicon-thumbs-up"></span>
     							<!-- <br> -->
     							<span id="liketxt"><br></span>
     						</button>
     						<div class="divider"></div>

                                   <button class="btn star">
                                        <span class="likestar glyphicon glyphicon-star"></span>
                                        <!--   <br> -->
                                        <span id="liketxt"><br></span>
                                   </button>


                                   <div class="divider"></div>
     						<button class="btn btndislike" id="btndislike"> 
     							<span class="glyphicon glyphicon-thumbs-down"></span>
     							<!-- <br> -->
     							<span id="liketxt"><br></span>
     						</button>

     						<div class="divider"></div>


                                     <button class="btn skip" id="skip"> 
                                        <span class="glyphicon glyphicon-forward"></span>
                                        <!-- <br> -->
                                        <span id="skiptxt"><br></span>
                                   </button>
                                   
                           




     					</div>
     				</div>
     			</div>
     			<!-- /Buttons --> 


     			<div class="lastpage" id="lastpage">

     				<div class="likescounter col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4">

     					<div class="row">
     						<div id="scores">
     							SCORE
     						</div>	
     						<div class="scorecounter">
     							<div class="counterslike col-xs-6 col-md-6">
     								<span class="likecounter"></span>
     								<span id="likecounter">LIKE</span>
     							</div>
     							<div class="countersdislike col-xs-6 col-md-6">
     								<span class="dislikecounter"></span>
     								<span id="dislikecounter">DISLIKE</span>
     							</div>
     						</div>
     					</div>

     					<div class="row lista">
     						<div class="listalikes col-xs-6 col-md-6"> 
     						</div>
     						<div class="listadislikes col-xs-6 col-md-6">
     						</div>
     					</div>
    				</div>

     			<!-- 	<div class="recommendations col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-4"> 				</div> -->

     				<div class="otherrecom col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4">
                              CLICK FOR MORE<br>
     					<a class="otherbooks" id="fiction" target="_blank" href="https://www.goodreads.com/shelf/show/fiction">
     					FICTION
                              </a>
                              OR
                              <a class="otherbooks" id="fantasy"  target="_blank" href="https://www.goodreads.com/shelf/show/fantasy">
                              FANTASY   
                              </a> <br>
                              <span>BOOK RECOMMENDATIONS</span>
     					</div>

     						<div class="tryagain fundo col-xs-12 col-md-12">
     							<div class="arrows">
     								<div class="glyphicon glyphicon-menu-right left"></div>
     								<div class="glyphicon glyphicon-menu-right middle"></div>
     								<div class="glyphicon glyphicon-menu-right right"></div>
     							</div>
     							<button class= "backbtn" id="btnback">
     								<p id="btnbacktxt">TRY AGAIN?</p>

     							</button>
     							<div class="arrows">
     								<div class="glyphicon glyphicon-menu-left right"></div>
     								<div class="glyphicon glyphicon-menu-left middle"></div>
     								<div class="glyphicon glyphicon-menu-left left"></div>
     							</div>
     							<!-- <br> -->
     							<!-- <img id="coin" src="img/coin2.gif"> -->
     						</div>
     					</div>

     				</div>

     				<div class="row">
     					<div class="favorites col-xs-8 col-xs-offset-2">
     						<div class="favoritestitle">
     							FAVORITES
     						</div>
     						<div class="favspage">
                                   </div>

                                   <button class="backfromfavs">
                                         <span class="glyphicon glyphicon-repeat"></span>
                                         <span id="backfromfavstxt">Back</span>
                                   </button>
                               


     					</div>
     				</div>

     				<div class="row">
     					<div class="footer col-xs-10 col-xs-offset-1">
     						UP ACADEMY - Rita Pais - 2017
     					</div>
     				</div>	
     			</div>	

     			<script src="js/jquery-3.2.1.js"></script>
     			<script src="js/script.js"></script>
     		</body>
     		</html>

