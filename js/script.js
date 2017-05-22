
var db = openDatabase('bookdb', '1.0', 'Book DB', 2 * 1024 * 1024);

db.transaction(function (tx) {
	// elimina a tabela
	//tx.executeSql('DROP TABLE books');

	//cria a table se não existir
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion, favorite)');
});



$('#consultDb').click(function(){
	db.transaction(function (tx) {

		tx.executeSql('SELECT * FROM books', [], function (tx, results) {
			$.each(results.rows,function(index,item){
	   			//output de todas as rows/todos os resultados
	   			console.log(item);
	   		});
		}, null);
	});
});

//-----------ELEMENTOS HTML--------------------------------------//

function LoadBooks() {

	var clientID = "813842311915-0f78t2dfpsdab2829o7a0c32if99afee.apps.googleusercontent.com";

	var APIkey = "AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg";

var ShelfID = "1001";  //bookshelf nova (no url a seguiras_coll)

var UserID = "117214680027185876068";


$.ajax({
	
		url: "https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIkey   //virgula pq e'um array

	}).done(function(data){

		console.log(data);

		$.each(data.items, function(index, item){


			var HTMLtoInsert = `
			<div class="book col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3" id="book1">
			<div>	
			<div class="cover">
			<a class="imglink" target="_blank" href=""><img class="imgadjust img" src=""></a>	
			<input type="hidden" class="hiddenFieldId"></input>
			<h1></h1>
			</div>
			</div>
			<div class="text">				
			<div class="booktext">
			<p class="description"></p>

			<div class="authorsection">
			<span class="author">By </span>
			<span class="authorsresults"></span>
			</div>

			<div class="ratingsection">
			<span class="glyphicon glyphicon-star-empty"> </span>
			<span class="averagerating"></span>	
			</div>		

			</div>

			<div class="links">
			<a target="_blank" class="linklivros preview" href="">
			<span class="glyphicon glyphicon-book"></span>
			Preview</a>	

			<a target="_blank" class="linklivros googleplay" href="">
			<span class="glyphicon glyphicon-shopping-cart"></span>
			Google Play 
			<span class="priceresults"></span>

			</a>						

			</div>

			</div>
			</div>
			`;

			
			$(".bookDiv").append(HTMLtoInsert);
			$currentBook = $(".book").eq(index);

			$("h1", $currentBook).html(item.volumeInfo.title);	
			$(".description", $currentBook).html(item.volumeInfo.description);
			$(".imgadjust", $currentBook).attr("src",item.volumeInfo.imageLinks.thumbnail);
			$(".authorsresults", $currentBook).html(item.volumeInfo.authors);
			$(".googleplay", $currentBook).attr("href",item.saleInfo.buyLink);
			$(".preview", $currentBook).attr("href",item.volumeInfo.previewLink);
			$(".averagerating", $currentBook).html(item.volumeInfo.averageRating);

			$(".imglink", $currentBook).attr("href",item.volumeInfo.previewLink);

			$('.hiddenFieldId',$currentBook).text(item.id);

		});
	});

};

LoadBooks();


// MY BOOKSHELF LINK https://www.googleapis.com/books/v1/users/117214680027185876068/bookshelves/1001/volumes?key=AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg


//-------------RELOAD page onclick menu tinderbook--------------------------//


$(".reloadpage").click(function(){
	window.location.reload();
});


//----------CONJUNTO FUNCOES CLICK LIKE/DISLIKE: TRANSIÇAO BOOKS + ADICIONAR À LISTA FINAL NA LAST PAGE------//

$parent = $(".book.active");
$next = $parent.next(".book");
$lastpage = $(".lastpage");

var islike = false;
var inAnimation = false;
var registolikes = []; //array likes


