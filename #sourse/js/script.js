const countries = [
    ["blr", "+375", "xxx-xxx-xxxx", 11],
    ["ru", "+7", "xxx-xxx-xxxx", 12],
    ["kz", "+7", "xxx-xxx-xxxx", 12, '7'],
    ["kg", "+996", "xxx-xxx-xxxx", 12],
    ["ua", "+380", "xxx-xxx-xxxx", 11]
];
var country = countries[2];

const office = "https://yandex.kz/map-widget/v1/-/CCQwvRxO1C?lang=ru_RU";

window.onload = () => {
    console.log('Window already loaded!');
    $("#map_iframe").attr('src', office);
};

$(document).ready(function () {
    $('.phone').removeAttr('disabled').usPhoneFormat({
        format: country[2],
    });

    countries.forEach((code, index) =>
        $('.countries-list').append(`
            <div class="phone-form__countries-container" onclick="setCode(${index})">
                <div class="phone-form__flags flag flag_${code[0]}"></div>
                <span class="phone-form__code">${code[1]}</span>
            </div>
        `));
    $('.open-countries').click(() => {
        $('.countries-list').toggleClass('open');
    });

    $('summary').click((e) => {
        let target = $(e.target).parent('.faq__question');
        console.log(target[0].hasAttribute('open'));
        if (target[0].hasAttribute('open'))
            setTimeout(() => {
                target.removeAttr('open'); console.log('wow')
            }, 10);
        $('.faq__question').removeAttr('open');

    });

    $('.submit').click((event) => {
        $('.phone-form__countries').removeClass('open');
        let id = $(event.target).attr('data-form-id');
        let val = $('.phone')[id].value;
        let phone = country[1] + " " + val;
       
         console.log(id);
        console.log(phone, phone.length);

        try {
            $('.phone-form').removeClass('invalid');

            if (val.length != country[3]) throw Error('Введите номер полностью');
            if (country[4] && val.length > 0 && val[0] != country[4]) throw Error('Введите корректный номер!');

            $.ajax({
                type: 'POST',   
                url: 'send.php',
                data: { phone },
                beforeSend: () => {
                    $('#phone'+id).attr('disabled', 'disabled').addClass('load');
                    $('.important__text').html('Отправляем...');
                },
                complete: () => {
                    $('#phone'+id).removeAttr('disabled').removeClass('load');
                }
            }).done(res => {
                if (res.error = 201){
                    $('.phone-form').addClass('send').html(val);
                    $('.submit').attr('disabled', 'disabled');
                }
            })
                .fail(err => {
                    console.error(err);
                    $('.phone-form')[id].classList.add('error');
                });
        }
        catch (err) {
            console.log(err.message);
            $('.phone-form')[id].classList.add('invalid');
        }


    });

    $('#phone').on('focus click', () => {
        $('.phone-form__countries').removeClass('open');
    });

    $(document).on('click', (event) => {
        if (!$(event.target).hasClass('phone-form__countries') && !$(event.target).hasClass('phone-form__flag'))
            $('.phone-form__countries').removeClass('open');
    });
});

function setCode(index) {
    if (countries[index][0] != country[0]) $('#phone').val('');
    $('.phone-form__flag').removeClass('flag_' + country[0]);
    country = countries[index];
    $('.phone-form__flag').addClass('flag_' + country[0]);
    $(".phone-form__country-code").html(country[1]);
    $('.phone-form__countries').toggleClass('open');
}

