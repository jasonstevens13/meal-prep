$(document).ready(function () {



    $("#searchDinnerBtn").on("click", function (event) {
        event.preventDefault();


        var dinnerIngredient = $("#searchDinnerInput").val();
        console.log(dinnerIngredient);
        var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + dinnerIngredient;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#dinnerResults").empty();
            var responseArray = response.meals;

            for (let i = 0; i < responseArray.length; i++) {

                var recipeMealTitle = responseArray[i].strMeal;
                var recipeImg = responseArray[i].strMealThumb;
                var recipeId = responseArray[i].idMeal;

                console.log("___________");
                console.log(recipeMealTitle);
                console.log(recipeImg);
                console.log(recipeId);

                // vars for updating search list in DOM in bulma css style
                var article = $("<article>", { class: "tile is-child box", id: recipeId });
                var p = $("<p>", { class: "title", text: recipeMealTitle });
                var figure = $("<figure>", { class: "image is-4by3" });
                var img = $("<img>", { src: recipeImg });
                var br = $("<br>");

                // updates search list here
                $("#dinnerResults").append(article);
                $(article).append(p);
                $(article).append(figure);
                $(figure).append(img);
                $("#dinnerResults").append(br);


            }

            $("#searchDinnerInput").val('');

            document.readyState;



        });





    });




});