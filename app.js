"use strict";
exports.__esModule = true;
var Links_js_1 = require("./Links.js");
// Image change when menu gets stuck
(function () {
    var desktop_menu = document.querySelector(".desktop__menu");
    window.addEventListener("scroll", function () {
        if (desktop_menu) {
            var site__logo = desktop_menu.querySelector(".site__logo");
            var logo = desktop_menu.querySelector(".site__logo img");
            var src = logo.src.split("/");
            src = src[src.length - 1];
            var top_1 = getComputedStyle(desktop_menu).top;
            if (window.innerWidth > 927) {
                if (window.scrollY > 70) {
                    logo.src = "./images/logo2.svg";
                    site__logo.classList.add("mini");
                    return;
                }
                if (window.scrollY < 70) {
                    logo.src = "./images/logo.svg";
                    if (site__logo.classList.contains("mini")) {
                        site__logo.classList.remove("mini");
                    }
                }
                return;
            }
        }
    });
})();
// Drop downs
var currentTarget = "";
(function () {
    var parents = document.querySelectorAll(".drop");
    window.addEventListener("mousemove", function (e) {
        parents.forEach(function (parent) {
            var drop = parent.querySelector(".dropdown");
            checkParent(parent, e.target, drop);
        });
        currentTarget = e.target;
    });
})();
function checkParent(parent, child, drop) {
    if (parent == child || parent.contains(child)) {
        if (drop.classList.contains("resourcesDropdown")) {
            drop.style.display = "flex";
        }
        else {
            drop.style.display = "block";
        }
    }
    else {
        setTimeout(function () {
            if (currentTarget !== "" && !parent.contains(currentTarget)) {
                drop.style.display = "none";
            }
        }, 100);
    }
}
// Footer nav functionality for mobiles
var MobileFooter = /** @class */ (function () {
    function MobileFooter() {
        this.mobile = document.querySelector("footer .footer__container .mobile");
        this.parent = document.querySelector("footer .footer__container .mobile nav ul");
        this.displayCategories();
        this.exitFunctionality();
    }
    MobileFooter.prototype.displayCategories = function () {
        var _this = this;
        this.removeChildren();
        ["Popular Features", "Free Tools", "Company", "Customers", "Partners"].forEach(function (e) {
            _this.createCategoryItem(e);
        });
    };
    MobileFooter.prototype.createCategoryItem = function (content) {
        var _this = this;
        var li = document.createElement("li");
        var p = document.createElement("p");
        p.textContent = content;
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-angle-right");
        li.append(p, icon);
        li.addEventListener("click", function (e) {
            _this.displayCategoryLinks(e);
        });
        this.parent.append(li);
    };
    MobileFooter.prototype.removeChildren = function () {
        var _this = this;
        var children = Array.from(this.parent.children);
        children.forEach(function (e) {
            _this.parent.removeChild(e);
        });
    };
    MobileFooter.prototype.displayCategoryLinks = function (e) {
        // Create Title Text
        var title = document.querySelector("footer .footer__container .mobile .topSection .title");
        var content__value = e.currentTarget.querySelector("p").textContent;
        title.textContent = content__value;
        this.mobile.classList.add("mobile__active");
        // Create Category Items
        this.createCategoryItemLinks(content__value);
    };
    // Creating the links of each category
    MobileFooter.prototype.createCategoryItemLinks = function (category) {
        var _this = this;
        var match = Links_js_1["default"].find(function (e) { return e.category.toLowerCase() == category.toLowerCase(); });
        if (match === null || match === void 0 ? void 0 : match.items) {
            this.removeChildren();
            match === null || match === void 0 ? void 0 : match.items.forEach(function (e) {
                _this.createCategoryItemLink(e.name, e.link);
            });
        }
    };
    MobileFooter.prototype.createCategoryItemLink = function (text, link) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.classList.add('link');
        a.setAttribute("href", link);
        var p = document.createElement("p");
        p.textContent = text;
        var icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-angle-right");
        a.append(p, icon);
        li.append(a);
        this.parent.append(li);
    };
    MobileFooter.prototype.exitFunctionality = function () {
        var _this = this;
        var controls = document.querySelectorAll("footer .footer__container .mobile .topSection .controls button");
        controls.forEach(function (e) {
            e.addEventListener("click", function () {
                _this.mobile.classList.remove("mobile__active");
                _this.displayCategories();
            });
        });
    };
    return MobileFooter;
}());
new MobileFooter();
// Menu for mobiles
var MobileMenu = /** @class */ (function () {
    function MobileMenu() {
        var _this = this;
        this.mediaQuery = window.matchMedia("(max-width: 927px)");
        this.closed = true;
        this.menu = document.querySelector("#phone__menu");
        this.closeMenu = document.querySelector(".desktop__menu .closeMenu");
        this.openMenu = document.querySelector(".desktop__menu .openMenu");
        this.categories = this.menu.querySelectorAll(".content > nav > li");
        this.showMobileMenu();
        this.closeMobileMenu();
        this.mediaQuery.addEventListener("change", function (e) { return _this.createToggle(e); });
        this.subCategoriesFunctonality();
    }
    MobileMenu.prototype.showMobileMenu = function () {
        var _this = this;
        this.openMenu.addEventListener("click", function () {
            if (_this.mediaQuery.matches) {
                _this.toggleMenu("block");
            }
            _this.closed = false;
        });
    };
    MobileMenu.prototype.closeMobileMenu = function () {
        var _this = this;
        this.closeMenu.addEventListener("click", function () {
            _this.toggleMenu("none");
            _this.closed = true;
        });
    };
    MobileMenu.prototype.toggleMenu = function (display) {
        this.menu.style.display = display;
        this.openMenu.style.display = display == "none" ? "block" : "none";
        this.closeMenu.style.display = display;
    };
    MobileMenu.prototype.createToggle = function (e) {
        !this.closed && this.toggleMenu(e.matches ? "block" : "none");
    };
    MobileMenu.prototype.subCategoriesFunctonality = function () {
        var _this = this;
        // Show Sub Categories
        this.categories.forEach(function (category) {
            var sub__category = category.querySelector(".sub__category");
            category.addEventListener("click", function (e) {
                var target = e.target;
                // Check if the target is not in the sub__category
                // This allows the firing of the event only when the user clicks on the li on the menu.
                //  NB: The category contains the sub_category
                if (!sub__category.contains(target)) {
                    sub__category.style.animation = "slideSubCategoryIn 0.5s forwards";
                }
            });
            var back = sub__category.querySelector(".back");
            back.addEventListener("click", function () {
                sub__category.style.animation = "slideSubCategoryOut 0.5s forwards";
                // This prevents the animation from persisiting when the user goes back and then exists the menu
                setTimeout(function () {
                    sub__category.style.animation = "none";
                }, 200);
            });
            var close = sub__category.querySelector(".close");
            close.addEventListener("click", function () {
                sub__category.style.animation = "none";
                _this.toggleMenu("none");
                _this.closed = true;
            });
        });
    };
    return MobileMenu;
}());
new MobileMenu();
