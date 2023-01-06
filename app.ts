import links from "./Links.js";
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

// Footer nav functionality for mobiles
class MobileFooter {
	private parent!: HTMLDivElement;
	private mobile!: HTMLDivElement;
	constructor() {
		this.mobile = document.querySelector("footer .footer__container .mobile") as HTMLDivElement;
		this.parent = document.querySelector("footer .footer__container .mobile nav ul") as HTMLDivElement;
		this.displayCategories();
		this.exitFunctionality();
	}
	displayCategories() {
		this.removeChildren();
		["Popular Features", "Free Tools", "Company", "Customers", "Partners"].forEach((e) => {
			this.createCategoryItem(e);
		});
	}
	createCategoryItem(content: string) {
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

	displayCategoryLinks(e: any) {
		// Create Title Text
		let title = document.querySelector("footer .footer__container .mobile .topSection .title") as HTMLDivElement;
		let content__value = e.currentTarget.querySelector("p").textContent;
		title.textContent = content__value;
		this.mobile.classList.add("mobile__active");

		// Create Category Items
		this.createCategoryItemLinks(content__value);
	}

	// Creating the links of each category
	createCategoryItemLinks(category: string) {
		let match = links.find((e) => e.category.toLowerCase() == category.toLowerCase());
		if (match?.items) {
			this.removeChildren();
			match?.items.forEach((e) => {
				this.createCategoryItemLink(e.name, e.link);
			});
		}
	}
	createCategoryItemLink(text: string, link: string) {
		let li = document.createElement("li");
		let a = document.createElement("a");
		a.setAttribute("href", link);
		let p = document.createElement("p");
		p.textContent = text;
		let icon = document.createElement("i");
		icon.classList.add("fa-solid", "fa-angle-right");
		a.append(p, icon);
		li.append(a);
		this.parent.append(li);
	}

	exitFunctionality() {
		let controls = document.querySelectorAll("footer .footer__container .mobile .topSection .controls button") as NodeListOf<HTMLDivElement>;
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
	private menu!: HTMLDivElement;
	private closeMenu!: HTMLButtonElement;
	private openMenu!: HTMLButtonElement;
	private mediaQuery = window.matchMedia("(max-width: 927px)");
	private closed: boolean = true;
	private categories!: NodeListOf<HTMLLIElement>;
	constructor() {
		this.menu = document.querySelector("#phone__menu") as HTMLDivElement;
		this.closeMenu = document.querySelector(".desktop__menu .closeMenu") as HTMLButtonElement;
		this.openMenu = document.querySelector(".desktop__menu .openMenu") as HTMLButtonElement;
		this.categories = this.menu.querySelectorAll(".content > nav > li") as NodeListOf<HTMLLIElement>;
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
	toggleMenu(display: string) {
		this.menu.style.display = display;
		this.openMenu.style.display = display == "none" ? "block" : "none";
		this.closeMenu.style.display = display;
	}
	createToggle(e: any) {
		!this.closed && this.toggleMenu(e.matches ? "block" : "none");
	}

	subCategoriesFunctonality() {
		// Show Sub Categories
		this.categories.forEach((category) => {
			let sub__category = category.querySelector(".sub__category") as HTMLDivElement;
			category.addEventListener("click", (e) => {
				let target = e.target as HTMLDivElement;
				// Check if the target is not in the sub__category
				// This allows the firing of the event only when the user clicks on the li on the menu.
				//  NB: The category contains the sub_category
				if (!sub__category.contains(target)) {
					sub__category.style.animation = "slideSubCategoryIn 0.5s forwards";
				}
			});

			let back = sub__category.querySelector(".back") as HTMLButtonElement;
			back.addEventListener("click", () => {
				sub__category.style.animation = "slideSubCategoryOut 0.5s forwards";

				// This prevents the animation from persisiting when the user goes back and then exists the menu
				setTimeout(() => {
					sub__category.style.animation = "none";
				}, 200);
			});

			let close = sub__category.querySelector(".close") as HTMLButtonElement;
			close.addEventListener("click", () => {
				sub__category.style.animation = "none";
				this.toggleMenu("none");
				this.closed = true;
			});
		});
	}
}

new MobileMenu();
