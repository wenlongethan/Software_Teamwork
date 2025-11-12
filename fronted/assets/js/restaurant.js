// frontend/assets/js/restaurant.js

const API_BASE = "http://127.0.0.1:5001";

// Mock data with real food images from Unsplash
const MOCK_MENU_ITEMS = [
    {
        "id": 1, 
        "name": "Classic Cheeseburger", 
        "price": 12.99, 
        "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center",
        "description": "Juicy beef patty with cheese, lettuce, and special sauce"
    },
    {
        "id": 2, 
        "name": "Pepperoni Pizza", 
        "price": 16.99, 
        "image": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&crop=center",
        "description": "Freshly baked with mozzarella and premium pepperoni"
    },
    {
        "id": 3, 
        "name": "Caesar Salad", 
        "price": 9.99, 
        "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center",
        "description": "Crisp romaine with parmesan and homemade dressing"
    },
    {
        "id": 4, 
        "name": "French Fries", 
        "price": 4.99, 
        "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center",
        "description": "Golden and crispy, perfectly seasoned"
    },
    {
        "id": 5, 
        "name": "Orange Soda", 
        "price": 2.99, 
        "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop&crop=center",
        "description": "Refreshing citrus drink, ice cold"
    },
    {
        "id": 6, 
        "name": "Chocolate Shake", 
        "price": 5.99, 
        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center",
        "description": "Creamy chocolate delight with whipped cream"
    },
    {
        "id": 7, 
        "name": "Grilled Chicken Sandwich", 
        "price": 11.99, 
        "image": "https://images.unsplash.com/photo-1606755962773-d324e38334da?w=400&h=300&fit=crop&crop=center",
        "description": "Tender grilled chicken with fresh vegetables"
    },
    {
        "id": 8, 
        "name": "Vegetable Pasta", 
        "price": 13.99, 
        "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&crop=center",
        "description": "Fresh pasta with seasonal vegetables and herbs"
    },
    {
        "id": 9, 
        "name": "BBQ Wings", 
        "price": 10.99, 
        "image": "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&crop=center",
        "description": "Crispy chicken wings with BBQ glaze"
    },
    {
        "id": 10, 
        "name": "Ice Cream Sundae", 
        "price": 6.99, 
        "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center",
        "description": "Vanilla ice cream with chocolate sauce and nuts"
    },
    {
        "id": 11, 
        "name": "Fish Tacos", 
        "price": 11.99, 
        "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&crop=center",
        "description": "Fresh fish with cabbage slaw and lime crema"
    },
    {
        "id": 12, 
        "name": "Mushroom Soup", 
        "price": 7.99, 
        "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&crop=center",
        "description": "Creamy mushroom soup with herbs"
    }
];

let useMockData = true;

// DOM Elements
const menuContainer = document.getElementById("menu-container");
const cartList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const showCheckoutBtn = document.getElementById("show-checkout");
const checkoutSection = document.getElementById("checkout-section");
const submitOrderBtn = document.getElementById("submit-order");
const orderMsg = document.getElementById("order-msg");
const cartCountEl = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem('restaurant_cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🍽️ Restaurant system initializing...');
    checkBackendAvailability();
    loadMenu();
    renderCart();
    setupEventListeners();
});

// Auto-detect if backend is available
async function checkBackendAvailability() {
    if (useMockData) {
        console.log("Using mock data by choice");
        return;
    }
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(`${API_BASE}/api/menu`, {
            method: 'GET',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            console.log("Backend connected successfully");
            useMockData = false;
        } else {
            throw new Error('Backend not responding properly');
        }
    } catch (error) {
        console.log("Backend not available, using mock data");
        useMockData = true;
    }
}

function setupEventListeners() {
    if (showCheckoutBtn) {
        showCheckoutBtn.addEventListener("click", showCheckout);
    }
    
    if (submitOrderBtn) {
        submitOrderBtn.addEventListener("click", submitOrder);
    }
    
    // Close checkout section when clicking outside
    document.addEventListener('click', (e) => {
        if (checkoutSection && checkoutSection.style.display === 'block' && 
            !checkoutSection.contains(e.target) && e.target !== showCheckoutBtn) {
            checkoutSection.style.display = 'none';
        }
    });
}

