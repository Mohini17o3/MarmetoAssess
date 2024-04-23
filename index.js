function fetchData() {
    const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
 
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching data !");
            }
            return response.json();
        })
        .then(data => {
            const categories = data.categories;
 
             categories.forEach(category => {
                const categoryName = category.category_name;
                const categoryProducts = category.category_products;
               
                const listItem = document.querySelector(`li[data-category="${categoryName}"]`);
 
 
               listItem.addEventListener("click", (event) => {
                    displayCards(categoryProducts);
                 document.querySelectorAll(".navbar li").forEach(item => {
 
                   item.style.backgroundColor = "";
                   item.style.color = "";
                 }) ;
                      listItem.style.backgroundColor = "black" ;
                     listItem.style.color = "white";
      
                     document.getElementById("item-grid").classList.add("loaded");
 
                });
               
 
 
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
 }
 
 function displayCards(products) {
    const gridContainer = document.getElementById("item-grid");
    gridContainer.innerHTML = ""; 
 
    products.forEach(product => {
     const actualPrice= product.price; 
     const comparePrice= product.compare_at_price; 
     const discount = Math.floor (((comparePrice - actualPrice) / comparePrice) * 100 );      
      const card = document.createElement("div");
        card.classList.add("card");
 
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p><span style="font-size: 1.2rem; font-weight: 800;">${product.title}  </span> ⚫ ${product.vendor}</p>
            <p>Rs ${product.price}   <span style= "text-decoration : line-through ; color :grey ;"> ${product.compare_at_price} </span>  <span style ="color : red;"> ${discount} % </span></p>
         
            <button> Add to cart</button>
        `;
 
        gridContainer.appendChild(card);
    });
 }
 
 fetchData();
 
 
 
 
 
 console.log('====================================');
 console.log("Connected");
 console.log('====================================');
 