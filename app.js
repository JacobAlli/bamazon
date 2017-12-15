var inquire = require('inquirer');

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect();


function itemsForSale(){



    connection.query('SELECT * FROM products', function(err, results){

        if (err) throw err;

        for(i=0; i < results.length; i++){
            console.log('\nproduct: ' + results[i].product_name + '\ndepartment: ' + results[i].department_name + '\nprice: ' + results[i].price + '\nqty: ' + results[i].stock_quantity + '\n');
        };
    });

};

function whatToDo(){
    inquire.prompt(
        {
            name: 'task',
            type: 'list',
            choices: ['see products', 'order', 'leave'],
            message: 'How can we help you?'
        }
    ).then(function(answer){
        switch(answer.task){
            case 'see products':
                itemsForSale();
                whatToDo();
                break;
            case 'order' :
                takeOrder();
                break;
            case 'leave' :
                connection.end();
                console.log("see you next time!");
        };
    });
};

function returnValue(value){
     instock = value;
};

function checkifInStock(amount, product, callback){

    connection.query('SELECT * FROM products WHERE product_name = ?',[product], function(err, result){
        var stockQTY = result[0].stock_quantity;
        if((stockQTY - amount) < 0){
            return callback(false)
        }
        else{
           return callback(true);
        }
    });

};

function updateProductQty(amount, product){
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_name = ?', [amount, product], function(err, result){
        if (err) throw err;
        console.log(product + "'s stock decreased by " + amount);
    })
}

function takeOrder(){
    inquire.prompt([{
        name: 'product',
        type: 'list',
        choices: ["xbox", "coat", "hairdryer", "halo 5", "rocket league", "macbook pro", "tv", "lamp", "duffel bag", "pizza"],
        message: "what do you want to buy?"
    },
    {
        name: 'amount',
        type: 'input',
        message: 'how many',
        validate: function(input){
            return !isNaN(input);
        }
    }]
    )
    .then(function(answer){
        checkifInStock(answer.amount, answer.product, function(value){
            if(value){
                updateProductQty(answer.amount, answer.product);
                whatToDo();
            }
            else{
                console.log("not enough in stock sorry.")
                whatToDo();
            }
        })
    });
};

whatToDo();









