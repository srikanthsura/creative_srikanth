$(document).ready(function () {
    
    $("#email_error_message").hide();
    $("#password_error_message").hide();

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


    $("#pass_word").focusout(function () {

        var password_length = $("#pass_word").val().length;

        if (password_length < 8) {
            $("#password_error_message").html("At least 8 characters");
            $("#password_error_message").show();
        } else {
            $("#password_error_message").hide();
        }

    });

    var emailId = "", 
        password = "";
    
    $("#log_in").on("click", function () {
        emailId = $("#email_id").val();  
        password = $("#pass_word").val(); 

        if (emailId && password) {           
                ajaxCall();
            } 
        else{
            // alert("please fill all fields");
            $(".error_form").text("fill all the fields");
            $(".error_form").show();
        }       
    });

    function ajaxCall() {
        var loginUrl = "http://localhost:3000/registrationDetails?MailId=" + emailId;
        $.ajax({
            url: loginUrl,
            type: "get",
            dataType: "json",
            success: function (result) {
                console.log(result);  
                if(result.length > 0) {
                    validateExistUser(result);
                }
                else{
                    $("#email_error_message").text("entered email-Id is not existed , please signUp");
                    $("#email_error_message").show();
                }     
            }
        })
    }

    function validateExistUser(responce) {
        console.log(responce);
    
        if (responce[0].Password != password) {
            $("#password_error_message").text("entered wrong password");
            $("#password_error_message").show();
        }
        else{
        
            alert("login successfull and navigate to Home_page");
            // localStorage.setItem("id", id);
            // console.log(id);
            $(location).attr('href', 'http://localhost:3000/index.html');
            
            $("input").val('');
        } 
    }
})