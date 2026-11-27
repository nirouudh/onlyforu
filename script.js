// ==========================================
// 1. ترتيب فيديوهات فترة الليل (37 فيديو: 0 -> 36)
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
  'assets/videos/night/115.mp4',   // 12 <-- الفيديو الأول 115 (محادثة الليل)
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

// ==========================================
// 2. ترتيب فيديوهات فترة الصباح (44 فيديو: 0 -> 43)
// ==========================================
const morningVideos = [
  'assets/videos/morning/148.mp4', // 0
  'assets/videos/morning/134.mp4', // 1
  'assets/videos/morning/150.mp4', // 2
  'assets/videos/morning/151.mp4', // 3  <-- المحادثة 1 (أزرق: wech raki diri ?)
  'assets/videos/morning/133.mp4', // 4  <-- المحادثة 1 (رمادي: nakol fl fraises)
  'assets/videos/morning/147.mp4', // 5
  'assets/videos/morning/148.mp4', // 6
  'assets/videos/morning/145.mp4', // 7
  'assets/videos/morning/140.mp4', // 8
  'assets/videos/morning/131.mp4', // 9
  'assets/videos/morning/144.mp4', // 10
  'assets/videos/morning/143.mp4', // 11
  'assets/videos/morning/142.mp4', // 12
  'assets/videos/morning/151.mp4', // 13
  'assets/videos/morning/135.mp4', // 14
  'assets/videos/morning/150.mp4', // 15 <-- المحادثة 2 (أزرق: matensich tchrbi lma lyoumm)
  'assets/videos/morning/146.mp4', // 16 <-- المحادثة 2 (رمادي: ma nchrbch amchi)
  'assets/videos/morning/137.mp4', // 17
  'assets/videos/morning/142.mp4', // 18
  'assets/videos/morning/141.mp4', // 19
  'assets/videos/morning/135.mp4', // 20
  'assets/videos/morning/157.mp4', // 21
  'assets/videos/morning/160.mp4', // 22
  'assets/videos/morning/161.mp4', // 23 <-- بداية مجال المحادثة 3
  'assets/videos/morning/158.mp4', // 24 <-- المحادثة 3 (1/7 - أزرق)
  'assets/videos/morning/160.mp4', // 25 <-- المحادثة 3 (2/7 - رمادي)
  'assets/videos/morning/164.mp4', // 26 <-- المحادثة 3 (3/7 - أزرق)
  'assets/videos/morning/165.mp4', // 27 <-- المحادثة 3 (4/7 - رمادي)
  'assets/videos/morning/161.mp4', // 28 <-- المحادثة 3 (5/7 - أزرق)
  'assets/videos/morning/160.mp4', // 29 <-- المحادثة 3 (6/7 - رمادي)
  'assets/videos/morning/162.mp4', // 30 <-- المحادثة 3 (7/7 - أزرق: douaa 🙂 - نقطة الارتكاز)
  'assets/videos/morning/163.mp4', // 31
  'assets/videos/morning/159.mp4', // 32
  'assets/videos/morning/166.mp4', // 33
  'assets/videos/morning/138.mp4', // 34
  'assets/videos/morning/151.mp4', // 35
  'assets/videos/morning/136.mp4', // 36 <-- المحادثة 4 (رمادي: kraht , ha ndir make up)
  'assets/videos/morning/145.mp4', // 37
  'assets/videos/morning/152.mp4', // 38
  'assets/videos/morning/153.mp4', // 39
  'assets/videos/morning/154.mp4', // 40
  'assets/videos/morning/155.mp4', // 41
  'assets/videos/morning/153.mp4', // 42
  'assets/videos/morning/156.mp4'  // 43
];

