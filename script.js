// ==========================================
// 1. نظام الدورة الزمنية (15-Minute Automated Loop)
// ==========================================

function update15MinLoop() {
  const now = new Date();
  
  // حساب المتبقي داخل دورة الـ 15 دقيقة المكونة من (900 ثانية)
  const totalSecondsInLoop = 15 * 60; 
  const currentSecondsInHour = (now.getMinutes() * 60) + now.getSeconds();
  const secondsInCurrentLoop = currentSecondsInHour % totalSecondsInLoop;

  const morningBg = document.getElementById('bg-morning');
  const eveningBg = document.getElementById('bg-evening');
  const nightBg = document.getElementById('bg-night');

  // إزالة التفعيل السابق
  morningBg.classList.remove('active');
  eveningBg.classList.remove('active');
  nightBg.classList.remove('active');

  // تقسيم الدورة إلى 3 فترات (كل فترة 300 ثانية = 5 دقائق):
  // 1. الصباح: من 0 إلى 5 دقائق (0 - 299 ثانية)
  // 2. الغروب/المساء: من 5 إلى 10 دقائق (300 - 599 ثانية)
  // 3. الليل: من 10 إلى 15 دقيقة (600 - 899 ثانية)
  if (secondsInCurrentLoop < 300) {
    morningBg.classList.add('active');
  } else if (secondsInCurrentLoop < 600) {
    eveningBg.classList.add('active');
  } else {
    nightBg.classList.add('active');
  }
}

// تشغيل الفحص والتحديث كل ثانية
setInterval(update15MinLoop, 1000);
update15MinLoop();


// ==========================================
// 2. نظام العداد التنازلي لعيد الميلاد (مستمر سنوياً)
// ==========================================

// تعيين تاريخ عيد الميلاد: 2 مارس (الشهر 2 يعني مارس لأن الأشهر تبدأ من 0: يناير=0، فبراير=1، مارس=2)
const BIRTHDAY_MONTH = 2; // مارس
const BIRTHDAY_DAY = 2;   // يوم 2

function getNextBirthdayDate() {
  const now = new Date();
  let targetYear = now.getFullYear();
  let nextBirthday = new Date(targetYear, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);

  // إذا انقضى عيد الميلاد لهذا العام، تحويل الهدف إلى العام القادم تلقائياً
  if (now > nextBirthday) {
    nextBirthday = new Date(targetYear + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
  }

  return nextBirthday;
}

function updateCountdown() {
  const now = new Date();
  const targetDate = getNextBirthdayDate();
  const diff = targetDate - now;

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

// تحديث العداد التنازلي كل ثانية
setInterval(updateCountdown, 1000);
updateCountdown();
