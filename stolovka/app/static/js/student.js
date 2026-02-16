let cart = [];
let orders = [];
let paymentContext = { type: null, data: null, returnTo: null };

const logo = document.querySelector('.logo');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const pageContents = document.querySelectorAll('.page-content');
const cartContainer = document.getElementById('cart-items');
const ordersContainer = document.querySelector('.orders-list');
const paymentBlock = document.getElementById('payment');
const paymentForm = document.getElementById('payment-form');

logo.addEventListener('click', function(e) {
    e.preventDefault();
    showPage('menu');
    updateActiveNav(null);
});

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('href').substring(1);
        showPage(pageId);
        updateActiveNav(this);
    });
});

// Выпадающее меню пользователя
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const pageId = this.getAttribute('href').substring(1);
        
        if (pageId !== 'logout') {
            showPage(pageId);
            updateActiveNav(null);
        } else {
            // Перенаправляем на страницу авторизации
            window.location.href = 'auth.html';
        }
        
        dropdownMenu.classList.remove('show');
    });
});

menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', function(e) {
    if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
    }
});

// Функция показа нужной вкладки
function showPage(pageId) {
    pageContents.forEach(page => {
        page.style.display = 'none';
    });
    
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    }
}

function updateActiveNav(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function initOrders() {
    orders = [
        
    ];
    renderOrders();
}

function addToCart(item) {
    cart.push({
        id: Date.now() + Math.random(),
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image
    });
    renderCart();
    showNotification('Товар добавлен в корзину');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
    showNotification('Товар удален из корзины');
}

function renderCart() {
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <div style="font-size: 80px; color: #ddd; margin-bottom: 20px;">🛒</div>
                <p style="color: #999;">Ваша корзина пока пуста. Добавьте блюда из меню.</p>
            </div>
        `;
        return;
    }

    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price} ₽</div>
                </div>
                <button class="cart-item-remove">-</button>
            </div>
        `;
    });

    html += `
        <div style="margin-top: 20px; text-align: right; font-size: 18px;">
            <strong>Итого: ${total} ₽</strong>
        </div>
        <button id="checkout-btn" class="add-to-cart-btn" style="margin-top: 20px;">Оплатить всё</button>
    `;

    cartContainer.innerHTML = html;

    // Обработчики удаления
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const id = parseFloat(cartItem.dataset.id);
            removeFromCart(id);
        });
    });

    // Обработчик оплаты
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            goToPayment('cart', { items: cart }, 'cart');
        });
    }
}

// ========== РАБОТА С ЗАКАЗАМИ ==========
function renderOrders() {
    if (!ordersContainer) return;
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p style="color: #999; text-align: center;">У вас пока нет заказов.</p>';
        return;
    }

    let html = '';
    orders.forEach(order => {
        const statusClass = order.status === 'completed' ? 'status-completed' : 'status-pending';
        const statusText = order.status === 'completed' ? 'Выполнен' : 'В обработке';
        
        html += `
            <div class="order-item">
                <div>
                    <h3>Заказ №${order.id} от ${order.date}</h3>
                    <p>${order.description}</p>
                </div>
                <div>
                    <span class="order-status ${statusClass}">${statusText}</span>
                    <div style="font-weight: 600; margin-top: 5px;">${order.total} ₽</div>
                </div>
            </div>
        `;
    });
    ordersContainer.innerHTML = html;
}

function createOrder(description, total) {
    const newOrder = {
        id: Math.floor(Math.random() * 900 + 100),
        date: new Date().toLocaleDateString('ru-RU'),
        description: description,
        total: total,
        status: 'pending' // Новые заказы по умолчанию "В обработке"
    };
    orders.push(newOrder);
    renderOrders();
    showNotification('Заказ успешно оформлен!');
}

// ========== РАБОТА С ОПЛАТОЙ ==========
function goToPayment(type, data, returnTo) {
    paymentContext = { type, data, returnTo };
    showPage('payment');
}

// Обработчики формы оплаты
document.getElementById('payment-submit').addEventListener('click', () => {
    // Проверка заполненности полей
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCvv = document.getElementById('card-cvv').value.trim();
    const cardName = document.getElementById('card-name').value.trim();

    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        alert('Пожалуйста, заполните все поля формы оплаты.');
        return;
    }

    // Проверка форматов (упрощенно)
    if (cardNumber.length < 16) {
        alert('Пожалуйста, введите корректный номер карты');
        return;
    }
    
    if (cardCvv.length < 3) {
        alert('Пожалуйста, введите корректный CVV код');
        return;
    }

    // Создание заказа в зависимости от контекста
    if (paymentContext.type === 'cart') {
        const items = paymentContext.data.items;
        const description = items.map(item => item.name).join(', ');
        const total = items.reduce((sum, item) => sum + item.price, 0);
        createOrder(description, total);
        cart = [];
        renderCart();
    } else if (paymentContext.type === 'subscription') {
        const { name, price } = paymentContext.data;
        createOrder(`Абонемент: ${name}`, price);
    }

    // Возвращаемся на вкладку "Мои заказы"
    showPage('orders');
    updateActiveNav(null);
    
    // Очищаем поля формы
    paymentForm.reset();
});

document.getElementById('payment-cancel').addEventListener('click', () => {
    // Возвращаемся на предыдущую вкладку
    showPage(paymentContext.returnTo || 'menu');
    updateActiveNav(null);
    paymentForm.reset();
});

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function showNotification(message) {
    // Можно реализовать красивые уведомления
    console.log(message);
}

// ========== ОБРАБОТЧИКИ ДЛЯ КНОПОК В МЕНЮ ==========
document.querySelectorAll('#menu .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const menuItem = this.closest('.menu-item');
        if (!menuItem) return;

        const name = menuItem.querySelector('.menu-item-title').textContent;
        const priceText = menuItem.querySelector('.menu-item-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
        const description = menuItem.querySelector('.menu-item-desc').textContent;
        const image = menuItem.querySelector('img')?.src || 'images/test.jpg';

        addToCart({ name, price, description, image });

        // Визуальный фидбек
        const originalText = this.innerHTML;
        this.innerHTML = '✓ Добавлено';
        this.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = '#DBB91E';
        }, 2000);
    });
});

// ========== ОБРАБОТЧИКИ ДЛЯ КНОПОК В АБОНЕМЕНТАХ ==========
document.querySelectorAll('#subscriptions .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const menuItem = this.closest('.menu-item');
        if (!menuItem) return;

        const name = menuItem.querySelector('.menu-item-title').textContent;
        const priceText = menuItem.querySelector('.menu-item-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);

        goToPayment('subscription', { name, price }, 'subscriptions');
    });
});

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ==========
document.addEventListener('DOMContentLoaded', function() {
    initOrders();
    showPage('menu');
    renderCart();
});