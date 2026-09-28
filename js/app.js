/* =========================================================
PURE NATURALS STORE
Main JavaScript
========================================================= */

/* =========================================================

1. PRODUCT DATA
   ========================================================= */

const products = [
{
name: "Amla Oil",
price: 350,
category: "Hair Care",
img: "https://i.postimg.cc/Zqg0cR9R/IMG-20250724-WA0011.jpg"
},
{
name: "Castor Oil",
price: 300,
category: "Hair Care",
img: "https://i.postimg.cc/fT7ffZkc/IMG-20250724-WA0017.jpg"
},
{
name: "Onion Oil",
price: 350,
category: "Hair Care",
img: "https://i.postimg.cc/zvkdXsBZ/IMG-20250724-WA0005.jpg"
},
{
name: "Almond Oil",
price: 350,
category: "Hair Care",
img: "https://i.postimg.cc/W1swg9r3/IMG-20250724-WA0016.jpg"
},
{
name: "Coffee Scrub",
price: 300,
category: "Body Care",
img: "https://i.postimg.cc/bvbf7NCd/IMG-20250724-WA0010.jpg"
},
{
name: "Rice Scrub",
price: 350,
category: "Body Care",
img: "https://i.postimg.cc/Y0JC6yjs/IMG-20250724-WA0012.jpg"
},
{
name: "Tea Tree Scrub",
price: 350,
category: "Body Care",
img: "https://i.postimg.cc/yN8hrvVN/IMG-20250724-WA0018.jpg"
},
{
name: "Rose Scrub",
price: 350,
category: "Body Care",
img: "https://i.postimg.cc/GtLbk8F6/IMG-20250724-WA0015.jpg"
},
{
name: "Green Tea Scrub",
price: 350,
category: "Body Care",
img: "https://i.postimg.cc/rwRSh6kV/IMG-20250724-WA0008.jpg"
},
{
name: "Rose Water Toner",
price: 300,
category: "Skincare",
img: "https://i.postimg.cc/DwTNSdBf/IMG-20250724-WA0014.jpg"
},
{
name: "Intensive Cleanser",
price: 350,
category: "Skincare",
img: "https://i.postimg.cc/jdmsm9xg/IMG-20250724-WA0009.jpg"
},
{
name: "Vitamin C Face Wash",
price: 750,
category: "Skincare",
img: "https://i.postimg.cc/7Zz23g3b/IMG-20250724-WA0013.jpg"
},
{
name: "Shaving Gel",
price: 350,
category: "Men's Care",
img: "https://i.postimg.cc/mrF8FzDS/IMG-20250724-WA0006.jpg"
},
{
name: "Aftershave",
price: 350,
category: "Men's Care",
img: "https://i.postimg.cc/KYLD86qq/IMG-20250724-WA0007.jpg"
}
];

/* =========================================================
2. CART STATE
========================================================= */

let cart = [];

try {
cart = JSON.parse(localStorage.getItem("cart")) || [];


if (!Array.isArray(cart)) {
    cart = [];
}


} catch (error) {
cart = [];
}

/* =========================================================
3. DOM ELEMENTS
========================================================= */

const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

const cartDrawer = document.getElementById("cartSection");
const cartItems = document.getElementById("cartItems");

const overlay = document.getElementById("overlay");

const checkoutForm = document.getElementById("checkoutForm");

const productList = document.getElementById("productList");

const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");

const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");

/* =========================================================
4. NAVIGATION
========================================================= */

function toggleNav() {


if (!navLinks) return;

const isActive = navLinks.classList.toggle("active");

if (hamburger) {
    hamburger.setAttribute(
        "aria-expanded",
        String(isActive)
    );
}


}

function closeNav() {


if (!navLinks) return;

navLinks.classList.remove("active");

if (hamburger) {
    hamburger.setAttribute("aria-expanded", "false");
}


}

/* =========================================================
5. CART DRAWER
========================================================= */

function toggleCart() {


if (!cartDrawer) return;

const isOpening = !cartDrawer.classList.contains("active");

if (isOpening) {

    cartDrawer.classList.add("active");

    cartDrawer.setAttribute("aria-hidden", "false");

    showOverlay();

    renderCartItems();

    closeNav();

} else {

    closeCart();

}


}

