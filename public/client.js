$(document).ready(function () {
    console.log('Jquery is loaded');
    serverPull();

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

        $('#calculatorInput').text(entryX + ' ' + method + ' ' + entryY);
    })

    //If statement that checks if the button pressed is an operator and should set the next input.entry to Y
    $('.operators').on('click', function () {
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
            serverPull();
            emptyInput();
            $('#calculatorInput').text(entryX + ' ' + method + ' ' + entryY);

        } else if (buttonPressed == 'ClearAll') {
            emptyInput();
            $.ajax({
                method: 'GET',
                url: '/clearArray',
                success: function (response) {
                    serverPull();
                    $('#calculatorInput').text(entryX + ' ' + method + ' ' + entryY);
                }
            })
        }
        $('#calculatorInput').text(entryX + ' ' + method + ' ' + entryY);
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
        success: function (response) {
            console.log('Calculation sent to server!');
        }
    })
}

function serverPull() {
    $.ajax({
        method: 'GET',
        url: '/calculationsArray',
        success: function (response) {
            console.log(response);
            //function that draws the calculations
            drawCalculations(response);
        }
    })
}

function drawCalculations(serverData) {
    $('#calculationDiv').empty();
    for (var i = 0; i < serverData.length; i++) {
        $('#calculationDiv').append(
            '<p>' + serverData[i].entryX + ' ' + serverData[i].method + ' ' + serverData[i].entryY + ' ' +
            '=  <br>' + serverData[i].calculation + '</p>'
        );
    }
}

function emptyInput() {
    entryX = '';
    entryY = '';
    method = '';
}