
$(document).ready(function () {
    // Create an on click event for the search button
    $("#searchCocktailBtn").on("click", function (event) {
        event.preventDefault();
        // Define a variable for alcohol name being searched
        // Use jquery to grab that user input
        var mainAlcohol = $("#alcohol-input").val();
        getDrinkResults(mainAlcohol);
    });
    // Create a function to the drink results by main alcohol search
    function getDrinkResults(mainAlcohol) {
        var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + mainAlcohol;
        // Create an AJAX call for the cocktails receipe data
        $.ajax({
            url: cocktailURL,
            method: "GET"
        }).then(function (cocktailResponse) {
            // console.log(cocktailURL);
            // Empty the search results after displaying
            $("#drinksResults").empty();
            for (let i = 0; i < cocktailResponse.drinks.length; i++) {
                // console log cocktails response object
                // console.log(cocktailResponse);
                var drinkName = cocktailResponse.drinks[i].strDrink
                var drinkImage = cocktailResponse.drinks[i].strDrinkThumb;
                var drinkID = cocktailResponse.drinks[i].idDrink;
                var article = $("<article>", { class: "tile is-child box", id: drinkID });
                var p = $("<p>", { class: "title", text: drinkName });
                var figure = $("<figure>", { class: "image is-4by3" });
                var img = $("<img>", { src: drinkImage });
                var br = $("<br>");
                // updates search list here
                $("#drinksResults").append(article);
                $(article).append(p);
                $(article).append(figure);
                $(figure).append(img);
                $("#drinksResults").append(br);

                // Call getIngredients function
                getIngredients(drinkID);
            }
            // Empty the input after a search
            $("#alcohol-input").val('');
            // Create a function to pull in the cocktail ingredients from the second api call by drink ID
            function getIngredients() {
                // Make a new AJAX call using the drink ID to get the instructions and ingredients
                $.ajax({
                    url: "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID,
                    method: "GET"
                }).then(function (drinkIDResponse) {
                    // console log the drinkID response
                    console.log(drinkIDResponse);
                    // contain drinkID response array in a short variable name
                    const drinkObj = drinkIDResponse.drinks[0]
                    // console log drink name
                    console.log(drinkObj.strDrink);
                    // Create a variable to grab the dynamically created id with drinkID
                    const id = "#" + drinkObj.idDrink;

                    for (let key in drinkObj) {
                        // Create an if statement to get the ingredients by filtering keys that have "ingred" in the name and its associated value pair
                        if (key.includes("Ingred") && drinkObj[key]) {
                            console.log(key, drinkObj[key]);
                            // Define a variable to access the last character of the key string number
                            const last = key.length - 1
                            // Define a variable to get the ingredient number
                            const ingNum = key.charAt(last)
                            // Define a variable for the measurement value and concatenate the ingredient number to it
                            const measureKey = "strMeasure" + ingNum
                            // console.log(measureKey)

                            // Define a variable for the ingredient value pair
                            let ingr = (key, drinkObj[key]);
                            // console.log(ingr)
                            // Initialize the text to pull the ingredient and measurement values
                            let text;
                            // Create a conditional to eliminate the null values from the measurement value pair
                            if (drinkObj[measureKey] === null) {
                                text = ingr;
                            } else {
                                text = ingr + " - " + drinkObj[measureKey]
                            };
                            // Create a p tag to store the ingredient text
                            ingr = $("<p>", { text: "Ingredient " + ingNum + ": " + text });
                            // Append the p tag to the id 
                            $(id).append(ingr);
                        };
                    };
                    // Append instructions to the id
                    $(id).append("<br>");
                    const instr = drinkObj.strInstructions;
                    $(id).append("<strong>Instruction: </strong>" + instr);
                });
            };
        });
    };
});