function ClickLike(){				//qdo clicka like (adiciona à lista likes + transita para o next book/lastpage)


	$("button.btnlike").on( "click", function() {

		var islike = true;
		registolikes.push(true);
		
		if(!inAnimation){	

			inAnimation = true;
			$parent = $(".book.active");
			$next = $parent.next(".book");
			$lastpage = $(".lastpage");

			$id = $('.hiddenFieldId',$parent).text();
			$opinion = $(this).attr('data-opinion');
			console.log($opinion);

			//if exists -> update, else insert

			db.transaction(function (tx) {
				tx.executeSql('INSERT INTO books(id, opinion) VALUES("' + $id + '","' + $opinion + '")');    //VALUES(?,?), [$id,$opinion]
			});



			$cover = $parent.find('.imglink');  		 //addtolikes
			$cover.clone().appendTo('.listalikes');
			$('.listalikes').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px");

			$(".likestar.glyphicon-star").css("color","#9999ff");   //repor cor star


			if ($parent.index() == $(".book").length-1){

				$parent.fadeOut(50, function(){			//book transition to last page
					$parent.removeClass("active");
					$(window).scrollTop(0);

					$lastpage.fadeIn(300, function(){
						$lastpage.addClass("active");
						inAnimation = false;
					});		

					$(".buttonsLD").fadeOut(50, function(){
						$(".buttonsLD").removeClass("active");
					});

			// $('.recommendations').addClass("active");
			$('.otherrecom').addClass("active");
			
		});


			//inAnimation = false;	

		}else{

				$parent.fadeOut(50, function(){					//book transition to next
					$parent.removeClass("active");

					$(window).scrollTop(0);

					$next.fadeIn(300, function(){
						$next.addClass("active");
						inAnimation = false;	
					});
				});
			//inAnimation = false;	

		};

	};



});
};

ClickLike();

//-----//

function ClickDislike(){			//qdo clicka dislike (adiciona à lista dislikes + transita para o next book/lastpage)

	$("button.btndislike").on( "click", function() {

		var islike = false;
		registolikes.push(false);

		if(!inAnimation){	

			inAnimation = true;					
			$parent = $(".book.active");
			$next = $parent.next(".book");
			$lastpage = $(".lastpage");

			$id = $('.hiddenFieldId',$parent).text();
			$opinion = $(this).attr('data-opinion');
			console.log($opinion);


			db.transaction(function (tx) {
				tx.executeSql('INSERT INTO books(id, opinion) VALUES("' + $id + '","' + $opinion + '")');
			});




			$cover = $parent.find('.imglink');							//add to dislikes
			$cover.clone().appendTo('.listadislikes');
			$('.listadislikes').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px");  

			$(".likestar.glyphicon-star").css("color","#9999ff");    //repor cor star


			if ($parent.index() == $(".book").length-1){	//se last book

				$parent.fadeOut(50, function(){					//book transition to last page
					$parent.removeClass("active");
					$(window).scrollTop(0);

					$lastpage.fadeIn(300, function(){
						$lastpage.addClass("active");
						inAnimation = false;
					});		

					$(".buttonsLD").fadeOut(50, function(){
						$(".buttonsLD").removeClass("active");
					});

			// $('.recommendations').addClass("active");
			$('.otherrecom').addClass("active");

		});
				

			}else{

				$parent.fadeOut(50, function(){					//book transition to next
					$parent.removeClass("active");

					$(window).scrollTop(0);

					$next.fadeIn(300, function(){
						$next.addClass("active");
						inAnimation = false;	

					});
				});
				
			};
		};

		


	});
};

ClickDislike();



function Skip(){				//qdo clicka like (adiciona à lista likes + transita para o next book/lastpage)


	$("button.skip").on( "click", function() {

		if(!inAnimation){	

			inAnimation = true;
			$parent = $(".book.active");
			$next = $parent.next(".book");
			$lastpage = $(".lastpage");


			$(".likestar.glyphicon-star").css("color","#9999ff"); //repor cor star

			if ($parent.index() == $(".book").length-1){

				$parent.fadeOut(50, function(){				//book transition to last page
					$parent.removeClass("active");
					$(window).scrollTop(0);

					$lastpage.fadeIn(300, function(){
						$lastpage.addClass("active");
						inAnimation = false;
					});		

					$(".buttonsLD").fadeOut(50, function(){
						$(".buttonsLD").removeClass("active");
					});

			// $('.recommendations').addClass("active");
			$('.otherrecom').addClass("active");

		});
			//inAnimation = false;	

		}else{

				$parent.fadeOut(50, function(){					//book transition to next
					$parent.removeClass("active");

					$(window).scrollTop(0);

					$next.fadeIn(300, function(){
						$next.addClass("active");
						inAnimation = false;	

					});
				});
			//inAnimation = false;	

		};
	};
});
};

