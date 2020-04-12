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
  $('.menu-main li > a').click(function (e) {
    e.stopPropagation();

    if ($(window).width() < 900) {
      var parent = $(this).parent();
      parent.siblings('li').removeClass('open');
      parent.siblings('li').children('.sub-menu').slideUp(400);
      $(this).parent().toggleClass('open');

      if (parent.hasClass('open')) {
        $(this).siblings('.sub-menu').slideDown(400);
      } else {
        $(this).siblings('.sub-menu').slideUp(400);
      }
    }
  }); // Toggle Navigation Mobile

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
  $(window).click(function (e) {
    e.stopPropagation();

    if (e.target.className == 'nav-overlay') {
      $('.nav-toggle').removeClass('active');
      $('.nav-menu').removeClass('open');
      $('.page-container').removeClass('show-nav-overlay');
      $('body').removeAttr('style');
    }
  });
});