function closeCart() {


if (!cartDrawer) return;

cartDrawer.classList.remove("active");

cartDrawer.setAttribute("aria-hidden", "true");

if (
    !checkoutForm ||
    !checkoutForm.classList.contains("active")
) {
    hideOverlay();
}


}

/* =========================================================
6. OVERLAY
========================================================= */

function showOverlay() {


if (!overlay) return;

overlay.classList.add("active");
overlay.setAttribute("aria-hidden", "false");


}

function hideOverlay() {


if (!overlay) return;

overlay.classList.remove("active");
overlay.setAttribute("aria-hidden", "true");


}

function closeAll() {


closeCart();

if (checkoutForm) {
    checkoutForm.classList.remove("active");
}

const imageModal = document.getElementById("imageModal");

if (imageModal) {
    imageModal.classList.remove("active");
}

hideOverlay();

closeNav();


}

/* =========================================================
7. PRODUCT RENDERING
========================================================= */

function loadProducts(arr = products) {

if (!productList) return;

productList.innerHTML = "";

if (arr.length === 0) {

    productList.innerHTML = `
        <div class="empty-products">
            <h3>No products found</h3>
            <p>
                Try searching for another product.
            </p>
        </div>
    `;

    return;
}


arr.forEach(product => {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
        <div class="card-image-wrapper">

            <img
                src="${product.img}"
                alt="${product.name}"
                loading="lazy"
                onclick="openImage('${product.img}', '${escapeAttribute(product.name)}')"
            >

        </div>

        <div class="card-content">

            <span class="card-category">
                ${product.category}
            </span>

            <h3>
                ${product.name}
            </h3>

            <p class="card-price">
                Rs. ${product.price}
            </p>

            <button
                type="button"
                onclick="addToCart('${escapeAttribute(product.name)}')"
            >
                Add to Cart
            </button>

        </div>
    `;

    productList.appendChild(card);
});

}

/* =========================================================
8. ESCAPE HELPER
========================================================= */

function escapeAttribute(value) {


return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");


}

/* =========================================================
9. ADD TO CART
========================================================= */

function addToCart(name) {


const item = cart.find(
    product => product.name === name
);


if (item) {

    item.quantity += 1;

} else {

    const product = products.find(
        product => product.name === name
    );

    if (!product) return;

    cart.push({
        ...product,
        quantity: 1
    });
}


saveCart();

showToast(`${name} added to your cart`);


}

/* =========================================================
10. SAVE CART
========================================================= */

function saveCart() {


localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);

updateCartCount();

renderCartItems();


}

/* =========================================================
11. CART COUNT
========================================================= */

function updateCartCount() {


if (!cartCount) return;

const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
);

cartCount.textContent = count;


}

/* =========================================================
12. RENDER CART
========================================================= */

function renderCartItems() {


if (!cartItems || !totalPrice) return;

cartItems.innerHTML = "";


if (cart.length === 0) {

    cartItems.innerHTML = `
        <div class="empty-cart">

            <div class="empty-cart-icon">
                🛒
            </div>

            <h3>Your cart is empty</h3>

            <p>
                Add some natural care products
                to get started.
            </p>

        </div>
    `;

    totalPrice.textContent = "Rs. 0";

    return;
}


let total = 0;


cart.forEach(item => {

    const itemTotal =
        item.price * item.quantity;

    total += itemTotal;


    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `
        <div>
            <div class="cart-item-name">
                ${item.name}
            </div>

            <div class="cart-item-price">
                Rs. ${item.price} each
            </div>
        </div>

        <div class="qty">

            <button
                type="button"
                aria-label="Decrease ${item.name} quantity"
                onclick="changeQty('${escapeAttribute(item.name)}', -1)"
            >
                −
            </button>

            <span>
                ${item.quantity}
            </span>

            <button
                type="button"
                aria-label="Increase ${item.name} quantity"
                onclick="changeQty('${escapeAttribute(item.name)}', 1)"
            >
                +
            </button>

        </div>

        <strong>
            Rs. ${itemTotal}
        </strong>

        <button
            type="button"
            class="remove-item"
            aria-label="Remove ${item.name}"
            onclick="removeItem('${escapeAttribute(item.name)}')"
        >
            ×
        </button>
    `;


    cartItems.appendChild(cartItem);
});


totalPrice.textContent =
    `Rs. ${total}`;


}

/* =========================================================
13. CHANGE QUANTITY
========================================================= */

function changeQty(name, amount) {


const item = cart.find(
    product => product.name === name
);

if (!item) return;


item.quantity += amount;


if (item.quantity <= 0) {

    cart = cart.filter(
        product => product.name !== name
    );

    showToast(`${name} removed from your cart`);
}


saveCart();


}

/* =========================================================
14. REMOVE ITEM
========================================================= */

function removeItem(name) {


cart = cart.filter(
    product => product.name !== name
);

saveCart();

showToast(`${name} removed from your cart`);


}

/* =========================================================
15. CLEAR CART
========================================================= */

function clearCart() {


if (cart.length === 0) {

    showToast("Your cart is already empty");

    return;
}


cart = [];

saveCart();

closeCart();

showToast("Your cart has been cleared");


}

/* =========================================================
16. SEARCH
========================================================= */

function searchProducts() {


if (!searchInput) return;

const value =
    searchInput.value.trim().toLowerCase();


const filteredProducts =
    products.filter(product =>
        product.name
            .toLowerCase()
            .includes(value)
        ||
        product.category
            .toLowerCase()
            .includes(value)
    );


loadProducts(filteredProducts);


}

function clearSearch() {


if (!searchInput) return;

searchInput.value = "";

loadProducts(products);

searchInput.focus();


}

/* =========================================================
17. CHECKOUT
========================================================= */

function showCheckoutDirectly() {


if (cart.length === 0) {

    showToast(
        "Your cart is empty. Add a product first."
    );

    return;
}


if (!checkoutForm) return;


checkoutForm.classList.add("active");

showOverlay();

closeCart();

checkoutForm.setAttribute(
    "aria-hidden",
    "false"
);


}

/* =========================================================
18. SUBMIT ORDER
========================================================= */

function submitOrder() {


const name =
    document.getElementById("name")?.value.trim();

const phone =
    document.getElementById("phone")?.value.trim();

const address =
    document.getElementById("address")?.value.trim();


if (!name || !phone || !address) {

    showToast(
        "Please complete all checkout fields."
    );

    return;
}


if (cart.length === 0) {

    showToast(
        "Your cart is empty."
    );

    closeAll();

    return;
}


let total = 0;

const orderLines = [];


cart.forEach(item => {

    const itemTotal =
        item.price * item.quantity;

    total += itemTotal;


    orderLines.push(
        `${item.name} x${item.quantity} = Rs.${itemTotal}`
    );
});


const message = [
    "*Order from Pure Naturals*",
    "",
    ...orderLines,
    "",
    `*Total: Rs.${total}*`,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Address: ${address}`
].join("\n");


const whatsappNumber =
    "923453498797";


const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
);


cart = [];

saveCart();

closeAll();

document.getElementById("checkoutDetails")?.reset();

showToast("Opening WhatsApp to confirm your order");


}

