const product = [{
        imageSrc: "images/ALLAH CREATED THEM ALL.jpg",
        nameof: "Allah Created Them All",
        description: "Children's Picture Book that talks about the lovely creation of Allah in a poetic manner. Bright and vibrant illustrations to capture the child's attention. Suitable for ages 3 and above.",
        price: 150,
        id: 1,
        count: 1
    },

    {
        imageSrc: "images/muslim teacher.jpg",
        nameof: "Coloring page bundle",
        description: "The coloring page bundle is career themed. The kids can be taught about different careers whilst having fun coloring. consists of 15 pages. Suitable for ages 3 and above.",
        price: 100,
        id: 2,
        count: 1
    },


    {
        imageSrc: "images/llama.jpg",
        nameof: "Llama A5 Print",
        description: "This print comes in a frame of your choice. Also available in A3 size.",
        price: 80,
        id: 3,
        count: 1
    },




    {
        imageSrc: "images/dad and daughter.jpeg",
        nameof: "Dad and Daughter Square Print",
        description: "Print comes in a frame of your choice. Available in different sizes, whether you are decorating big or small spaces.",
        price: 80,
        id: 4,
        count: 1
    },

    {
        imageSrc: "images/my muslim family.jpg",
        nameof: "Mom and Daughter Square Print",
        description: "Print comes in many different sizes. It also comes in a frame of your choice.",
        price: 80,
        id: 5,
        count: 1
    },


    {
        imageSrc: "images/LILY.jpg",
        nameof: "Lily Repeat Pattern",
        description: "Illustrated repeat pattern suitable for printing on fabric or wallpaper or wrapping paper.",
        price: 200,
        id: 6,
        count: 1
    }

];

const containerOfProducts = document.getElementById('productsDisplay');
const cartTotal = document.querySelector('.cartTotal');
const displayCart = document.getElementById('displayCart');
const displayTotal = document.getElementById('subTotal');
const displayCartCount = document.querySelector('.productsCount');
const deleteCartItems = document.getElementById('deleteCartItems');



function displayProducts() {


    product.forEach((product) => {
        containerOfProducts.innerHTML += `
       
        <div class="col-md-3" style="background-color: white; display : flex;">
            <div class="thumbnail" style="padding: 10px;">

                <a href="picture book.html"><img src="${product.imageSrc}"
                        class="img-fluid img-thumbnail" alt="${product.nameof}" width="150" height="150"
                        style="filter:drop-shadow(0 8px 16px rgba(128, 0, 128, 0.5))"></a>



                <div class="caption">
                    <br>
                    <h6>${product.nameof}</h6>
                    <h6>R${product.price}</h6>
                    <p><a href="#"  class="btn btn-default ml-auto" role="button" onclick="addToCart(${product.id})">Add to Cart</a></p>

                </div>
            </div>

        </div>
        `;
    });
    console.log(product);
}
displayProducts();

//cart array
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
updateCart();

//add to cart
function addToCart(id) {
    if (cart.some((item) => item.id === id)) {
        changeNumberOfUnits('plus', id);
    } else {
        const item = product.find((product) => product.id === id);

        cart.push(item);

    }


    updateCart();
}



function updateCart() {
    displayCartItems();
    displaySubTotal();

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function displaySubTotal() {

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {

        totalPrice += item.price * item.count;
        totalItems += item.count;

    });
    displayTotal.innerHTML = `
        Subtotal (${totalItems}) item(s) : R${totalPrice}
    `;

    displayCartCount.innerHTML = totalItems;
   
}


function displayCartItems() {

    console.log(cart);
    
    

    displayCart.innerHTML = "";
    cart.forEach((item) => {


        displayCart.innerHTML += `
        
       
        <div class="col-md-3" >
            <div class="thumbnail" >

                <a href="picture book.html"><img src="${item.imageSrc}"
                        class="img-fluid img-thumbnail" alt="${item.nameof}" width="150" height="150"
                        style="filter:drop-shadow(0 8px 16px rgba(128, 0, 128, 0.5))">
                </a>



                <div class="caption" >
                    <br>
                    <h6>${item.nameof}</h6>
                    <h6>R${item.price}</h6>
                    
                    <i class= "fas fa-chevron-up" onclick="changeNumberOfUnits('plus', ${item.id})"></i>
                    <div class= "itemCount">${item.count}</div>
                    <i class= "fas fa-chevron-down" onclick="changeNumberOfUnits('minus', ${item.id})"></i>
                    
                </div>
                
            </div>
        </div>
        `;

    });
}

function removeFromCart(id){
cart = cart.filter((item) => item.id !== id);

updateCart();

}


function changeNumberOfUnits(action, id) {

    cart = cart.map((item) => {

        let count = item.count;

        if (item.id === id) {
            if (action === "minus" && count > 1) {
                count--;
            } else if (action === "plus") {
                count++;
            }


        }

        return {
            ...item,
            count,
        };

    });

    updateCart();
}

function clearCart(){
    localStorage.clear('shoppingCart');
}


