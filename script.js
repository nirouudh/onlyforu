document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // 1. إدارة الفترات والقوائم (Night -> Morning -> Evening)
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
            // محادثات الليل (تظهر نصوصها مع بداية الفيديو المستهدف)
            triggers: {
                12: [
                    { sender: "gray", text: "look at the stars tonight ✨" },
                    { sender: "blue", text: "they remind me of you" }
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
            // جدول محادثات الصباح (كل رقم يمثل الفهرس الذي ينكشف النص مع بدايته)
            triggers: {
                // --- المحادثة الأولى ---
                3:  [{ sender: "blue", text: "wech raki diri ?" }],
                4:  [{ sender: "gray", text: "nakol fl fraises" }],

                // --- المحادثة الثانية ---
                15: [{ sender: "blue", text: "matensich tchrbi lma lyoumm" }],
                16: [{ sender: "gray", text: "ma nchrbch amchi" }],

                // --- المحادثة الثالثة (محصورة بين 23 و 30 + استثناء التراكم) ---
                24: [{ sender: "blue", text: "hii , can u guess what i am thinking about", allowStack: true }],
                25: [{ sender: "gray", text: "balak", allowStack: true }],
                26: [{ sender: "blue", text: "haya khammi", allowStack: true }],
                27: [{ sender: "gray", text: "hada object wela makla", allowStack: true }],
                28: [{ sender: "blue", text: "haja 7louwa , tebda bl d", allowStack: true }],
                29: [{ sender: "gray", text: "emmm maerftch , blk donuts ?", allowStack: true }],
                30: [{ sender: "blue", text: "douaa 🙂", allowStack: true }],

                // --- المحادثة الرابعة ---
                36: [{ sender: "gray", text: "kraht , ha ndir make up" }]
            }
        },

        evening: {
            folder: "assets/videos/evening/",
            videos: [], // جاهز لإضافة فيديوهات المساء لاحقاً
            triggers: {}
        }
    };

    const periodOrder = ["night", "morning", "evening"];
    let currentPeriodIndex = 0; // نبدأ بالليل (0)
    let currentVideoIndex = 0;

    // =========================================================
    // 2. عناصر الواجهة ومحرك الفيديو المزدوج
    // =========================================================
    const videoA = document.getElementById("videoA");
    const videoB = document.getElementById("videoB");
    const chatContainer = document.getElementById("chat-container");

    let activeVideo = videoA;
    let standbyVideo = videoB;

    // تتبع المحفزات التي تم إطلاقها في الدورة الحالية لمنع التكرار
    let firedPreTriggers = new Set();
    let firedExactTriggers = new Set();

    // ثوابت التوقيت (بالملي ثانية)
    const TYPING_DURATION = 3000;  // 3 ثوانٍ نقاط الكتابة (...)
    const MESSAGE_LIFESPAN = 6000; // 6 ثوانٍ بقاء مستقل للنص
    const MAX_BUBBLES = 3;         // الحد الأقصى الافتراضي للفقاعات

    // =========================================================
    // 3. دوال مساعدة للحصول على الحالة الحالية والتالية
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

        // الانتقال للفترة التالية التي تحتوي على فيديوهات
        let nextP = (periodIdx + 1) % periodOrder.length;
        while (playlists[periodOrder[nextP]].videos.length === 0) {
            nextP = (nextP + 1) % periodOrder.length;
        }
        return { periodIdx: nextP, videoIdx: 0 };
    }

    // =========================================================
    // 4. نظام فقاعات المحادثة (iMessage Engine)
    // =========================================================
    function enforceBubbleLimit(allowStack) {
        if (allowStack) return; // استثناء المحادثة الثالثة: لا حذف بسبب التراكم

        const bubbles = chatContainer.querySelectorAll(".chat-bubble:not(.fade-out)");
        if (bubbles.length >= MAX_BUBBLES) {
            const oldest = bubbles[0];
            removeBubble(oldest);
        }
    }

    function removeBubble(bubble) {
        if (!bubble || bubble.classList.contains("fade-out")) return;
        bubble.classList.add("fade-out");
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 400);
    }

    function spawnMessage(msgObj, skipTyping = false) {
        enforceBubbleLimit(msgObj.allowStack);

        const bubble = document.createElement("div");
        bubble.classList.add("chat-bubble", msgObj.sender === "blue" ? "blue" : "gray");

        if (skipTyping) {
            bubble.textContent = msgObj.text;
            chatContainer.appendChild(bubble);
            setTimeout(() => removeBubble(bubble), MESSAGE_LIFESPAN);
            return;
        }

        // مرحلة النقاط الثلاث (...) لمدة 3 ثوانٍ
        bubble.innerHTML = `<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
        chatContainer.appendChild(bubble);

        // كشف النص الفعلي بعد 3 ثوانٍ وبدء مؤقت البقاء المستقل (6 ثوانٍ)
        setTimeout(() => {
            bubble.textContent = msgObj.text;
            setTimeout(() => {
                removeBubble(bubble);
            }, MESSAGE_LIFESPAN);
        }, TYPING_DURATION);
    }

    function triggerSequence(messages, preTriggered = false) {
        if (!messages || messages.length === 0) return;

        messages.forEach((msg, i) => {
            const delay = i * (TYPING_DURATION + 400);
            setTimeout(() => {
                // إذا أُطلقت النقاط مسبقاً قبل 3 ثوانٍ، نكشف النص مباشرة عند بداية الفيديو
                spawnMessage(msg, false);
            }, delay);
        });
    }

    // =========================================================
    // 5. محرك المزامنة الزمنية للفيديو (Pre-Trigger & Playback)
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

        // إطلاق مؤشر الكتابة (...) قبل نهاية الفيديو الحالي بـ 3 ثوانٍ
        // لكي ينكشف النص بالضبط عند الثانية 0.0 من الفيديو التالي
        if (nextTriggers && remaining <= 3.0 && !firedPreTriggers.has(nextKey)) {
            firedPreTriggers.add(nextKey);
            triggerSequence(nextTriggers, true);
        }
    }

    function playVideoAt(periodIdx, videoIdx, isFirstStart = false) {
        currentPeriodIndex = periodIdx;
        currentVideoIndex = videoIdx;

        const periodName = getCurrentPeriodName();
        const playlist = getCurrentPlaylist();
        const currentKey = `${periodName}_${videoIdx}`;
        const videoSrc = playlist.folder + playlist.videos[videoIdx];

        // تنظيف سجلات الدورة السابقة عند العودة للبداية
        if (periodIdx === 0 && videoIdx === 0 && !isFirstStart) {
            firedPreTriggers.clear();
            firedExactTriggers.clear();
        }

        if (isFirstStart) {
            activeVideo.src = videoSrc;
            activeVideo.classList.add("active");
            activeVideo.play().catch(() => {});
        } else {
            // تبديل حاد ونظيف بين المشغلين
            standbyVideo.classList.add("active");
            activeVideo.classList.remove("active");
            activeVideo.pause();

            const temp = activeVideo;
            activeVideo = standbyVideo;
            standbyVideo = temp;

            activeVideo.play().catch(() => {});
        }

        // خطة احتياطية: إذا لم يتم إطلاق النقاط مسبقاً (مثلاً أول فيديو أو فيديو سابق قصير جداً)
        const currentTriggers = playlist.triggers[videoIdx];
        if (currentTriggers && !firedPreTriggers.has(currentKey) && !firedExactTriggers.has(currentKey)) {
            firedExactTriggers.add(currentKey);
            triggerSequence(currentTriggers, false);
        }

        // تجهيز الفيديو التالي في الخلفية
        preloadNextVideo();
    }

    // ربط مستمعي الأحداث بكلا المشغلين
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
    });

    // بدء التشغيل الأولي
    playVideoAt(0, 0, true);
});
