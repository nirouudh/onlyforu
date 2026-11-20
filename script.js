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
// نظام فقاعات المحادثة الديناميكي (iMessage)
// ==========================================
const chatOverlay = document.getElementById('chat-overlay');
let lastMessageTimestamp = 0;
let autoHideTimer = null;
let isConversationRunning = false;

// دالة مساعدة للانتظار
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// إخفاء جميع الفقاعات بهدوء بعد انتهاء المحادثة
function scheduleChatAutoHide(delayMs = 3500) {
  if (autoHideTimer) clearTimeout(autoHideTimer);
  autoHideTimer = setTimeout(() => {
    const bubbles = chatOverlay.querySelectorAll('.chat-bubble');
    bubbles.forEach(b => b.classList.add('fade-out'));
    setTimeout(() => {
      chatOverlay.innerHTML = '';
    }, 450);
  }, delayMs);
}

// إزالة أقدم فقاعة إذا زاد العدد عن 3 فقاعات
function enforceMaxBubbles(maxCount = 3) {
  const bubbles = Array.from(chatOverlay.querySelectorAll('.chat-bubble:not(.fade-out)'));
  if (bubbles.length >= maxCount) {
    const oldest = bubbles[0];
    oldest.classList.add('fade-out');
    setTimeout(() => {
      if (oldest.parentNode) oldest.remove();
    }, 450);
  }
}

// عرض رسالة واحدة مع مؤشر الكتابة (...) حسب القواعد
async function showSingleMessage(sender, text) {
  if (autoHideTimer) clearTimeout(autoHideTimer);

  const now = Date.now();
  const timeSinceLast = now - lastMessageTimestamp;
  
  // إذا مر أكثر من 10 ثوانٍ فهي محادثة جديدة -> 3 ثوانٍ نقاط، وإلا -> 1 ثانية نقاط
  const typingDuration = (lastMessageTimestamp === 0 || timeSinceLast > 10000) ? 3000 : 1000;

  enforceMaxBubbles(3);

  // إنشاء فقاعة مؤشر الكتابة (...)
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`; // 'character' (رمادي يسار) أو 'user' (أزرق يمين)
  bubble.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatOverlay.appendChild(bubble);

  // تفعيل حركة الظهور الناعم
  requestAnimationFrame(() => {
    bubble.classList.add('visible');
  });

  // الانتظار حسب مدة الكتابة (3 ثوانٍ أو 1 ثانية)
  await wait(typingDuration);

  // استبدال النقاط بالنص الفعلي وتمدد الفقاعة تلقائياً
  bubble.textContent = text;
  lastMessageTimestamp = Date.now();
}

// تشغيل تسلسل محادثة كاملة
async function playConversationSequence(messages) {
  if (isConversationRunning) return;
  isConversationRunning = true;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    await showSingleMessage(msg.sender, msg.text);
  }

  // عند انتهاء آخر رسالة في المحادثة: تختفي بعد 3.5 ثوانٍ
  scheduleChatAutoHide(3500);
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

    // فحص ما إذا كان لهذا الفيديو محادثة مخصصة
    checkVideoConversations(index);
  };
}

// الانتقال للمقطع التالي تلقائياً عند انتهاء المقطع الحالي بالترتيب المحدد
function handleVideoEnded() {
  currentVideoIndex = (currentVideoIndex + 1) % nightVideos.length;
  playVideo(nightVideos[currentVideoIndex], currentVideoIndex);
}

videoA.addEventListener('ended', handleVideoEnded);
videoB.addEventListener('ended', handleVideoEnded);

// بدء تشغيل أول مقطع عند تحميل الصفحة
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
