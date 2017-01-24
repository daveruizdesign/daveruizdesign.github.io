/* WOW */

//new WOW().init();

// skrollr.init({
//     render: function(data) {
//         //Log the current scroll position.
//         //console.log(data.curTop);
//     }
// });

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

enquire.register("screen and (min-width: 0px) and (max-width:1649px)", {
	match : function() {
		var $grid = $('.work-list');
		$grid.isotope({
			itemSelector: '.card--work',
			layoutMode: 'packery',
			getSortData: {
				number: '[data-number] parseInt',
			},
			sortBy : 'number',
			sortAscending: true
		});
		$(window).on('resize', function(){
			$grid.isotope('reloadItems');
			console.log("Window resized.");
		});
	},
	unmatch : function() {
		var $grid = $('.work-list');
		$grid.isotope('destroy');
	}
});
