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
    displayProductDetails(data.data);
}

const displayProductDetails = product => {
    // console.log(product);
    // console.log(product.brand);
    // console.log(product.image);
    console.log(product.mainFeatures);
    // console.log(product.sensors);
    // console.log(product.others);
    // console.log(product.storage);
    // console.log(product.name);
    // console.log(product.releaseDate);
    const productDetails = document.getElementById("product-details");
    const productContent = document.createElement("div");
    productContent.classList.add("product-content");
    productContent.innerHTML = `
    <div class="product-img">
    <img src="${product.image}" alt="">
    </div>
    <div id="product-info">
    <h2>${product.name}</h2>
    <p>${product.brand}</p>
    <p>${product.releaseDate}</p>
    <h2>Features</h2>
    </div>
    `
    productDetails.appendChild(productContent);
    loadProductFeatures(product.mainFeatures);
}

const loadProductFeatures = features => {
    // console.log(features);
    const productInfo = document.getElementById("product-info");
    console.log(productInfo);
    const ul = document.createElement("ul");
    for (let x in features) {
        const li = document.createElement("li");
        li.innerHTML = `${x} : ${features[x]}`
        console.log(li.innerHTML);
        ul.appendChild(li);
    }
    productInfo.appendChild(ul);
}