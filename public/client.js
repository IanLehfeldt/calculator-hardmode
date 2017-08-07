$(document).ready(function () {
    console.log('Jquery is loaded');
    
    entryX = '';
    entryY = '';
    method = '';
    

    //Button click function for numbers
    $('.number').on('click', function () {
        buttonPressed = $(this).html();
        console.log('The button pressed is ', buttonPressed);

        //If statement that checks if serverInput.method has an operator and switches inputs if it does.
        if (method == '') {
            entryX += buttonPressed;
        } else {
            entryY += buttonPressed;
        }
        console.log(entryX, entryY, method);
        
    })

        //If statement that checks if the button pressed is an operator and should set the next input.entry to Y
    $('.operators').on('click', function (){
        buttonPressed = $(this).html();
        if (buttonPressed == '+') {
            console.log('Mathulator is adding ...');
            method = '+';
        } else if (buttonPressed == '-') {
            console.log('Mathulator is subtracting ...');
            method = '-';
        } else if (buttonPressed == '*') {
            console.log('Mathulator is multiplying ...');
            method = '*';
        } else if (buttonPressed == '/') {
            console.log('Mathulator is dividing ...');
            method = '/';
        } else if (buttonPressed == '=') {
            console.log('Mathulator is mathulating ...');
            //function that sends entryX, entryY, method to server for calculation
            sendToServer();
        } else if (buttonPressed == 'ClearAll') { 
            entryX = '';
            entryY = '';
            method = '';
        }
        //Log to check our object
        console.log(entryX, entryY, method);
    })


});

function sendToServer() {
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: {
            entryX: entryX,
            entryY: entryY,
            method: method
        },
        success: function(response){
            console.log('Calculation sent to server!');
        }
    })
}