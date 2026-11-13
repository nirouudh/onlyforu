// ==========================================
// ترتيب فيديوهات فترة الليل بدقة متناهية
// ==========================================

const nightVideos = [
  'assets/videos/night/111.mp4',
  'assets/videos/night/112.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/111.mp4',
  'assets/videos/night/112.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/113.mp4',
  'assets/videos/night/111.mp4',
  'assets/videos/night/112.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/113.mp4',
  'assets/videos/night/111.mp4',
  'assets/videos/night/115.mp4',
  'assets/videos/night/113.mp4',
  'assets/videos/night/112.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/111.mp4',
  'assets/videos/night/111.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/115.mp4',
  'assets/videos/night/113.mp4',
  'assets/videos/night/116.mp4',
  'assets/videos/night/111.mp4',
  'assets/videos/night/113.mp4',
  'assets/videos/night/114.mp4',
  'assets/videos/night/119.mp4',
  'assets/videos/night/119.2.mp4',
  'assets/videos/night/117.mp4',
  'assets/videos/night/119.4.mp4',
  'assets/videos/night/119.2.mp4',
  'assets/videos/night/119.4.mp4',
  'assets/videos/night/119.3.mp4',
  'assets/videos/night/118.mp4',
  'assets/videos/night/119.4.mp4',
  'assets/videos/night/119.2.mp4',
  'assets/videos/night/119.1.mp4'
];

let currentVideoIndex = 0;
let activeVideoTag = 'A';

const videoA = document.getElementById('video-a');
const videoB = document.getElementById('video-b');

// ==========================================
// محرك التبديل الناعم السريع (Cross-Fade)
// ==========================================

function playVideo(videoSrc) {
  const currentVid = activeVideoTag === 'A' ? videoA : videoB;
  const nextVid    = activeVideoTag === 'A' ? videoB : videoA;

  nextVid.src = videoSrc;
  nextVid.load();

  nextVid.oncanplaythrough = () => {
    nextVid.play();
    nextVid.classList.add('active');
    currentVid.classList.remove('active');
    activeVideoTag = activeVideoTag === 'A' ? 'B' : 'A';
    nextVid.oncanplaythrough = null;
  };
}

// الانتقال للمقطع التالي تلقائياً عند انتهاء المقطع الحالي بالترتيب المحدد
function handleVideoEnded() {
  currentVideoIndex = (currentVideoIndex + 1) % nightVideos.length;
  playVideo(nightVideos[currentVideoIndex]);
}

videoA.addEventListener('ended', handleVideoEnded);
videoB.addEventListener('ended', handleVideoEnded);

// بدء تشغيل أول مقطع عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  playVideo(nightVideos[0]);
});

// ==========================================
// العداد التنازلي لعيد الميلاد (2 مارس)
// ==========================================
const BIRTHDAY_MONTH = 2; // مارس
const BIRTHDAY_DAY = 2;   // 2 مارس

function getNextBirthdayDate() {
  const now = new Date();
  let targetYear = now.getFullYear();
  let nextBirthday = new Date(targetYear, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);

  if (now > nextBirthday) {
    nextBirthday = new Date(targetYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
  }
  return nextBirthday;
}

function updateCountdown() {
  const now = new Date();
  const targetDate = getNextBirthdayDate();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("timer").innerText = "عيد ميلاد سعيد! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const timerElement = document.getElementById('timer');
  if (timerElement) {
    const d = String(days).padStart(2, '0');
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    timerElement.innerText = `${d} يوم : ${h} ساعة : ${m} دقيقة : ${s} ثانية`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
