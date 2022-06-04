// Data Load
const loadData = () => {
    const searchField = document.getElementById("search-field");
    let searchProduct = searchField.value;
    searchProduct = searchProduct.toLowerCase();
    // console.log(searchProduct);
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

// Display Matched Products
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

// Load Product Details
const loadProductDetails = async productId => {
    url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayProductDetails(data.data);
}

// Display Product Details
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
    loadProductFeatures(product.slug);
}

// Load Product Features
const loadProductFeatures = async productId => {
    // console.log(productId);

    const url = `https://openapi.programming-hero.com/api/phone/${productId}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);

    const { storage, displaySize, chipSet, memory, sensors } = data.data.mainFeatures;
    // console.log(sensors);

    const productInfo = document.getElementById("product-info");
    const ul = document.createElement("ul");
    ul.innerHTML = `
    <li>Storage : ${storage} </li>
    <li>Display Size : ${displaySize} </li>
    <li>Chipset : ${chipSet} </li>
    <li>Memory : ${memory} </li>
    `
    const sensorHeading = document.createElement("h4");
    sensorHeading.innerText = "Sensors";
    const sensorsList = document.createElement("ul");
    sensorsList.classList.add("sensors-list")
    for (let x of sensors) {
        const sensor = document.createElement("li");
        sensor.classList.add("sensor-style")
        sensor.innerText = `${x}`
            // console.log(sensor.innerHTML);
        sensorsList.appendChild(sensor);
    }

    console.log(data.data.others);
    const othersHeading = document.createElement("h4");
    othersHeading.innerText = "Others Features";
    const otherFeatures = document.createElement("ul");
    otherFeatures.classList.add("sensors-list")
    for (let other in data.data.others) {
        const otherFeature = document.createElement("li");
        otherFeature.classList.add("sensor-style")
        otherFeature.innerText = `${other}`
            // console.log(sensor.innerHTML);
        otherFeatures.appendChild(otherFeature);
    }
    productInfo.appendChild(ul);
    productInfo.appendChild(sensorHeading);
    productInfo.appendChild(sensorsList);
    productInfo.appendChild(othersHeading);
    productInfo.appendChild(otherFeatures);
}