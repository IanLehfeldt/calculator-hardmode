var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 5000;
var calculateArray = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate', function (req, res){
    //function for calculating server side
    serverCalculator(req.body);
    //logs for checking
    console.log(req.body);
    //push all data into the array
    calculateArray.push(req.body);
})

app.listen(port, function(){
    console.log('Server is listening to port: ', port); 
})

function serverCalculator(clientData){
    if (clientData.method == '+'){
        console.log('server calculator is adding');
        clientData.calculation = parseInt(clientData.entryX) + parseInt(clientData.entryY);
    }
    else if (clientData.method == '-'){
        console.log('server calculator is subtracting');
        clientData.calculation = clientData.entryX - clientData.entryY;
    }
    else if (clientData.method == '*'){
        console.log('server calculator is multiplying');
        clientData.calculation = clientData.entryX * clientData.entryY;
    }
    else if (clientData.method == '/') {
        console.log('server calculator is dividing');
        clientData.calculation = clientData.entryX / clientData.entryY;
    }
}
