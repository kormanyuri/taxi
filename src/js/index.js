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

});

