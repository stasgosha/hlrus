// TODO: ↓↓↓ remove this script ↓↓↓
// Current menu item highlithing
$(function () {
	var location = window.location.href;
	var cur_url = location.split('/').pop();

	$('.top-nav li, .panel-nav li, .footer-nav li').each(function () {
		var link = $(this).find('a').attr('href');

		// console.log(link);

		if (cur_url == '') {
			cur_url = 'index.html';
		}

		if (cur_url == link)
		{
			$(this).addClass('current-menu-item');
			$(this).parents('li').addClass('current-menu-parent');
		}
	});
});


document.addEventListener('DOMContentLoaded', function(){

	// Accordions
	$('.accordion, .js-accordion').each(function(i, el){
		$(el).find('> .ac-header, > .ac-header > .ac-opener').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			let ariaLabelEl = $(this).closest('.accordion').find('[aria-label]');
			let ariaLabelText = $(ariaLabelEl).attr('aria-label');

			if (ariaLabelText == 'Развернуть') {
				$(ariaLabelEl).attr('aria-label', 'Свернуть');
			} else {
				$(ariaLabelEl).attr('aria-label', 'Развернуть');
			}

			$(this).closest('.accordion, .js-accordion').find('> .ac-content').stop().slideToggle(300);
			$(this).closest('.accordion, .js-accordion').find('.slick-slider').slick('setPosition');
			$(this).closest('.accordion, .js-accordion').toggleClass('opened');
		});
	});

	// Top nav
	$('.megamenu-component').each(function(i, el){
		let categoriesLinks = $(el).find('.side-nav a');
		let tabs = $(el).find('.tab');

		categoriesLinks.hover(function(e){
			$( $(this).data('submenu') ).show().siblings().hide();
			$(this).parent().addClass('active').siblings().removeClass('active');
		});

		$(document).mousemove(function(e){
			let header = $('.header');
			if ( !header.is(e.target) && header.has(e.target).length === 0 ) {
				$('.megamenu').removeClass('visible');
			}
		});

		// $(el).find('.side-nav').mouseleave( e => $('#sub-default').show().siblings().hide() );

		categoriesLinks.click( e => e.preventDefault() );
	});

	$('.top-nav a[data-submenu]').hover(function(e){
		$('.megamenu:not('+$(this).data('submenu')+')').removeClass('visible');
		$( $(this).data('submenu') ).addClass('visible');

		$('.megamenu .tab').hide();
		$('.megamenu #sub-default').show();
	});

	$('.top-nav a:not([data-submenu])').hover(function(e){
		$('.megamenu').removeClass('visible');
	});

	// Awards
	$('.awards-component').each(function(i, el){
		let mainSlider = $(el).find('.cmp-main-slider');
		let previewsSlider = $(el).find('.cmp-previews-slider');

		let arrowsButtons = {
			prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8"><path d="M13 7L7 1 1 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
			nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8"><path d="M13 1L7 7 1 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
		}

		mainSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 600,
			swipe: false,
			draggable: false,
			asNavFor: previewsSlider,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						vertical: false,
						swipe: true,
						draggable: true
					}
				}
			]
		});

		previewsSlider.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: 0,
			vertical: true,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: true,
			speed: 600,
			focusOnSelect: true,
			asNavFor: mainSlider,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						vertical: false,
						arrows: false,
						dots: true
					}
				}
			]
		});
	});

	// switch-block
	$('.switch-block').each(function(i, el){
		$(el).find('.left-label').click(function(e){
			e.preventDefault();

			$(el).find('input').prop('checked', false);
		});

		$(el).find('.right-label').click(function(e){
			e.preventDefault();

			$(el).find('input').prop('checked', true);
		});

		$(el).find('.switcher').click(function(e){
			e.preventDefault();

			$(el).find('input').prop('checked', !$(el).find('input').is(':checked') );
		});
	});

	// .production-category-card
	$('.production-category-card .card-caption').click(function(e){
		e.preventDefault();

		if($(window).width() < 768){
			$(this).siblings('.card-hidden-content').stop().slideToggle(300);
			$(this).closest('.category-item').find('.mobile-products-list').stop().slideToggle(300);
		}
	});

	// Info section
	$('.tgr-btn').on('mouseover focus', function(e){
		let target = $(this).data('target');

		$(this).addClass('active').parent().siblings().find('.tgr-btn').removeClass('active');
		$(target).show().siblings().hide();
	});

	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	function setInfoTextsHeight(){
		$('.card-texts').each(function(i, el){
			let heights = [];

			$(el).find('.item').each(function(i, item){
				heights.push( $(item).height() );
			});

			$(el).height( getMaxOfArray(heights) );
		});
	}

	setInfoTextsHeight();
	$(window).resize(setInfoTextsHeight);

	$('.tgr-btn').on('click', function(e){
		e.preventDefault();
	});

	$('.tgr-btn').eq(0).trigger('mouseover');

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25.5" fill="#fff" stroke="#124271"/><path d="M29 32l-6-6 6-6" stroke="#124271" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle r="25.5" transform="matrix(-1 0 0 1 26 26)" fill="#fff" stroke="#124271"/><path d="M23 32l6-6-6-6" stroke="#124271" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
	}

	$('.gallery-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		speed: 600,
		...arrowsButtons
	});

	// History
	$('.history-slider').each(function(i, el){
		let yearsSlider = $(el).find('.years-slider');
		let descriptionsSlider = $(el).find('.descriptions-slider');

		yearsSlider.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: false,
			centerMode: true,
			centerPadding: '20%',
			arrows: true,
			...arrowsButtons,
			dots: false,
			asNavFor: descriptionsSlider,
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 576,
					settings: {
						arrows: false,
						slidesToShow: 1,
						centerPadding: '33.3%',
					}
				}
			]
		});

		descriptionsSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			centerMode: false,
			arrows: false,
			dots: false,
			asNavFor: yearsSlider
		});
	});

	$('.first-screen-slider-wrapper').each(function(i, el){
		$(el).find('.first-screen-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: true,
			speed: 1000
		});

		$(el).find('.slide-blocks').each(function(i, block){
			$(block).addClass( 'count-' + $(block).find('.cutted-block').length );
		});

		equalSlideHeight($(el).find('.first-screen-slider'));
	});

	$('.product-slider-wrapper').each(function(i, el){
		$(el).find('.product-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			appendArrows: $(el).find('.slider-nav'),
			dots: true,
			appendDots: $(el).find('.slider-nav'),
			infinite: true,
			speed: 600
		});

		equalSlideHeight($(el).find('.product-slider'));
	});

	$('.products-slider').each(function(i, el){
		let slidesCount = +$(el).data('slides-count');

		let defaults = {
			slidesToShow: slidesCount,
			slidesToScroll: 1,
			arrows: true,
			...arrowsButtons,
			dots: false,
			infinite: true,
			speed: 600,
			responsive: [
				{
					breakpoint: 1320,
					settings: {
						slidesToShow: (slidesCount / 2)
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
						dots: true,
						appendDots: $(el).next('.slider-nav'),
						appendArrows: $(el).next('.slider-nav')
					}
				}
			]
		}

		if (slidesCount == 4) {
			$(el).slick({
				...defaults
			});
		} else {
			$(el).slick({
				...defaults,
				slidesToShow: 2
			});
		}

		equalSlideHeight($(el));
	});

	// $('.projects-slider').slick({
	// 	slidesToShow: 2,
	// 	slidesToScroll: 2,
	// 	arrows: true,
	// 	...arrowsButtons,
	// 	dots: true,
	// 	infinite: true,
	// 	speed: 800,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1280,
	// 			settings: {
	// 				arrows: false
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 768,
	// 			settings: {
	// 				arrows: false,
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1
	// 			}
	// 		}
	// 	]
	// });

	// equalSlideHeight('.projects-slider');

	$('.news-slider-wrapper').each(function(i, el){
		$(el).find('.news-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			arrows: true,
			...arrowsButtons,
			appendArrows: $(el).find('.slider-nav'),
			dots: false,
			infinite: true,
			speed: 1000,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				}
			]
		});

		equalSlideHeight($(el).find('.news-slider'));
	});


	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 80
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$(this).toggleClass('active');
		$('.panel').toggleClass('opened');
		$('body').toggleClass('panel-opened');
	});

	$('.panel-close').click(function(e){
		e.preventDefault();

		$('.menu-opener').trigger('click');
	});

	// Mobile nav
	// $('.mobile-top-nav a').click(function(e){
	// 	e.stopPropagation();
	// 	// $('.menu-opener').click();
	// });

	// $('.mobile-top-nav li').click(function(){
	// 	// $('.menu-opener').click();
	// 	$(this).find('.sub-menu').slideToggle(300);
	// });

	// Sticky Header

	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Modals
	$('.modal').css('display','block');

	$('.modal-dialog').click(e => e.stopPropagation());
	$('.modal').click(function(e){
		hideModal( $(this) );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('.modal-close, .js-modal-close').click(function(e){
		e.preventDefault();

		hideModal( $(this).closest('.modal') );
		$('.video-modal .modal-video').html('<div id="modal-video-iframe"></div>');
	});

	$('[data-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		hideModal('.modal');

		if ($(this).data('modal-tab') != undefined) {
			goToTab($(this).data('modal-tab'));
		}

		showModal( $(this).data('modal') );
	});

	// Tabs
	function goToTab(tabId, handler){
		if (handler == undefined) {
			handler = false;
		}

		let dest = $( tabId );
		dest.stop().fadeIn(300).siblings().hide(0);

		$('[data-tab="'+tabId+'"]').addClass('current').parent().siblings().find('[data-tab]').removeClass('current');
	}

	$("[data-tab]").click(function(e){
		e.preventDefault();
		let dest = $(this).data('tab');

		goToTab(dest, $(this));

		$(dest).find('.slick-slider').slick('setPosition');
	});

	$(".filter-nav, .tabs-nav, .cmp-tabs-nav").each(function(i, el){
		$(el).find('[data-tab]').eq(0).click();
	});

	$('.tabs-select').on('change', function(){
		goToTab($(this).val());
	});

	// Fancybox
	// if ($('a, div').is('.fancybox')) {
	// 	$(".fancybox").fancybox();
	// }

	// Video
	$('.video-block:not([data-video-modal])').on('click', function () {
		$(this).addClass('playing');
		$(this).find('.block-overlay').fadeOut(300);

		let videoId = $(this).find('.play-btn').data('video-id');

		if (!videoId) {
			videoId = $(this).data('video-id');
		}

		if (videoId == undefined) {
			$(this).find('video')[0].play();
		} else{
			let videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

			if (videoType == 'youtube') {
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
				createVideo(videoId, videoId);
			} else if(videoType == 'vimeo'){
				$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			}
		}
	});

	$('[data-video-modal]').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		let videoId = $(this).data('video-modal');
		let videoType = $(this).data('video-type');

		if (videoType == 'youtube') {
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('youtube').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId);
		} else if(videoType == 'vimeo'){
			$('#modal-video-iframe').removeClass('vimeo youtube').addClass('vimeo').html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
		}

		hideModal('.modal');

		showModal( "#video-modal" );
	});

	var player;
	function createVideo(videoBlockId, videoId) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				'autohide': 1,
				'showinfo' : 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 0,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function (e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
						setTimeout(function(){
							e.target.playVideo();
						}, 200);
					// }
				}
			}
		});
	}
});

function getScrollWidth(){
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;
function showModal(modal){
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', getScrollWidth());
}

function hideModal(modal){
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
			 .scrollTop(bodyScrolled)
			 .css('padding-right', 0);
}