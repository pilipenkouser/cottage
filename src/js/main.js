// $(document).ready(function(){


$('#hamburger').on('click', function(e){

	if( $('#header-nav').hasClass('nav-open') ){

		$('#header-nav').removeClass('nav-open'); 
	
	} else {

		$('#header-nav').addClass('nav-open');
	}
});



// ********  TABS ***********
$(".tabs_navigation__link").click(function(event) {
    event.preventDefault();

    $('.tabs_navigation__link').removeClass("tabs_navigation__link-active");
    $(this).addClass("tabs_navigation__link-active");

    var tab = $(this).attr("href");
    $(".tabs_content__item").not(tab).removeClass("tabs_content__item-active");
    $(tab).addClass("tabs_content__item-active");
});



$('.model_range__imgs-small').on('mouseenter', function(e){
	var target = e.target;

	var bigImg = $(target).siblings(".model_range__imgs-big")[0];
	
	var bigImgSrc = bigImg.src;

	bigImg.src = target.src;

	$(target).on('mouseleave', function(e){

		bigImg.src = bigImgSrc;

	});
});


$('#model_range-link').on('click', function(e){
	var target = e.target;

	while( !($(target).hasClass('we_build__items')) ){
		
		if( $(target).hasClass('we_build__item') ) {

			var data = $(target).data('num');

			$('body').addClass('lock');
			$('#model_range-' + data).parent().addClass('overlay-open');

		}

		target = target.parentNode;
	}
});



$('.culc_result__button').on('click', function(e){
	var target = e.target;

	makeModalTitle();


	$('body').addClass('lock');
	$('#calc').parent().addClass('overlay-open');

});


$('.modal').on('click',function(e){
	e.stopPropagation();
});


$('.contact__callback, .footer__contact__callback, .tabs_content__item_button, .infrastructure__button').on('click', function(e){
	var target = e.target;

	$('body').addClass('lock');
	$('#callback').parent().addClass('overlay-open');
	e.preventDefault();
});


$('.modal-close, .overlay').on('click',function(e){
	$('.modal').removeClass('modal-open').parent().removeClass('overlay-open');
	$('body').removeClass('lock');
});



function makeModalTitle(){

	var res = 'Дом ' + $('#modal_s_home_input').val() 
		+ ', участок ' + $('#modal_s_early_input').val() + ', ';

	for( var i = 0; i <= $('.kit__items_radio').size() - 1; i++){

		if ( $('.kit__items_radio')[i].checked ) {

			res += '<br>комплектация: ' + $('.kit__items_radio')[i].value + '.';
		}	
	}

	if( $(".optional__items_radio[name='terrace']")[0].checked ){
		res += ', ' + $(".optional__items_radio[name='terrace']")[0].value;
	}

	if( $(".optional__items_radio[name='carport']")[0].checked ){
		res += ', ' + $(".optional__items_radio[name='carport']")[0].value;
	}

	for( var i = 0; i <= $('.optional__items_radio.garage').size() - 1; i++){

		if ( $('.optional__items_radio.garage')[i].checked ) {

			res += ', ' + $('.optional__items_radio.garage')[i].value + '.';
		}	
	}

	$('.modal__chioce_list').html( res );
};

function changeImg(num){

	var srcImgBig = $('#model_range-' + num).find('.model_range__imgs-big').attr('src');
	var srcImgSmall1 = $('#model_range-' + num).find('.model_range__imgs-small')[0].src;
	var srcImgSmall2 = $('#model_range-' + num).find('.model_range__imgs-small')[1].src;
	var srcImgSmall3 = $('#model_range-' + num).find('.model_range__imgs-small')[2].src;

	console.log( $('#model_range-' + num).find('.model_range__imgs-small')[0].src );

	$('.culc_result__img').attr('src', srcImgBig );
	$('#calc').find('.model_range__imgs-big').attr('src', srcImgBig );

	$('#calc').find('.model_range__imgs-small')[0].src = srcImgSmall1;
	$('#calc').find('.model_range__imgs-small')[1].src = srcImgSmall2 ;
	$('#calc').find('.model_range__imgs-small')[2].src = srcImgSmall3;
}



