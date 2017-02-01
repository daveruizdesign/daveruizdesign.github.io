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
