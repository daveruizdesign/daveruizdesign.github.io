$(document).ready(function(){
    $('.chocolat-parent').Chocolat();
});
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