$( ".s_home__slider" ).slider({

	value: 2,
	step: 1,
	range: false,
	min: 1,
	max: 4,
	animate: "fast",

	slide: function( event, ui ) {

		switch(ui.value){
			case 1:
				$('#s_home_result').html(49);
				$('#modal_s_home_input').val( 49 + ' кв.м');
				$('.s_home__slider_highlight').css('width', '0%');
				changeImg(49);
				break;
			case 2:
				$('#s_home_result').html(56);
				$('#modal_s_home_input').val( 56 + ' кв.м');
				$('.s_home__slider_highlight').css('width', '33%');
				changeImg(56);
				break;
			case 3:
				$('#s_home_result').html(77);
				$('#modal_s_home_input').val( 77 + ' кв.м');
				$('.s_home__slider_highlight').css('width', '66%');
				changeImg(77);
				break;
			case 4:
				$('#s_home_result').html(99);
				$('#modal_s_home_input').val( 99 + ' кв.м');
				$('.s_home__slider_highlight').css('width', '99%');
				changeImg(99);
				break;
		}

		calculateHome( ui.value, '.s_home', 30000);
	},
}); 



$( ".s_early__slider" ).slider({

	value: 2,
	step: 1,
	range: false,
	min: 1,
	max: 3,
	animate: "fast",

	slide: function( event, ui ) {

		switch(ui.value){
			case 1:
				$('#s_early_result').html(4);
				$('#modal_s_early_input').val( 4 + ' соток');
				$('.s_early__slider_highlight').css('width', '0%');
				break;
			case 2:
				$('#s_early_result').html(5);
				$('#modal_s_early_input').val( 5 + ' соток'); 
				$('.s_early__slider_highlight').css('width', '50%');
				break;
			case 3:
				$('#s_early_result').html(6);
				$('#modal_s_early_input').val( 6 + ' соток');
				$('.s_early__slider_highlight').css('width', '99%');
				break;
		}

		calculateHome( ui.value, '.s_early', 45000);
	},
}); 








$('.kit__items_radio').on('change', function(e){

	var currentValue = +($(this).data("num"));

	calculateHome( currentValue, '.kit__items', 12500);
});


$('.optional__items_radio.garage').on('change', function(e){

	var currentValue = +($(this).data("garage"));

	calculateHome( currentValue, '#radio_garage', 10350);
});



$('.terrace, .carport').on('mousedown', function(e){


	$(this).children('.optional__items_radio')[0].isChecked = $(this).children('.optional__items_radio')[0].checked;
});


$('.terrace, .carport').on('click', function(e){
	// e.stopPropagation();

	$(this).children('.optional__items_radio')[0].checked = !($(this).children('.optional__items_radio')[0].isChecked);

	if( $(this).children('.optional__items_radio')[0].checked ){

		calculateHome( 2, '.' + this.classList[0], $(this).data("price"));
	} else {

		calculateHome( 1, '.' + this.classList[0], $(this).data("price"));
	}
});





$("#header-nav").on("click","a", function (event) {
    event.preventDefault();

    var id  = $(this).attr('href'),
        top = $(id).offset().top;
     
    $('body,html').animate({scrollTop: top}, 1500);
});




// }



ymaps.ready(init);
var myMap, 
myPlacemark;

function init(){ 
    myMap = new ymaps.Map("map", {
        center: [52.25752374, 104.32939506],
        zoom: 16,
    });

    myPlacemark = new ymaps.Placemark([52.25753691, 104.32744242], {
        hintContent: 'г. Иркутск, ул. Байкальская, 206',
        balloonContent: 'г. Иркутск, ул. Байкальская, 206'
    },
    {
    	iconLayout: 'default#image',
        iconImageHref: 'style/png-sprite.png',
        iconImageClipRect: [[584,253], [627, 319]],
        iconImageSize: [43, 66],
        iconImageOffset: [-23, -66]
    });
    
    myMap.geoObjects.add(myPlacemark);
}

















