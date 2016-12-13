var $grid = $('.work-list');

$grid.isotope({
	itemSelector: '.carddd',
	percentPosition: true,
	masonry: {
		columnWidth: '.carddd'
	},
	getSortData: {
		weight: '[data-weight] parseInt'
	},
	sortBy : 'weight',
	sortAscending: true
});


$("#drd__form").validate({
	rules: {
		name: "required",
		email: {
			required: true,
			email: true
		}
	},
	messages: {
		name: "Please specify your name",
		email: {
			required: "We need your email address to contact you",
			email: "Your email address must be in the format of name@domain.com"
		}
	},
	errorElement: "div",
});
