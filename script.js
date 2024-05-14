const noProducts = document.querySelector("#no-products");
const sectionProducts = document.querySelector(".main-products");
const form = document.querySelector(".main-add-form");
const products = []

const url = "http://localhost:3000/products"

const fetchProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function createProduct(product) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: product.name,
            price: product.price,
            image: product.image
        })
    });
    if (!response.ok) {
        throw new Error("Error creating product");
    }

    const data = await response.json();
    return data;
}

async function displayProducts() {
    const products = await fetchProducts();

    if (products.length > 0) {
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
                <p>$ ${product.price}<span class="product-delete"><img src="assets/icon_trash.svg" alt="remover produto"></span></p>
            </div>
            `
            newProduct.setAttribute("id", product.id);
            sectionProducts.appendChild(newProduct);
        });

        const deleteButtons = document.querySelectorAll(".product-delete");
        deleteButtons.forEach(button => button.addEventListener("click", deleteProduct));
    } else {
        noProducts.style.display = "block";
    }
}

async function addProduct(evento) {
    evento.preventDefault();

    const name = document.querySelector("#product-name").value;
    const price = document.querySelector("#product-price").value;
    const image = document.querySelector("#product-img").value;

    try {
        await createProduct({ name, price, image });
    } catch (error) {
        console.error(error);
    }
}

async function deleteProduct(evento) {
    const product = evento.target.closest(".product");
    const productId = product.getAttribute("id");

    try {
        const response = await fetch(`${url}/${productId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error deleting product");
        }

        product.remove();
    } catch (error) {
        console.error(error);
    }
}

displayProducts();
form.addEventListener("submit", evento => addProduct(evento));
console.log("loaded");