const edamamParameters ={
  health : ["dairy-free", "egg-free", "fish-free", "gluten-free", "vegan", "vegetarian" ],
  cuisineType : ["asian", "chinese", "french", "greek", "indian", "italian", "japanese", "korean", "mediterranean", "mexican", "middle eastern", "south american" ],
  mealType : ["breakfast", "brunch", "lunch", "dinner", "snack", "teatime"],
  dishType : ["main course", "side dish", "starter", "soup", "salad", "pasta", "seafood", "desserts" ],
} 

export default edamamParameters;

// https://api.edamam.com/api/recipes/v2?type=public&beta=false
// &q=tempeh%2Ccurry%2Ccherry%20tomatoes
// &app_id=0a0c79d2
// &app_key=9fc6340ee32a57fa81b5dca08feed67d
// &health=vegetarian
// &cuisineType=Asian
// &mealType=Lunch
// &imageSize=REGULAR
// &random=true
// &field=label&field=image&field=source&field=url&field=dietLabels&field=healthLabels&field=ingredientLines&field=ingredients&field=totalTime&field=cuisineType&field=mealType&field=dishType