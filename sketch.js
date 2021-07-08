//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var lastFed, foodObj
var fedTime, feed, addFood;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  dog = createSprite(800,200,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed=createButton("Feed the Dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


  function draw() {
    background(46,139,87);
  
    foodObj.display();
  
    fedTime = database.ref('FeedTime');
    fedTime.on("value", function (data){
      lastFed = data.val();
    })
  
    fill(255,255,254);
    textSize(15);
    if (lastFed >= 12) {
      text("Last Feed: " + lastFed %12 + "PM", 350, 30);
    }
    else if(lastFed == 0) {
      text("Last Feed: 12AM ", 350, 30);
    }
    else {
      text("Last Feed:  " + lastFed + "AM", 350, 30);
    }
  
    drawSprites();
  
  }

  function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  }
  
    function feedDog() {
      dog.addImage(happyDogImg);
  
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
      database.ref('/').update({
        Food: foodObj.getFoodStock(),
        FeedTime : hour()
      })
    }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food: foodS
    })
  }
  
  