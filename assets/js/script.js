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
    // console.log(products);
    let productCards = document.getElementById("product-cards");
    products.forEach(product => {
        console.log(product);
        console.log(product.brand);
        console.log(product.phone_name);
        console.log(product.image);
        console.log(product.slug);
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="" />
            <h3>${product.phone_name}</h3>
            <h5>${product.brand}</h5>
            <button>Explore</button>
        `

        productCards.appendChild(productCard);
    });
}