Skip();


//-----------------------------------------------------------------------//

//-------------------VOLTAR AO LIVRO ANTERIOR-----------------//

function ClickBackLike(){			

	$("button.backlike").on( "click", function() {

		$parent = $(".book.active");
		$previous = $parent.prev(".book");

		registolikes.pop();

		$(".lista a:last-of-type").remove();

		if ($parent.index() == $(".book").index(0)){	//se first book    experimeentar ao contrario com SE o index for >0
			$(".backlike").css("color","white");

		}else{
			
			$parent = $(".book.active");			//book transition to previous
			$previous = $parent.prev(".book");

			$parent.fadeOut(50, function(){
				$parent.removeClass("active");

				$(window).scrollTop(0);

				$previous.fadeIn(300, function(){
					$previous.addClass("active");

				});
			});

			$(".likestar.glyphicon-star").css("color","#9999ff");   //repor cor star
		};
	});
};

ClickBackLike();


//---------ADICIONAR AOS FAVORITOS qdo clicka star-------//

function AddToFavs(){	

	$(".star").click(function(){

		$parent = $(".book.active");

		$id = $('.hiddenFieldId',$parent).text();
		$favorite = $(this).attr('data-favorite');

		db.transaction(function (tx) {
			tx.executeSql('INSERT INTO books(id, favorite) VALUES("' + $id + '","' + $favorite + '")');
		});




		$cover = $parent.find('.imglink');
		$(".likestar.glyphicon-star").css("color","#099FFF");

		$cover.clone().appendTo('.favspage');
		$('.favspage').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px").css("display", "inline-block").css("margin","20px");

	});
};

AddToFavs();


//-------------------------//




//-------------CONTADOR LIKES----------------------------------------// corrigir por causa do voltar pa tras um livro!!!!!!!!

var counterlike = 0;
$('.likecounter').text(counterlike);

var counterdislike = 0;
$('.dislikecounter').text(counterdislike);

function ContadorLikes() {

	$('button.btnlike').click(function() {
		counterlike++;
		$('.likecounter').text(counterlike);

	});


	$('button.btndislike').click(function() {
		counterdislike++;
		$('.dislikecounter').text(counterdislike);
	});


$("button.backlike").click(function() {      //confirmar se está bem
	
	if ((islike = true) && (counterlike > 0)){

		counterlike--;			
		$('.likecounter').text(counterlike);
		
	}else if (counterdislike > 0){			

		counterdislike--;
		$('.dislikecounter').text(counterdislike);
	};
});

//TRY AGAIN BUTTON//
$('.backbtn').click(function() {
		counterdislike=0; //reset ao contador qdo try again
		counterlike=0;
		$('.likecounter').text(counterlike);
		$('.dislikecounter').text(counterdislike);

		$('.otherrecom').removeClass("active");
		$('.recommendations').removeClass("active");
		$('.listalikes').empty();
		$('.listadislikes').empty();
		$('.favspage').empty();
	});
}

ContadorLikes();
//-------------------------------------------//


//-------------ANIMAÇÃO SETAS-----------------------------//

function animate(){

	$('.left').fadeTo(25,1).delay(250).fadeTo(25,0.1);
	$('.middle').delay(250).fadeTo(25,1).delay(250).fadeTo(25,0.1);
	$('.right').delay(500).fadeTo(25,1).delay(250).fadeTo(25,0.1);
}

setInterval(animate,1000);

window.onload = animate(); //para começar logo na pagina inicial e nao ter o delay das setas que tinha antes

//--------------------------------------------------------//


//---------------PRESS TRY AGAIN-------------------------//

function TryAgain(){

	$(".backbtn").click(function(){

		$lastpage = $(".lastpage");
		// $firstbook = $(".book").eq(0);
		$conjuntobuttons = $(".buttonsLD");
		$startpage = $(".start");

		$(".likestar.glyphicon-star").css("color","#9999ff");

		$lastpage.fadeOut(50, function(){
			$lastpage.removeClass("active");

			$(window).scrollTop(0);

			$startpage.fadeIn(300, function(){
				$startpage.addClass("active");
			});

			$conjuntobuttons.fadeOut(0, function(){
				$conjuntobuttons.addClass("active");
			});

		});
	});
}

