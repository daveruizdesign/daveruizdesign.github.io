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
