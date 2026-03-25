// Hamburger toggle for mobile menu
function toggleNav() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Cart toggle
function toggleCart() {
    const cartDrawer = document.getElementById("cartSection");
    const overlay = document.getElementById("overlay");

    cartDrawer.classList.toggle("active");

    if(cartDrawer.classList.contains("active")) {
        overlay.style.display = "block";
        renderCartItems();
    } else {
        overlay.style.display = "none";
    }
}

// Close cart & checkout
function closeAll() {
    document.getElementById("cartSection").classList.remove("active");
    document.getElementById("checkoutForm").style.display="none";
    document.getElementById("overlay").style.display="none";
}

// Product data
const products = [
    { name: "Amla Oil", price: 350, img: "https://i.postimg.cc/Zqg0cR9R/IMG-20250724-WA0011.jpg" },
    { name: "Castor Oil", price: 300, img: "https://i.postimg.cc/fT7ffZkc/IMG-20250724-WA0017.jpg" },
    { name: "Onion Oil", price: 350, img: "https://i.postimg.cc/zvkdXsBZ/IMG-20250724-WA0005.jpg" },
    { name: "Almond Oil", price: 350, img: "https://i.postimg.cc/W1swg9r3/IMG-20250724-WA0016.jpg" },
    { name: "Coffee Scrub", price: 300, img: "https://i.postimg.cc/bvbf7NCd/IMG-20250724-WA0010.jpg" },
    { name: "Rice Scrub", price: 350, img: "https://i.postimg.cc/Y0JC6yjs/IMG-20250724-WA0012.jpg" },
    { name: "Tea Tree Scrub", price: 350, img: "https://i.postimg.cc/yN8hrvVN/IMG-20250724-WA0018.jpg" },
    { name: "Rose Scrub", price: 350, img: "https://i.postimg.cc/GtLbk8F6/IMG-20250724-WA0015.jpg" },
    { name: "Green Tea Scrub", price: 350, img: "https://i.postimg.cc/rwRSh6kV/IMG-20250724-WA0008.jpg" },
    { name: "Rose Water Toner", price: 300, img: "https://i.postimg.cc/DwTNSdBf/IMG-20250724-WA0014.jpg" },
    { name: "Intensive Cleanser", price: 350, img: "https://i.postimg.cc/jdmsm9xg/IMG-20250724-WA0009.jpg" },
    { name: "Vitamin C Face Wash", price: 750, img: "https://i.postimg.cc/7Zz23g3b/IMG-20250724-WA0013.jpg" },
    { name: "Shaving Gel", price: 350, img: "https://i.postimg.cc/mrF8FzDS/IMG-20250724-WA0006.jpg" },
    { name: "Aftershave", price: 350, img: "https://i.postimg.cc/KYLD86qq/IMG-20250724-WA0007.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Load products dynamically
function loadProducts(arr = products) {
    const list = document.getElementById("productList");
    list.innerHTML = "";
    arr.forEach(p => {
        list.innerHTML += `
        <div class="card">
            <img src="${p.img}" onclick="openImage('${p.img}','${p.name}')">
            <h3>${p.name}</h3>
            <p>Rs.${p.price}</p>
            <button onclick="addToCart('${p.name}')">Add to Cart</button>
        </div>
        `;
    });
}

// Add to cart
function addToCart(name) {
    const item = cart.find(i => i.name === name);
    if(item) item.quantity++;
    else {
        const p = products.find(i => i.name === name);
        cart.push({...p, quantity: 1});
    }
    saveCart();
    showToast("Added to cart ✅");
}

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Update cart count
function updateCartCount() {
    const countEl = document.getElementById("cartCount");
    if(countEl) countEl.innerText = cart.reduce((t,i) => t + i.quantity, 0);
}

// Render cart items
function renderCartItems() {
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        container.innerHTML += `
        <div class="cart-item">
            <span>${item.name}</span>
            <div class="qty">
                <button onclick="changeQty('${item.name}',-1)">-</button>
                ${item.quantity}
                <button onclick="changeQty('${item.name}',1)">+</button>
            </div>
            <span>Rs.${item.price * item.quantity}</span>
            <button onclick="removeItem('${item.name}')">X</button>
        </div>
        `;
    });
    document.getElementById("totalPrice").innerText = "Total Rs." + total;
}

// Change quantity
function changeQty(name, amount) {
    const item = cart.find(i => i.name === name);
    if(!item) return;
    item.quantity += amount;
    if(item.quantity <= 0) cart = cart.filter(i => i.name !== name);
    saveCart();
}

// Remove item
function removeItem(name) {
    cart = cart.filter(i => i.name !== name);
    saveCart();
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    toggleCart();
}

// Search products
function searchProducts() {
    const val = document.getElementById("searchInput").value.toLowerCase();
    loadProducts(products.filter(p => p.name.toLowerCase().includes(val)));
}

// Checkout
function showCheckoutDirectly() {
    if(cart.length === 0){
        alert("Cart empty!");
        return;
    }
    document.getElementById("checkoutForm").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Submit order
function submitOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if(!name || !phone || !address){
        alert("Please fill all details");
        return;
    }

    let total = 0;
    let msg = "*Order from Pure Naturals*%0A%0A";
    cart.forEach(i=>{
        msg += `${i.name} x${i.quantity} = Rs.${i.price*i.quantity}%0A`;
        total += i.price * i.quantity;
    });
    msg += `%0ATotal: Rs.${total}%0A`;
    msg += `%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;

    window.open(`https://wa.me/923453498797?text=${msg}`,"_blank");
    clearCart();
    closeAll();
}

// Toast notification
function showToast(text) {
    const toast = document.createElement("div");
    toast.innerText = text;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#2e7d32";
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "6px";
    toast.style.zIndex = "5000";
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),2000);
}

// Image modal
function openImage(src, name) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImage");
    const caption = document.getElementById("caption");
    if(modal && fullImg && caption) {
        modal.style.display = "block";
        fullImg.src = src;
        caption.innerText = name;
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if(modal) modal.style.display = "none";
}

// Initialize
loadProducts();
updateCartCount();