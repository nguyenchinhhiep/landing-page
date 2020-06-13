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
  const navigationDropdown = () => {

    $('.menu-main li > a').click(function (e) {
      e.stopPropagation();
      if ($(window).width() < 992) {
        const parent = $(this).parent();
        parent.siblings('li').removeClass('open');
        parent.siblings('li').children('.sub-menu').slideUp(400);
        $(this).parent().toggleClass('open');
        if (parent.hasClass('open')) {
          $(this).siblings('.sub-menu').slideDown(400);
        } else {
          $(this).siblings('.sub-menu').slideUp(400);
        }
      }
    })
  }

  // Toggle Navigation Mobile
  const toggleNavigation = () => {
    $('.nav-toggle').click(function (e) {
      e.stopPropagation()
      $(this).toggleClass('active');
      $('.nav-menu').toggleClass('open')
      $('.page-container').toggleClass('show-nav-overlay');
      if ($('.page-container').hasClass('show-nav-overlay')) {
        $('body').css('overflow', 'hidden');
      } else {
        $('body').removeAttr('style');
      }
    })

  }

  // Set default background for hero items
  const setHeroBackground = () => {
    const getHeroItems = document.querySelectorAll('.hero .hero-item');
    getHeroItems.forEach(item => {
      const background = $(item).attr('data-background');
      const overlayBg = $(item).children('.overlay-bg');
      const bgUrl = `./../assets/images/${background}`;
      const backgroundStyle = `linear-gradient(rgba(22, 28, 45, 0.75), rgba(22, 28, 45, 0.75)), url(${bgUrl})`
      overlayBg.css({
        'background': backgroundStyle,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      })
    })
  }

  // Open Video Modals

  const videoOverlay = () => {
    const btnPlayVideos = document.querySelectorAll('.btn-play-video');
    btnPlayVideos.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('body').css('overflow', 'hidden');
        const videoUrl = $(this).attr('href');
        $('#video-overlay').addClass('show');
        $('#video-overlay').find('.video-overlay-inner').append(`<iframe width="100%" height="100%" src=${videoUrl} frameborder="0" allowfullscreen></iframe>`)
      })
    })

    $(document).keyup(function (e) {
      if (e.keyCode === 27) {
        closeVideoModal();
      }
    });
  }

  function closeVideoModal() {
    $('.video-overlay').removeClass('show').find('iframe').remove();
    $('body').removeAttr('style');
  }

  // Window close
  const windowClose = () => {
    $(window).click(function (e) {
      e.stopPropagation()
      if (e.target.className == 'nav-overlay') {
        $('.nav-toggle').removeClass('active');
        $('.nav-menu').removeClass('open');
        $('.page-container').removeClass('show-nav-overlay');
        $('body').removeAttr('style');
      }

      if (e.target.className == 'video-overlay-close' || e.target.className == 'video-overlay show') {
        closeVideoModal();
      }
    })
  }

  // Hero Slider
  const heroSlider = () => {
    const slick = $('#hero-slider');
    slick.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      draggable: true,
      arrows: false,
      dots: true,
      customPaging: function (slider, i) {
        return ''; // Remove button, customize content of "li"
      }
    });

    const navPrev = document.querySelector('#nav-left');
    const navNext = document.querySelector('#nav-right');

    navPrev.addEventListener('click', function() {
      slick.slick('slickPrev');
    })
    navNext.addEventListener('click', function() {
      slick.slick('slickNext');
    })
    
  }

  // Check if visible
  const isVisible = (el, elClass, offset, callback) => {
    /*** Based on http://ejohn.org/blog/learning-from-twitter/ ***/
    var didScroll = false;
    var this_top;
    var height;
    var top;

    if (!offset) { var offset = 0; }
    $(window).scroll(function () {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        didScroll = false;
        top = $(window).scrollTop() + $(window).height();

        $(el).each(function (i) {
          this_top = $(this).offset().top - offset;
          height = $(this).height();

          // Scrolled within current section
          if (top >= this_top && !$(this).hasClass(elClass)) {
            $(this).addClass(elClass);

            if (typeof callback == "function") callback(el);
          }
        });
      }
    }, 100);
  }
  //   isVisible
  const onViewport = (el) => {
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
  }

  //   Animate when visible
  const animateVisible = () => {
    var didScroll;
    const animateEL = document.querySelectorAll('[data-animate]');
    $(window).on('scroll', function () {
      didScroll = true;
    })

    setInterval(function () {
      if (didScroll) {
        didScroll = false;
        animateEL.forEach(el => {
          const animationName = $(el).attr('data-animate');
          if (onViewport(el) && !el.classList.contains('animated')) {
            el.classList.add('animated')
          }
        })
      }
    }, 100)


  }
  $(window).on('DOMContentLoaded load', function () {
    const animateEL = document.querySelectorAll('[data-animate]');
    animateEL.forEach(el => {
      const animationName = $(el).attr('data-animate');
      if (onViewport(el)) {
        el.classList.add(animationName);
      }
    })
  })

  // Magnific Popup
  const magnificPopup = () => {
    $('.filter-content').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
      gallery: {
        enabled: true
      },
      // other options
    });
  }

  // Filter Catergory Portfolio
  const isotope = () => {
    // init Isotope
    var $grid;
    $('.filter-content').imagesLoaded({
      // options...
    },
      function () {
        // images have loaded
        $grid = $('.filter-content').isotope({
          layoutMode: 'fitRows',
          itemSelector: '.element-item',
          percentPosition: true,
        });
      }
    );

    // bind filter button click
    $('.portfolio-filter').on('click', '.filter-item', function () {
      var filterValue = $(this).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterValue;
      $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', '.filter-item', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });


  }

  // Fixed header when scroll down
  const fixedHeader = () => {
    var didScroll;

    $(window).on('DOMContentLoaded load scroll', function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 100);

    function hasScrolled() {
      var st = $(window).scrollTop();

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > 0) {
        // Scroll Down
        $('nav').addClass('nav-sticky');
      } else {
        $('nav').removeClass('nav-sticky');
      }

    }
  }

  // Wow Js
  const wow = () => {
    new WOW({
      offset: 0,
      mobile: false,
      live: false
    }).init();
  }

  // Spy Scroll
  const spyScroll = () => {
    let didScroll;
    $(window).on('DOMContentLoaded load scroll', function () {
      didScroll = true;
    })

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 100)

    function hasScrolled() {
      const menuHeight = $('nav').outerHeight();
      const scrollPos = $(window).scrollTop() + menuHeight;
      $('.menu-main a.scroll-spy').each(function () {
        const currentLink = $(this);
        const refElement = $(currentLink.attr("href"));

        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('.menu-main a.scroll-spy').removeClass("active");
          currentLink.addClass("active");
        }
        else {
          currentLink.removeClass("active");
        }

      })
    }
  }

  // Smooth Scroll
  const smoothScroll = () => {
    // Add smooth scrolling to all links
    $(".scroll-spy").on('click', function (event) {

      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  }

  // Init
  const init = () => {
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
    spyScroll();
    smoothScroll();
  }

  init();

});
