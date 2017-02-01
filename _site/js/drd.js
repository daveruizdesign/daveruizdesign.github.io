$(function(){
	$(document).scroll(function(){
		if($(this).scrollTop() >= $('.divider--history').offset().top - 350) {
			$(".divider--history").addClass('divider--animated');
		} else {
			$(".divider--history").removeClass("divider--animated");
		}
		if($(this).scrollTop() >= $('.divider--contact').offset().top - 350) {
			$(".divider--contact").addClass('divider--animated');
		} else {
			$(".divider--contact").removeClass("divider--animated");
		}
	});
});


	/* Form validation */

	$("#drd__form").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true,
				minlength: 2
			},
			message: {
				required: true,
				minlength: 2
			}
		},
		messages: {
			name: "Please specify your name",
			email: {
				required: "We need your email address to contact you",
				email: "Please enter a valid email"
			},
			subject: "Please specify a subject",
			message: "Please write a message"
		},
		errorElement: "div",
	});



	/* Gallery layout based on viewport */

	enquire.register("(min-width: 0px) and (max-width:1439px)", {
		match : function() {
			var $grid = $('.work-list');
			$grid.isotope({
				itemSelector: '.card--work',
				getSortData: {
					number: '[data-number] parseInt',
				},
				sortBy : 'number',
				sortAscending: true,
				itemSelector: '.card--work',
				transitionDuration: 0,
				isResizeBound: false
			});
			$(window).resize(function(){
				$grid.isotope('layout');
			});
		},
		unmatch : function() {
			var $grid = $('.work-list');
			$grid.isotope('destroy');
			console.log("Unmatched");
		}
	});


	var pswpElement = document.querySelectorAll('.pswp')[0];
	var items = [
		{
			src: '/img/work/3/slides/1.png',
			w: 2500,
			h: 1700,
			title: 'Dashboards',
			author: "Dave Ruiz"
		},
		{
			src: '/img/work/11/slides/1.jpg',
			w: 1160,
			h: 1830,
			title: 'Image Caption'
		}
	];
	var options = {
		index: 0,
		shareEl: false,
		fullscreenEl: false,
		zoomEl: false,
		counterEl: false,
		captionEl: true,
		closeOnScroll: false,
		addCaptionHTMLFn: function(item, captionEl, isFake) {
			if(!item.title) {
				captionEl.children[0].innerText = '';
				return false;
			}
			captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
			return true;
		},
	};
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

	$(".card--work").click(function() {
		console.log("Hey! Clicked.");

		gallery.init();
		gallery.zoomTo(1, {
			x:gallery.viewportSize.x/2,
			y:0
		}, 0, false, function(now) {});
		gallery.listen('afterChange', function(index, item) {
			gallery.zoomTo(1, {
				x:gallery.viewportSize.x/2,
				y:0
			}, 0, false, function(now) {});
		});

	});
