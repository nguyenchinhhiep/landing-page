"use strict";

//  Author: Nguyen Chinh Hiep
//  Email: nguyenchinhhiep95@gmail.com
//  Facebook: facebook.com/hiepnguyen1003
$(document).ready(function () {
  // Navigation Mobile Toggle
  // (function navigationToggle() {
  //     const hasSubItemsNav = document.querySelectorAll(".menu-main li > a");
  //     hasSubItemsNav.forEach(item => {
  //         const itemParent = item.parentElement;
  //         const subMenu = itemParent.querySelector('.sub-menu');
  //         item.addEventListener('click', function(e) {
  //             if(window.innerWidth < 900) {
  //                 closeAllSubMenu(item);
  //                 if(subMenu) {
  //                     itemParent.classList.toggle('open');
  //                     if(itemParent.classList.contains('open')){
  //                         subMenu.style.display = 'block';
  //                     } else {
  //                         subMenu.style.display = 'none';
  //                     }
  //                 }
  //             }
  //         })
  //     })
  // })()
  // function closeAllSubMenu(item) {
  //     const parentElement = item.parentElement;
  //     const parentofParent = item.parentElement.parentElement;
  //     const getAllSub = parentofParent.querySelectorAll('.has-sub');
  //     getAllSub.forEach(el => {
  //         if(el !== item.parentNode) {
  //             el.classList.remove('open');
  //             el.querySelector('.sub-menu').style.display = 'none';
  //         } else {
  //             return;
  //         }
  //     })
  // }
  // Navigation Dropdown
  var navigationDropdown = function navigationDropdown() {
    $('.menu-main li > a').click(function (e) {
      e.stopPropagation();
      console.log('hello');

      if ($(window).width() < 992) {
        var _parent = $(this).parent();

        _parent.siblings('li').removeClass('open');

        _parent.siblings('li').children('.sub-menu').slideUp(400);

        $(this).parent().toggleClass('open');

        if (_parent.hasClass('open')) {
          $(this).siblings('.sub-menu').slideDown(400);
        } else {
          $(this).siblings('.sub-menu').slideUp(400);
        }
      } else {
        parent.siblings('li').removeClass('open');
      }
    });
  }; // Toggle Navigation Mobile


  var toggleNavigation = function toggleNavigation() {
    $('.nav-toggle').click(function (e) {
      e.stopPropagation();
      $(this).toggleClass('active');
      $('.nav-menu').toggleClass('open');
      $('.page-container').toggleClass('show-nav-overlay');

      if ($('.page-container').hasClass('show-nav-overlay')) {
        $('body').css('overflow', 'hidden');
      } else {
        $('body').removeAttr('style');
      }
    });
  }; // Set default background for hero items


  var setHeroBackground = function setHeroBackground() {
    var getHeroItems = document.querySelectorAll('.hero .hero-item');
    getHeroItems.forEach(function (item) {
      var background = $(item).attr('data-background');
      var overlayBg = $(item).children('.overlay-bg');
      var bgUrl = "./../assets/images/".concat(background);
      var backgroundStyle = "linear-gradient(rgba(22, 28, 45, 0.75), rgba(22, 28, 45, 0.75)), url(".concat(bgUrl, ")");
      overlayBg.css({
        'background': backgroundStyle,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover'
      });
    });
  }; // Open Video Modals


  var videoOverlay = function videoOverlay() {
    var btnPlayVideos = document.querySelectorAll('.btn-play-video');
    btnPlayVideos.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').css('overflow', 'hidden');
        var videoUrl = $(this).attr('href');
        $('#video-overlay').addClass('show');
        $('#video-overlay').find('.video-overlay-inner').append("<iframe width=\"100%\" height=\"100%\" src=".concat(videoUrl, " frameborder=\"0\" allowfullscreen></iframe>"));
      });
    });
    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        closeVideoModal();
      }
    });
  };

  function closeVideoModal() {
    $('.video-overlay').removeClass('show').find('iframe').remove();
    $('body').removeAttr('style');
  } // Window close


  var windowClose = function windowClose() {
    $(window).click(function (e) {
      e.stopPropagation();

      if (e.target.className == 'nav-overlay') {
        $('.nav-toggle').removeClass('active');
        $('.nav-menu').removeClass('open');
        $('.page-container').removeClass('show-nav-overlay');
        $('body').removeAttr('style');
      }

      if (e.target.className == 'video-overlay-close' || e.target.className == 'video-overlay show') {
        closeVideoModal();
      }
    });
  }; // Hero Slider


  var heroSlider = function heroSlider() {
    var slick = $('#hero-slider');
    slick.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      draggable: true,
      arrows: false,
      dots: true,
      customPaging: function customPaging(slider, i) {
        return ''; // Remove button, customize content of "li"
      }
    });
  }; // Check if visible


  var isVisible = function isVisible(el, elClass, offset, callback) {
    /*** Based on http://ejohn.org/blog/learning-from-twitter/ ***/
    var didScroll = false;
    var this_top;
    var height;
    var top;

    if (!offset) {
      var offset = 0;
    }

    $(window).scroll(function () {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        didScroll = false;
        top = $(window).scrollTop() + $(window).height();
        $(el).each(function (i) {
          this_top = $(this).offset().top - offset;
          height = $(this).height(); // Scrolled within current section

          if (top >= this_top && !$(this).hasClass(elClass)) {
            $(this).addClass(elClass);
            if (typeof callback == "function") callback(el);
          }
        });
      }
    }, 100);
  }; //   isVisible


  var onViewport = function onViewport(el) {
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    /* or $(window).height() */
    // rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    ;
  }; //   Animate when visible


  var animateVisible = function animateVisible() {
    var didScroll;
    var animateEL = document.querySelectorAll('[data-animate]');
    $(window).on('scroll', function () {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        didScroll = false;
        animateEL.forEach(function (el) {
          var animationName = $(el).attr('data-animate');

          if (onViewport(el) && !el.classList.contains('animated')) {
            el.classList.add('animated');
          }
        });
      }
    }, 100);
  };

  $(window).on('DOMContentLoaded load', function () {
    var animateEL = document.querySelectorAll('[data-animate]');
    animateEL.forEach(function (el) {
      var animationName = $(el).attr('data-animate');

      if (onViewport(el)) {
        el.classList.add(animationName);
      }
    });
  }); // Magnific Popup

  var magnificPopup = function magnificPopup() {
    $('.filter-content').magnificPopup({
      delegate: 'a',
      // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
        enabled: true
      } // other options

    });
  }; // Filter Catergory Portfolio


  var isotope = function isotope() {
    // init Isotope
    var $grid;
    $('.filter-content').imagesLoaded({// options...
    }, function () {
      // images have loaded
      $grid = $('.filter-content').isotope({
        layoutMode: 'fitRows',
        itemSelector: '.element-item',
        percentPosition: true
      });
    }); // bind filter button click

    $('.portfolio-filter').on('click', '.filter-item', function () {
      var filterValue = $(this).attr('data-filter'); // use filterFn if matches value

      filterValue = filterValue;
      $grid.isotope({
        filter: filterValue
      });
    }); // change is-checked class on buttons

    $('.portfolio-filter').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', '.filter-item', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });
  }; // Fixed header when scroll down


  var fixedHeader = function fixedHeader() {
    var didScroll;
    $(window).scroll(function (event) {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 100);

    function hasScrolled() {
      var st = $(window).scrollTop(); // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.

      if (st > 0) {
        // Scroll Down
        $('nav').addClass('nav-sticky');
      } else {
        $('nav').removeClass('nav-sticky');
      }
    }
  }; // Wow Js


  var wow = function wow() {
    new WOW({
      offset: 50,
      mobile: false,
      live: false
    }).init();
  }; // Init


  var init = function init() {
    windowClose();
    navigationDropdown();
    toggleNavigation();
    setHeroBackground();
    videoOverlay();
    heroSlider();
    animateVisible();
    magnificPopup();
    isotope();
    fixedHeader();
    wow();
  };

  init();
});