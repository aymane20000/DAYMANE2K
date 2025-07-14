// إعداد خلفية متحركة بسيطة كدوائر صغيرة تتحرك بلطف
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const circles = [];
const numCircles = 30;

for (let i = 0; i < numCircles; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function draw() {
  ctx.fillStyle = '#001f3f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00aaff';
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fill();

    circle.x += circle.dx;
    circle.y += circle.dy;

    if (circle.x < 0 || circle.x > canvas.width) circle.dx *= -1;
    if (circle.y < 0 || circle.y > canvas.height) circle.dy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();

// مشغل الموسيقى
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playPause');
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume');

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = 'Pause';
  } else {
    audio.pause();
    playBtn.textContent = 'Play';
  }
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = audio.currentTime;
  progressBar.max = audio.duration || 0;
});

progressBar.addEventListener('input', () => {
  audio.currentTime = progressBar.value;
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});
