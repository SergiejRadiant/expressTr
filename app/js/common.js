$(function() {
	
	$("img, a").on("dragstart", function(event) {
    event.preventDefault();
  });

  $("form").submit(function(){ return false});

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

  DropDown(".dropdown", ".dropdown-content", 100);
  

  /***** dropdowns ****/

  /**************** tabs ****************/
  var tab_wrapper = $(".tabs-container");
  var tab_controls = $(tab_wrapper).find(".tabs-controls-item");
  var tab_items = $(tab_wrapper).find(".tabs-item");
  var is_tabs_open = false;
  var marginTopHeader = $(".header-bottom-line").css("margin-top");
  

  /**** scrollTo *****/
  function scrollTo(_element){
    if($(window).width() < 1201)
      $('html, body').animate({
        scrollTop: $(_element).offset().top - parseInt($(".header-bottom-line").css("margin-top"))
      }, 1000);
  }
  /**** scrollTo *****/


  $(tab_items).not(":first").hide();

  $(tab_controls).click(function() {




    var current_index = $(this).index();
    var current_item;

    if(current_index > 1){

      current_item = $(tab_items).eq(current_index - 1);
      scrollTo("#header-bottom-line");
    }else{
      
      current_item = $(tab_items).eq(0);
      scrollTo("#header");

      if(current_index == 1)
      {
        $(current_item).find("input[name='endpoint']").attr("disabled", "").val("");
      }
      else
        $(current_item).find("input[name='endpoint']").removeAttr("disabled");
    }

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

      $(".header-bottom-line").animate({marginTop: $(window).width() >= 993 ? marginTopHeader : '0px'}, 1000);
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
      alert_window = $(order_form).find(".alert-warning"),
      order_form_content = $(order_form).find(".form-content"),
      input_origin = $(order_form).find("input[name=origin]"),
      input_destination = $(order_form).find("input[name=destination]"),
      output_price = $(order_form).find(".output");


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

      function getPriceForDestination(){
        var origin = $.trim($(input_origin).val()),
        destination = $.trim($(input_destination).val());

        

        if(origin.length > 0 && destination.length > 0){

          orderFormToggle(order_form_content);
          scrollTo("#header-bottom-line");

          console.log("origin = " + origin);
          console.log("destination = " + destination);

          var directionsService = new google.maps.DirectionsService;

          calculatePrice(directionsService, 
           origin, 
           destination,
           69,
           40,
           alert_window,
           output_price);
        }
      }

      $("input[name=origin], input[name=destination]").keyup(function(){
        $(alert_window).fadeOut(200).empty();
      });
      $("input[name=origin], input[name=destination]").blur(function(){

          setTimeout(getPriceForDestination, 200)

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


  /*** Mobile menu ***/

  var clonedMenu = $("header .menu ul").clone();
  $("#mobile-menu").append(clonedMenu);

  //Option of mobile-menu
  $("#mobile-menu").mmenu({
    extensions:['widescreen','theme-white','effect-menu-slide','pagedim-black'],
    navbar:{
      title: "Меню"
    }
  });
  
  //Hamburger click handler
  var mmApi = $("#mobile-menu").data( "mmenu" );
  
  mmApi.bind("closed",function(){
    $(".sandwich").removeClass("active");
  });

  $(".toggle-btn").click(function(){

    mmApi.open();
    $(".sandwich").addClass("active");

  });

  /*** Mobile menu ***/

   /** Calendar **/
  var datepickers = [];
  $(".datepicker").datepicker( $.datepicker.regional["ru"] )
  /** Calendar **/

  /**** Ajax Google Maps ****/
  function calculatePrice(_directionsService, _origin, _destination, _pricePer, _fixPrice, _alert, _output) {

    if(true){

      _directionsService.route({
        origin: _origin,
        destination: _destination,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
      }, function(response, status) {


          
          switch(status){
            case 'OK': {
              var directionsRoute = response.routes.shift();
              var directionsLeg = directionsRoute.legs.shift();
              var distance = Math.ceil(directionsLeg.distance.value / 1000);

              var res = distance > 40 ? distance * _pricePer : 50 * _fixPrice;
              console.log(distance);
              $(_output).text(res).parent().addClass("active");
              $(_alert).fadeOut(200).empty();

              break;
            }
            case 'ZERO_RESULTS':{
              $(_alert).empty();
              $(_alert).append(`<p>Вы уверенны, что указали направления правильно?
               Не получается построить маршрут, воспользуйтесь обрытным звонком для уточнения информации:</p>
               <a href='#popup-form' class='button small popup-form-btn'>Заказать звонок</a>`).fadeIn(200);
              break;
            }
            case 'NOT_FOUND':{
              $(_alert).empty();
              $(_alert).append(`<p>Вы уверены, что указали правильно направление?</p>`).fadeIn(200);
              break;
            }
            default: {
              $(_alert).empty();
              $(_alert).append(`<p>Одно или несколько, указанных вами мест не существует!</p>`).fadeIn(200);
              break;
            }
          }

          $(".popup-form-btn").magnificPopup({
            type: "inline",
            fixedContentPos: true,
            mainClass: "mfp-fade",
            removalDelay: 300
          });

      });

    }else{



    }

  }
  /**** Ajax Google Maps ****/


  /**** Pay Methods radio  ****/ 
  $("input[name=pay-method]").on('change', function() {
    var $this = $(this),
        pm = $this.closest(".pay-method"),
        common = pm.find(".dropdown .pay-method-label"),
        span = pm.find(".dropdown .pay-method-label span"),
        cards = pm.find(".dropdown input[name=pay-method-card]");


    cards.prop("checked", false);
    common.removeClass("active");
    span.text("");
  });
 
  $("input[name=pay-method-card]").on('change', function() {
    var $this = $(this),
        src = $this.data("img"),
        alt = $this.data("alt"),
        dropdown = $this.closest(".dropdown"),
        common = dropdown.find(".pay-method-label"),
        commonImg = dropdown.find(".pay-method-label img"),
        commonSpan = dropdown.find(".pay-method-label span");

    commonImg.attr("src", src);
    commonImg.attr("alt", alt);
    common.addClass("active");
    commonSpan.text(alt);
  });
   /**** Pay Methods radio  ****/ 

   
});

