// // Моковые пользователи
// const USERS = {
//     'ivanov@school.ru': { 
//         password: '123', 
//         role: 'student', 
//         name: 'UserName',
//         class: '10А',
//         allergies: ['Молоко', 'Орехи']
//     },
//     'cook@school.ru': { 
//         password: '123', 
//         role: 'cook', 
//         name: 'UserName',
//         position: 'Шеф-повар'
//     },
//     'admin@school.ru': { 
//         password: '123', 
//         role: 'admin', 
//         name: 'UserName',
//         position: 'Директор'
//     }
// };

// document.addEventListener('DOMContentLoaded', function() {
//     const roleButtons = document.querySelectorAll('.role-btn');
//     const loginForm = document.getElementById('loginForm');
//     const loginInput = document.getElementById('login');
//     const passwordInput = document.getElementById('password');
    
//     // Обработка выбора роли
//     roleButtons.forEach(btn => {
//         btn.addEventListener('click', function() {
//             roleButtons.forEach(b => b.classList.remove('active'));
//             this.classList.add('active');
//         });
//     });
    
//     // Обработка формы входа
//     loginForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         const selectedRole = document.querySelector('.role-btn.active').dataset.role;
//         const login = loginInput.value.trim();
//         const password = passwordInput.value;
        
//         // Проверка пользователя
//         if (USERS[login] && USERS[login].password === password && USERS[login].role === selectedRole) {
//             // Сохраняем данные пользователя в sessionStorage
//             sessionStorage.setItem('currentUser', JSON.stringify({
//                 email: login,
//                 ...USERS[login]
//             }));
            
//             // Перенаправляем на соответствующую страницу
//             switch(selectedRole) {
//                 case 'student':
//                     window.location.href = 'student.html';
//                     break;
//                 case 'cook':
//                     window.location.href = 'povar.html';
//                     break;
//                 case 'admin':
//                     window.location.href = 'admin.html';
//                     break;
//             }
//         } else {
//             alert('Ошибка входа. Проверьте логин, пароль и выбранную роль.');
//         }
//     });
    

// });