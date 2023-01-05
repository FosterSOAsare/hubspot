// Image change when menu gets stuck
(function () {
	let desktop_menu = document.querySelector(".desktop__menu") as HTMLDivElement;
	window.addEventListener("scroll", () => {
		if (desktop_menu) {
			let site__logo = desktop_menu.querySelector(".site__logo") as HTMLDivElement;
			let logo = desktop_menu.querySelector(".site__logo img") as HTMLImageElement;
			let src: any = logo.src.split("/");
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
let currentTarget: any = "";
(function () {
	let parents = document.querySelectorAll(".drop")!;
	window.addEventListener("mousemove", (e: any) => {
		parents.forEach((parent: any) => {
			let drop = parent.querySelector(".dropdown");
			checkParent(parent, e.target, drop);
		});
		currentTarget = e.target;
	});
})();

function checkParent(parent: HTMLDivElement, child: HTMLDivElement, drop: HTMLDivElement): void {
	if (parent == child || parent.contains(child)) {
		if (drop.classList.contains("resourcesDropdown")) {
			drop.style.display = "flex";
		} else {
			drop.style.display = "block";
		}
	} else {
		setTimeout(() => {
			if (currentTarget !== "" && !parent.contains(currentTarget)) {
				drop.style.display = "none";
			}
		}, 100);
	}
}
