"use strict";

function singleItemLoad() {
  var singleId = Cookies.get('singleid');
  if (typeof singleId === 'undefined') {
    singleId = 'x';
  }
  console.log(singleId);
  $.get({
      url: './serverdata/single' + singleId + '.json',
      dataType: 'json',
      success: function (data) {
          if (data.result) {
            var $item = $('.single-item').first();
            $item.children('form').first().attr('data-id', data.item.id);
            $item.children('h2').first().text(data.item.collection);
            $item.children('.single-item__item-details').first().children('span').first().text(data.item.name);
            $item.children('.single-item__item-details').first().children('p').first().text(data.item.description);
            $item.find('.single-item__item-details_info-det').first().children('span:nth-child(2)').text(data.item.material);
            $item.find('.single-item__item-details_info-det:nth-child(2)').children('span:nth-child(2)').text(data.item.designer);
            $item.find('.single-item__item-details_price').first().children('span').text(data.item.price);
            $item.find('#single-item__item-choice_color').html('<i class="fa fa-square" style="color: ' + 
                                                                data.item.color_code[0] + ';"></i>&nbsp;&nbsp;&nbsp;' +
                                                                data.item.color[0]);
            $item.find('#single-item__item-choice_size').text(data.item.size[0]);
            $item.find('#single-item__item-choice_qty').text('1');
            
            var $slider = $('#single-slider-div');
            var $sliderCarousel = $slider.children('ol').first();
            var $sliderCarouselInner = $slider.children('div').first();
            for (var i in data.item.pic) {
              console.log(i, data.item.pic[i]);
              var $elem = $('<li />');
              $elem.attr('data-target', '#single-slider-div');
              $elem.attr('data-slide-to', i);
              var $divWrapper = $('<div />', {
                  class: 'item'
              });
              if (i == 0) {
                $elem.addClass('active');
                $divWrapper.addClass('active');
              }
              $elem.appendTo($sliderCarousel);
              $('<img>', {
                src: data.item.pic[i],
                alt: data.item.pic[i].split('/').pop()
              }).appendTo($divWrapper);
              $divWrapper.appendTo($sliderCarouselInner);
              Cookies.remove('singleid');
            }
          } else {
            console.log('SOMETHING WENT WRONG, ERROR MESSAGE: ' + data.message);
          }
          
      }
  });
}

function singleMaylikeLoad() {
  $.get({
      url: './serverdata/singlemaylike.json',
      dataType: 'json',
      success: function (data) {
          if (data.result) {
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

function addItemToBasket(event) {
  event.stopPropagation();
  console.log(event.data);
  console.log($(event.currentTarget).parent().attr('data-id') == '');
  var id = $(event.currentTarget).parent().attr('data-id')

  if (typeof id === 'undefined' || id === '') {
    console.log('no data-id!!!');
  } else {
    event.data.add(id);
  }
}