// ==========================================
// 3. ترتيب فيديوهات فترة المساء (39 فيديو: 0 -> 38)
// ==========================================
const eveningVideos = [
  'assets/videos/evening/1.mp4',  // 0
  'assets/videos/evening/3.mp4',  // 1
  'assets/videos/evening/2.mp4',  // 2
  'assets/videos/evening/5.mp4',  // 3
  'assets/videos/evening/3.mp4',  // 4
  'assets/videos/evening/4.mp4',  // 5
  'assets/videos/evening/5.mp4',  // 6
  'assets/videos/evening/2.mp4',  // 7
  'assets/videos/evening/2.mp4',  // 8
  'assets/videos/evening/6.mp4',  // 9  <-- بداية الأغنية (Fade-In خلال 6 ثوانٍ)
  'assets/videos/evening/10.mp4', // 10
  'assets/videos/evening/11.mp4', // 11
  'assets/videos/evening/15.mp4', // 12
  'assets/videos/evening/13.mp4', // 13
  'assets/videos/evening/12.mp4', // 14
  'assets/videos/evening/7.mp4',  // 15
  'assets/videos/evening/8.mp4',  // 16
  'assets/videos/evening/9.mp4',  // 17
  'assets/videos/evening/15.mp4', // 18
  'assets/videos/evening/16.mp4', // 19
  'assets/videos/evening/14.mp4', // 20
  'assets/videos/evening/12.mp4', // 21
  'assets/videos/evening/13.mp4', // 22
  'assets/videos/evening/15.mp4', // 23
  'assets/videos/evening/12.mp4', // 24
  'assets/videos/evening/10.mp4', // 25
  'assets/videos/evening/11.mp4', // 26
  'assets/videos/evening/13.mp4', // 27
  'assets/videos/evening/12.mp4', // 28
  'assets/videos/evening/10.mp4', // 29
  'assets/videos/evening/11.mp4', // 30
  'assets/videos/evening/17.mp4', // 31 <-- نهاية الأغنية (Fade-Out خلال 6 ثوانٍ قبل النهاية)
  'assets/videos/evening/2.mp4',  // 32
  'assets/videos/evening/5.mp4',  // 33
  'assets/videos/evening/3.mp4',  // 34
  'assets/videos/evening/4.mp4',  // 35
  'assets/videos/evening/2.mp4',  // 36
  'assets/videos/evening/2.mp4',  // 37
  'assets/videos/evening/18.mp4'  // 38
];

// ==========================================
// قائمة أغاني المساء العشوائية (ضع أسماء ملفاتك هنا)
// ==========================================
const eveningSongs = [
  'assets/audio/song1.mp3',
  'assets/audio/song2.mp3',
  'assets/audio/song3.mp3',
  'assets/audio/song4.mp3'
];

// إعدادات توقيت وتلاشي موسيقى المساء
const EVENING_MUSIC_START_INDEX = 9;   // الفهرس 9 = الفيديو 6.mp4
const EVENING_MUSIC_END_INDEX   = 31;  // الفهرس 31 = الفيديو 17.mp4
const FADE_DURATION_SEC         = 6.0; // مدة التلاشي التصاعدي والتنازلي (6 ثوانٍ)

// هيكل الفترات المتعاقبة
const phases = [
  { name: 'night',   videos: nightVideos },
  { name: 'morning', videos: morningVideos },
  { name: 'evening', videos: eveningVideos }
];

// محادثات الصباح (مربوطة بالفهرس الذي يظهر النص مع بدايته)
const morningTriggers = {
  // المحادثة الأولى
  3:  { sender: 'user',      text: 'wech raki diri ?' },
  4:  { sender: 'character', text: 'nakol fl fraises' },

  // المحادثة الثانية
  15: { sender: 'user',      text: 'matensich tchrbi lma lyoumm' },
  16: { sender: 'character', text: 'ma nchrbch amchi' },

  // المحادثة الثالثة (محصورة بين 23 و 30 + استثناء عدم الحذف بالتراكم)
  24: { sender: 'user',      text: 'hii , can u guess what i am thinking about', allowStack: true },
  25: { sender: 'character', text: 'balak',                                     allowStack: true },
  26: { sender: 'user',      text: 'haya khammi',                               allowStack: true },
  27: { sender: 'character', text: 'hada object wela makla',                   allowStack: true },
  28: { sender: 'user',      text: 'haja 7louwa , tebda bl d',                  allowStack: true },
  29: { sender: 'character', text: 'emmm maerftch , blk donuts ?',              allowStack: true },
  30: { sender: 'user',      text: 'douaa 🙂',                                  allowStack: true },

  // المحادثة الرابعة
  36: { sender: 'character', text: 'kraht , ha ndir make up' }
};

