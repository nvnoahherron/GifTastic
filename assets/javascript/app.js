$(document).ready(function(){

	var yourSuperHero = [];

	 // function alertHeroName() {

	 // 	var theHero = $(this).attr("data-name");

	 // 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  //       theHero + "&api_key=dc6zaTOxFJmzC&limit=10";

  //       $.ajax({
  //       	url: queryURL,
  //       	method: "GET"
  //       }).done(function(response){
  //       	var results = response.data;

  //       	for (var i = 0; i < results.length; i++) {
  //       		var gifDiv = $("<div class='item>");

  //       		var rating = results[i].rating;

  //       		var p = $("<p>").text("Rating: " + rating);

  //       		var heroPic = $("<img>");

  //       		heroPic.attr("src", results[i].images.fixed_height.url);

  //       		gifDiv.prepend(p);
  //       		gifDiv.prepend(heroPic);

  //       		$("#superHeroes-view").prepend(gifDiv);
  //       	}
  //       })

  //     }

	function heroButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#viewHeroButtons").empty();

        // Looping through the array of movies
        for (var i = 0; i < yourSuperHero.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("hero");
          // Adding a data-attribute
          a.attr("data-name", yourSuperHero[i]);
          // Providing the initial button text
          a.text(yourSuperHero[i]);
          // Adding the button to the buttons-view div
          $("#viewHeroButtons").append(a);
        }
      }
      $("#addASuperHero").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var hero = $("#super-input").val().trim();

        // The movie from the textbox is then added to our array
        yourSuperHero.push(hero);

        // Calling renderButtons which handles the processing of our movie array
        heroButtons();
      });

      $(document).on("click", ".hero", function(){

      	$("#SuperHeroes-view").empty();

      	var theHero = $(this).attr("data-name");

	 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        theHero + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response){
        	
        	var results = response.data;

        	console.log(response);

        	for (var i = 5; i < results.length; i++) {

        		var gifDiv = $("<div class='item'>");

        		var rating = results[i].rating;

        		var p = $("<p>").text("Rating: " + rating);

        		var heroPic = $("<img>");

        		heroPic.attr("data-state", "still");

        		console.log(heroPic);

        		heroPic.attr("src", results[i].images.original_still.url);
        		heroPic.attr("data-animate", results[i].images.original.url);
        		heroPic.attr("data-still", results[i].images.original_still.url);

        		gifDiv.prepend(p);
         		gifDiv.prepend(heroPic);

        		$("#SuperHeroes-view").prepend(gifDiv);


        	}
         })
      });
      $(document).on("click","img",function(){


      	var state = $(this).attr("data-state");

      	if (state === "still") {
      		var animatedUrl = $(this).attr("data-animate");
      		$(this).attr("src", animatedUrl);
      		$(this).attr("data-state","animated");
      	}else if (state === "animated") {
      		var stillUrl = $(this).attr("data-still");
      		$(this).attr("src", stillUrl);
      		$(this).attr("data-state","still");
      	}; 
      });

})