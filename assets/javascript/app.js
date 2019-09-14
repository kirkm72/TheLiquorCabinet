$(document).ready(function() {
    let returnedDrinks = {};
    let returnedDrinksArray = '';
    let searchValue = '';
    // for testing purposes
    let additionalIngredientsArray = [];

    $("#submit-button").on("click", function() {
        let inputAlcohol = $('#searchAlcohol').val();

        let ingredientArrayToText = additionalIngredientsArray.join('&i=');
        

        if (!inputAlcohol == '') {
            ingredientArrayToText = '&i=' + ingredientArrayToText;
            
        }

        let queryURL = "https://www.thecocktaildb.com/api/json/v2/8673533/filter.php?i=" + inputAlcohol + ingredientArrayToText;

        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            returnedDrinks = response;
            returnedDrinksArray = getDrinkIDArray(returnedDrinks);
            for (let i = 0; i<returnedDrinksArray.length; i++) {
                let queryDrinksUrl = "https://www.thecocktaildb.com/api/json/v2/8673533/lookup.php?i=" + returnedDrinksArray[i];
                $.ajax({
                    url: queryDrinksUrl,
                    method: "GET"
                })
                .then(function(response){
                    console.log(response)
                })
            }
        });

    });

    function getDrinkIDArray(response) {
        let drinkIDArray = [];
        for (let i = 0; i < response.drinks.length; i++) {
            drinkIDArray.push(response.drinks[i].idDrink);
        }
        return drinkIDArray;
    }



    function addIngredient() {
        let additionalIngredients = $('<div>');
        additionalIngredients.text(searchValue);
        additionalIngredientsArray.push(searchValue);
        $('#add-ingredients').prepend(additionalIngredients); 
    }
    
    $('#add-ingredients').on('click', function(){
        searchValue = $('#searchAlcohol').val().trim();

        if (!searchValue == '') {
            addIngredient();
        }
    })
});