let currentPhaseIndex = 0; // 0 = الليل | 1 = الصباح | 2 = المساء
let currentVideoIndex = 0;
let activeVideoTag = 'A';
let preTriggeredKeys = new Set();
let exactTriggeredKeys = new Set();
let preloadedSrc = '';
let isTransitioning = false;

const videoA = document.getElementById('video-a');
const videoB = document.getElementById('video-b');

// ==========================================
// محرك موسيقى المساء المتزامن (Fade-In / Fade-Out / Random)
// ==========================================
const eveningAudio = document.getElementById('evening-audio');
const audioToggleBtn = document.getElementById('audio-toggle');
let isAudioMuted = false;
let isMusicSessionActive = false;
let isFadingOut = false;
let audioFadeInterval = null;
let lastPlayedSongIndex = -1;

// زر كتم/تشغيل الصوت
if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isAudioMuted = !isAudioMuted;
    eveningAudio.muted = isAudioMuted;
    audioToggleBtn.textContent = isAudioMuted ? '🔇' : '🔊';
  });
}

// فتح قفل الصوت في متصفحات الهواتف عند أول لمسة للشاشة
function unlockAudioOnInteraction() {
  if (isMusicSessionActive && eveningAudio.paused && !isAudioMuted) {
    eveningAudio.play().catch(() => {});
  }
}
document.addEventListener('touchstart', unlockAudioOnInteraction, { passive: true });
document.addEventListener('click', unlockAudioOnInteraction, { passive: true });

// اختيار أغنية عشوائية دون تكرار الأغنية السابقة مباشرة
function pickRandomSong() {
  if (!eveningSongs || eveningSongs.length === 0) return null;
  if (eveningSongs.length === 1) return eveningSongs[0];

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * eveningSongs.length);
  } while (randomIndex === lastPlayedSongIndex);

  lastPlayedSongIndex = randomIndex;
  return eveningSongs[randomIndex];
}

// تلاشي تصاعدي للصوت من 0 إلى 1 خلال 6 ثوانٍ
function fadeInMusic(durationSec = FADE_DURATION_SEC) {
  clearInterval(audioFadeInterval);
  isFadingOut = false;
  eveningAudio.volume = 0;

  const stepMs = 100;
  const totalSteps = (durationSec * 1000) / stepMs;
  const volumeStep = 1.0 / totalSteps;

  audioFadeInterval = setInterval(() => {
    if (eveningAudio.volume + volumeStep < 1.0) {
      eveningAudio.volume = Math.min(1.0, eveningAudio.volume + volumeStep);
    } else {
      eveningAudio.volume = 1.0;
      clearInterval(audioFadeInterval);
    }
  }, stepMs);
}

// تلاشي تنازلي للصوت من المستوى الحالي إلى 0 خلال 6 ثوانٍ
function fadeOutMusic(durationSec = FADE_DURATION_SEC) {
  if (isFadingOut || !isMusicSessionActive) return;
  isFadingOut = true;
  clearInterval(audioFadeInterval);

  const startVolume = eveningAudio.volume;
  if (startVolume <= 0 || eveningAudio.paused) {
    stopEveningMusicImmediate();
    return;
  }

  const stepMs = 100;
  const totalSteps = Math.max(1, (durationSec * 1000) / stepMs);
  const volumeStep = startVolume / totalSteps;

  audioFadeInterval = setInterval(() => {
    if (eveningAudio.volume - volumeStep > 0.01) {
      eveningAudio.volume = Math.max(0, eveningAudio.volume - volumeStep);
    } else {
      stopEveningMusicImmediate();
    }
  }, stepMs);
}

// إيقاف وتصفير الموسيقى تماماً
function stopEveningMusicImmediate() {
  clearInterval(audioFadeInterval);
  isMusicSessionActive = false;
  isFadingOut = false;
  eveningAudio.pause();
  eveningAudio.volume = 0;
  eveningAudio.currentTime = 0;
}

// بدء جلسة موسيقى المساء عند الفيديو 6.mp4
function startEveningMusicSession() {
  if (isMusicSessionActive) return;
  const songSrc = pickRandomSong();
  if (!songSrc) return;

  isMusicSessionActive = true;
  isFadingOut = false;
  eveningAudio.src = songSrc;
  eveningAudio.currentTime = 0;
  eveningAudio.volume = 0;
  eveningAudio.muted = isAudioMuted;

  eveningAudio.play()
    .then(() => {
      fadeInMusic(FADE_DURATION_SEC);
    })
    .catch(() => {
      // في حال حظر المتصفح الصوت قبل لمس الشاشة، تبقى الجلسة نشطة وتعمل فور أول لمسة
      fadeInMusic(FADE_DURATION_SEC);
    });
}

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

