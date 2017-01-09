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
			email: "Your email address must be in the format of name@domain.com"
		},
		subject: "Please specify a subject"
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
	},
	unmatch : function() {
		var $grid = $('.work-list');
		$grid.isotope('destroy');
	}
});



/* Galleries */

$(document).ready(function(){
	$('#test').Chocolat({
		setTitle: 'Desk.com 2014',
		images : [
			//{ src:'/img/work/mixpanel-marketing-pages.png', title: 'Dashboard Concept' },
			{ src:'/img/work/various-mobile-concepts.png', title: 'title2' }
		],
		afterMarkup: function () {
			this.elems.setTitle.prependTo(this.elems.content);
			this.elems.description.prependTo(this.elems.content);
		}
	});
});