TryAgain();

//---------------------------------------------------//

//--------------PRESS START--------------------------//

function Start(){

	$(".pstart").click(function(){

		$firstbook = $(".book").eq(0);
		$startpage = $(".start");
		$conjuntobuttons = $(".buttonsLD");

		$startpage.fadeOut(50, function(){
			$startpage.removeClass("active");

			$(window).scrollTop(0);

			$firstbook.fadeIn(300, function(){
				$firstbook.addClass("active");
			});

		// $(".book").eq(0).addClass("active");

		$conjuntobuttons.fadeIn(0, function(){
			$conjuntobuttons.addClass("active");
		});
	});
	});
}

Start();

//-------------------------------------------------//

//----------SAIR DOS FAVS po book inicial---------//

function BackFromFavs(){
	

	$(".backfromfavs").click(function(){

		$(".favorites").fadeOut(50, function(){
			$(".favorites").removeClass("active");

			$(window).scrollTop(0);

			$firstbook.fadeIn(300, function(){
				$firstbook.addClass("active");
			});

			$conjuntobuttons.fadeIn(0, function(){
				$conjuntobuttons.addClass("active");
			});
		});

		$('.favspage').empty();  //limpa lista dos favs
	});
};


BackFromFavs();


//adicionar botoes para o user remover livros dos favoritos


//------------ACEDER AOS FAVORITOS----------//

function ClickFavs(){

	$(".navstar").click(function(){

		$active = $(".active");

		$(window).scrollTop(0);

		$active.fadeOut(50, function(){
			$active.removeClass("active");

			$(window).scrollTop(0);

			$(".favorites").fadeIn(0, function(){
				$(".favorites").addClass("active");
			});
		});
	});
};

ClickFavs();


//-------------------------------------//











//----------------------------//


	// var APIkey = "AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg";

	// 	$input = $("#inputsearch").val();
	
	// $("#submitsearch").click(function() {


	// $.ajax({

	// 	url: "https://www.googleapis.com/books/v1/volumes?q=" + input

	// }).done(function(data){

	// 	$.each(data.items, function(index, item){


// 			var HTMLtoInsert = `
// 			<div class="book col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3" id="book1">
// 			<div>	
// 			<div class="cover">
// 			<a class="imglink" target="_blank" href=""><img class="imgadjust img" src=""></a>	
// 			<h1></h1>
// 			</div>
// 			</div>
// 			<div class="text">				
// 			<div class="booktext">
// 			<p class="description"></p>

// 			<div class="authorsection">
// 			<span class="author">By </span>
// 			<span class="authorsresults"></span>
// 			</div>

// 			<div class="ratingsection">
// 			<span class="glyphicon glyphicon-star-empty"> </span>
// 			<span class="averagerating"></span>	
// 			</div>		

// 			</div>

// 			<div class="links">
// 			<a target="_blank" class="linklivros preview" href="">
// 			<span class="glyphicon glyphicon-book"></span>
// 			Preview</a>	

// 			<a target="_blank" class="linklivros googleplay" href="">
// 			<span class="glyphicon glyphicon-shopping-cart"></span>
// 			Google Play 
// 			<span class="priceresults"></span>

// 			</a>						

// 			</div>

// 			</div>
// 			</div>
// 			`;


// 			$(".bookDiv").append(HTMLtoInsert);
// 			$currentBook = $(".book").eq(index);

// 			$("h1", $currentBook).html(item.volumeInfo.title);	
// 			$(".description", $currentBook).html(item.volumeInfo.description);
// 			$(".imgadjust", $currentBook).attr("src",item.volumeInfo.imageLinks.thumbnail);
// 			$(".authorsresults", $currentBook).html(item.volumeInfo.authors);
// 			$(".googleplay", $currentBook).attr("href",item.saleInfo.buyLink);
// 			$(".preview", $currentBook).attr("href",item.volumeInfo.previewLink);
// 			$(".averagerating", $currentBook).html(item.volumeInfo.averageRating);

// 			$(".imglink", $currentBook).attr("href",item.volumeInfo.previewLink);

//  		});
// 	});



// });


