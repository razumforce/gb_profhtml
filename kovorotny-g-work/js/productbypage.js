"use strict";

function ProductByPage($root, $productItems) {
    this.$root = $root;
    this.$productItems = $productItems;
    this.totalPages = 1;
    this.currentPage = $root.attr('data-page');
    
    this.showMaxPositions = 8;

    this.loadAndShow();
    this.$root.on('click', 'span.product-choice__pag', this, this.pageClickHandler);
    this.$root.on('click', '#product-pagination-left', this, this.leftClickHandler);
    this.$root.on('click', '#product-pagination-right', this, this.rightClickHandler);
}

ProductByPage.prototype.loadAndShow = function() {
  $.get({
      url: './serverdata/product' + this.currentPage + '.json',
      dataType: 'json',
      success: function (data) {
          if (data.result) {
            this.totalPages = parseInt(data.total / 9) + 1;
            this.renderPagination();
            this.$productItems.each(function(index) {
              if (data.items[index].id == '') {
                $(this).css('visibility', 'hidden');
              } else {
                $(this).attr('data-id', data.items[index].id);
                $(this).children('img').attr('src', data.items[index].pic);
                $(this).children('img').attr('alt', data.items[index].pic.split('/').pop());
                $(this).children('p.product-items__item_desc').text(data.items[index].name);
                $(this).children('p.product-items__item_price').text(data.items[index].price);
              }
            });
          } else {
            console.log('SOMETHING WENT WRONG, ERROR MESSAGE: ' + data.message);
          }
          
      },
      context: this
  });
}

ProductByPage.prototype.renderPagination = function() {
  this.$root.html('');
  if (this.currentPage == 1) {
    this.$root.append('<span id="product-pagination-left">&lt;</span>');
  } else {
    this.$root.append('<span id="product-pagination-left" class="product-choice__control-active">&lt;</span>');
  }
  for (var i = 1; i <= this.totalPages; i++) {
    if (i == this.currentPage) {
      this.$root.append('<span class="product-choice__pag product-choice__pag-active">' + i + '</span>');
    } else {
      this.$root.append('<span class="product-choice__pag">' + i + '</span>');
    }
  }
  if (this.currentPage == this.totalPages) {
    this.$root.append('<span id="product-pagination-right">&gt;</span>');
  } else {
    this.$root.append('<span id="product-pagination-right" class="product-choice__control-active">&gt;</span>');
  }
}

ProductByPage.prototype.pageClickHandler = function(event) {
  if (event.data.currentPage != $(event.currentTarget).html()) {
    var spanChild = +event.data.currentPage + 1;
    event.data.$root.children('span:nth-child(' + spanChild + ')').removeClass('product-choice__pag-active');
    event.data.currentPage = $(event.currentTarget).html();
    spanChild = +event.data.currentPage + 1;
    event.data.$root.children('span:nth-child(' + spanChild + ')').addClass('product-choice__pag-active');
    event.data.$root.attr('data-page', event.data.currentPage);
    event.data.loadAndShow();
  }
}

ProductByPage.prototype.leftClickHandler = function(event) {
  if (event.data.currentPage != 1) {
    event.data.currentPage = +event.data.$root.children('.product-choice__pag-active').first().html() - 1;
    event.data.$root.children('.product-choice__pag-active').first().removeClass('product-choice__pag-active');
    var spanChild = +event.data.currentPage + 1;
    event.data.$root.children('span:nth-child(' + spanChild + ')').addClass('product-choice__pag-active');
    event.data.$root.attr('data-page', event.data.currentPage);
    event.data.loadAndShow();
  }
}

ProductByPage.prototype.rightClickHandler = function(event) {
  if (event.data.currentPage != event.data.totalPages) {
    event.data.currentPage = +event.data.$root.children('.product-choice__pag-active').first().html() + 1;
    event.data.$root.children('.product-choice__pag-active').first().removeClass('product-choice__pag-active');
    var spanChild = +event.data.currentPage + 1;
    event.data.$root.children('span:nth-child(' + spanChild + ')').addClass('product-choice__pag-active');
    event.data.$root.attr('data-page', event.data.currentPage);
    event.data.loadAndShow();
  }
}
