// 813842311915-0f78t2dfpsdab2829o7a0c32if99afee.apps.googleusercontent.com

// https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

// AIzaSyBzhU64Mu4_CGSGpP4ZzP3ZYlsH1K-E9MU

// AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg

// mylibrary/bokkshelves/shelf/?as_coll+1001

// uid  =  117214680027185876068&source=gbs_lp_bookshelf_list

function LoadBooks() {

var clientID = "813842311915-0f78t2dfpsdab2829o7a0c32if99afee.apps.googleusercontent.com";

var APIkey = "AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg";

var ShelfID = "1001";  //bookshelf nova (no url a seguiras_coll)

var UserID = "117214680027185876068";

var HTMLtoInsert = `
				<div class="book col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3" id="book1">
 					<div>	
 						<div class="cover">
 							<img class="imgadjust img" src="">
 							<h1></h1>
 						</div>
 					</div>
 					<div class="text">				
 						<p class="booktext"></p> 
 								
 						<div class="links">
 							<a target="_blank" class="linklivros wiki" href="">Wikipedia</a>
 							<a target="_blank" class="linklivros goodreads" href="">Goodreads</a>
 							<a target="_blank" class="linklivros amazon" href="">Amazon</a>
 							<a target="_blank" class="linklivros wook" href="">Wook</a>
 						</div>

					</div>
 				</div>
	`;


	$.ajax({
	
		url: "https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIkey   //virgula pq e'um array

	}).done(function(data){

		console.log(data);

		$.each(data.items, function(index, item){
			
			HTMLtoInsert += "<h1>" + volumeInfo.title + "<h1>";

			$(".bookDiv").append(HTMLtoInsert);


	});
});
};

LoadBooks();



// var q = "norse+inauthor:gaiman"



// $.ajax({
// 	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIkey,
// 	data: { Authentication: clientID }

// }).done(function(){
// 	console.log("done");
// });



// $.ajax({
// 	url: "https://www.googleapis.com/books/v1/volumes?q="+ q,
// 	dataType: "json"

// }).done(function(data){
// 	// console.log(data.items[0].id)
// 	// // obj = $.parseJSON(data);
// 	// // console.log(data.items[0].id); //aceder so ao 1o livro dos resultados - da'imagem (thumbs so) do livro, titulo, data publicacao, publisher, etc... vamos inserir o id na bookshelf
// 	// $.ajax({
// 	// 	url: "https://www.googleapis.com/books/v1/mylibrary/bookshelves/1001/addVolume?volumeID" = data.items[0].id,
// 	// 	method: "POST",
// 	// 	data: { Authentication: "clientID" }



// 	// }).done(function(){
// 	// 	console.log("inserted" + data.items[0].volumeInfo.title);
// 	// });

// });



