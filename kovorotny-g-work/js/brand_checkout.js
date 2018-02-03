"use strict";

function checkoutStepsInit() {
  $('.checkout-steps').first().find('.checkout-steps__div').each(function(index) {
    if ($(this).hasClass('checkout-steps__active')) {
      $(this).show(0);
    } else {
      $(this).hide(0);
    }
  });
}

function toggleCheckoutSteps(event) {
  // console.log($(event.currentTarget).next().attr('class').split(' '));
  if ($(event.currentTarget).next().hasClass('checkout-steps__active')) {

  } else {
    $(event.currentTarget).parent().parent().find('.checkout-steps__active').first().slideUp(500);
    $(event.currentTarget).parent().parent().find('.checkout-steps__active').first().removeClass('checkout-steps__active');
    $(event.currentTarget).next().addClass('checkout-steps__active');
    $(event.currentTarget).next().slideDown(500);
  }
}

function toggleCheckoutStep(event) {
  // console.log($(event.currentTarget).next().attr('class').split(' '));
  if ($(event.currentTarget).next().hasClass('checkout-steps__active')) {

  } else {
    $(event.currentTarget).parent().parent().find('.checkout-steps__active').first().removeClass('checkout-steps__active');
    $(event.currentTarget).next().addClass('checkout-steps__active');
  }
}
