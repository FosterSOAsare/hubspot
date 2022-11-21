// Image change when menu gets stuck
(function () {
    var desktop_menu = document.querySelector(".desktop__menu");
    window.addEventListener("scroll", function () {
        if (desktop_menu) {
            var logo = desktop_menu.querySelector(".site__logo img");
            var src = logo.src.split("/");
            src = src[src.length - 1];
            var top_1 = getComputedStyle(desktop_menu).top;
            if (window.scrollY > 70) {
                logo.src = "./images/logo2.svg";
            }
            else if (window.screenY < 70) {
                logo.src = "./images/logo.svg";
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
