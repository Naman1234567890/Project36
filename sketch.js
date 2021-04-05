var dog,sadDog,happyDog;
var foodS,foodStock;
var addFood;
var foodObj;
var database;
//create feed and lastFed variable here
var feed,lastFed;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  
  createCanvas(1000,400);
  database =firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock,showError);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed=createButton("Feed The Doggy");
  feed.position(800,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function showError(){
  console.log("Error in writing to the database");
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime: hour ()
 })

  //write code here to update food stock and last fed time
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
