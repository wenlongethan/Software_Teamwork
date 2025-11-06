// frontend/assets/js/restaurant.js

const API_BASE = "http://127.0.0.1:5001";  // 和 Flask 一致

const menuContainer = document.getElementById("menu-container");
const cartList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const showCheckoutBtn = document.getElementById("show-checkout");
const checkoutSection = document.getElementById("checkout-section");
const submitOrderBtn = document.getElementById("submit-order");
const orderMsg = document.getElementById("order-msg");

let cart = []; // {menu_id, name, price, qty}

// 1. 加载菜单并渲染
fetch(`${API_BASE}/api/menu`)
  .then(res => res.json())
  .then(data => {
    renderMenu(data);
  })
  .catch(err => {
    console.error("Load menu failed:", err);
    menuContainer.innerHTML = "<p>Failed to load menu.</p>";
  });

function renderMenu(items) {
  menuContainer.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="../assets/images/${item.image}" alt="${item.name}" style="width:100%;max-width:180px;">
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      <button data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
        Add to cart
      </button>
    `;
    // 绑定事件
    div.querySelector("button").addEventListener("click", (e) => {
      const { id, name, price } = e.target.dataset;
      addToCart(Number(id), name, Number(price));
    });
    menuContainer.appendChild(div);
  });
}

// 2. 购物车操作
function addToCart(id, name, price) {
  const found = cart.find(i => i.menu_id === id);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ menu_id: id, name, price, qty: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.menu_id === id);
  if (idx !== -1) {
    cart[idx].qty -= 1;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
  }
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} × ${item.qty} — $${(item.price * item.qty).toFixed(2)}
      <button data-id="${item.menu_id}">-</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      removeFromCart(item.menu_id);
    });
    cartList.appendChild(li);
  });
  cartTotalEl.textContent = total.toFixed(2);
}

// 3. 显示结账表单
if (showCheckoutBtn) {
  showCheckoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }
    checkoutSection.style.display = "block";
  });
}

// 4. 提交订单
if (submitOrderBtn) {
  submitOrderBtn.addEventListener("click", () => {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();

    if (!name || !phone) {
      orderMsg.textContent = "Please fill in name and phone.";
      return;
    }
    if (cart.length === 0) {
      orderMsg.textContent = "Cart is empty.";
      return;
    }

    fetch(`${API_BASE}/api/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: name,
        customer_phone: phone,
        items: cart.map(i => ({ menu_id: i.menu_id, qty: i.qty }))
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "ok") {
          orderMsg.textContent = `Order success! ID: ${data.order_id}, total: $${data.total.toFixed(2)}`;
          cart = [];
          renderCart();
          checkoutSection.style.display = "none";
        } else {
          orderMsg.textContent = "Order failed.";
        }
      })
      .catch(err => {
        console.error("Checkout error:", err);
        orderMsg.textContent = "Order failed, please try again.";
      });
  });
}