/* =========================================================
19. TOAST
========================================================= */

let toastTimer;

function showToast(text) {


const existingToast =
    document.querySelector(".toast");

if (existingToast) {
    existingToast.remove();
}


const toast =
    document.createElement("div");


toast.className = "toast";

toast.setAttribute(
    "role",
    "status"
);

toast.textContent = text;


document.body.appendChild(toast);


requestAnimationFrame(() => {

    toast.classList.add("show");

});


clearTimeout(toastTimer);


toastTimer = setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {

        toast.remove();

    }, 250);

}, 2500);


}

/* =========================================================
20. IMAGE MODAL
========================================================= */

function openImage(src, name) {


const modal =
    document.getElementById("imageModal");

const fullImg =
    document.getElementById("fullImage");

const caption =
    document.getElementById("caption");


if (!modal || !fullImg || !caption) {
    return;
}


fullImg.src = src;

fullImg.alt = name;

caption.textContent = name;


modal.classList.add("active");

modal.setAttribute(
    "aria-hidden",
    "false"
);


}

function closeModal() {


const modal =
    document.getElementById("imageModal");


if (!modal) return;


modal.classList.remove("active");

modal.setAttribute(
    "aria-hidden",
    "true"
);


}

/* =========================================================
21. KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
"keydown",
event => {


    if (event.key !== "Escape") return;

    closeAll();

}


);

/* =========================================================
22. SEARCH EVENT
========================================================= */

if (searchInput) {


searchInput.addEventListener(
    "input",
    searchProducts
);


}

/* =========================================================
23. INITIALIZATION
========================================================= */

loadProducts();

updateCartCount();

renderCartItems();
