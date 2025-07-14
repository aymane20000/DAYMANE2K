// الخلفية المتحركة مع تغيير لون النقاط حسب الوضع
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

let circles = [];
const count = 40;

function createCircles() {
  circles = [];
  for (let i = 0; i < count; i++) {
    circles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    });
  }
}
createCircles();

function animate() {
  const body = document.body;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // الخلفية حسب الوضع
  if(body.classList.contains('light')){
    ctx.fillStyle = '#e6f2ff'; // لون فاتح
  } else if(body.classList.contains('dark-circles')){
    ctx.fillStyle = '#121212'; // داكن جدا
  } else {
    ctx.fillStyle = '#001f3f'; // افتراضي
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // لون النقاط حسب المتغير --circle-color
  let circleColor = getComputedStyle(body).getPropertyValue('--circle-color').trim() || '#00aaff';

  ctx.fillStyle = circleColor;

  circles.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    ctx.fill();

    c.x += c.dx;
    c.y += c.dy;

    if (c.x < 0 || c.x > canvas.width) c.dx *= -1;
    if (c.y < 0 || c.y > canvas.height) c.dy *= -1;
  });

  requestAnimationFrame(animate);
}
animate();


// مشغل الموسيقى
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playPause');
const volume = document.getElementById('volume');

window.addEventListener('load', () => {
  audio.volume = volume.value;
  // تشغيل تلقائي عند الدخول
  audio.play().catch(() => {
    // قد يرفض المتصفح التشغيل التلقائي بدون تفاعل المستخدم، فلا مشكلة
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  });
});

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// تبديل الوضع الليلي / الفاتح مع تغيير الخلفية والنقاط
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;

function updateToggleButton() {
  if (body.classList.contains('light')) {
    toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    // إزالة الوضع الرمادي للنقاط لو وضع فاتح
    body.classList.remove('dark-circles');
  } else {
    toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    // إضافة الوضع الرمادي للنقاط لو وضع داكن
    body.classList.add('dark-circles');
  }
}

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  body.classList.remove('dark-circles');
} else {
  body.classList.remove('light');
  body.classList.add('dark-circles');
}
updateToggleButton();

toggleThemeBtn.addEventListener('click', () => {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark-circles');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light');
    body.classList.remove('dark-circles');
    localStorage.setItem('theme', 'light');
  }
  updateToggleButton();
});
