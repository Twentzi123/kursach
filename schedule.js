document.addEventListener('DOMContentLoaded', function() {
  loadSchedule();
});

function loadSchedule() {
  // Проверка на расписание на странице
  const existingSchedule = document.querySelector('.div_for_text .text_1');
  if (existingSchedule) return;

  // Загрузка XML и XSLT
  Promise.all([
    fetch('data/schedule.xml').then(response => response.text()),
    fetch('data/schedule.xsl').then(response => response.text())
  ])
  .then(([xmlData, xslData]) => {
    // Парсим XML и XSLT
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
    const xslDoc = parser.parseFromString(xslData, 'application/xml');
    
    // Создаем процессор XSLT
    const processor = new XSLTProcessor();
    processor.importStylesheet(xslDoc);
    
    // Преобразуем XML с помощью XSLT
    const resultFragment = processor.transformToFragment(xmlDoc, document);
    
    // Находим место для вставки
    const textDivs = document.querySelectorAll('.text > .div_for_text');
    if (textDivs.length > 0) {
      textDivs[0].parentNode.insertBefore(resultFragment, textDivs[0]);
    } else {
      // Если не нашли, вставляем в конец .text
      const textContainer = document.querySelector('.text');
      if (textContainer) {
        textContainer.appendChild(resultFragment);
      }
    }
  })
  .catch(error => {
    console.error('Error loading schedule:', error);
    // Фолбэк - вставляем статический HTML, если XML/XSLT не загрузились
    const fallbackHTML = `
      <div class="div_for_text">
        <div class="text_1">
          <h2>Расписание занятий</h2>
        </div>
        <p class="p1">МЫ ПРЕДЛАГАЕМ СЛЕДУЮЩИЕ ВРЕМЕНА ЗАНЯТИЙ ДЛЯ ВАШЕГО УДОБСТВА.</p>
        <p class="p1">КРОССФИТ: ПОНЕДЕЛЬНИК, ВТОРНИК, СРЕДА, ПЯТНИЦА – 4:45, 5:45, 8:00, 9:00, 12:00, 15:30, 16:45 и 18:00.</p>
        <p class="p1">ДЕТСКИЙ КРОССФИТ: ПОНЕДЕЛЬНИК, СРЕДА, ПЯТНИЦА – 9:00, 10:00, 15:30.</p>
        <p class="p1">ЙОГА: ТОЛЬКО ПО ПРЕДВАРИТЕЛЬНОЙ ЗАПИСИ!!! ЧЕТВЕРГ – 7:30, 9:00.</p>
        <p class="p1">ЗУМБА: ЧЕТВЕРГ – 17:30, СУББОТА – 8:00.</p>
        <p class="p1">Часы работы в выходные: Суббота – 8:00 Зумба, 8:30 Парная тренировка.</p>
      </div>
    `;
    const textContainer = document.querySelector('.text');
    if (textContainer) {
      textContainer.insertAdjacentHTML('afterbegin', fallbackHTML);
    }
  });
}