document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 1. العداد التنازلي لعيد الميلاد (2 مارس)
    // =========================================================
    const timerDisplay = document.getElementById("timer");

    function updateCountdown() {
        const now = new Date();
        let currentYear = now.getFullYear();
        let targetDate = new Date(currentYear, 2, 2, 0, 0, 0); // 2 مارس (الشهر 2 في JS هو مارس)

        // إذا مرّ 2 مارس في السنة الحالية، نحسب لـ 2 مارس من السنة القادمة
        if (now >= targetDate) {
            targetDate = new Date(currentYear + 1, 2, 2, 0, 0, 0);
        }

        const diff = targetDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const pad = (n) => String(n).padStart(2, "0");
        if (timerDisplay) {
            timerDisplay.textContent = `${days} يوم : ${pad(hours)} ساعة : ${pad(minutes)} دقيقة : ${pad(seconds)} ثانية`;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // =========================================================
    // 2. إدارة الفترات والقوائم (Night -> Morning -> Evening)
    // =========================================================
    const playlists = {
        night: {
            folder: "assets/videos/night/",
            videos: [
                "102.mp4", "105.mp4", "106.mp4", "107.mp4", "108.mp4",
                "109.mp4", "110.mp4", "111.mp4", "112.mp4", "113.mp4",
                "114.mp4", "114.1.mp4", "115.mp4", "116.mp4", "117.mp4",
                "117.1.mp4", "118.mp4", "119.mp4", "119.1.mp4", "120.mp4",
                "121.mp4", "122.mp4", "123.mp4", "124.mp4", "125.mp4",
                "126.mp4", "127.mp4", "128.mp4", "129.mp4", "130.mp4",
                "114.mp4", "114.1.mp4", "117.mp4", "118.mp4", "119.mp4",
                "119.2.mp4", "119.1.mp4"
            ],
            triggers: {
                12: [
                    { sender: "character", text: "look at the stars tonight ✨" },
                    { sender: "user", text: "they remind me of you" }
                ]
            }
        },

        morning: {
            folder: "assets/videos/morning/",
            videos: [
                "148.mp4", "134.mp4", "150.mp4", "151.mp4", "133.mp4", // 0 - 4
                "147.mp4", "148.mp4", "145.mp4", "140.mp4", "131.mp4", // 5 - 9
                "144.mp4", "143.mp4", "142.mp4", "151.mp4", "135.mp4", // 10 - 14
                "150.mp4", "146.mp4", "137.mp4", "142.mp4", "141.mp4", // 15 - 19
                "135.mp4", "157.mp4", "160.mp4", "161.mp4", "158.mp4", // 20 - 24
                "160.mp4", "164.mp4", "165.mp4", "161.mp4", "160.mp4", // 25 - 29
                "162.mp4", "163.mp4", "159.mp4", "166.mp4", "138.mp4", // 30 - 34
                "151.mp4", "136.mp4", "145.mp4", "152.mp4", "153.mp4", // 35 - 39
                "154.mp4", "155.mp4", "153.mp4", "156.mp4"             // 40 - 43
            ],
            // جدول محادثات الصباح (user = أزرق يمين | character = رمادي يسار)
            triggers: {
                // --- المحادثة الأولى ---
                3:  [{ sender: "user", text: "wech raki diri ?" }],
                4:  [{ sender: "character", text: "nakol fl fraises" }],

                // --- المحادثة الثانية ---
                15: [{ sender: "user", text: "matensich tchrbi lma lyoumm" }],
                16: [{ sender: "character", text: "ma nchrbch amchi" }],

                // --- المحادثة الثالثة (محصورة بين 23 و 30 + استثناء التراكم) ---
                24: [{ sender: "user", text: "hii , can u guess what i am thinking about", allowStack: true }],
                25: [{ sender: "character", text: "balak", allowStack: true }],
                26: [{ sender: "user", text: "haya khammi", allowStack: true }],
                27: [{ sender: "character", text: "hada object wela makla", allowStack: true }],
                28: [{ sender: "user", text: "haja 7louwa , tebda bl d", allowStack: true }],
                29: [{ sender: "character", text: "emmm maerftch , blk donuts ?", allowStack: true }],
                30: [{ sender: "user", text: "douaa 🙂", allowStack: true }],

                // --- المحادثة الرابعة ---
                36: [{ sender: "character", text: "kraht , ha ndir make up" }]
            }
        },

        evening: {
            folder: "assets/videos/evening/",
            videos: [],
            triggers: {}
        }
    };

    const periodOrder = ["night", "morning", "evening"];
    let currentPeriodIndex = 0; // 0 = الليل | 1 = الصباح
    let currentVideoIndex = 0;

    // =========================================================
    // 3. عناصر الواجهة المطابقة لملف index.html
    // =========================================================
    const videoA = document.getElementById("video-a");
    const videoB = document.getElementById("video-b");
    const chatOverlay = document.getElementById("chat-overlay");

    let activeVideo = videoA;
    let standbyVideo = videoB;

    let firedPreTriggers = new Set();
    let firedExactTriggers = new Set();

    const TYPING_DURATION = 3000;  // 3 ثوانٍ مؤشر الكتابة (...)
    const MESSAGE_LIFESPAN = 6000; // 6 ثوانٍ بقاء مستقل للنص
    const MAX_BUBBLES = 3;         // الحد الأقصى الافتراضي للفقاعات

    // =========================================================
    // 4. دوال القوائم والتنقل بين الفترات
    // =========================================================
    function getCurrentPeriodName() {
        return periodOrder[currentPeriodIndex];
    }

    function getCurrentPlaylist() {
        return playlists[getCurrentPeriodName()];
    }

    function getNextStep(periodIdx, videoIdx) {
        const periodName = periodOrder[periodIdx];
        const list = playlists[periodName].videos;

        if (videoIdx + 1 < list.length) {
            return { periodIdx, videoIdx: videoIdx + 1 };
        }

        let nextP = (periodIdx + 1) % periodOrder.length;
        while (playlists[periodOrder[nextP]].videos.length === 0) {
            nextP = (nextP + 1) % periodOrder.length;
        }
        return { periodIdx: nextP, videoIdx: 0 };
    }

    // =========================================================
    // 5. نظام فقاعات المحادثة (iMessage Engine)
    // =========================================================
    function enforceBubbleLimit(allowStack) {
        if (allowStack) return;

        const bubbles = chatOverlay.querySelectorAll(".chat-bubble:not(.fade-out)");
        if (bubbles.length >= MAX_BUBBLES) {
            removeBubble(bubbles[0]);
        }
    }

    function removeBubble(bubble) {
        if (!bubble || bubble.classList.contains("fade-out")) return;
        bubble.classList.remove("visible");
        bubble.classList.add("fade-out");
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 450);
    }

    function spawnMessage(msgObj) {
        enforceBubbleLimit(msgObj.allowStack);

        const bubble = document.createElement("div");
        // user = أزرق (يمين) | character = رمادي (يسار)
        bubble.classList.add("chat-bubble", msgObj.sender === "user" ? "user" : "character");
        bubble.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span>`;

        chatOverlay.appendChild(bubble);

        // تفعيل كلاس visible لإظهار الفقاعة بسلاسة حسب CSS
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                bubble.classList.add("visible");
            });
        });

        // كشف النص الفعلي بعد 3 ثوانٍ وبدء مؤقت البقاء المستقل (6 ثوانٍ)
        setTimeout(() => {
            bubble.textContent = msgObj.text;
            setTimeout(() => {
                removeBubble(bubble);
            }, MESSAGE_LIFESPAN);
        }, TYPING_DURATION);
    }

    function triggerSequence(messages) {
        if (!messages || messages.length === 0) return;

        messages.forEach((msg, i) => {
            const delay = i * (TYPING_DURATION + 400);
            setTimeout(() => {
                spawnMessage(msg);
            }, delay);
        });
    }

    // =========================================================
    // 6. محرك المزامنة الزمنية وتشغيل الفيديوهات
    // =========================================================
    function preloadNextVideo() {
        const next = getNextStep(currentPeriodIndex, currentVideoIndex);
        const nextPlaylist = playlists[periodOrder[next.periodIdx]];
        const nextSrc = nextPlaylist.folder + nextPlaylist.videos[next.videoIdx];

        if (!standbyVideo.src.endsWith(nextSrc)) {
            standbyVideo.src = nextSrc;
            standbyVideo.load();
        }
    }

    function handleTimeUpdate() {
        const vid = activeVideo;
        if (!vid.duration || isNaN(vid.duration)) return;

        const remaining = vid.duration - vid.currentTime;
        const next = getNextStep(currentPeriodIndex, currentVideoIndex);
        const nextPeriodName = periodOrder[next.periodIdx];
        const nextKey = `${nextPeriodName}_${next.videoIdx}`;
        const nextTriggers = playlists[nextPeriodName].triggers[next.videoIdx];

        // إطلاق النقاط الثلاث (...) قبل نهاية الفيديو الحالي بـ 3 ثوانٍ
        // لينكشف النص مع بداية الفيديو التالي بالضبط
        if (nextTriggers && remaining <= 3.0 && !firedPreTriggers.has(nextKey)) {
            firedPreTriggers.add(nextKey);
            triggerSequence(nextTriggers);
        }
    }

    function playVideoAt(periodIdx, videoIdx, isFirstStart = false) {
        currentPeriodIndex = periodIdx;
        currentVideoIndex = videoIdx;

        const periodName = getCurrentPeriodName();
        const playlist = getCurrentPlaylist();
        const currentKey = `${periodName}_${videoIdx}`;
        const videoSrc = playlist.folder + playlist.videos[videoIdx];

        if (periodIdx === 0 && videoIdx === 0 && !isFirstStart) {
            firedPreTriggers.clear();
            firedExactTriggers.clear();
        }

        if (isFirstStart) {
            activeVideo.src = videoSrc;
            activeVideo.muted = true;
            activeVideo.classList.add("active");
            activeVideo.play().catch(() => {});
        } else {
            standbyVideo.muted = true;
            standbyVideo.classList.add("active");
            activeVideo.classList.remove("active");
            activeVideo.pause();

            const temp = activeVideo;
            activeVideo = standbyVideo;
            standbyVideo = temp;

            activeVideo.play().catch(() => {});
        }

        // خطة احتياطية إذا لم يتم الإطلاق المسبق
        const currentTriggers = playlist.triggers[videoIdx];
        if (currentTriggers && !firedPreTriggers.has(currentKey) && !firedExactTriggers.has(currentKey)) {
            firedExactTriggers.add(currentKey);
            triggerSequence(currentTriggers);
        }

        preloadNextVideo();
    }

    [videoA, videoB].forEach((vid) => {
        vid.addEventListener("timeupdate", () => {
            if (vid === activeVideo) {
                handleTimeUpdate();
            }
        });

        vid.addEventListener("ended", () => {
            if (vid === activeVideo) {
                const next = getNextStep(currentPeriodIndex, currentVideoIndex);
                playVideoAt(next.periodIdx, next.videoIdx, false);
            }
        });

        // في حال تعذر تحميل فيديو معين، ينتقل تلقائياً للتالي دون توقف الشاشة
        vid.addEventListener("error", () => {
            if (vid === activeVideo) {
                const next = getNextStep(currentPeriodIndex, currentVideoIndex);
                playVideoAt(next.periodIdx, next.videoIdx, false);
            }
        });
    });

    // بدء التشغيل
    playVideoAt(0, 0, true);
});
