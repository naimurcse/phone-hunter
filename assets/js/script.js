const loadData = () => {
    const searchField = document.getElementById("search-field");
    const searchProduct = searchField.value;
    console.log(searchProduct);

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchProduct}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayProducts(data.data))

    searchField.value = "";
}

const displayProducts = products => {
    let productCards = document.getElementById("product-cards");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="" />
            <h3>${product.phone_name}</h3>
            <h5>Brand : ${product.brand}</h5>
            <button onclick="loadProductDetails('${product.slug}')">Explore</button>
        `
        productCards.appendChild(productCard);
    });
}

const loadProductDetails = async productId => {
    url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

const displayProductDetails = product => {

}