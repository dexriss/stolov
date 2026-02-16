let mealsState = {
    breakfast: {
        remaining: 0,
        sold: 0
    },
    lunch: {
        remaining: 0,
        sold: 0
    }
};


let inventoryState = [
    { id: 1, name: 'Картофель', quantity: '12 кг' },
    { id: 2, name: 'Морковь', quantity: '5.2 кг' },
    { id: 3, name: 'Лук', quantity: '8.0 кг' },
    { id: 4, name: 'Курица (филе)', quantity: '24.5 кг' },
    { id: 5, name: 'Рис', quantity: '3.2 кг' }
];


let supplyRequests = [
    { id: 1, product: 'Картофель', quantity: 50, unit: 'кг', status: 'ожидает' },
    { id: 2, product: 'Морковь', quantity: 20, unit: 'кг', status: 'в обработке' },
    { id: 3, product: 'Лук репчатый', quantity: 15, unit: 'кг', status: 'ожидает' }
];


function renderInventory() {
    const tbody = document.getElementById('inventory-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    inventoryState.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td style="text-align: right;">
                <button class="btn-delete" onclick="deleteProduct(${item.id})" title="Удалить">✕</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addProduct(name, quantity) {
    const newId = inventoryState.length > 0 ? Math.max(...inventoryState.map(p => p.id)) + 1 : 1;
    inventoryState.push({
        id: newId,
        name: name,
        quantity: quantity
    });
    renderInventory();
}

function deleteProduct(id) {
    inventoryState = inventoryState.filter(item => item.id !== id);
    renderInventory();
}


function renderSupplyRequests() {
    const supplyList = document.getElementById('supply-list');
    if (!supplyList) return;
    
    supplyList.innerHTML = '';
    
    supplyRequests.forEach(request => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="request-product">${request.product}</span>
            <span style="display: flex; align-items: center; gap: 10px;">
                <strong>${request.quantity} ${request.unit}</strong>
                <span class="request-status ${request.status === 'в обработке' ? 'status-processing' : ''}">${request.status}</span>
                <button class="btn-delete" onclick="deleteSupplyRequest(${request.id})" title="Удалить" style="font-size: 1rem;">✕</button>
            </span>
        `;
        supplyList.appendChild(li);
    });
}

function addSupplyRequest() {
    const productInput = document.getElementById('supply-product-name');
    const quantityInput = document.getElementById('supply-quantity');
    const unitSelect = document.getElementById('supply-unit');
    
    const product = productInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const unit = unitSelect.value;
    
    if (!product) {
        alert('Введите название продукта');
        return;
    }
    
    if (isNaN(quantity) || quantity <= 0) {
        alert('Введите корректное количество');
        return;
    }
    
    const newId = supplyRequests.length > 0 ? Math.max(...supplyRequests.map(r => r.id)) + 1 : 1;
    
    supplyRequests.push({
        id: newId,
        product: product,
        quantity: quantity,
        unit: unit,
        status: 'в обработке' 
    });
    

    productInput.value = '';
    quantityInput.value = '1';
    unitSelect.value = 'кг';
    
    renderSupplyRequests();
}

function deleteSupplyRequest(id) {
    supplyRequests = supplyRequests.filter(request => request.id !== id);
    renderSupplyRequests();
}


function openModal() {
    document.getElementById('product-modal').classList.add('show');
    document.getElementById('product-name').focus();
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('show');
    document.getElementById('product-form').reset();
}


function updateUI() {
    document.getElementById('breakfast-count').innerHTML = 
        mealsState.breakfast.remaining + ' <span class="stat-unit">шт осталось</span>';
    document.getElementById('lunch-count').innerHTML = 
        mealsState.lunch.remaining + ' <span class="stat-unit">шт осталось</span>';
    
    document.getElementById('breakfast-sold').textContent = 
        mealsState.breakfast.sold + ' порции';
    document.getElementById('lunch-sold').textContent = 
        mealsState.lunch.sold + ' порции';
    
    document.getElementById('breakfast-setting').value = mealsState.breakfast.remaining;
    document.getElementById('lunch-setting').value = mealsState.lunch.remaining;
}

function issueBreakfast() {
    if (mealsState.breakfast.remaining > 0) {
        mealsState.breakfast.remaining--;
        mealsState.breakfast.sold++;
        updateUI();
    } else {
        alert('Завтраки закончились! Установите новое количество на сегодня.');
    }
}

function issueLunch() {
    if (mealsState.lunch.remaining > 0) {
        mealsState.lunch.remaining--;
        mealsState.lunch.sold++;
        updateUI();
    } else {
        alert('Обеды закончились! Установите новое количество на сегодня.');
    }
}

function setBreakfastCount() {
    const input = document.getElementById('breakfast-setting');
    let newCount = parseInt(input.value);
    
    if (isNaN(newCount) || newCount < 0) {
        alert('Пожалуйста, введите корректное число (неотрицательное)');
        input.value = mealsState.breakfast.remaining;
        return;
    }
    
    mealsState.breakfast.remaining = newCount;
    updateUI();
}

function setLunchCount() {
    const input = document.getElementById('lunch-setting');
    let newCount = parseInt(input.value);
    
    if (isNaN(newCount) || newCount < 0) {
        alert('Пожалуйста, введите корректное число (неотрицательное)');
        input.value = mealsState.lunch.remaining;
        return;
    }
    
    mealsState.lunch.remaining = newCount;
    updateUI();
}


function switchPage(pageId) {
    document.getElementById('page-meals').classList.remove('active');
    document.getElementById('page-inventory').classList.remove('active');
    document.getElementById('page-supply').classList.remove('active');
    
    document.getElementById('page-' + pageId).classList.add('active');
    
    document.getElementById('tab-meals-link').classList.remove('active');
    document.getElementById('tab-inventory-link').classList.remove('active');
    document.getElementById('tab-supply-link').classList.remove('active');
    
    document.getElementById('tab-' + pageId + '-link').classList.add('active');
    
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
    }


    if (pageId === 'inventory') {
        renderInventory();
    } else if (pageId === 'supply') {
        renderSupplyRequests();
    }
}


function toggleMenu(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}


document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!menuToggle.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }

    const modal = document.getElementById('product-modal');
    if (modal && modal.classList.contains('show') && event.target === modal) {
        closeModal();
    }
});


document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('menuToggle').addEventListener('click', toggleMenu);
    

    document.getElementById('breakfast-issue-btn').addEventListener('click', issueBreakfast);
    document.getElementById('lunch-issue-btn').addEventListener('click', issueLunch);
    document.getElementById('set-breakfast-btn').addEventListener('click', setBreakfastCount);
    document.getElementById('set-lunch-btn').addEventListener('click', setLunchCount);
    
    document.getElementById('breakfast-setting').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            setBreakfastCount();
        }
    });
    
    document.getElementById('lunch-setting').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            setLunchCount();
        }
    });
    

    document.getElementById('add-product-btn').addEventListener('click', openModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
    
    document.getElementById('product-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('product-name').value.trim();
        const quantity = document.getElementById('product-quantity').value.trim();
        
        if (name && quantity) {
            addProduct(name, quantity);
            closeModal();
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });

    const logoutLink = document.querySelector('.dropdown-item[href="#logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'auth.html';
        });
    }

    document.getElementById('add-supply-btn').addEventListener('click', addSupplyRequest);
    

    document.getElementById('supply-product-name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSupplyRequest();
        }
    });
    
    document.getElementById('supply-quantity').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSupplyRequest();
        }
    });

    renderInventory();
    renderSupplyRequests();
    updateUI();
});

window.switchPage = switchPage;
window.deleteProduct = deleteProduct;
window.deleteSupplyRequest = deleteSupplyRequest; 