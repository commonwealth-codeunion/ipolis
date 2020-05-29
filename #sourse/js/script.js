const countries = [
    ["blr", "+375", "xxx-xxx-xxxx", 11],
    ["ru", "+7", "xxx-xxx-xxxx", 12],
    ["kz", "+7", "xxx-xxx-xxxx", 12, '7'],
    ["kg", "+996", "xxx-xxx-xxxx", 12],
    ["ua", "+380", "xxx-xxx-xxxx", 11]
];
var country = countries[2];

$(document).ready(function () {
    $('#phone').removeAttr('disabled').usPhoneFormat({
        format: country[2],
    });

    countries.forEach((code, index) =>
        $('.input-phone__countries').append(`
            <div class="input-phone__countries-element" onclick="setCode(${index})">
                <div class="input-phone__countries-container">
                    <div class="input-phone__flags flag flag_${code[0]}"></div>
                    <span class="input-phone__code">${code[1]}</span>
                </div>
            </div>
        `));


    $('#open-countries').click(() => {
        $('.input-phone__countries').toggleClass('open');
    });

    $('#submit').click(() => {
        $('.input-phone__countries').removeClass('open');
        // $('.error').html('');
        // $('.form-phone').removeClass('not-valid');
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
                    $('.btn').attr('disabled', 'disabled')
                        .html('Отправляем...');
                }
            }).done(res => {
                if (res.error = 201)
                    $('.btn').html('Отправлено');
            })
                .fail(err => {
                    console.error(err);
                    $('.btn').html('Ошибка');
                });
        }
        catch (err) {
            console.log(err.message);

            $('.error').html(err.message);
            $('.form-phone').addClass('not-valid');
        }


    });

    $('#phone').on('focus click', () => {
        $('.input-phone__countries').removeClass('open');
    });
});

function setCode(index) {
    if (countries[index][0] != country[0]) $('#phone').val('');
    $('.input-phone__flag').removeClass('flag_' + country[0]);
    country = countries[index];
    $('.input-phone__flag').addClass('flag_' + country[0]);
    $(".input-phone__country-code").html(country[1]);
    $('.input-phone__countries').toggleClass('open');

    // $('#phone').unbind();
    // $('#phone').attr('placeholder', country[2]).usPhoneFormat({
    //     format: country[2]
    // })
}

