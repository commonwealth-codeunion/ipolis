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
    $('#phone').removeAttr('disabled').usPhoneFormat({
        format: country[2],
    });

    countries.forEach((code, index) =>
        $('#countries-list').append(`
            <div class="phone-form__countries-container" onclick="setCode(${index})">
                <div class="phone-form__flags flag flag_${code[0]}"></div>
                <span class="phone-form__code">${code[1]}</span>
            </div>
        `));
    $('#open-countries').click(() => {
        $('#countries-list').toggleClass('open');
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

    $('#submit').click(() => {
        $('#phone-form__countries').removeClass('open');
        let phone = country[1] + " " + $('#phone').val();
        console.log(phone, phone.length);

        try {
            if ($('#phone').val().trim().length != country[3]) throw Error('Введите номер полностью');
            if (country[4] && $('#phone').val()[0] != country[4]) throw Error('Введите корректный номер!');

            $.ajax({
                type: 'POST',
                url: 'send.php',
                data: { phone },
                beforeSend: () => {
                    $('.btn').attr('disabled', 'disabled');
                    $('.error').html('Отправляем...');
                }
            }).done(res => {
                if (res.error = 201)
                    $('.error').html('Отправлено!');
            })
                .fail(err => {
                    console.error(err);
                    $('.error').html('Произошла ошибка, попробуйте позже');
                });
        }
        catch (err) {
            console.log(err.message);

            $('.error').html(err.message);
            $('.form-phone').addClass('not-valid');
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

