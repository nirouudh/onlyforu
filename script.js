// ==========================================
// ترتيب فيديوهات فترة الليل بدقة متناهية
// ==========================================

const nightVideos = [
  'assets/images/night/111.mp4',
  'assets/images/night/112.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/111.mp4',
  'assets/images/night/112.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/113.mp4',
  'assets/images/night/111.mp4',
  'assets/images/night/112.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/113.mp4',
  'assets/images/night/111.mp4',
  'assets/images/night/115.mp4',
  'assets/images/night/113.mp4',
  'assets/images/night/112.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/111.mp4',
  'assets/images/night/111.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/115.mp4',
  'assets/images/night/113.mp4',
  'assets/images/night/116.mp4',
  'assets/images/night/111.mp4',
  'assets/images/night/113.mp4',
  'assets/images/night/114.mp4',
  'assets/images/night/119.mp4',
  'assets/images/night/119.2.mp4',
  'assets/images/night/117.mp4',
  'assets/images/night/119.4.mp4',
  'assets/images/night/119.2.mp4',
  'assets/images/night/119.4.mp4',
  'assets/images/night/119.3.mp4',
  'assets/images/night/118.mp4',
  'assets/images/night/119.4.mp4',
  'assets/images/night/119.2.mp4',
  'assets/images/night/119.1.mp4'
];

let currentVideoIndex = 0;
let activeVideoTag = 'A';
let isTransitioning = false;

const videoA = document.getElementById('video-a');
const videoB = document.getElementById('video-b');

// تجهيز الفيديو التالي مسبقاً في الخلفية ليكون جاهزاً قبل نهاية الحالي
function preloadNextVideo(nextIndex) {
  const standbyVid = activeVideoTag === 'A' ? videoB : videoA;
  standbyVid.src = nightVideos[nextIndex];
  standbyVid.load();
}

// تنفيذ التداخل الناعم قبل انتهاء الفيديو الحالي
function triggerCrossFade() {
  if (isTransitioning) return;
  isTransitioning = true;

  const currentVid = activeVideoTag === 'A' ? videoA : videoB;
  const nextVid    = activeVideoTag === 'A' ? videoB : videoA;

  nextVid.play().then(() => {
    nextVid.classList.add('active');
    currentVid.classList.remove('active');

    activeVideoTag = activeVideoTag === 'A' ? 'B' : 'A';
    currentVideoIndex = (currentVideoIndex + 1) % nightVideos.length;

    // بعد انتهاء التلاشي (0.6 ثانية)، نوقف القديم ونجهز الفيديو الذي يليه مسبقاً
    setTimeout(() => {
      currentVid.pause();
      isTransitioning = false;
      const upcomingIndex = (currentVideoIndex + 1) % nightVideos.length;
      preloadNextVideo(upcomingIndex);
    }, 650);
  }).catch(() => {
    isTransitioning = false;
  });
}

// مراقبة الوقت المتبقي في الفيديو النشط لبدء التداخل قبل النهاية بـ 0.6 ثانية
function checkVideoProgress(e) {
  const vid = e.target;
  const isCurrentActive = (activeVideoTag === 'A' && vid === videoA) || (activeVideoTag === 'B' && vid === videoB);
  
  if (!isCurrentActive || isTransitioning || !vid.duration) return;

  const timeRemaining = vid.duration - vid.currentTime;
  if (timeRemaining <= 0.6) {
    triggerCrossFade();
  }
}

videoA.addEventListener('timeupdate', checkVideoProgress);
videoB.addEventListener('timeupdate', checkVideoProgress);

// احتياط إضافي في حال انتهى مقطع قصير جداً فجأة
videoA.addEventListener('ended', triggerCrossFade);
videoB.addEventListener('ended', triggerCrossFade);

// بدء التشغيل الأول وتجهيز المقطع الثاني فوراً
window.addEventListener('DOMContentLoaded', () => {
  videoA.src = nightVideos[0];
  videoA.load();
  videoA.play();
  preloadNextVideo(1);
});

// ==========================================
// العداد التنازلي لعيد الميلاد (2 مارس)
// ==========================================
const BIRTHDAY_MONTH = 2; 
const BIRTHDAY_DAY = 2;   

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
