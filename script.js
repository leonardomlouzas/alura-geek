const noProducts = document.querySelector("#no-products");
const sectionProducts = document.querySelector(".main-products");
const url = "http://localhost:3000/products"
const products = []

fetch(url).then(response => response.json())
    .then(data => products.push(...data))
    .catch(error => console.log(error))
    .finally(() => {
        if (products.length != 0) {
            noProducts.style.display = "none";

            products.forEach(product => {
                const newProduct = document.createElement("div");
                newProduct.classList.add("product");
                newProduct.innerHTML = `
                <div class="product-container-img">
                    <img src="${product.image}" alt="Imagem do produto" class="product-img">
                </div>
                <div class="product-container-info">
                    <h4>${product.name}</h4>
                    <p>$ ${product.price}<span><img src="assets/icon_trash.svg" alt="remover produto"></span></p>
                </div>
                `
                sectionProducts.appendChild(newProduct);
            });
        }
    })