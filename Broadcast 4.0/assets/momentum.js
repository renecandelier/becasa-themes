class ShowVariants extends HTMLElement {
	constructor() {
		super();
		this.container = this;
        this.selector = this.container.querySelectorAll(".cc__variantselector");

        if (this.selector.length > 0){
            this.selector.forEach((item) => {
                item.addEventListener("click", this.variantShow.bind(this));
            });
        }

	}

    variantShow(et){
        et.currentTarget.classList.toggle('cc_vactive');
        this.querySelectorAll("ul li").forEach(item=>{
            item.addEventListener("click", this.selectorList.bind(this));
        })
    }

    selectorList(et){
        const currentSelected = this.querySelector(".current_selected");
        currentSelected.innerText = et.currentTarget.innerText;
        currentSelected.dataset.value = et.currentTarget.dataset.value;
        let isAvailable = et.currentTarget.dataset.available;

        this.parentElement.querySelector('[name="id"]').value = et.currentTarget.dataset.value;

        if( this.parentElement.parentElement.parentElement.querySelector(".product-upsell__price span") ){
            this.parentElement.parentElement.parentElement.querySelector(".product-upsell__price span").innerText = et.currentTarget.dataset.price;
        }

        if(isAvailable){
            this.querySelector("[data-add-to-cart]").removeAttribute("disabled");
            this.querySelector("[data-add-to-cart]").innerText = theme.strings.addToCart;
        } else {
             this.querySelector("[data-add-to-cart]").setAttribute("disabled");
             this.querySelector("[data-add-to-cart]").innerText = theme.strings.soldOut;
        }

    }
}

if (!customElements.get("show-variants")) {
	customElements.define("show-variants", ShowVariants);
}


let shopthelookitems = document.querySelectorAll('.cc__shopthelook-item-content');
let shopthelookoverlay = document.querySelectorAll('.cc__shopthelook-popup-overlay');

let closebutton = document.querySelectorAll('.close-btn');

if( shopthelookitems.length > 0){
    shopthelookitems.forEach(stl=>{
        stl.addEventListener('click', et=>{
            let targetpopup = et.currentTarget.dataset.target;

            document.getElementById(targetpopup).classList.add('cc__shopthelook-open-popup');
        });
    });
}


if (shopthelookoverlay.length > 0) {
	shopthelookoverlay.forEach((stl) => {
		stl.addEventListener("click", (et) => {
			et.currentTarget.parentElement.classList.remove("cc__shopthelook-open-popup");
		});
	});
}

if( closebutton.length > 0 ){
    closebutton.forEach(btn=>{
        btn.addEventListener('click', etbtn=>{
            let targetpopup = etbtn.currentTarget.dataset.target;
            document.getElementById(targetpopup).classList.remove('cc__shopthelook-open-popup');
        })
    })
}

