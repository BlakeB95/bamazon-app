var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lemmysux1!",
    database: "bamazon_db"
});

//global vars for all functions to read
var productArr = [];
var idToBuy = 0;
var totalCost = 0;

//establishes connection to products_db database, populates the array and begins the script
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    populateArr();
    //runs inquirer prompt
    runPrompt();
});

//main script here, used for callbacks
function runPrompt(){
    
    displayDB();
    //displays products_db database and fills out the productArr with product info
    
    inquirer.prompt({
        name: "idToBuy",
        type: "input",
        message: "Enter ID for the product to buy: \n"
    })
    .then(function(ans){
        idToBuy = ans.idToBuy;
        //asks for a valid id if the user input does not a valid id
        var isValidNum = false;
        for(var i=0;i<productArr.length;i++){
            if(ans.idToBuy == productArr[i].item_id)
            {
                isValidNum = true;
            }
        }
        if(!isValidNum)
        {
            console.log("Please enter a valid ID.");
            runPrompt();
        }
        //if valid
        else
        {
            amountToBuy();
        }
    });
}

//populates the array with current database info
function populateArr(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        productArr = [];
        //loop that goes through the products_db database
        res.forEach(function(rowDataPacket){
            //item containing all the info for a product that is then added to an array of items
            var item = {item_id: rowDataPacket.item_id, product_name: rowDataPacket.product_name, department_name: rowDataPacket.department_name, price: rowDataPacket.price, stock_quantity: rowDataPacket.stock_quantity};
            productArr.push(item);
        });
    })
}

//asks the user what amount of quantity they want to buy
function amountToBuy(){
    inquirer.prompt({
        name: "amountToBuy",
        type: "input",
        message: "How much would you like to buy?\n"
    })
    .then(function(ans){
        //checks if the quantity is too great
        if(ans.amountToBuy > productArr[idToBuy-1].stock_quantity)
        {
            console.log("Insufficient quantity!");
            amountToBuy();
        }
        else
        {
            totalCost += ans.amountToBuy * productArr[idToBuy-1].price;
            updateDB(idToBuy, ans.amountToBuy);
            console.log("Total cost: " + totalCost);
            continueBuying();
        }
        

    });
}

//displays the products_db database in the node window, easy readability
function displayDB(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        //logs out the product data for easy readability
        for(var i=0;i<productArr.length;i++){
            console.log(productArr[i].item_id + ":\n\tProduct: " + productArr[i].product_name + "\n\tDepartment: " + productArr[i].department_name + "\n\tPrice: " + productArr[i].price + "\n\tStock: " + productArr[i].stock_quantity + "\n");
        }
    })
}

//updates the array with quantity changes
function updateDB(id, amountToBuy){
    var newQuantity = productArr[id-1].stock_quantity - amountToBuy;
    connection.query("UPDATE products SET ? WHERE ?",
    [
        {
            stock_quantity: newQuantity
        },
        {
            item_id: id
        }
    ],
    function(err){
        if (err) throw err;
        populateArr();
    })
}

//asks the user if they wish to continue buying
function continueBuying(){
    inquirer.prompt({
        name: "keepGoing",
        type: "confirm",
        message: "Continue buying?"
    })
    .then(function(ans){
        if(ans.keepGoing)
        {
            runPrompt();
        }
        else
        {
            console.log("Thank you for shopping with Bamazon!");
            connection.end();
        }
    })
}
