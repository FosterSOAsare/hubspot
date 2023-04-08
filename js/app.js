import links from "./Links.js";
// Image change when menu gets stuck
(function () {
    let desktop_menu = document.querySelector(".desktop__menu");
    window.addEventListener("scroll", () => {
        if (desktop_menu) {
            let site__logo = desktop_menu.querySelector(".site__logo");
            let logo = desktop_menu.querySelector(".site__logo img");
            let src = logo.src.split("/");
            src = src[src.length - 1];
            let top = getComputedStyle(desktop_menu).top;
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
let currentTarget = "";
(function () {
    let parents = document.querySelectorAll(".drop");
    window.addEventListener("mousemove", (e) => {
        parents.forEach((parent) => {
            let drop = parent.querySelector(".dropdown");
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
        setTimeout(() => {
            if (currentTarget !== "" && !parent.contains(currentTarget)) {
                drop.style.display = "none";
            }
        }, 100);
    }
}
// Footer nav functionality for mobiles
class MobileFooter {
    constructor() {
        this.mobile = document.querySelector("footer .footer__container .mobile");
        this.parent = document.querySelector("footer .footer__container .mobile nav ul");
        this.displayCategories();
        this.exitFunctionality();
    }
    displayCategories() {
        this.removeChildren();
        ["Popular Features", "Free Tools", "Company", "Customers", "Partners"].forEach((e) => {
            this.createCategoryItem(e);
        });
    }
    createCategoryItem(content) {
        let li = document.createElement("li");
        let p = document.createElement("p");
        p.textContent = content;
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-angle-right");
        li.append(p, icon);
        li.addEventListener("click", (e) => {
            this.displayCategoryLinks(e);
        });
        this.parent.append(li);
    }
    removeChildren() {
        let children = Array.from(this.parent.children);
        children.forEach((e) => {
            this.parent.removeChild(e);
        });
    }
    displayCategoryLinks(e) {
        // Create Title Text
        let title = document.querySelector("footer .footer__container .mobile .topSection .title");
        let content__value = e.currentTarget.querySelector("p").textContent;
        title.textContent = content__value;
        this.mobile.classList.add("mobile__active");
        // Create Category Items
        this.createCategoryItemLinks(content__value);
    }
    // Creating the links of each category
    createCategoryItemLinks(category) {
        let match = links.find((e) => e.category.toLowerCase() == category.toLowerCase());
        if (match === null || match === void 0 ? void 0 : match.items) {
            this.removeChildren();
            match === null || match === void 0 ? void 0 : match.items.forEach((e) => {
                this.createCategoryItemLink(e.name, e.link);
            });
        }
    }
    createCategoryItemLink(text, link) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.classList.add('link');
        a.setAttribute("href", link);
        a.setAttribute("target", '_blank');
        let p = document.createElement("p");
        p.textContent = text;
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-angle-right");
        a.append(p, icon);
        li.append(a);
        this.parent.append(li);
    }
    exitFunctionality() {
        let controls = document.querySelectorAll("footer .footer__container .mobile .topSection .controls button");
        controls.forEach((e) => {
            e.addEventListener("click", () => {
                this.mobile.classList.remove("mobile__active");
                this.displayCategories();
            });
        });
    }
}
new MobileFooter();
// Menu for mobiles
class MobileMenu {
    constructor() {
        this.mediaQuery = window.matchMedia("(max-width: 927px)");
        this.closed = true;
        this.menu = document.querySelector("#phone__menu");
        this.closeMenu = document.querySelector(".desktop__menu .closeMenu");
        this.openMenu = document.querySelector(".desktop__menu .openMenu");
        this.categories = this.menu.querySelectorAll(".content > nav > li");
        this.showMobileMenu();
        this.closeMobileMenu();
        this.mediaQuery.addEventListener("change", (e) => this.createToggle(e));
        this.subCategoriesFunctonality();
    }
    showMobileMenu() {
        this.openMenu.addEventListener("click", () => {
            if (this.mediaQuery.matches) {
                this.toggleMenu("block");
            }
            this.closed = false;
        });
    }
    closeMobileMenu() {
        this.closeMenu.addEventListener("click", () => {
            this.toggleMenu("none");
            this.closed = true;
        });
    }
    toggleMenu(display) {
        this.menu.style.display = display;
        this.openMenu.style.display = display == "none" ? "block" : "none";
        this.closeMenu.style.display = display;
    }
    createToggle(e) {
        !this.closed && this.toggleMenu(e.matches ? "block" : "none");
    }
    subCategoriesFunctonality() {
        // Show Sub Categories
        this.categories.forEach((category) => {
            let sub__category = category.querySelector(".sub__category");
            category.addEventListener("click", (e) => {
                let target = e.target;
                // Check if the target is not in the sub__category
                // This allows the firing of the event only when the user clicks on the li on the menu.
                //  NB: The category contains the sub_category
                if (!sub__category.contains(target)) {
                    sub__category.style.animation = "slideSubCategoryIn 0.5s forwards";
                }
            });
            let back = sub__category.querySelector(".back");
            back.addEventListener("click", () => {
                sub__category.style.animation = "slideSubCategoryOut 0.5s forwards";
                // This prevents the animation from persisiting when the user goes back and then exists the menu
                setTimeout(() => {
                    sub__category.style.animation = "none";
                }, 200);
            });
            let close = sub__category.querySelector(".close");
            close.addEventListener("click", () => {
                sub__category.style.animation = "none";
                this.toggleMenu("none");
                this.closed = true;
            });
        });
    }
}
new MobileMenu();
