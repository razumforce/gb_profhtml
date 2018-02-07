"use strict";

//
// HEADER MENU CODE
//

//===========Class Container=====================
function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
}

Container.prototype.render = function() {
  return this.htmlCode;
}

// remove element from DOM
Container.prototype.remove = function() {
    var elem = document.getElementById(this.id);
    if (elem) {
      elem.parentNode.removeChild(elem);
    }
}

//===========Class Menu=====================
function Menu(my_id, my_class, my_items) {
  Container.call(this);
  this.id = my_id;
  this.className = my_class;
  this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.init = function() {
  $.get({
      url: './serverdata/menu.json',
      dataType: 'json',
      success: function (data) {
        this.id = data.menu.id;
        this.className = 'header__menu-list';
        this.items = this.prepareMenuItems(data.menu.data);
        $('#header-menu').html(this.render());
        $('.header__submenu-item').on('mouseenter', this.submenuEnterHandler);
        $('.header__submenu-item').on('mouseleave', this.submenuLeaveHandler);
      },
      context: this
  });
};

Menu.prototype.submenuEnterHandler = function(event) {
  $(event.currentTarget).children('ul').first().css('display', 'block');
}

Menu.prototype.submenuLeaveHandler = function(event) {
  $(event.currentTarget).children('ul').first().css('display', 'none');
}

Menu.prototype.prepareMenuItems = function(menuJSONData) {
  var menuItems = {};
  for (var item in menuJSONData) {
    if (typeof menuJSONData[item]['submenu'] === 'undefined') {
      menuItems[item] = new MenuItem(menuJSONData[item]['href'], menuJSONData[item]['title']);
    } else {
      menuItems[item] = new SubMenu(menuJSONData[item]['submenu']['id'], 'header__submenu-item',
                        this.prepareMenuItems(menuJSONData[item]['submenu']['data']),
                        menuJSONData[item]['title'], menuJSONData[item]['href']);
    }
  }
  return menuItems;
}

Menu.prototype.render = function() {
  console.log(this.items);

  var result = '<ul class="'+this.className+'" id="'+this.id+'">';
  for (var item in this.items) {
    if (this.items[item] instanceof MenuItem || this.items[item] instanceof SubMenu) {
      result += this.items[item].render();
    }
  }
  result += '</ul>';

  return result;
};

//===========Class SubMenu=====================
function SubMenu(my_id, my_class, my_items, my_subtitle, my_href) {
  Menu.call(this, my_id, my_class, my_items);
  this.subtitle = my_subtitle;
  this.href = my_href;
}

SubMenu.prototype = Object.create(Menu.prototype);
SubMenu.prototype.constructor = SubMenu;

SubMenu.prototype.render = function() {
  return '<li class="' + this.className + '"><a href="' + this.href + '">' + this.subtitle + '</a>' +
          Menu.prototype.render.call(this) + '</li>';
};


//===========Class MenuItem=====================
function MenuItem(my_href, my_name) {
  Container.call(this);
  this.className = 'header__menu-item';
  this.href = my_href;
  this.name = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function() {
  return '<li class="'+this.className+'"><a href="'+this.href+'">'+this.name+'</a></li>';
};

