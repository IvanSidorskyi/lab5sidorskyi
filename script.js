// 1. Інфа про браузер у localStorage
const userInfo = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language
};
localStorage.setItem('userInfo', JSON.stringify(userInfo, null, 2));

const footer = document.getElementById('footer-info');
footer.innerText = "Ваш пристрій: " + JSON.stringify(userInfo, null, 2);

// 2. Завантаження коментарів
fetch('https://jsonplaceholder.typicode.com/posts/15/comments')
  .then(res => res.json())
  .then(comments => {
    const commentBlock = document.getElementById('comments');
    comments.forEach(comment => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p><hr>`;
      commentBlock.appendChild(div);
    });
  });

// 3. Модальне вікно
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');

// Показати модальне вікно через 1 хвилину (після заходу)
setTimeout(() => {
  modal.style.display = 'block';
}, 60000);

// Закриття вікна
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';

  // Повторно показати через 1 хвилину
  setTimeout(() => {
    modal.style.display = 'block';
  }, 60000);
});


// 4. Теми
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Часова логіка
const now = new Date();
const hour = now.getHours();
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  setTheme(savedTheme);
} else {
  const autoTheme = (hour >= 7 && hour < 21) ? 'light' : 'dark';
  setTheme(autoTheme);
}

// Кнопка перемикача
toggleBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});
