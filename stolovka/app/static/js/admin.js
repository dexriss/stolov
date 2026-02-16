const MENU_DATA = {
    '2023-12-01': {
        breakfast: [
            { id: 1, name: 'Каша овсяная', price: 50, category: 'Горячее', allergens: ['Глютен', 'Молоко'], calories: 150 },
            { id: 2, name: 'Бутерброд с сыром', price: 40, category: 'Закуска', allergens: ['Глютен', 'Молоко'], calories: 120 },
            { id: 3, name: 'Чай', price: 10, category: 'Напиток', allergens: [], calories: 5 }
        ],
        lunch: [
            { id: 4, name: 'Суп куриный', price: 80, category: 'Первое', allergens: ['Глютен'], calories: 200 },
            { id: 5, name: 'Котлета с пюре', price: 120, category: 'Второе', allergens: ['Молоко'], calories: 350 },
            { id: 6, name: 'Компот', price: 20, category: 'Напиток', allergens: [], calories: 80 }
        ]
    },
    '2023-12-02': {
        breakfast: [
            { id: 7, name: 'Творожная запеканка', price: 60, category: 'Горячее', allergens: ['Молоко', 'Яйца'], calories: 180 },
            { id: 8, name: 'Какао', price: 30, category: 'Напиток', allergens: ['Молоко'], calories: 120 }
        ],
        lunch: [
            { id: 9, name: 'Борщ', price: 90, category: 'Первое', allergens: [], calories: 150 },
            { id: 10, name: 'Гречка с тефтелей', price: 110, category: 'Второе', allergens: ['Глютен'], calories: 300 },
            { id: 11, name: 'Салат овощной', price: 40, category: 'Салат', allergens: [], calories: 50 }
        ]
    }
};

const ORDERS_DATA = [
    { id: 1, studentId: 'ivanov@school.ru', date: '2023-12-01', mealType: 'breakfast', items: [1, 2], total: 90, paid: true, received: true },
    { id: 2, studentId: 'ivanov@school.ru', date: '2023-12-01', mealType: 'lunch', items: [4, 5], total: 200, paid: true, received: true },
    { id: 3, studentId: 'ivanov@school.ru', date: '2023-12-02', mealType: 'breakfast', items: [7], total: 60, paid: true, received: false },
    { id: 4, studentId: 'ivanov@school.ru', date: '2023-12-02', mealType: 'lunch', items: [9, 10, 11], total: 240, paid: false, received: false }
];


const PURCHASE_REQUESTS = [
    { id: 1, cookId: 'cook@school.ru', cookName: 'Петрова Мария', date: '2023-11-28', items: [
        { name: 'Курица', quantity: 10, unit: 'кг' },
        { name: 'Картофель', quantity: 50, unit: 'кг' },
        { name: 'Молоко', quantity: 20, unit: 'л' }
    ], status: 'approved', total: 15000 },
    { id: 2, cookId: 'cook@school.ru', cookName: 'Петрова Мария', date: '2023-11-30', items: [
        { name: 'Рис', quantity: 30, unit: 'кг' },
        { name: 'Овощи сезонные', quantity: 40, unit: 'кг' }
    ], status: 'pending', total: 8000 },
    { id: 3, cookId: 'cook@school.ru', cookName: 'Петрова Мария', date: '2023-12-01', items: [
        { name: 'Масло подсолнечное', quantity: 10, unit: 'л' },
        { name: 'Сахар', quantity: 15, unit: 'кг' }
    ], status: 'pending', total: 5000 }
];

const STATISTICS_DATA = {
    payments: {
        daily: 12500,
        monthly: 275000,
        totalStudents: 450,
        paidStudents: 420
    },
    attendance: {
        today: 380,
        weekAverage: 395,
        monthAverage: 410
    },
    popularDishes: [
        { name: 'Котлета с пюре', orders: 320 },
        { name: 'Суп куриный', orders: 310 },
        { name: 'Гречка с тефтелей', orders: 290 }
    ]
};


