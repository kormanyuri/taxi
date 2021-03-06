var $ = require('jquery');
//import popper from 'popper.js';
import bootstrap from 'bootstrap';
import Inputmask from "inputmask";
require('fancybox')($);

$(function() {

});

$(document).ready(function(){
    $('.fancybox').fancybox({
        padding: 3,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
    //show uploaded file name
    $('.input-uploade-file').on('click', function(e){
        var a = $(this)[0].value;
        $(this).change(function(e,fileName){
            var fileName = e.target.files[0].name;
            $(this).parent().parent('.file-upload').next('.file-name').html(fileName);
        });
    });
    //menu mobile
    $('.menu-mobile').on('click', function(e){
        e.preventDefault();
        $(this).next('nav').stop().slideToggle();
    });
    $(window).resize(function(){
        var w = $(window).width();
        if(w > 760 && $('nav').is(':hidden')) {
            $('nav').removeAttr('style');
        }
    });

    $("nav").clone().appendTo(".menu-footer-main");

    //scroll to
    $('a.scroll').on('click', function(e) {
        e.preventDefault();
        var link = $(this).attr('href');
        var w = $(window).width();
        if(w > 1010) {
            $('html, body').stop().animate({
                scrollTop: $(link).offset().top - 125
            }, 500);
        }
        else if(w > 761) {
            $('html, body').stop().animate({
                scrollTop: $(link).offset().top - 160
            }, 500);
        }
        else {
            $('html, body').stop().animate({
                scrollTop: $(link).offset().top - 50
            }, 500);
        }
    });
    $('.table-btn').on('click', function(e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
    });

    $(".ajax-contact-form").submit(function() {
        var th = $(this);
        var str = new FormData($(this)[0]);
        $.ajax({
            type: 'POST',
            processData: false,
            contentType: false,
            url: '/netcat/add.php?isNaked=1&ajax=1',
            data: str,
            success: function(msg) {
                result = msg;
                th.find('.note').html(result);
            }
        });
        return false;
    });

    $('[data-toggle=modal]').on('click', function() {
        var ctext = $(this).text();
        if($(this).data('modallabel')){
            ctext = $(this).data('modallabel');
        }
        $('.modal h3').text(ctext);
        $('.claimtype').val(ctext);
    });

    Inputmask().mask(document.querySelectorAll("input"));



    $('#adminForms').find('button').click(function(e) {
      e.preventDefault();
      var name = $('#adminForms').find('[name="f_Name"]').val();
      var phone = $('#adminForms').find('[name="f_Phone"]').val();
      var email = $('#adminForms').find('[name="f_Email"]').val();

      var isValid = true;

      isValid = name !== '';
      isValid = isValid && phone !== '';
      isValid = isValid && email !== '';

      if (isValid) {
        var form = new FormData();
        form.append('name', name);
        form.append('phone', phone);
        form.append('email', email);

        $("body").append(`<div style="" id="loadingDiv">
                            <div class="loader">Loading...</div>
                        </div>`);

        fetch('http://backend.ooo-mir.org/callback/save', {
          method: 'POST',
          body: form
        }).then(data => {
          $("#loadingDiv").fadeOut(500, function() {
            $("#loadingDiv").remove(); //makes page more lightweight
          });
          alert("Ваш запрос успешно отправлен");
          window.location.reload();
        }).catch(err => {
          console.log(err);
        });
        ///callback/save
      } else {
        alert('Заполните все обязательные поля');
      }

    });

  $("#gettForm").find("[type=\"submit\"]").click(function(e) {
    e.preventDefault();
    var lastName = $("#last-name").val();
    var name = $("#name").val();
    var middleName = $("#middle-name").val();
    var city = $("#city").val();
    var phone = $("#phone").val();
    var email = $("#email").val();

    var isValid = true;

    isValid = lastName !== '';
    isValid = isValid && name !== '';
    isValid = isValid && middleName !== '';
    isValid = isValid && city !== '';
    isValid = isValid && phone !== '';
    isValid = isValid && email !== '';

    if (!isValid) {
      alert('Заполните все обязательные поля');
    } else  if (!$("#exampleCheck1").prop("checked")) {
      alert("Необходимо согласие на обработку персональных данных");
    } else {
      var form = new FormData();
      form.append("last_name", lastName);
      form.append("first_name", name);
      form.append("middle_name", middleName);
      form.append("city", city);
      form.append("phone", phone);
      form.append("email", email);

      const inputs = document.querySelectorAll("input[type=\"file\"]");

      for (let i = 0; i < inputs.length; i++) {
        form.append("file" + i, inputs[i].files[0]);
      }

      $("body").append(`<div style="" id="loadingDiv">
                            <div class="loader">Loading...</div>
                        </div>`);


      fetch("http://backend.ooo-mir.org/driver/save", {
        method: "POST",
        body: form
      }).then(data => {
        // console.log(data);
        $("#loadingDiv").fadeOut(500, function() {
          $("#loadingDiv").remove(); //makes page more lightweight
        });
        alert("Ваш запрос успешно отправлен");
        window.location.reload();
      }).catch(err => {
        console.log(err);
      });
    }

  });

});

