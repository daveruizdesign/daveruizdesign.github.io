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





	var initPhotoSwipeFromDOM = function(gallerySelector) {
		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item;

			for(var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i];
				if(figureEl.nodeType !== 1) {
					continue;
				}
				linkEl = figureEl.children[0];
				size = linkEl.getAttribute('data-size').split('x');
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
				if(figureEl.children.length > 1) {
					item.title = figureEl.children[1].innerHTML;
				}
				if(linkEl.children.length > 0) {
					item.msrc = linkEl.children[0].getAttribute('src');
				}
				item.el = figureEl;
				items.push(item);
			}

	        return items;
	    };

	    // find nearest parent element
	    var closest = function closest(el, fn) {
	        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
	    };

	    // triggers when user clicks on thumbnail
	    var onThumbnailsClick = function(e) {
	        e = e || window.event;
	        e.preventDefault ? e.preventDefault() : e.returnValue = false;

	        var eTarget = e.target || e.srcElement;

	        // find root element of slide
	        var clickedListItem = closest(eTarget, function(el) {
	            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
	        });

	        if(!clickedListItem) {
	            return;
	        }

	        // find index of clicked item by looping through all child nodes
	        // alternatively, you may define index via data- attribute
	        var clickedGallery = clickedListItem.parentNode,
	            childNodes = clickedListItem.parentNode.childNodes,
	            numChildNodes = childNodes.length,
	            nodeIndex = 0,
	            index;

	        for (var i = 0; i < numChildNodes; i++) {
	            if(childNodes[i].nodeType !== 1) {
	                continue;
	            }

	            if(childNodes[i] === clickedListItem) {
	                index = nodeIndex;
	                break;
	            }
	            nodeIndex++;
	        }



	        if(index >= 0) {
	            // open PhotoSwipe if valid index found
	            openPhotoSwipe( index, clickedGallery );
	        }
	        return false;
	    };

	    // parse picture index and gallery index from URL (#&pid=1&gid=2)
	    var photoswipeParseHash = function() {
	        var hash = window.location.hash.substring(1),
	        params = {};

	        if(hash.length < 5) {
	            return params;
	        }

	        var vars = hash.split('&');
	        for (var i = 0; i < vars.length; i++) {
	            if(!vars[i]) {
	                continue;
	            }
	            var pair = vars[i].split('=');
	            if(pair.length < 2) {
	                continue;
	            }
	            params[pair[0]] = pair[1];
	        }

	        if(params.gid) {
	            params.gid = parseInt(params.gid, 10);
	        }

	        return params;
	    };

	    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
	        var pswpElement = document.querySelectorAll('.pswp')[0],
	            gallery,
	            options,
	            items;

	        items = parseThumbnailElements(galleryElement);

	        // define options (if needed)
	        options = {


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

	            // define gallery index (for URL)
	            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

	            getThumbBoundsFn: function(index) {
	                // See Options -> getThumbBoundsFn section of documentation for more info
	                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
	                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
	                    rect = thumbnail.getBoundingClientRect();

	                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
	            }

	        };

	        // PhotoSwipe opened from URL
	        if(fromURL) {
	            if(options.galleryPIDs) {
	                // parse real index when custom PIDs are used
	                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
	                for(var j = 0; j < items.length; j++) {
	                    if(items[j].pid == index) {
	                        options.index = j;
	                        break;
	                    }
	                }
	            } else {
	                // in URL indexes start from 1
	                options.index = parseInt(index, 10) - 1;
	            }
	        } else {
	            options.index = parseInt(index, 10);
	        }

	        // exit if index not found
	        if( isNaN(options.index) ) {
	            return;
	        }

	        if(disableAnimation) {
	            options.showAnimationDuration = 0;
	        }

	        // Pass data to PhotoSwipe and initialize it
	        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	        gallery.init();

			gallery.listen('initialZoomInEnd', function() {
				gallery.zoomTo(1, {
					x:gallery.viewportSize.x/2,
					y:0
				}, 175, false, function(now) {});
			});

			gallery.listen('afterChange', function(index, item) {
				gallery.zoomTo(1, {
					x:gallery.viewportSize.x/2,
					y:0
				}, 0, false, function(now) {});
			});

	    };

	    // loop through all gallery elements and bind events
	    var galleryElements = document.querySelectorAll( gallerySelector );

	    for(var i = 0, l = galleryElements.length; i < l; i++) {
	        galleryElements[i].setAttribute('data-pswp-uid', i+1);
	        galleryElements[i].onclick = onThumbnailsClick;
	    }

	    // Parse URL and open gallery if it contains #&pid=3&gid=1
	    var hashData = photoswipeParseHash();
	    if(hashData.pid && hashData.gid) {
	        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
	    }

	};

	// execute above function

	initPhotoSwipeFromDOM('.my-gallery');


	$(".card--work").click(function() {

		console.log("Hey! Clicked.");
	});