// شبكة الأمان البصرية: منع تجاوز 3 فقاعات في الأعلى (مع احترام استثناء المحادثة 3)
function enforceMaxVisibleBubbles(maxCount = 3, allowStack = false) {
  if (allowStack) return;

  const activeBubbles = Array.from(
    chatOverlay.querySelectorAll('.chat-bubble:not(.fade-out)')
  );

  while (activeBubbles.length >= maxCount) {
    const oldest = activeBubbles.shift();
    dismissBubble(oldest);
  }
}

// عرض رسالة واحدة بمؤقت مستقل خاص بها
async function showSingleMessage(sender, text, allowStack = false) {
  enforceMaxVisibleBubbles(3, allowStack);

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

// تشغيل تسلسل محادثة كاملة (كما في الليل)
async function playConversationSequence(messages) {
  if (isConversationRunning) return;
  isConversationRunning = true;

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    await showSingleMessage(msg.sender, msg.text, msg.allowStack || false);
  }

  isConversationRunning = false;
}

// حساب الخطوة التالية في الدورة المستمرة
function getNextStep(pIndex, vIndex) {
  const currentList = phases[pIndex].videos;
  if (vIndex + 1 < currentList.length) {
    return { phaseIndex: pIndex, videoIndex: vIndex + 1 };
  }

  let nextP = (pIndex + 1) % phases.length;
  while (phases[nextP].videos.length === 0) {
    nextP = (nextP + 1) % phases.length;
  }
  return { phaseIndex: nextP, videoIndex: 0 };
}

// التحقق من المحادثات والموسيقى عند بدء الفيديو
function checkVideoConversations(phaseName, index) {
  const key = `${phaseName}_${index}`;

  // محادثة الليل
  if (phaseName === 'night' && index === 12) {
    playConversationSequence([
      { sender: 'character', text: 'n3ast' },
      { sender: 'character', text: 'bon8' }
    ]);
  }

  // محادثات الصباح
  if (phaseName === 'morning' && morningTriggers[index]) {
    if (!preTriggeredKeys.has(key) && !exactTriggeredKeys.has(key)) {
      exactTriggeredKeys.add(key);
      const msg = morningTriggers[index];
      showSingleMessage(msg.sender, msg.text, msg.allowStack || false);
    }
  }

  // إدارة موسيقى المساء
  if (phaseName === 'evening') {
    if (index === EVENING_MUSIC_START_INDEX) {
      startEveningMusicSession();
    } else if (index > EVENING_MUSIC_END_INDEX && isMusicSessionActive) {
      // شبكة أمان لإيقاف الموسيقى تماماً بمجرد تجاوز الفيديو 17.mp4
      stopEveningMusicImmediate();
    }
  } else if (isMusicSessionActive) {
    // إيقاف الموسيقى إذا انتقلت الدورة لفترة أخرى
    stopEveningMusicImmediate();
  }
}

// ==========================================
// محرك التبديل المحسّن بدون وميض + إدارة الذاكرة
// ==========================================

function cleanupHiddenVideo(vidElement) {
  if (!vidElement || vidElement.classList.contains('active')) return;
  try {
    vidElement.pause();
    vidElement.removeAttribute('src');
    vidElement.load();
  } catch (e) {}
}

function preloadNextVideo() {
  const next = getNextStep(currentPhaseIndex, currentVideoIndex);
  const nextSrc = phases[next.phaseIndex].videos[next.videoIndex];
  const hiddenVid = activeVideoTag === 'A' ? videoB : videoA;

  if (preloadedSrc === nextSrc && hiddenVid.getAttribute('src') === nextSrc) {
    return;
  }

  preloadedSrc = nextSrc;
  hiddenVid.pause();
  hiddenVid.src = nextSrc;
  hiddenVid.load();
}