let usersData = [
    { id: 1, name: 'Иванов Иван', email: 'ivanov@school.ru', role: 'student', class: '10А', status: 'active' },
    { id: 2, name: 'Петрова Анна', email: 'petrova@school.ru', role: 'student', class: '9Б', status: 'active' },
    { id: 3, name: 'Сидоров Петр', email: 'sidorov@school.ru', role: 'student', class: '11А', status: 'inactive' },
    { id: 4, name: 'Петрова Мария', email: 'cook@school.ru', role: 'cook', position: 'Шеф-повар', status: 'active' },
    { id: 5, name: 'Смирнова Елена', email: 'cook2@school.ru', role: 'cook', position: 'Повар', status: 'active' },
    { id: 6, name: 'Сидоров Александр', email: 'admin@school.ru', role: 'admin', position: 'Директор', status: 'active' },
    { id: 7, name: 'Кузнецов Андрей', email: 'admin2@school.ru', role: 'admin', position: 'Завхоз', status: 'active' }
];


let reportsHistory = [
    { id: 1, date: '29.01.2026 14:30', type: 'financial', typeName: 'Финансовый отчет', format: 'PDF', size: '2.4 MB' },
    { id: 2, date: '30.01.2026 10:15', type: 'attendance', typeName: 'Отчет по посещаемости', format: 'Excel', size: '1.8 MB' },
    { id: 3, date: '31.01.2026 16:45', type: 'nutrition', typeName: 'Отчет по питанию', format: 'PDF', size: '3.1 MB' }
];


let paymentData = [
    { id: 1, student: 'Иванов Иван', class: '10А', amount: 500, date: '01.02.2026', method: 'СБП', status: 'success' },
    { id: 2, student: 'Петрова Анна', class: '9Б', amount: 1000, date: '01.02.2026', method: 'СБП', status: 'success' },
    { id: 3, student: 'Сидоров Петр', class: '11А', amount: 1500, date: '01.02.2026', method: 'Абонемент', status: 'success' },
    { id: 4, student: 'Кузнецова Мария', class: '8В', amount: 500, date: '01.02.2026', method: 'СБП', status: 'pending' },
    { id: 5, student: 'Васильев Алексей', class: '10Б', amount: 1000, date: '01.02.2026', method: 'СБП', status: 'failed' }
];


