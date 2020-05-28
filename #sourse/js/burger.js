<<<<<<< HEAD
let open = false;
let btn = $('#burger');
let menu = $('.menu');

btn.click(() => {
    if(open){
        btn.removeClass('open');
        menu.removeClass('open');
        open = false;
    } else {
        btn.addClass('open');
        menu.addClass('open');
        open = true;
    }
=======
let open = false;
let btn = $('#burger');
let menu = $('.menu');

btn.click(() => {
    if(open){
        btn.removeClass('open');
        menu.removeClass('open');
        open = false;
    } else {
        btn.addClass('open');
        menu.addClass('open');
        open = true;
    }
>>>>>>> 87a010a2c8bb8a99664922be9b5e7a52a6992d68
});