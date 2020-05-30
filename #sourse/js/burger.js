let opened = false;
let btn = $('#burger');
let menu = $('.menu');
let items = $('.menu__items');


function open(){
    btn.addClass('open');
    menu.addClass('open');
    opened = true;
}

function close(){
    btn.removeClass('open');
    menu.removeClass('open');
    opened = false;
}

btn.click(() => {
    if (opened) close(); 
    else open();
});

items.click(() => {
    close();
});

