$(function() {
	
	$("img, a").on("dragstart", function(event) {
		event.preventDefault();
	});

	$('.accordeon-trigger').on('click', function(e) {

		var $this = $(this),
		item = $this.closest('.accordeon-item'),
		content = item.find('.accordeon-inner'),
		duration = 300;

		if (!item.hasClass('active')) {
			content.stop(true).slideDown(duration);
			item.addClass('active');
		} else {
			content.stop(true).slideUp(duration);
      item.removeClass("active");
		}

	});

	
	

});

