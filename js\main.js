$(document).ready(()=>{}),function(n){n.fn.usPhoneFormat=function(e){var t=n.extend({format:"xxx-xxx-xxxx",international:!1},e);"xxx-xxx-xxxx"===t.format?(n(this).bind("paste",(function(e){e.preventDefault();var t=e.originalEvent.clipboardData.getData("Text");if(!n.isNumeric(t))return!1;t=String(t.replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")),n(this).val(t),n(this).val(""),t=t.substring(0,12),n(this).val(t)})),n(this).on("keydown touchend",(function(e){if(8!=e.which&&0!=e.which&&(e.which<48||e.which>57))return!1;var t=this.value.length,o=n(this).val();(3==t&&8!=e.which&&0!=e.which||7==t&&8!=e.which&&0!=e.which)&&n(this).val(o+"-"),n(this).attr("maxlength","12")}))):"(xxx) xxx-xxxx"===t.format&&(n(this).on("keydown touchend",(function(e){if(8!=e.which&&0!=e.which&&(e.which<48||e.which>57))return!1;var t=this.value.length,o=n(this).val();3==t&&8!=e.which&&0!=e.which?n(this).val("("+o+") "):9==t&&8!=e.which&&0!=e.which&&n(this).val(o+"-"),n(this).attr("maxlength","14")})),n(this).bind("paste",(function(e){e.preventDefault();var t=e.originalEvent.clipboardData.getData("Text");if(!n.isNumeric(t))return!1;t=String(t.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3")),n(this).val(t),n(this).val(""),t=t.substring(0,14),n(this).val(t)})))}}(jQuery);const countries=[["blr","+375","xxx-xxx-xxxx",11],["ru","+7","xxx-xxx-xxxx",12],["kz","+7","xxx-xxx-xxxx",12,"7"],["kg","+996","xxx-xxx-xxxx",12],["ua","+380","xxx-xxx-xxxx",11]];var country=countries[2];function setCode(n){countries[n][0]!=country[0]&&$("#phone").val(""),$(".input-phone__flag").removeClass("flag_"+country[0]),country=countries[n],$(".input-phone__flag").addClass("flag_"+country[0]),$(".input-phone__country-code").html(country[1]),$(".input-phone__countries").toggleClass("open")}$(document).ready((function(){$("#phone").removeAttr("disabled").usPhoneFormat({format:country[2]}),countries.forEach((n,e)=>$(".input-phone__countries").append(`\n            <div class="input-phone__countries-element" onclick="setCode(${e})">\n                <div class="input-phone__countries-container">\n                    <div class="input-phone__flags flag flag_${n[0]}"></div>\n                    <span class="input-phone__code">${n[1]}</span>\n                </div>\n            </div>\n        `)),$("#open-countries").click(()=>{$(".input-phone__countries").toggleClass("open")}),$("#submit").click(()=>{$(".input-phone__countries").removeClass("open");let n=country[1]+" "+$("#phone").val();console.log(n,n.length);try{if($("#phone").val().trim().length!=country[3])throw Error("Введите номер полностью");if(country[4]&&$("#phone").val()[0]!=country[4])throw Error("Введите корректный номер!");$.ajax({type:"POST",url:"send.php",data:{phone:n},beforeSend:()=>{$(".btn").attr("disabled","disabled").html("Отправляем...")}}).done(n=>{(n.error=201)&&$(".btn").html("Отправлено")}).fail(n=>{console.error(n),$(".btn").html("Ошибка")})}catch(n){console.log(n.message),$(".error").html(n.message),$(".form-phone").addClass("not-valid")}}),$("#phone").on("focus click",()=>{$(".input-phone__countries").removeClass("open")})}));let open=!1,btn=$("#burger"),menu=$(".menu");btn.click(()=>{open?(btn.removeClass("open"),menu.removeClass("open"),open=!1):(btn.addClass("open"),menu.addClass("open"),open=!0)});var slideIndex=1;function plusDivs(n){showDivs(slideIndex+=n)}function showDivs(n){var e,t=document.getElementsByClassName("partners__slide-items");for(n>t.length&&(slideIndex=1),n<1&&(slideIndex=t.length),e=0;e<t.length;e++)t[e].style.display="none";t[slideIndex-1].style.display="block"}showDivs(slideIndex);