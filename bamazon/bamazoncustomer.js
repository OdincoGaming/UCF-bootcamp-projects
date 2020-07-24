var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db",
  insecureAuth: true
});


function searchDB(item_name){

}

function updateDB(item_name, numPurchased){

}

function Main(){
    var activeItems = [];
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        db = res;
        for(var i = 0; i < res.length; i++){
            activeItems.push(res[i].product_name);
        }
        inquirer.prompt([
            {
              type: "list",
              message: "What to buy?",
              name: "selection",
              choices: activeItems
            },
            {
                type: "list",
                name: "numToPurchase",
                message: "How many to buy?",
                choices: [1, 2, 3]
            }
          ]).then(function(inquirerResponse){
            var query = "SELECT stock FROM products WHERE ?";
            connection.query(query, { product_name: inquirerResponse.selection }, function(err, res) {
              if (err) throw err;
              var inStock = res[0].stock;
              if(inquirerResponse.numToPurchase > inStock){
                  console.log("not enough in stock, save some for the rest of us ya greedy lug!");
                  connection.end();
              }else{
                query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock: inStock - inquirerResponse.numToPurchase
                      },
                      {
                        product_name: inquirerResponse.selection
                      }
                    ],
                    function(err, res) {
                      if (err) throw err;
                      console.log(res.affectedRows + " products updated!\n");
                      connection.end();
                    }
                  );
              }
            });
          });
    });
}

Main();