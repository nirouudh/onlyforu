// ==========================================
// 1. دورة الـ 15 دقيقة والأنشطة التفصيلية (Character Routine)
// ==========================================

const routineSchedule = [
  // ☕ الصباح (00:00 - 05:00 دقيقة)
  { start: 0,   end: 75,  bg: 'bg-morning', phase: 'فترة الصباح ☕', act: 'احتساء الشوكولاتة بالحليب الدافئة...' },
  { start: 75,  end: 150, bg: 'bg-morning', phase: 'فترة الصباح ☕', act: 'شرب الماء والاستمتاع بانتشار الضوء...' },
  { start: 150, end: 225, bg: 'bg-morning', phase: 'فترة الصباح ☕', act: 'الاستمتاع بعبير ورود الحديقة...' },
  { start: 225, end: 300, bg: 'bg-morning', phase: 'فترة الصباح ☕', act: 'وضع لمسة ميكب خفيفة ورقيقة...' },

  // 🎨 الغروب والمساء (05:00 - 10:00 دقيقة)
  { start: 300, end: 375, bg: 'bg-evening', phase: 'فترة الغروب والمساء 🌅', act: 'الدراسة والتركيز في الكتب...' },
  { start: 375, end: 450, bg: 'bg-evening', phase: 'فترة الغروب والمساء 🌅', act: 'الرسم والإبداع الفني...' },
  { start: 450, end: 525, bg: 'bg-evening', phase: 'فترة الغروب والمساء 🌅', act: 'التأمل في انعكاس الشمس على البحيرة...' },
  { start: 525, end: 600, bg: 'bg-evening', phase: 'فترة الغروب والمساء 🌅', act: 'الاستماع للموسيقى المفضلة...' },

  // 🌙 الليل والهدوء (10:00 - 15:00 دقيقة)
  { start: 600, end: 750, bg: 'bg-night',   phase: 'فترة الليل والهدوء 🌙', act: 'تفقد الهاتف وقراءة الرسائل...' },
  { start: 750, end: 900, bg: 'bg-night',   phase: 'فترة الليل والهدوء 🌙', act: 'الشعور بالنعاس والخلود إلى النوم...' }
];

function update15MinLoop() {
  const now = new Date();
  const totalSecondsInLoop = 15 * 60; // 900 ثانية
  const currentSecondsInHour = (now.getMinutes() * 60) + now.getSeconds();
  const secondsInCurrentLoop = currentSecondsInHour % totalSecondsInLoop;

  // البحث عن النشاط الحالي
  const currentStep = routineSchedule.find(step => secondsInCurrentLoop >= step.start && secondsInCurrentLoop < step.end);

  if (currentStep) {
    // تبديل خلفية المشهد
    ['bg-morning', 'bg-evening', 'bg-night'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === currentStep.bg) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    // تحديث النص الظاهر للنشاط
    const phaseEl = document.getElementById('routine-phase');
    const actEl = document.getElementById('routine-activity');
    if (phaseEl) phaseEl.innerText = currentStep.phase;
    if (actEl) actEl.innerText = currentStep.act;
  }
}

setInterval(update15MinLoop, 1000);
update15MinLoop();

// ==========================================
// 2. العداد التنازلي لعيد الميلاد (2 مارس)
// ==========================================
const BIRTHDAY_MONTH = 2; // مارس
const BIRTHDAY_DAY = 2;   // يوم 2

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
