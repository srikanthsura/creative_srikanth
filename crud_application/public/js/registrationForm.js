$(document).ready(function () {
        
        $("#firstname_error_message").hide();
        $("#lastname_error_message").hide();
        $("#moblie_error_message").hide();
        $("#password_error_message").hide();
        $("#confirm_password_error_message").hide();
        $("#email_error_message").hide();
   
    $("#first_name").focusout(function () {

        // check_username();
        var username_length = $("#first_name").val().length;

        if (username_length < 5 || username_length > 20) {
            $("#firstname_error_message").html("Should be between 5-10 characters");
            $("#firstname_error_message").show();
            // error_username = true;
        } else {
            $("#firstname_error_message").hide();
        }

    });

    $("#last_name").focusout(function () {

        // check_username();
        var username_length = $("#last_name").val().length;

        if (username_length < 3 || username_length > 20) {
            $("#lastname_error_message").html("Should be between 3-10 characters");
            $("#lastname_error_message").show();
            // error_username = true;
        } else {
            $("#lastname_error_message").hide();
        }

    });

    $("#email_id").focusout(function () {
        var mailId = $("#email_id").val();
        // var mailId_length = $("#email_id").val().length;
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (regexEmail.test(mailId)) {
            // alert(mailId+" is valid");
            $("#email_error_message").hide();
        }
        else {
            $("#email_error_message").html("enter valid Email");
            $("#email_error_message").show();
        }

    });

    $("#mobile_number").focusout(function () {

        var mobile_number_length = $("#mobile_number").val().length;

        if (mobile_number_length != 10) {
            $("#moblie_error_message").html("Enter the valid mobile number");
            $("#moblie_error_message").show();
        } else {
            $("#moblie_error_message").hide();
        }

    });

    $("#pass_word").focusout(function () {

        var password_length = $("#pass_word").val().length;

        if (password_length < 8) {
            $("#password_error_message").html("At least 8 characters");
            $("#password_error_message").show();
        } else {
            $("#password_error_message").hide();
        }

    });

    $("#confirm_password").focusout(function () {

        var password = $("#pass_word").val();
        var confirm_password = $("#confirm_password").val();

        if (password != confirm_password) {
            $("#confirm_password_error_message").html("Passwords don't match");
            $("#confirm_password_error_message").show();
        } else {
            $("#confirm_password_error_message").hide();
        }

    });


    var firstName = "",
        lastName = "",
        mobileNumber = "",
        emailId = "",
        password = "",
        confirmPass = "";
        // sign_up_data = "";

    $("#registration").on("click",function () {
        
        firstName = $("#first_name").val();
        lastName = $("#last_name").val();
        emailId = $("#email_id").val();
        mobileNumber = $("#mobile_number").val();
        password = $("#pass_word").val();
        confirmPass = $("#confirm_password").val();

        if (!firstName || !lastName || !emailId || !mobileNumber || !password){
            // alert("fill all the fields");
            $(".error_form").text("fill all the fields");
            $(".error_form").show();
        }
        else if (password != confirmPass) {
            $("#confirm_password_error_message").html("password and confirm_password must be matched");
            $("#confirm_password_error_message").show();
        }
        else{
            ajaxCall();
        }

        function ajaxCall() {
            $.ajax({
                url: "http://localhost:3000/registrationDetails?MailId=" + emailId,
                type: "get",
                dataType: "json",
                success: function (result) {
                    if (result.length == 0) {
                        validations(true);
                    } else {
                        validations(false);
                    }
                }
            })
        }
    })

    function validations(email) {
        
        if (email != true) {
            $("#email_error_message").html("entered email-Id is already existed");
            $("#email_error_message").show()
        }  
        else {
            server();
        }
    }

    
    function server(){
        var sign_up_data = {
                "FirstName": firstName,
                "LastName": lastName,
                "MailId": emailId,
                "MobileNumber": mobileNumber,
                "Password": password
            }
        $.ajax({
            url: 'http://localhost:3000/registrationDetails',
            type: 'post',
            // dataType: "text/json",
            data: sign_up_data,
            success: function (resp) {
                // console.log("success");
                console.log(resp);
                clearFormFields();
                alert("success : Navigate to login page");
                $(location).attr('href', 'loginForm.html');
            }
        });
    }

    function clearFormFields() {
        $("input").val('');
    
    }
  
})




