$(function() {
	
	$("img, a").on("dragstart", function(event) {
		event.preventDefault();
  });
  
  try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$(".accordeon-trigger").on("click", function(e) {

		var $this = $(this),
		item = $this.closest(".accordeon-item"),
		content = item.find(".accordeon-inner"),
		duration = 300;

		if (!item.hasClass("active")) {
			content.stop(true).slideDown(duration);
			item.addClass("active");
		} else {
			content.stop(true).slideUp(duration);
      item.removeClass("active");
		}

	});

	$(".slider-slideshow").cycle({
    slides: "> img",
    timeout: 0,
    prev: ".slider-prev",
    next: ".slider-next"
  });
	
	$(".slider-pager").cycle({
    slides: "> div",
		timeout: 0,
    fx: "carousel",
    carouselVisible: 8,
    allowWrap: false,
    slideActiveClass: "sp-active"
	});
	

  var slideshows = $(".slider-element").on("cycle-next cycle-prev", function(e, opts) {
    // advance the other slideshow
    slideshows.not(this).cycle("goto", opts.currSlide);
  });

  $(".slider-pager .img-wrap").click(function() {
    var index = $(".slider-pager")
      .data("cycle.API")
      .getSlideIndex(this);
    slideshows.cycle("goto", index);
  });

  $(".slider-enlarge").on("click", function() {
    var active = $(".cycle-slide-active").attr("src");
    $(this).attr("href", active);
  });

  $(".slider-enlarge").magnificPopup({
    type: "image",
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom",

    image: {
      verticalFit: true,
      cursor: "null"
    },

    zoom: {
      enabled: true, 
      duration: 300, 
      easing: "ease-in-out",

      opener: function(openerElement) {
        return openerElement.is("a")
          ? openerElement
          : openerElement.find("a");
      }
    }
  });

  $(".popup-form-btn").magnificPopup({
    type: "inline",
    fixedContentPos: true,
    mainClass: "mfp-fade",
    removalDelay: 300
  });

  var st = $(this).scrollTop();

  $(".counters-bg").css({ transform: "translate(0%, " + st / 30 + "%)" });
 
  $(window).scroll(function(){
    st = $(this).scrollTop();
   
    $(".counters-bg").css({
      transform: "translate(0%, " + st / 30 + "%)"
    });
  });

});