function completeVisualSwap(currentVid, nextVid, phaseName, videoIndex) {
  nextVid.classList.add('active');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      currentVid.classList.remove('active');
      activeVideoTag = activeVideoTag === 'A' ? 'B' : 'A';
      isTransitioning = false;

      checkVideoConversations(phaseName, videoIndex);

      setTimeout(() => {
        cleanupHiddenVideo(currentVid);
        preloadNextVideo();
      }, 120);
    });
  });
}

function playVideo(videoSrc, phaseIndex, videoIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  const currentVid = activeVideoTag === 'A' ? videoA : videoB;
  const nextVid    = activeVideoTag === 'A' ? videoB : videoA;
  const phaseName  = phases[phaseIndex].name;

  // تصفير سجلات الدورة عند العودة لبداية الليل
  if (phaseIndex === 0 && videoIndex === 0) {
    preTriggeredKeys.clear();
    exactTriggeredKeys.clear();
  }

  const startPlayback = () => {
    nextVid.oncanplay = null;
    nextVid.oncanplaythrough = null;
    nextVid.currentTime = 0;

    const playPromise = nextVid.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          completeVisualSwap(currentVid, nextVid, phaseName, videoIndex);
        })
        .catch(() => {
          nextVid.muted = true;
          nextVid.play().finally(() => {
            completeVisualSwap(currentVid, nextVid, phaseName, videoIndex);
          });
        });
    } else {
      completeVisualSwap(currentVid, nextVid, phaseName, videoIndex);
    }
  };

  if (nextVid.getAttribute('src') === videoSrc && nextVid.readyState >= 3) {
    startPlayback();
  } else {
    nextVid.src = videoSrc;
    nextVid.load();
    nextVid.oncanplay = startPlayback;
  }
}

// مراقبة الوقت المتبقي من الفيديو الحالي:
// 1. لإطلاق النقاط الثلاث قبل بداية فيديو الصباح التالي بـ 3 ثوانٍ
// 2. لبدء التلاشي التنازلي للموسيقى قبل نهاية فيديو المساء 17.mp4 بـ 6 ثوانٍ
function handleVideoTimeUpdate(event) {
  const vid = event.target;
  const activeVid = activeVideoTag === 'A' ? videoA : videoB;
  if (vid !== activeVid || !vid.duration || isNaN(vid.duration)) return;

  const remaining = vid.duration - vid.currentTime;
  const currentPhaseName = phases[currentPhaseIndex].name;

  // مراقبة التلاشي التنازلي للموسيقى في الفيديو 17.mp4 (الفهرس 31)
  if (
    currentPhaseName === 'evening' &&
    currentVideoIndex === EVENING_MUSIC_END_INDEX &&
    isMusicSessionActive &&
    !isFadingOut
  ) {
    if (remaining <= FADE_DURATION_SEC) {
      const actualFadeTime = Math.min(FADE_DURATION_SEC, Math.max(0.5, remaining));
      fadeOutMusic(actualFadeTime);
    }
  }

  // مراقبة محادثات الصباح المسبقة
  const next = getNextStep(currentPhaseIndex, currentVideoIndex);
  const nextPhaseName = phases[next.phaseIndex].name;
  const nextKey = `${nextPhaseName}_${next.videoIndex}`;

  if (nextPhaseName === 'morning' && morningTriggers[next.videoIndex]) {
    if (remaining <= 3.0 && !preTriggeredKeys.has(nextKey)) {
      preTriggeredKeys.add(nextKey);
      const msg = morningTriggers[next.videoIndex];
      showSingleMessage(msg.sender, msg.text, msg.allowStack || false);
    }
  }
}

function handleVideoEnded() {
  if (isTransitioning) return;
  const next = getNextStep(currentPhaseIndex, currentVideoIndex);
  currentPhaseIndex = next.phaseIndex;
  currentVideoIndex = next.videoIndex;

  const nextSrc = phases[currentPhaseIndex].videos[currentVideoIndex];
  playVideo(nextSrc, currentPhaseIndex, currentVideoIndex);
}

videoA.addEventListener('timeupdate', handleVideoTimeUpdate);
videoB.addEventListener('timeupdate', handleVideoTimeUpdate);
videoA.addEventListener('ended', handleVideoEnded);
videoB.addEventListener('ended', handleVideoEnded);

window.addEventListener('DOMContentLoaded', () => {
  playVideo(phases[currentPhaseIndex].videos[currentVideoIndex], currentPhaseIndex, currentVideoIndex);
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
