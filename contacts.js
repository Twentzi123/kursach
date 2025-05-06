    
        const modal = document.getElementById('applicationModal');
        const openBtn = document.getElementById('openFormBtn');
        const closeBtn = document.querySelector('.close-btn');
        const form = document.getElementById('applicationForm');

        // Открываем окно
        openBtn.addEventListener('click', function() {
            modal.style.display = 'flex';
        });

        // Закрываем окно
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Обработка формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            modal.style.display = 'none';
            form.reset();
        });