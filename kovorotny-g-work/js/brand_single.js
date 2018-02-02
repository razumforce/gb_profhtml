"use strict";

function singleItemLoad() {

}

function singleMaylikeLoad() {

  $.get({
      url: './serverdata/singlemaylike.json',
      dataType: 'json',
      success: function (data) {
          if (data.result) {
            $('.maylike-items__item').each(function(index) {
              $(this).attr('data-id', data.items[index].id);
              $(this).children('img').attr('src', data.items[index].pic);
              $(this).children('img').attr('alt', data.items[index].pic.split('/').pop());
              $(this).children('p.maylike-items__item_desc').text(data.items[index].name);
              $(this).children('p.maylike-items__item_price').text(data.items[index].price);
            });
          } else {
            console.log('SOMETHING WENT WRONG, ERROR MESSAGE: ' + data.message);
          }
          
      }
  });
}
