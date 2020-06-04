let opened = false;
let btn = $('#burger');
let menu = $('.menu');
let items = $('.menu__items');
let nav_btn = $('.navbar__btn');


function open() {
    btn.addClass('open');
    menu.addClass('open');
    nav_btn.addClass('open');
    opened = true;
}

function close() {
    btn.removeClass('open');
    menu.removeClass('open');
    nav_btn.removeClass('open');
    opened = false;
}

btn.click(() => {
    if (opened) close();
    else open();
});

items.click(() => {
    close();
});