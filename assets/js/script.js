const loadData = () => {
    const searchField = document.getElementById("search-field");
    const searchProduct = searchField.value;
    console.log(searchProduct);
    const errorDisplay = document.getElementById("error-display");
    if (searchProduct == '') {
        document.getElementById("product-details").innerHTML = '';
        document.getElementById("product-cards").innerHTML = '';
        document.querySelector("#error-display h2").innerText = "Write Something to Display"
        errorDisplay.style.display = "block";
    } else {
        errorDisplay.style.display = "none";
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchProduct}`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayProducts(data.data))

    }
    searchField.value = "";
}

const displayProducts = products => {
    let productCards = document.getElementById("product-cards");
    document.getElementById("product-cards").innerHTML = '';

    if (products.length == 0) {
        document.getElementById("product-details").innerHTML = '';
        document.getElementById("product-cards").innerHTML = '';
        document.querySelector("#error-display h2").innerText = "The Product Not Found!"
        document.getElementById("error-display").style.display = "block";
    }

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
    const productDetails = document.getElementById("product-details");
    document.getElementById("product-details").innerHTML = '';
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
    <h4>Features</h4>
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