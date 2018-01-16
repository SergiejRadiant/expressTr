$(function() {
	
	$("img, a").on("dragstart", function(event) {
    event.preventDefault();
  });

  $("form").submit(() => false);

  /***** dropdowns ****/

  function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  function DropDown(_button, _dropdown_container, _duration){
    this.button = _button;
    this.dropdown_container = _dropdown_container;
    this.duration = _duration;


    $(button).click(function(){

      var current_cont = $(this).find(dropdown_container);

      if($(current_cont).css("display") != "block"){

        for(var cont of $(dropdown_container)){
          if(cont != current_cont){
            $(cont).fadeOut(duration);
          }
        }

        $(current_cont).fadeIn(duration);
      }

    });

    $(document).click(function(e){

      if(findAncestor(e.target, "dropdown") == null){
        $(dropdown_container).fadeOut(duration);
      }
    });
  }

  DropDown(".dropdown", ".dropdown-content", 200);
  

  /***** dropdowns ****/

  /**************** tabs ****************/
  var tab_wrapper = $(".tabs-container");
  var tab_controls = $(tab_wrapper).find(".tabs-controls-item");
  var tab_items = $(tab_wrapper).find(".tabs-item");
  var is_tabs_open = false;

  $(tab_items).not(":first").hide();

  $(tab_controls).click(function() {

    var current_index = $(this).index();
    var current_item;
    console.log(current_index);
    if(current_index > 1){

      current_item = $(tab_items).eq(current_index - 1);
      
    }else{
      
      current_item = $(tab_items).eq(0);

      if(current_index == 1)
      {
        $(current_item).find("input[name='endpoint']").attr("disabled", "").val("");
      }
      else
        $(current_item).find("input[name='endpoint']").removeAttr("disabled");
    }
    console.log(current_item);
    var form_content = $(current_item).find(".form-content");
    


    $(tab_controls).removeClass("active")
              .eq(current_index)
              .addClass("active");

    $(tab_items).hide()
          .find(".form-content")
          .hide();

    $(current_item).fadeIn();

      
    if(form_content && current_index > 1){
      if(!is_tabs_open)
      { 
        $(".header-bottom-line").animate({marginTop:'0px'}, 1000);
        $(form_content).slideToggle(1000);
      }

      $(form_content).fadeIn(800);
      $("#check-auto").fadeIn(1000);
      is_tabs_open = true;
    }else{

      $(".header-bottom-line").animate({marginTop:'135px'}, 1000);
      $("#check-auto").fadeIn(1000);
      is_tabs_open = false;
    }
  
  }).eq(0).addClass("active");
  /**************** tabs ****************/
  
  /** Google API **/
  var inputs = document.getElementsByClassName('autocomplate');
  for(var input of inputs){
    input = new google.maps.places.Autocomplete(input);
  }
  /** Google API **/

  /** Calendar **/
  var datepickers = [];
  $(".datepicker").datepicker( $.datepicker.regional["ru"] );

  /** Calendar **/


  /**** passengers-counter  ****/

  function displayTotal(_counter){
    var main = $(_counter).parent().parent().parent(),
      input = $(main).find("input[name=Total]"),
      counters = $(main).find(".counter input");

    var adults = parseInt($(counters[0]).val());
    var children = parseInt($(counters[1]).val());

    $(input).val(adults + children);
  }

  function passengersCounter(_type, _counter, _action){

    var output = $(_counter).find("input[name=" + _type + "]"),
      current_val = parseInt($(output).val());

    if(_action == "inc")
      current_val++;
    else{
      if(current_val > 0)
        current_val--;
    }
    $(output).val(current_val);

    displayTotal(_counter);
  }

  $(".passengers .counter .inc").click(function(){

    var counter = $(this).parent();
    var type = $(counter).data("input");
    passengersCounter(type, counter, "inc");

  });

  $(".passengers .counter .dec").click(function(){

    var counter = $(this).parent();
    var type = $(counter).data("input");

    passengersCounter(type, counter, "dec");

  });
  
  /**** passengers-counter  ****/

  /**** order-form ******/

  var order_form = $("#order-form"),
      order_form_content = $(order_form).find(".form-content"),
      input_from = $(order_form).find("input[name=from]"),
      input_endpoint = $(order_form).find("input[name=endpoint]");


      function orderFormToggle(_form_content){
        if(_form_content){
          if(!is_tabs_open)
          { 
            $(".header-bottom-line").animate({marginTop:'0px'}, 1000);
            $(_form_content).slideToggle(1000);
            $("#check-auto").fadeOut(1000);
          }

          $(_form_content).fadeIn(800);
            is_tabs_open = true;
        }else{

          $(".header-bottom-line").animate({marginTop:'135px'}, 1000);
          is_tabs_open = false;
        }
      }


      $(input_from).blur(function(){

         orderFormToggle(order_form_content);

      });


  /**** order-form ******/



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

