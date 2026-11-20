// ==========================================
// ترتيب فيديوهات فترة الليل بدقة متناهية
// ==========================================

const nightVideos = [
  'assets/videos/night/111.mp4',   // 0
  'assets/videos/night/112.mp4',   // 1
  'assets/videos/night/116.mp4',   // 2
  'assets/videos/night/111.mp4',   // 3
  'assets/videos/night/112.mp4',   // 4
  'assets/videos/night/116.mp4',   // 5
  'assets/videos/night/113.mp4',   // 6
  'assets/videos/night/111.mp4',   // 7
  'assets/videos/night/112.mp4',   // 8
  'assets/videos/night/116.mp4',   // 9
  'assets/videos/night/113.mp4',   // 10
  'assets/videos/night/111.mp4',   // 11
  'assets/videos/night/115.mp4',   // 12 <-- الفيديو الأول 115 (تظهر فيه المحادثة)
  'assets/videos/night/113.mp4',   // 13
  'assets/videos/night/112.mp4',   // 14
  'assets/videos/night/116.mp4',   // 15
  'assets/videos/night/111.mp4',   // 16
  'assets/videos/night/111.mp4',   // 17
  'assets/videos/night/116.mp4',   // 18
  'assets/videos/night/116.mp4',   // 19
  'assets/videos/night/115.mp4',   // 20 <-- الفيديو الثاني 115 (لن تتكرر فيه المحادثة)
  'assets/videos/night/113.mp4',   // 21
  'assets/videos/night/116.mp4',   // 22
  'assets/videos/night/111.mp4',   // 23
  'assets/videos/night/113.mp4',   // 24
  'assets/videos/night/114.mp4',   // 25
  'assets/videos/night/119.mp4',   // 26
  'assets/videos/night/119.2.mp4', // 27
  'assets/videos/night/117.mp4',   // 28
  'assets/videos/night/119.4.mp4', // 29
  'assets/videos/night/119.2.mp4', // 30
  'assets/videos/night/119.4.mp4', // 31
  'assets/videos/night/119.3.mp4', // 32
  'assets/videos/night/118.mp4',   // 33
  'assets/videos/night/119.4.mp4', // 34
  'assets/videos/night/119.2.mp4', // 35
  'assets/videos/night/119.1.mp4'  // 36
];

let currentVideoIndex = 0;
let activeVideoTag = 'A';

const videoA = document.getElementById('video-a');
const videoB = document.getElementById('video-b');

// ==========================================
// نظام فقاعات المحادثة الديناميكي المستقل (iMessage)
// ==========================================
const chatOverlay = document.getElementById('chat-overlay');
let isConversationRunning = false;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// دالة إخفاء فقاعة واحدة بنعومة وإزالتها من الشاشة
function dismissBubble(bubble) {
  if (!bubble || !bubble.parentNode || bubble.classList.contains('fade-out')) return;
  
  if (bubble.hideTimer) {
    clearTimeout(bubble.hideTimer);
    bubble.hideTimer = null;
  }

  bubble.classList.add('fade-out');
  setTimeout(() => {
    if (bubble.parentNode) bubble.remove();
  }, 450);
}

// شبكة الأمان البصرية: منع تجاوز 3 فقاعات في الأعلى عند تتابع الرسائل الكثيرة
function enforceMaxVisibleBubbles(maxCount = 3) {
  const activeBubbles = Array.from(
    chatOverlay.querySelectorAll('.chat-bubble:not(.fade-out)')
  );

  while (activeBubbles.length >= maxCount) {
    const oldest = activeBubbles.shift();
    dismissBubble(oldest);
  }
}

// عرض رسالة واحدة بمؤقت مستقل خاص بها
async function showSingleMessage(sender, text) {
  // التأكد من عدم وجود أكثر من 3 فقاعات قبل إضافة الفقاعة الجديدة
  enforceMaxVisibleBubbles(3);

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatOverlay.appendChild(bubble);

  requestAnimationFrame(() => {
    bubble.classList.add('visible');
  });

  // مدة ظهور النقاط الثلاث (...) قبل كل رسالة: 3 ثوانٍ بالضبط
  await wait(3000);

  // استبدال النقاط بالنص الفعلي
  bubble.textContent = text;

  // بدء المؤقت المستقل لهذه الرسالة وحدها: تختفي بعد 6 ثوانٍ من ظهور نصّها
  bubble.hideTimer = setTimeout(() => {
    dismissBubble(bubble);
  }, 6000);
}

// تشغيل تسلسل محادثة كاملة
async function playConversationSequence(messages) {
  if (isConversationRunning) return;
  isConversationRunning = true;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    await showSingleMessage(msg.sender, msg.text);
  }

  isConversationRunning = false;
}

// التحقق من رقم الفيديو لتشغيل المحادثات المخصصة
function checkVideoConversations(index) {
  // الفيديو الأول المسمى 115.mp4 يقع في الترتيب index === 12
  if (index === 12) {
    playConversationSequence([
      { sender: 'character', text: 'n3ast' },
      { sender: 'character', text: 'bon8' }
    ]);
  }
}

// ==========================================
// محرك التبديل بين الفيديوهات
// ==========================================

function playVideo(videoSrc, index) {
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

    checkVideoConversations(index);
  };
}

function handleVideoEnded() {
  currentVideoIndex = (currentVideoIndex + 1) % nightVideos.length;
  playVideo(nightVideos[currentVideoIndex], currentVideoIndex);
}

videoA.addEventListener('ended', handleVideoEnded);
videoB.addEventListener('ended', handleVideoEnded);

window.addEventListener('DOMContentLoaded', () => {
  playVideo(nightVideos[0], 0);
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
