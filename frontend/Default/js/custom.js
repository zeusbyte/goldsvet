$(window).on('load', function() {
	$('.preloader').fadeOut();
	$('body').removeClass('locked');
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    clearInterval(window.globaltimer);
    window.globaltimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if( duration <= 0 ){
            $.getJSON('/profile/clear_phone', [], function(data){
                if( data.success ){
                    $('#show_sms_timer').hide();
                    $('#verifyMyPhone').show();
                    $('#ckeckCode').hide();
                    $('#myPhone').val('+');
                    $('#show_phone').show();
                    show_error(data.message);
                }
            });
            display.html('Time is up');
            display.attr('data-seconds', '0');
            clearInterval(window.globaltimer);
            return false;
        }
        display.html(minutes + ":" + seconds);
        display.attr('data-seconds', duration--);
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var timer = $('#sms_timer');
    $('#resend').show();
    var seconds = timer.data('seconds');
    startTimer(seconds, timer);

    $( ".countdown" ).each(function( index ) {
        var div = $( this );
        var date = div.data('date');
        countdown.setLabels(
            '| | | | | | | | | | ',
            '| | | | | | | | | | ',
            ':',
            ':',
            '00:00',
            function(n) { return n; },
            function(n) {
                ///console.log(n);
                if(!n){
                    return '00';
                }
                return (n < 10) ? '0'+n : ''+n;
            }
        );
        var tournamentInterval = setInterval(function () {
            var tournamentTimer = moment().countdown(
                date,
                countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS
            );
            if(tournamentTimer.value < 0){
                div.text('00:00');
                clearInterval(tournamentInterval);
            }
            var timer_text = tournamentTimer.toString();
            div.text(timer_text.replace(/: /g, ''));
        }, 1000);
    });

};

$(".search-btn").click(function() {
    $(this).parent().addClass("active");
    $(this).parent().find('input').focus();
    $('.mobile-menu').removeClass('active');
    $('.overlay').hide();
});

$(".jackpot--action").click(function() {
	$(this).toggleClass("active");
	$('.jackpot-prizes').toggleClass('active')
});

$(".footer-menu").click(function() {
	$(this).toggleClass("active");
	$(this).parent().find('.tooltip-item').toggleClass('active')
});

$(".clear-btn").click(function() {
    $(this).parent('.mobile-search').removeClass('active');
    $('.overlay').hide();
});

$(".mobMenu").click(function() {
	$(this).toggleClass("active");
	$('.mobile-menu').toggleClass('active');
	$('body').toggleClass('locked')
	$('.overlay').toggleClass('active');
});

$(".notification__close").click(function() {
	$(this).parents('.notification').removeClass('_visible');
	$(this).parents().find('.notification__message').removeClass('_active');
});

//BALANCE INFO - BEGIN
var linc2 = $('.balance__info'),
    timeoutId;
$('.account-stats').hover(function(){
    clearTimeout(timeoutId);
    linc2.slideDown();
}, function(){
    timeoutId = setTimeout($.proxy(linc2,'slideUp'), 1000)
});
linc2.mouseenter(function(){
    clearTimeout(timeoutId);
}).mouseleave(function(){
    linc2.slideUp();
});
//BALANCE INFO - END

$('.modal-btn').click(function (e) {
    if(terms_and_conditions){
        show_terms_and_conditions();
        return false;
    }
	e.preventDefault()
	$('div.'+$(this).attr("data-name")).addClass('active')
	$('body').addClass('locked')
});

$('.close-btn, .popup-btn').click(function () {
	$(this).closest('.modal, .popup').removeClass('active');
	$('body').removeClass('locked')
    $('.overlay').hide();
});
$('.modal-close').click(function () {
	$('.modal').removeClass('active');
	$('body').removeClass('locked');
    $('.overlay').hide();
});


// //PIN PAD - BEGIN

const numberPills = document.querySelectorAll('.PINbutton');
const loginInput = document.querySelectorAll('.loginInput');

let pillVal = '';

for (let item of loginInput) {
	item.addEventListener('click', function () {
		for (let input of loginInput) {
			input.classList.remove('active');
		}
		this.classList.add('active');
	})
}
function pillValue() {
	for (let pill of numberPills) {
		pill.addEventListener('click', function () {

			pillVal = pill.value;

			for (let inputEl of loginInput) {
				if (inputEl.classList.contains('active')) {
					inputEl.value += pillVal
				}
			}
		})
	}
}

pillValue();

function backspace() {
	let display = $('.loginInput.active');

	display.val( display.val().substr(0, display.val().length - 1));
}


  function clearForm(e){
	$( ".loginInput.active" ).val( "+" );
}


//SLIDER - BEGIN
if($('.footer__column').length > 0){
	$('.footer__column').slick({
		dots: false,
		speed: 1000,
		autoplay: true,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1
	});
}
if($('.modal-slider').length > 0){
	$('.modal-slider').slick({
		infinite:      false,
		dots:          true,
		pauseOnHover:  false,
		draggable:     true,
		speed:          1000,
		autoplay:       false,
		slidesToShow:      1,
		slidesToScroll:    1,
	});
}
if($('.modal-slider-loot').length > 0){
	$('.modal-slider-loot').slick({
		infinite:      false,
		dots:          true,
		pauseOnHover:  false,
		draggable:     true,
		speed:          1000,
		autoplay:       false,
		slidesToShow:      1,
		slidesToScroll:    1,
	});
}
//SLIDER - END

//  TABS - BEGIN

$('.profile-top__item').click(function (e) {
	e.preventDefault()
	$('.profile-top__item').removeClass('is-active');
	$('.profile-content__item').removeClass('is-active');

	$(this).addClass('is-active');
	$($(this).attr('href')).addClass('is-active')
})

$('.kassa-tabs__item').click(function (e) {
	e.preventDefault()
	$('.kassa-tabs__item').removeClass('is-active');
	$('.kassa-content__item').removeClass('is-active');

	$(this).addClass('is-active');
	$($(this).attr('href')).addClass('is-active')
})

$('.kassa-content__box').click(function (e) {
	e.preventDefault()
	$('.kassa-content__box').removeClass('is-checked');
	$('.price').removeClass('is-active');
	$('.order').removeClass('is-active');

	$(this).addClass('is-checked');
	$(this).next().addClass('is-active')

});
//  TABS - END

if ($('input[type=tel]').length > 0) {
	$("input[type=tel]").inputmask({"mask": "+9(999) 999-9999", autoUnmask: true});
}

if ($('input.bonus-input[type=text]').length > 0) {
	$("input.bonus-input[type=text]").inputmask({"mask": "9 9 9 9", autoUnmask: true});
}

Array.from(document.querySelectorAll('.custom-scroll'))
.forEach(
	el => new SimpleBar(el, {
		autoHide: false,
		scrollbarMinSize: 100
	})
);

//accordion
$('.accordion__trigger').click(function(e) {
	e.preventDefault();

	let parent = $(this).parent();

	if (parent.hasClass('active')) {
		parent.removeClass('active')
	} else {
		$('.accordion__item').removeClass('active');
		parent.addClass('active')
	}
});


const images = document.querySelectorAll('img.lazy');
const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1,
}

function handleImg(myImg, observer) {
	myImg.forEach(myImgSingle => {
		if(myImgSingle.intersectionRatio > 0) {
			loadImage(myImgSingle.target)
		}
	})
}

function loadImage(image) {
	image.src = image.getAttribute('data-src');
}

const observer = new IntersectionObserver(handleImg, options);

images.forEach(img => {
	observer.observe(img)
})