document.addEventListener('DOMContentLoaded', function() {

    // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    // if (!currentUser || currentUser.role !== 'admin') {
    //     window.location.href = 'auth.html';
    //     return;
    // }
    

    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = currentUser.name.charAt(0);
    

    const navLinks = document.querySelectorAll('.nav-menu a');
    const contentContainer = document.getElementById('contentContainer');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    

    let currentPage = 'dashboard';

    const pageFunctions = {
        dashboard: showDashboardPage,
        payments: showPaymentsPage,
        attendance: showAttendancePage,
        purchases: showPurchasesPage,
        reports: showReportsPage,
        users: showUsersPage,
        settings: showSettingsPage
    };
    

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            

            const page = this.dataset.page;
            currentPage = page;
            
            if (pageFunctions[page]) {
                pageFunctions[page]();
            }
        });
    });
    

    document.getElementById('logoutBtn').addEventListener('click', function() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'auth.html';
    });
    

    showDashboardPage();
    

    
    function showDashboardPage() {
        pageTitle.textContent = 'Добро пожаловать!';
        pageSubtitle.textContent = 'Перейдите к страницам в боковом меню слева';
        
        let html = `
            <div class="content-grid">
                <div class="card">
                    <h3>Быстрая статистика</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">${STATISTICS_DATA.payments.daily.toLocaleString()} ₽</div>
                            <div class="stat-label">Доход сегодня</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${STATISTICS_DATA.attendance.today}</div>
                            <div class="stat-label">Посетило сегодня</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${STATISTICS_DATA.payments.paidStudents}</div>
                            <div class="stat-label">Оплативших</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${PURCHASE_REQUESTS.filter(r => r.status === 'pending').length}</div>
                            <div class="stat-label">Заявок ожидает</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Популярные блюда</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Блюдо</th>
                                    <th>Заказов</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${STATISTICS_DATA.popularDishes.map(dish => `
                                    <tr>
                                        <td>${dish.name}</td>
                                        <td>${dish.orders}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = html;
    }
    
    function showPaymentsPage() {
        pageTitle.textContent = 'Оплаты и финансы';
        pageSubtitle.textContent = 'Управление финансовыми операциями';
        
        renderPaymentsPage();
    }
    
    function renderPaymentsPage() {
        let html = `
            <div class="card">
                <h3>История платежей</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ученик</th>
                                <th>Класс</th>
                                <th>Сумма</th>
                                <th>Дата</th>
                                <th>Способ</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        paymentData.forEach(payment => {
            let statusBadge = '';
            if (payment.status === 'success') {
                statusBadge = '<span class="status-badge status-approved">Успешно</span>';
            } else if (payment.status === 'pending') {
                statusBadge = '<span class="status-badge status-pending">В обработке</span>';
            } else {
                statusBadge = '<span class="status-badge status-rejected">Ошибка</span>';
            }
            
            html += `
                <tr>
                    <td>${payment.id}</td>
                    <td>${payment.student}</td>
                    <td>${payment.class}</td>
                    <td>${payment.amount} ₽</td>
                    <td>${payment.date}</td>
                    <td>${payment.method}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-outline view-payment" data-id="${payment.id}">Просмотр</button>
                        ${payment.status === 'pending' ? 
                            `<button class="btn btn-sm btn-success confirm-payment" data-id="${payment.id}">Подтвердить</button>` : ''}
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>    
            </div>
            
            <div class="card">
                <h3>Отчет по доходам и расходам</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Статья</th>
                                <th>Январь 2026</th>
                                <th>Февраль 2026</th>
                                <th>Изменение</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Доходы</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Питание (завтраки)</td>
                                <td>150,000 ₽</td>
                                <td>145,000 ₽</td>
                                <td style="color: var(--success);">+5,000 ₽</td>
                            </tr>
                            <tr>
                                <td>Питание (обеды)</td>
                                <td>275,000 ₽</td>
                                <td>265,000 ₽</td>
                                <td style="color: var(--success);">+10,000 ₽</td>
                            </tr>
                            <tr>
                                <td><strong>Расходы</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Закупка продуктов</td>
                                <td>280,000 ₽</td>
                                <td>275,000 ₽</td>
                                <td style="color: var(--danger);">+5,000 ₽</td>
                            </tr>
                            <tr>
                                <td>Зарплата персонала</td>
                                <td>80,000 ₽</td>
                                <td>80,000 ₽</td>
                                <td>0 ₽</td>
                            </tr>
                            <tr>
                                <td>Коммунальные услуги</td>
                                <td>15,000 ₽</td>
                                <td>15,000 ₽</td>
                                <td>0 ₽</td>
                            </tr>
                            <tr>
                                <td><strong>Прибыль</strong></td>
                                <td><strong>50,000 ₽</strong></td>
                                <td><strong>40,000 ₽</strong></td>
                                <td style="color: var(--success);"><strong>+10,000 ₽</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = html;
        

        document.querySelectorAll('.view-payment').forEach(btn => {
            btn.addEventListener('click', function() {
                const paymentId = parseInt(this.dataset.id);
                viewPaymentDetails(paymentId);
            });
        });
        

        document.querySelectorAll('.confirm-payment').forEach(btn => {
            btn.addEventListener('click', function() {
                const paymentId = parseInt(this.dataset.id);
                if (confirm('Подтвердить получение платежа?')) {

                    const payment = paymentData.find(p => p.id === paymentId);
                    if (payment) {
                        payment.status = 'success';
                        renderPaymentsPage(); 
                        alert(`Платеж #${paymentId} подтвержден.`);
                    }
                }
            });
        });
    }
    
    function showAttendancePage() {
        pageTitle.textContent = 'Посещаемость';
        pageSubtitle.textContent = 'Статистика посещений столовой';
        
        let html = `
            <div class="content-grid">
                <div class="card">
                    <h3>Статистика по классам</h3>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Класс</th>
                                    <th>Всего учеников</th>
                                    <th>Посетило сегодня</th>
                                    <th>Процент</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>10А</td>
                                    <td>25</td>
                                    <td>22</td>
                                    <td>88%</td>
                                </tr>
                                <tr>
                                    <td>9Б</td>
                                    <td>28</td>
                                    <td>25</td>
                                    <td>89%</td>
                                </tr>
                                <tr>
                                    <td>11А</td>
                                    <td>30</td>
                                    <td>28</td>
                                    <td>93%</td>
                                </tr>
                                <tr>
                                    <td>8В</td>
                                    <td>27</td>
                                    <td>20</td>
                                    <td>74%</td>
                                </tr>
                                <tr>
                                    <td>10Б</td>
                                    <td>26</td>
                                    <td>24</td>
                                    <td>92%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Распределение по времени</h3>
                    <div class="time-distribution">
                        <div class="time-slot">
                            <div class="slot-info">
                                <span>Завтрак (8:00-9:30)</span>
                                <span>65%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 65%; background: var(--primary-yellow);"></div>
                            </div>
                        </div>
                        <div class="time-slot">
                            <div class="slot-info">
                                <span>Обед (12:30-14:30)</span>
                                <span>85%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 85%; background: var(--success);"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = html;
    }
    
    function showPurchasesPage() {
        pageTitle.textContent = 'Заявки на закупку';
        pageSubtitle.textContent = 'Согласование заявок от поваров';
        
        renderPurchasesPage();
    }
    
    function renderPurchasesPage() {
        let html = `
            <div class="card">
                <h3>Заявки на согласование</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Повар</th>
                                <th>Дата</th>
                                <th>Количество позиций</th>
                                <th>Сумма</th>
                                <th>Приоритет</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        PURCHASE_REQUESTS.forEach(request => {
            let statusClass = 'status-pending';
            let statusText = 'На рассмотрении';
            
            if (request.status === 'approved') {
                statusClass = 'status-approved';
                statusText = 'Согласовано';
            } else if (request.status === 'rejected') {
                statusClass = 'status-rejected';
                statusText = 'Отклонено';
            }
            
            const priority = request.id === 2 ? 'Высокий' : 'Обычный';
            const priorityClass = request.id === 2 ? 'status-warning' : 'status-pending';
            
            html += `
                <tr>
                    <td>${request.id}</td>
                    <td>${request.cookName}</td>
                    <td>${request.date}</td>
                    <td>${request.items.length}</td>
                    <td>${request.total.toLocaleString()} ₽</td>
                    <td><span class="status-badge ${priorityClass}">${priority}</span></td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline view-request" data-id="${request.id}">Просмотр</button>
                        ${request.status === 'pending' ? `
                            <button class="btn btn-sm btn-success approve-request" data-id="${request.id}">Согласовать</button>
                            <button class="btn btn-sm btn-danger reject-request" data-id="${request.id}">Отклонить</button>
                        ` : ''}
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="content-grid">
                <div class="card">
                    <h3>Статистика закупок</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">${PURCHASE_REQUESTS.length}</div>
                            <div class="stat-label">Всего заявок</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">
                                ${PURCHASE_REQUESTS.filter(r => r.status === 'approved').length}
                            </div>
                            <div class="stat-label">Согласовано</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">
                                ${PURCHASE_REQUESTS.filter(r => r.status === 'pending').length}
                            </div>
                            <div class="stat-label">Ожидает</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">
                                ${PURCHASE_REQUESTS.reduce((sum, r) => sum + r.total, 0).toLocaleString()} ₽
                            </div>
                            <div class="stat-label">Общая сумма</div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <h3>Бюджет на закупки</h3>
                    <div class="budget-info">
                        <div class="budget-item">
                            <div class="budget-label">Выделенный бюджет на месяц</div>
                            <div class="budget-amount">300,000 ₽</div>
                        </div>
                        <div class="budget-item">
                            <div class="budget-label">Потрачено в этом месяце</div>
                            <div class="budget-amount">150,000 ₽</div>
                        </div>
                        <div class="budget-item">
                            <div class="budget-label">Остаток бюджета</div>
                            <div class="budget-amount remaining">150,000 ₽</div>
                        </div>
                        <div class="progress-bar" style="margin-top: 1rem;">
                            <div class="progress-fill" style="width: 50%; background: var(--primary-yellow);"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3>История согласований</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Заявка</th>
                                <th>Сумма</th>
                                <th>Статус</th>
                                <th>Согласовавший</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>30.01.2026</td>
                                <td>Закупка мяса и овощей</td>
                                <td>15,000 ₽</td>
                                <td><span class="status-badge status-approved">Согласовано</span></td>
                                <td>Сидоров А.А.</td>
                            </tr>
                            <tr>
                                <td>31.01.2026</td>
                                <td>Закупка молочной продукции</td>
                                <td>8,000 ₽</td>
                                <td><span class="status-badge status-approved">Согласовано</span></td>
                                <td>Сидоров А.А.</td>
                            </tr>
                            <tr>
                                <td>01.02.2026</td>
                                <td>Закупка круп</td>
                                <td>12,000 ₽</td>
                                <td><span class="status-badge status-rejected">Отклонено</span></td>
                                <td>Сидоров А.А.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = html;
        

        document.querySelectorAll('.view-request').forEach(btn => {
            btn.addEventListener('click', function() {
                const requestId = parseInt(this.dataset.id);
                viewPurchaseRequest(requestId);
            });
        });
        
        document.querySelectorAll('.approve-request').forEach(btn => {
            btn.addEventListener('click', function() {
                const requestId = parseInt(this.dataset.id);
                if (confirm('Согласовать эту заявку на закупку?')) {
                    const request = PURCHASE_REQUESTS.find(r => r.id === requestId);
                    if (request) {
                        request.status = 'approved';
                        renderPurchasesPage();
                        alert(`Заявка #${requestId} согласована.`);
                    }
                }
            });
        });
        
        document.querySelectorAll('.reject-request').forEach(btn => {
            btn.addEventListener('click', function() {
                const requestId = parseInt(this.dataset.id);
                const reason = prompt('Укажите причину отклонения заявки:');
                if (reason) {
                    const request = PURCHASE_REQUESTS.find(r => r.id === requestId);
                    if (request) {
                        request.status = 'rejected';
                        renderPurchasesPage();
                        alert(`Заявка #${requestId} отклонена. Причина: ${reason}`);
                    }
                }
            });
        });
    }
    
    function showReportsPage() {
        pageTitle.textContent = 'Отчеты';
        pageSubtitle.textContent = 'Формирование отчетности';
        
        renderReportsPage();
    }
    
    function renderReportsPage() {
        let html = `
            <div class="content-grid">
                <div class="card">
                    <h3>Типы отчетов</h3>
                    <div class="report-types">
                        <div class="report-type">
                            <div class="report-info">
                                <strong>Финансовый отчет</strong>
                                <p>Доходы, расходы и прибыль</p>
                            </div>
                            <button class="btn btn-outline generate-report" data-type="financial">Сформировать</button>
                        </div>
                        <div class="report-type">
                            <div class="report-info">
                                <strong>Отчет по посещаемости</strong>
                                <p>Статистика посещений столовой</p>
                            </div>
                            <button class="btn btn-outline generate-report" data-type="attendance">Сформировать</button>
                        </div>
                        <div class="report-type">
                            <div class="report-info">
                                <strong>Отчет по питанию</strong>
                                <p>Популярные блюда, отзывы</p>
                            </div>
                            <button class="btn btn-outline generate-report" data-type="nutrition">Сформировать</button>
                        </div>
                        <div class="report-type">
                            <div class="report-info">
                                <strong>Отчет по закупкам</strong>
                                <p>Заявки, расходы, поставщики</p>
                            </div>
                            <button class="btn btn-outline generate-report" data-type="purchases">Сформировать</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <h3>История отчетов</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Дата создания</th>
                                <th>Тип отчета</th>
                                <th>Формат</th>
                                <th>Размер</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        reportsHistory.forEach(report => {
            html += `
                <tr>
                    <td>${report.date}</td>
                    <td>${report.typeName}</td>
                    <td>${report.format}</td>
                    <td>${report.size}</td>
                    <td><button class="btn btn-sm btn-outline download-report" data-id="${report.id}">Скачать</button></td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = html;
        
        document.querySelectorAll('.generate-report').forEach(btn => {
            btn.addEventListener('click', function() {
                const reportType = this.dataset.type;
                let reportName = '';
                
                switch(reportType) {
                    case 'financial':
                        reportName = 'Финансовый отчет';
                        break;
                    case 'attendance':
                        reportName = 'Отчет по посещаемости';
                        break;
                    case 'nutrition':
                        reportName = 'Отчет по питанию';
                        break;
                    case 'purchases':
                        reportName = 'Отчет по закупкам';
                        break;
                }
                
                const now = new Date();
                const dateStr = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                const newReport = {
                    id: reportsHistory.length + 1,
                    date: dateStr,
                    type: reportType,
                    typeName: reportName,
                    format: 'PDF',
                    size: (Math.random() * 3 + 1).toFixed(1) + ' MB'
                };
                reportsHistory.push(newReport);
                
                renderReportsPage();
                alert(`Отчет "${reportName}" сформирован и добавлен в историю.`);
            });
        });
        
        document.querySelectorAll('.download-report').forEach(btn => {
            btn.addEventListener('click', function() {
                const reportId = parseInt(this.dataset.id);
                alert(`Скачивание отчета #${reportId}...`);
            });
        });
    }
    
    function showUsersPage() {
        pageTitle.textContent = 'Управление пользователями';
        pageSubtitle.textContent = 'Ученики, сотрудники и администраторы';
        
        renderUsersPage();
    }
    
    function renderUsersPage() {
        let html = `
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3 style="margin: 0; border-bottom: none; padding-bottom: 0;">Пользователи</h3>
                    <button class="btn btn-success" id="addUserBtn">+ Добавить пользователя</button>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ФИО</th>
                                <th>Email</th>
                                <th>Роль</th>
                                <th>Дополнительно</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        usersData.forEach(user => {
            let additional = '';
            if (user.role === 'student') {
                additional = `Класс: ${user.class}`;
            } else {
                additional = `Должность: ${user.position}`;
            }
            
            const statusBadge = user.status === 'active' 
                ? '<span class="status-badge status-approved">Активен</span>' 
                : '<span class="status-badge status-rejected">Неактивен</span>';
            
            html += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role === 'student' ? 'Ученик' : user.role === 'cook' ? 'Повар' : 'Администратор'}</td>
                    <td>${additional}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn btn-sm btn-outline edit-user" data-id="${user.id}">Редактировать</button>
                        ${user.status === 'active' 
                            ? `<button class="btn btn-sm btn-danger deactivate-user" data-id="${user.id}">Деактивировать</button>`
                            : `<button class="btn btn-sm btn-success activate-user" data-id="${user.id}">Активировать</button>`}
                    </td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="content-grid">
                <div class="card">
                    <h3>Статистика по пользователям</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">${usersData.filter(u => u.role === 'student').length}</div>
                            <div class="stat-label">Учеников</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${usersData.filter(u => u.role === 'cook').length}</div>
                            <div class="stat-label">Поваров</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${usersData.filter(u => u.role === 'admin').length}</div>
                            <div class="stat-label">Администраторов</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${usersData.length}</div>
                            <div class="stat-label">Всего</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contentContainer.innerHTML = html;
        

        document.getElementById('addUserBtn').addEventListener('click', showAddUserForm);
        
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.dataset.id);
                editUser(userId);
            });
        });
        

        document.querySelectorAll('.activate-user, .deactivate-user').forEach(btn => {
            btn.addEventListener('click', function() {
                const userId = parseInt(this.dataset.id);
                const action = this.classList.contains('activate-user') ? 'activate' : 'deactivate';
                
                if (confirm(`Вы уверены, что хотите ${action === 'activate' ? 'активировать' : 'деактивировать'} этого пользователя?`)) {
                    const user = usersData.find(u => u.id === userId);
                    if (user) {
                        user.status = action === 'activate' ? 'active' : 'inactive';
                        renderUsersPage();
                        alert(`Пользователь #${userId} ${action === 'activate' ? 'активирован' : 'деактивирован'}.`);
                    }
                }
            });
        });
    }
    
    function showSettingsPage() {
        pageTitle.textContent = 'Настройки';
        pageSubtitle.textContent = 'Настройки системы';
        
        contentContainer.innerHTML = `
            <div class="card">
                <h3>Общие настройки</h3>
                <p>Здесь будут настройки системы</p>
            </div>
        `;
    }
    

    
    function viewPaymentDetails(paymentId) {
        const payment = paymentData.find(p => p.id === paymentId);
        if (payment) {
            alert(`Детали платежа #${paymentId}\n\nСтатус: ${payment.status === 'success' ? 'Успешно' : payment.status === 'pending' ? 'В обработке' : 'Ошибка'}\nСумма: ${payment.amount} ₽\nСпособ оплаты: ${payment.method}\nДата: ${payment.date}\nУченик: ${payment.student} (${payment.class})`);
        }
    }
    
    function viewPurchaseRequest(requestId) {
        const request = PURCHASE_REQUESTS.find(r => r.id === requestId);
        if (!request) return;
        
        let itemsHtml = '';
        request.items.forEach(item => {
            itemsHtml += `\n• ${item.name} - ${item.quantity} ${item.unit}`;
        });
        
        let statusText = 'На рассмотрении';
        if (request.status === 'approved') {
            statusText = 'Согласовано';
        } else if (request.status === 'rejected') {
            statusText = 'Отклонено';
        }
        
        alert(`
Заявка на закупку #${request.id}
Дата: ${request.date}
Статус: ${statusText}
Сумма: ${request.total.toLocaleString()} ₽

Товары:${itemsHtml}

Повар: ${request.cookName}
        `);
    }
    
    function showAddUserForm() {

        const formHtml = `
            <div class="modal-overlay" id="userModal">
                <div class="modal">
                    <div class="modal-header">
                        <h3>Добавить нового пользователя</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>ФИО:</label>
                            <input type="text" id="userNameInput" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" id="userEmail" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Роль:</label>
                            <select id="userRole" class="form-control">
                                <option value="student">Ученик</option>
                                <option value="cook">Повар</option>
                                <option value="admin">Администратор</option>
                            </select>
                        </div>
                        <div class="form-group" id="additionalInfo">
                            <label>Класс:</label>
                            <input type="text" id="userClass" class="form-control" placeholder="10А">
                        </div>
                        <div class="form-group">
                            <label>Временный пароль:</label>
                            <input type="text" id="userPassword" class="form-control" value="password123">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary close-modal">Отмена</button>
                        <button class="btn btn-success" id="saveUserBtn">Сохранить</button>
                    </div>
                </div>
            </div>
        `;
        

        document.body.insertAdjacentHTML('beforeend', formHtml);
        

        document.getElementById('userRole').addEventListener('change', function() {
            const role = this.value;
            const additionalInfo = document.getElementById('additionalInfo');
            
            if (role === 'student') {
                additionalInfo.innerHTML = '<label>Класс:</label><input type="text" id="userClass" class="form-control" placeholder="10А">';
            } else {
                additionalInfo.innerHTML = '<label>Должность:</label><input type="text" id="userPosition" class="form-control" placeholder="Шеф-повар">';
            }
        });
        

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('userModal').remove();
            });
        });
        

        document.getElementById('saveUserBtn').addEventListener('click', function() {
            const name = document.getElementById('userNameInput').value;
            const email = document.getElementById('userEmail').value;
            const role = document.getElementById('userRole').value;
            
            if (!name || !email) {
                alert('Заполните обязательные поля: ФИО и Email.');
                return;
            }
            

            const newUser = {
                id: usersData.length + 1,
                name: name,
                email: email,
                role: role,
                status: 'active'
            };
            

            if (role === 'student') {
                newUser.class = document.getElementById('userClass')?.value || 'Не указан';
            } else {
                newUser.position = document.getElementById('userPosition')?.value || 'Сотрудник';
            }
            
            usersData.push(newUser);
            
            document.getElementById('userModal').remove();
            renderUsersPage(); 
            alert(`Пользователь "${name}" успешно добавлен!`);
        });
    }
    

    function editUser(userId) {
        const user = usersData.find(u => u.id === userId);
        if (!user) return;
        

        const formHtml = `
            <div class="modal-overlay" id="userModal">
                <div class="modal">
                    <div class="modal-header">
                        <h3>Редактировать пользователя</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>ФИО:</label>
                            <input type="text" id="userNameInput" class="form-control" value="${user.name}">
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" id="userEmail" class="form-control" value="${user.email}">
                        </div>
                        <div class="form-group">
                            <label>Роль:</label>
                            <select id="userRole" class="form-control">
                                <option value="student" ${user.role === 'student' ? 'selected' : ''}>Ученик</option>
                                <option value="cook" ${user.role === 'cook' ? 'selected' : ''}>Повар</option>
                                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Администратор</option>
                            </select>
                        </div>
                        <div class="form-group" id="additionalInfo">
                            ${user.role === 'student' 
                                ? `<label>Класс:</label><input type="text" id="userClass" class="form-control" value="${user.class || ''}">`
                                : `<label>Должность:</label><input type="text" id="userPosition" class="form-control" value="${user.position || ''}">`}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary close-modal">Отмена</button>
                        <button class="btn btn-success" id="saveUserBtn">Сохранить</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHtml);
        

        document.getElementById('userRole').addEventListener('change', function() {
            const role = this.value;
            const additionalInfo = document.getElementById('additionalInfo');
            
            if (role === 'student') {
                additionalInfo.innerHTML = '<label>Класс:</label><input type="text" id="userClass" class="form-control" placeholder="10А">';
            } else {
                additionalInfo.innerHTML = '<label>Должность:</label><input type="text" id="userPosition" class="form-control" placeholder="Шеф-повар">';
            }
        });
        
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                document.getElementById('userModal').remove();
            });
        });
        
        document.getElementById('saveUserBtn').addEventListener('click', function() {
            const name = document.getElementById('userNameInput').value;
            const email = document.getElementById('userEmail').value;
            const role = document.getElementById('userRole').value;
            
            if (!name || !email) {
                alert('Заполните обязательные поля: ФИО и Email.');
                return;
            }
            
            user.name = name;
            user.email = email;
            user.role = role;
            
            if (role === 'student') {
                user.class = document.getElementById('userClass')?.value || 'Не указан';
                delete user.position;
            } else {
                user.position = document.getElementById('userPosition')?.value || 'Сотрудник';
                delete user.class;
            }
            
            document.getElementById('userModal').remove();
            renderUsersPage();
            alert(`Данные пользователя #${userId} обновлены.`);
        });
    }
});