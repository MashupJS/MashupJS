/*global mashupApp:false */

mashupApp.controller('exApp1.ImperativeController', function () {
    'use strict';

    setLableValues();

    function setLableValues() {
        $('#lblName').text('Name: ' + $('#txtName').val());
        $('#lblAddress').text('Address: ' + $('#txtAddress').val());
        $('#lblPhone').text('Phone: ' + $('#txtPhone').val());
        $('#lblEmail').text('Email: ' + $('#txtEmail').val());
    }
    
    manageScreen();

    function setSpanErrName() {
        if ($('#txtName').val() === '') {
            $('#spanErrName').show();
        }
        else {
            $('#spanErrName').hide();
        }
    }
    function setSpanErrAddress() {
        if ($('#txtAddress').val() === '') {
            $('#spanErrAddress').show();
        }
        else {
            $('#spanErrAddress').hide();
        }
    }
    function setBtnComplete() {
        if (formIsValid()) {
            $('#btnComplete').prop('disabled', false);
        }
        else {
            $('#btnComplete').prop('disabled', true);
        }
    }
    function setValidationFeedback() {
        if (formIsValid()) {
            $('#validationFeedback').hide();
        }
        else {
            $('#validationFeedback').show();
        }
    }
    function formIsValid() {
        var result = true;

        if ($('#txtName').val() === '') { result = false; }
        if ($('#txtAddress').val() === '') { result = false; }

        return result;
    }

    function manageScreen() {
        setSpanErrName();
        setSpanErrAddress();
        setBtnComplete();
        setValidationFeedback();
    }
    
    $('#btnComplete').click(function () {

        window.alert('Your data is saved... add new order...');

        $('#txtName').val('');
        $('#txtAddress').val('');
        $('#txtPhone').val('');
        $('#txtEmail').val('');
        
        manageScreen();
        setLableValues();
    });

    $('#txtName').keyup(function() {
        $('#lblName').text('Name: ' + $('#txtName').val());
        manageScreen();
    });
    $('#txtAddress').keyup(function() {
        $('#lblAddress').text('Address: ' + $('#txtAddress').val());
        manageScreen();
    });
    $('#txtPhone').keyup(function() {
        $('#lblPhone').text('Phone: ' + $('#txtPhone').val());
        manageScreen();
    });
    $('#txtEmail').keyup(function() {
        $('#lblEmail').text('Email: ' + $('#txtEmail').val());
        manageScreen();
    });

});

