let inCartList = JSON.parse(localStorage.getItem("productsInCart"));
let uniqueInCart = Array.from(new Set(inCartList));
let sumCounter = 0;
let itemsCounter = 0;

const cartDisplay = document.getElementById("cart-display");

updateCartDisplay();

function updateCartDisplay() {
  uniqueInCart.forEach((product) => {
    const productInCart = document.createElement("div");
    let amountThisProductInCart = 0;
    for (n = 0; n < inCartList.length; n++) {
      if (inCartList[n].title == product.title) {
        amountThisProductInCart++;
      }
    }
    productInCart.setAttribute("data-product", `${product.title}`);
    productInCart.setAttribute("data-price", `${product.price}`);
    productInCart.setAttribute("data-image", `${product.image}`);

    productInCart.innerHTML = `
<hr class="my-4">
<div class="row mb-1 d-flex justify-content-between align-items-center">
  <div class="col-md-2 col-lg-2 col-xl-2">
    <img
      src="${product.image}"
      class="img-fluid rounded-3" alt="${product.title}">
  </div>
  <div class="col-md-3 col-lg-3 col-xl-3">
    <h6 class="text-muted">${product.title}</h6>
  </div>
  <div class="col-md-3 col-lg-3 col-xl-3 d-flex">
    <button class="btn btn-link px-2"
      onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
      <i class="fas fa-minus"></i>
    </button>

    <input id="form${product.title}" min="0" name="quantity" value="${amountThisProductInCart}" type="number"
      class="form-control form-control-sm" />

    <button class="btn btn-link px-2"
      onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
      <i class="fas fa-plus"></i>
    </button>
  </div>
  <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
    <h6 class="mb-0">$ ${product.price}</h6>
  </div>
  <div class="col-md-1 col-lg-1 col-xl-1 text-end">
    <a href="#!" class="text-muted"><i class="fas fa-trash"></i></a>
  </div>
</div>
`;
    const productPrice = parseFloat(product.price);
    sumCounter += productPrice;
    itemsCounter += amountThisProductInCart;

    cartDisplay.appendChild(productInCart);
  });
}

document.getElementById("items-count").innerHTML = "Varor: " + itemsCounter;
document.getElementById("cost-count").innerHTML = "Summa: $" + sumCounter;
//dynamiskt år i footer
document.getElementById("cRyear").innerHTML = new Date().getFullYear();

//Uppdatera kundvagnsräknaren
cartCount();

document.getElementById("checkOutBtn").onclick = function () {
  // Skapa en URL för beställningsformuläret med produktinformationen som query parametrar
  const orderFormUrl = `order.html?price=${encodeURIComponent(sumCounter)}`;
  // Omdirigera användaren till beställningsformuläret
  window.location.href = orderFormUrl;
};

document.getElementById("cartItemsCount2").innerHTML = cartCount2();

function cartCount() {
  arrayToCount = JSON.parse(localStorage.getItem("productsInCart"));
  if (arrayToCount.length != null) {
    document.getElementById("cartItemsCount").innerHTML = arrayToCount.length;
  } else {
    document.getElementById("cartItemsCount").innerHTML = 0;
  }
}

function cartCount2() {
  arrayToCount = JSON.parse(localStorage.getItem("productsInCart"));
  if (arrayToCount.length != null) {
    return arrayToCount.length;
  } else {
    return 0;
  }
}
