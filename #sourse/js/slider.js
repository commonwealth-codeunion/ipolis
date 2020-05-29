var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(i) {
    showDivs(slideIndex += i);
}

function showDivs(n) {
    var i;
    var slideItems = document.getElementsByClassName("partners__slide-items");
    if (n > slideItems.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slideItems.length }
    for (i = 0; i < slideItems.length; i++) {
        slideItems[i].style.display = "none";
    }
    slideItems[slideIndex - 1].style.display = "block";
}