// 1. Enhanced menu loading with loading states
async function loadMenu() {
    if (useMockData) {
        console.log("Using mock menu data");
        showLoadingState();
        setTimeout(() => {
            renderMenu(MOCK_MENU_ITEMS);
        }, 800);
        return;
    }
    
    try {
        showLoadingState();
        const response = await fetch(`${API_BASE}/api/menu`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        renderMenu(data);
    } catch (error) {
        console.error("Load menu failed, using mock data:", error);
        renderMenu(MOCK_MENU_ITEMS);
    }
}

function showLoadingState() {
    if (menuContainer) {
        menuContainer.innerHTML = `
            <div class="loading-state">
                <p>🍽️ Loading delicious menu...</p>
                <div class="loading-spinner"></div>
            </div>
        `;
    }
}

function showErrorState(message) {
    if (menuContainer) {
        menuContainer.innerHTML = `
            <div class="error-state">
                <p>${message}</p>
                <button onclick="loadMenu()" class="retry-btn">Retry</button>
            </div>
        `;
    }
}

// Enhanced menu rendering with better image handling
function renderMenu(items) {
    if (!menuContainer) return;
    
    if (!items || items.length === 0) {
        menuContainer.innerHTML = "<p>No menu items available.</p>";
        return;
    }

    menuContainer.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" 
                     onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center'"
                     loading="lazy">
                <div class="image-loading">Loading...</div>
            </div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p class="item-description">${item.description || 'Delicious item'}</p>
                <div class="menu-item-footer">
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" 
                            data-id="${item.id}" 
                            data-name="${item.name}" 
                            data-price="${item.price}">
                        🛒 Add to cart
                    </button>
                </div>
            </div>
        `;
        
        // Add image load event handling
        const img = div.querySelector('img');
        const loadingDiv = div.querySelector('.image-loading');
        
        img.addEventListener('load', () => {
            loadingDiv.style.display = 'none';
        });
        
        img.addEventListener('error', () => {
            loadingDiv.style.display = 'none';
        });
        
        div.querySelector("button").addEventListener("click", (e) => {
            const { id, name, price } = e.target.dataset;
            addToCart(Number(id), name, Number(price));
            showAddToCartFeedback(e.target);
        });
        
        menuContainer.appendChild(div);
    });
}

function showAddToCartFeedback(button) {
    const originalText = button.textContent;
    button.textContent = "✅ Added!";
    button.disabled = true;
    button.style.backgroundColor = '#27ae60';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.backgroundColor = '';
    }, 1500);
}

// 2. Enhanced cart operations
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.menu_id === id);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ 
            menu_id: id, 
            name, 
            price, 
            qty: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    saveCart();
    renderCart();
    updateCartCount();
    showNotification(`"${name}" added to cart! 🛒`, 'success');
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.menu_id === id);
    
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cart[itemIndex].qty -= 1;
        
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
            showNotification(`"${itemName}" removed from cart`, 'info');
        } else {
            showNotification(`Reduced "${itemName}" quantity`, 'info');
        }
        
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function removeItemCompletely(id) {
    const itemIndex = cart.findIndex(item => item.menu_id === id);
    if (itemIndex !== -1) {
        const itemName = cart[itemIndex].name;
        cart.splice(itemIndex, 1);
        saveCart();
        renderCart();
        updateCartCount();
        showNotification(`"${itemName}" completely removed from cart`, 'info');
    }
}

function saveCart() {
    localStorage.setItem('restaurant_cart', JSON.stringify(cart));
}

function updateCartCount() {
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountEl.textContent = totalItems;
        cartCountEl.style.display = totalItems > 0 ? 'inline' : 'none';
    }
}

// Enhanced cart rendering
function renderCart() {
    if (!cartList) return;
    
    cartList.innerHTML = "";
    let total = 0;
    
    if (cart.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "empty-cart";
        emptyLi.innerHTML = "🛒 Your cart is empty<br><small>Add some delicious items!</small>";
        cartList.appendChild(emptyLi);
        if (cartTotalEl) cartTotalEl.textContent = "0.00";
        return;
    }
    
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <div class="cart-item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)} × ${item.qty}</span>
            </div>
            <div class="cart-item-controls">
                <span class="item-total">$${itemTotal.toFixed(2)}</span>
                <button class="decrease-btn" data-id="${item.menu_id}" title="Reduce quantity">−</button>
                <button class="remove-btn" data-id="${item.menu_id}" title="Remove item">×</button>
            </div>
        `;
        
        li.querySelector(".decrease-btn").addEventListener("click", () => {
            removeFromCart(item.menu_id);
        });
        
        li.querySelector(".remove-btn").addEventListener("click", () => {
            removeItemCompletely(item.menu_id);
        });
        
        cartList.appendChild(li);
    });
    
    if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
    updateCartCount();
}

