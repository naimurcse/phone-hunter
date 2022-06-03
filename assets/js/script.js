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
    products.forEach(product => {
        console.log(product);
    });
}