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
              $(this).find('img').attr('src', data.items[index].pic);
              $(this).children('p.maylike-items__item_desc').text(data.items[index].name);
              $(this).children('p.maylike-items__item_price').text(data.items[index].price);
              $(this).attr('data-id', data.items[index].id);
            });
          } else {
            console.log('SOMETHING WENT WRONG, ERROR MESSAGE: ' + data.message);
          }
          
      }
  });
}
