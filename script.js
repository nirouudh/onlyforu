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
let autoHideTimer = null;
let isConversationRunning = false;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 1. إخفاء جميع الفقاعات بعد 6 ثوانٍ إذا كانت هذه آخر رسالة في المحادثة
function scheduleChatAutoHide(delayMs = 6000) {
  if (autoHideTimer) clearTimeout(autoHideTimer);
  autoHideTimer = setTimeout(() => {
    const bubbles = chatOverlay.querySelectorAll('.chat-bubble:not(.fade-out)');
    bubbles.forEach(b => {
      b.classList.add('fade-out');
      setTimeout(() => {
        if (b.parentNode) b.remove();
      }, 450);
    });
  }, delayMs);
}

// 2. إذا ظهرت 3 رسائل أخرى تحت رسالة سابقة، تنتظر 6 ثوانٍ ثم تختفي بهدوء
function scheduleOverflowRemoval() {
  const activeBubbles = Array.from(
    chatOverlay.querySelectorAll('.chat-bubble:not(.fade-out):not(.scheduled-removal)')
  );

  // وجود أكثر من 3 فقاعات يعني أن أقدم فقاعة أصبح تحتها 3 رسائل أخرى
  if (activeBubbles.length > 3) {
    const oldest = activeBubbles[0];
    oldest.classList.add('scheduled-removal');

    setTimeout(() => {
      if (oldest.parentNode && !oldest.classList.contains('fade-out')) {
        oldest.classList.add('fade-out');
        setTimeout(() => {
          if (oldest.parentNode) oldest.remove();
        }, 450);
      }
    }, 6000);
  }
}

// 3. عرض رسالة واحدة مع مؤشر الكتابة (...) لمدة 3 ثوانٍ دائماً قبل كل رسالة
async function showSingleMessage(sender, text) {
  if (autoHideTimer) clearTimeout(autoHideTimer);

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  chatOverlay.appendChild(bubble);

  // فحص ما إذا أصبح تحت الرسالة الأولى 3 رسائل أخرى لجدولة إخفائها بعد 6 ثوانٍ
  scheduleOverflowRemoval();

  requestAnimationFrame(() => {
    bubble.classList.add('visible');
  });

  // مدة النقاط الثلاث قبل كل رسالة: 3 ثوانٍ بالضبط
  await wait(3000);

  bubble.textContent = text;
}

// تشغيل تسلسل محادثة كاملة
async function playConversationSequence(messages) {
  if (isConversationRunning) return;
  isConversationRunning = true;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    await showSingleMessage(msg.sender, msg.text);
  }

  // عند انتهاء آخر رسالة في المحادثة: تبقى 6 ثوانٍ ثم تختفي
  scheduleChatAutoHide(6000);
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