// 3. Enhanced checkout flow
function showCheckout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty. Add some delicious items first! 🍔", "warning");
        return;
    }
    
    if (checkoutSection) {
        checkoutSection.style.display = "block";
        if (orderMsg) orderMsg.textContent = "";
        const customerName = document.getElementById("customer-name");
        const customerPhone = document.getElementById("customer-phone");
        if (customerName) customerName.value = "";
        if (customerPhone) customerPhone.value = "";
        
        // Auto-focus on name field
        setTimeout(() => {
            if (customerName) customerName.focus();
        }, 100);
    }
}

// 4. Enhanced order submission
async function submitOrder() {
    const nameInput = document.getElementById("customer-name");
    const phoneInput = document.getElementById("customer-phone");
    
    if (!nameInput || !phoneInput) {
        showNotification("Checkout form not found.", "error");
        return;
    }
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Validation
    if (!name || !phone) {
        showNotification("Please fill in both name and phone number.", "error");
        return;
    }
    
    if (cart.length === 0) {
        showNotification("Your cart is empty.", "error");
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        showNotification("Please enter a valid phone number (at least 10 digits).", "error");
        return;
    }

    try {
        // Show loading state
        if (submitOrderBtn) {
            submitOrderBtn.disabled = true;
            submitOrderBtn.textContent = "⏳ Processing...";
        }
        if (orderMsg) orderMsg.textContent = "Processing your order...";

        let data;
        
        // If using mock data, simulate API call
        if (useMockData) {
            console.log("Using mock checkout");
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mock successful response
            data = {
                status: "ok",
                order_id: Math.floor(Math.random() * 10000) + 1000,
                total: calculateTotal()
            };
        } else {
            // Real API call
            const response = await fetch(`${API_BASE}/api/checkout`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customer_name: name,
                    customer_phone: phone,
                    items: cart.map(item => ({ 
                        menu_id: item.menu_id, 
                        qty: item.qty 
                    }))
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            data = await response.json();
        }
        
        if (data.status === "ok") {
            handleOrderSuccess(data);
        } else {
            throw new Error(data.message || "Order failed");
        }
    } catch (error) {
        console.error("Checkout error:", error);
        showNotification("Order failed. Please try again.", "error");
        if (orderMsg) orderMsg.textContent = "Order failed. Please check your connection and try again.";
    } finally {
        // Reset button state
        if (submitOrderBtn) {
            submitOrderBtn.disabled = false;
            submitOrderBtn.textContent = "Submit Order";
        }
    }
}

// Helper function for order success
function handleOrderSuccess(data) {
    showNotification(`🎉 Order successful! Order ID: ${data.order_id}`, "success");
    if (orderMsg) {
        orderMsg.textContent = `🎉 Order successful! Your order ID is ${data.order_id}. Total: $${data.total.toFixed(2)}`;
        orderMsg.className = "order-message success";
    }
    
    // Reset cart and UI
    cart = [];
    saveCart();
    renderCart();
    
    // Hide checkout after delay
    setTimeout(() => {
        if (checkoutSection) {
            checkoutSection.style.display = "none";
            if (orderMsg) orderMsg.className = "order-message";
        }
    }, 5000);
}

// Utility function for notifications
function showNotification(message, type = "info") {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        font-size: 14px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            toast.style.backgroundColor = '#27ae60';
            break;
        case 'error':
            toast.style.backgroundColor = '#e74c3c';
            break;
        case 'warning':
            toast.style.backgroundColor = '#f39c12';
            break;
        default:
            toast.style.backgroundColor = '#3498db';
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading-spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 2s linear infinite;
        margin: 20px auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Calculate total for cart
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

// Utility functions for cart management
function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    showNotification("Cart cleared", "info");
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        addToCart, 
        removeFromCart, 
        calculateTotal, 
        getCartItemCount,
        clearCart
    };
}

// Debug helper
window.debugCart = {
    getCart: () => cart,
    clearCart: clearCart,
    addTestItem: () => addToCart(1, "Test Burger", 9.99),
    toggleMockData: () => {
        useMockData = !useMockData;
        console.log(`Mock data now: ${useMockData}`);
        loadMenu();
    }
};

console.log('✅ Restaurant system loaded successfully!');