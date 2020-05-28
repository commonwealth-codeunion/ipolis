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
});