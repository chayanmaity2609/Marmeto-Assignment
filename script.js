function search(category) {
    const parent = document.getElementById('container');
    parent.innerHTML = ''; 

    fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`)
        .then(data => data.json())
        .then(response => {
            const categoryData = response.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());

            if (categoryData) {
                categoryData.category_products.forEach(product => {
                    const card = document.createElement('li');
                    card.className = 'card';
                    card.innerHTML = `
                        <img src="${product.image}" alt="" class='product-image'>
                        <h2>${product.title}</h2>
                        <p class='vendor'>Vendor: ${product.vendor}</p>
                        <p class='price'>Rs ${product.price}</p>
                        ${product.compare_at_price ? `<p class='compare-price'>${product.compare_at_price}</p>` : ''}
                        ${product.compare_at_price ? `<p class='discounted-price'>${50}%</p>` : ''}
                       
                        ${product.badge_text ? `<span class='badge'>${product.badge_text}</span>` : ''}
                        <button onclick="addToCart('${product.title}', ${product.price})" id='btn2'>Add to Cart</button>
                    `;

                    parent.appendChild(card);
                });
            } else {
                console.error(`Category '${category}' not found.`);
            }
        })
        .catch(error => {
            console.error(error);
        });
}



function addToCart(productTitle, productPrice) {

    console.log(`Added '${productTitle}' to the cart. Price: $${productPrice}`);
}
