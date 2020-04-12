$(document).ready(function () {

    $("#searchDinnerBtn").on("click", function (event) {
        event.preventDefault();
        var dinnerIngredient = $("#searchDinnerInput").val();

        var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + dinnerIngredient;

        // Create ajax call to get the dinner response based on main ingredient search
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Empty the search results after each search
            $("#dinnerResults").empty();
            var responseArray = response.meals;

            for (let i = 0; i < responseArray.length; i++) {

                var recipeMealTitle = responseArray[i].strMeal;
                var recipeImg = responseArray[i].strMealThumb;
                var recipeId = responseArray[i].idMeal;

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

                // Then make second API call for each result by recipe ID
                getIngredients(recipeId);
            }

            function getIngredients() {
                // Make a new AJAX call using the drink ID to get the instructions and ingredients

                var queryURL2 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId + "&units=imperial";


                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (response2) {

                    console.log(response2);
                    const recipeIDResults = response2.meals[0];

                    const id = "#" + recipeIDResults.idMeal;

                    for (let key in recipeIDResults) {

                        if (key.includes("Ingred") && recipeIDResults[key]) {

                            const last = key.length - 1;
                            const ingNum = key.charAt(last);
                            const measureKey = "strMeasure" + ingNum;

                            let ingr = (key, recipeIDResults[key]);

                            let text;
                            if (recipeIDResults[measureKey] === undefined) {
                                text = ingr + " - as desired";
                            } else {
                                text = ingr + " - " + recipeIDResults[measureKey]
                            };
                            ingr = $("<p>", { text: "Ingredient: " + text });

                            $(id).append(ingr);
                        };
                    };
                    const instr = recipeIDResults.strInstructions;
                    $(id).append("<br>");
                    $(id).append("<strong>Instructions:</strong> " + instr);

                    // console.log(instr);
                });

            };

            $("#searchDinnerInput").val('');

            document.readyState;

        });

    });

});
