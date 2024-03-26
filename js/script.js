document.addEventListener("DOMContentLoaded", function () {
  let allProductsJSON = [];
  if (JSON.parse((localStorage.getItem("productsInCart").length = null))) {
    let productsInCartJSON = [];
    localStorage.setItem("productsInCart", JSON.stringify(productsInCartJSON));
  }
  // Hämta produkter från Fake Store API och rendera dem på sidan
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const productList = document.getElementById("product-list");
      data.forEach((product) => {
        //lägg till JSON-objekt i array
        allProductsJSON.push(product);

        // Skapa produktkort
        const productCard = document.createElement("div");
        productCard.classList.add(
          "col-lg-3",
          "col-md-4",
          "col-sm-6",
          "mb-4",
          "product-container"
        );
        productCard.setAttribute("data-product", `${product.title}`);
        productCard.setAttribute("data-price", `${product.price}`);
        productCard.setAttribute("data-description", `${product.description}`);
        productCard.innerHTML = `
                <div class="card h-100">
                  <div data-bs-toggle="offcanvas" data-bs-target="#offcanvas-product" aria-controls="offcanvas-product">
                    <img class="card-img-top" src="${product.image}" alt="${product.title}">  
                    <div class="card-body">
                        <h5 class="card-title text-truncate">${product.title}</h5>
                    </div>
                  </div>
                  <div class="d-flex flex-column card-body product-button">
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary btn-order" id="addToCart">Lägg i kundvagn</button>
                  </div>
                </div>
            `;
        productList.appendChild(productCard);
      });
      // Spara alla produkter i localStorage
      localStorage.setItem("allProductsArray", JSON.stringify(allProductsJSON));
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  // Hantera klickhändelser
  document.addEventListener("click", function (event) {
    // Hämta produktinformation
    const productName = event.target
      .closest("[data-product]")
      .getAttribute("data-product");
    const productPrice = event.target
      .closest("[data-price]")
      .getAttribute("data-price");
    const productDescription = event.target
      .closest("[data-description]")
      .getAttribute("data-description");

    if (event.target.classList.contains("btn-order")) {
      event.preventDefault();
      let arrayFromLS = JSON.parse(localStorage.getItem("productsInCart"));
      console.log(arrayFromLS.length);
      for (let i = 0; i < allProductsJSON.length; i++) {
        if ((allProductsJSON[i].title = productName)) {
          arrayFromLS.push(allProductsJSON[i]);
          break;
        }
      }
      console.log(arrayFromLS.length);
      console.log(arrayFromLS);
      localStorage.setItem("productsInCart", JSON.stringify(arrayFromLS));
      cartCount();

      // Skapa en URL för beställningsformuläret med produktinformationen som query parametrar
      //const orderFormUrl = `order.html?product=${encodeURIComponent(
      //  productName
      // )}&price=${encodeURIComponent(productPrice)}`;

      // Omdirigera användaren till beställningsformuläret
      //window.location.href = orderFormUrl;

      // Sätter produktinfo i offcanvas
    } else {
      document.getElementById("offcanvas-product-title").innerHTML =
        productName;
      document.getElementById("offcanvas-product-description").innerHTML =
        productDescription;
    }
  });
});

//dynamiskt år i footer
document.getElementById("cRyear").innerHTML = new Date().getFullYear();

//Uppdatera kundvagnsräknaren
cartCount();

function cartCount() {
  arrayToCount = JSON.parse(localStorage.getItem("productsInCart"));
  if (arrayToCount.length != null) {
    document.getElementById("cartItemsCount").innerHTML = arrayToCount.length;
  } else {
    document.getElementById("cartItemsCount").innerHTML = 0;
  }
}
