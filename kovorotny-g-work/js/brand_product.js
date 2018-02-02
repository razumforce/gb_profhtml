"use strict";

function productPriceSliderInit() {
  $('#product-price-slider').slider({
    range: true,
    min: 52,
    max: 450,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $('#product-price1').val('$' + ui.values[0]);
      $('#product-price2').val('$' + ui.values[1]);
    }
  });
  $('#product-price1').val('$' + $('#product-price-slider').slider('values', 0));
  $('#product-price2').val('$' + $('#product-price-slider').slider('values', 1));
}

function productItemsLoad(page) {
  $.get({
      url: './serverdata/product' + page + '.json',
      dataType: 'json',
      success: function (data) {
          if (data.result) {
            productPaginationUpdate(page, data.total);
            $('.product-items__item').each(function(index) {
              $(this).attr('data-id', data.items[index].id);
              $(this).children('img').attr('src', data.items[index].pic);
              $(this).children('img').attr('alt', data.items[index].pic.split('/').pop());
              $(this).children('p.product-items__item_desc').text(data.items[index].name);
              $(this).children('p.product-items__item_price').text(data.items[index].price);
            });
          } else {
            console.log('SOMETHING WENT WRONG, ERROR MESSAGE: ' + data.message);
          }
          
      }
  });
}

function productPaginationUpdate(activePage, qty) {
  var totalPages = parseInt(qty / 9) + 1;
  $('#product-pagination').html('');
  if (activePage == 1) {
    $('#product-pagination').append('<span>&lt;</span>');
  } else {
    $('#product-pagination').append('<span class="product-choice__control-active">&lt;</span>');
  }
  for (var i = 1; i <= totalPages; i++) {
    if (i == activePage) {
      $('#product-pagination').append('<span class="product-choice__pag-active">' + i + '</span>');
    } else {
      $('#product-pagination').append('<span>' + i + '</span>');
    }
  }
  if (activePage == totalPages) {
    $('#product-pagination').append('<span>&gt;</span>');
  } else {
    $('#product-pagination').append('<span class="product-choice__control-active">&gt;</span>');
  }

}