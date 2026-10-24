document.addEventListener('DOMContentLoaded', () => {
    feather.replace();

    // Data Lirik Lemonade & Terjemahan Romantis
    const lyricsData = [
        { time: 0, text: "♪ ... (Intro Acoustic Lemonade)", trans: "Alunan lembut menyambut wisudamu..." },
        { time: 14, text: "She's my sunshine in the rain", trans: "Dia adalah cahaya matahariku di kala hujan" },
        { time: 19, text: "My Tylenol when I'm in pain yeah", trans: "Penenang jiwaku di saat aku lelah" },
        { time: 23, text: "Let me tell you what she means to me", trans: "Biar kuceritakan betapa berartinya dirimu bagiku" },
        { time: 30, text: "Like a tall glass of lemonade", trans: "Bagaikan segelas limun dingin yang menyegarkan" },
        { time: 33, text: "When it's burning hot on summer days", trans: "Di tengah teriknya hari musim panas" },
        { time: 39, text: "She's exactly what I need", trans: "Kae adalah segala yang selalu kubutuhkan" },
        { time: 44, text: "She's soothing like the ocean rushing on the sand", trans: "Menenangkan bagai deburan ombak di tepian pantai" },
        { time: 51, text: "She takes care of me baby", trans: "Dia selalu tulus merawat dan menjagaku" },
        { time: 56, text: "And she helps me be a better man", trans: "Dan membantuku tumbuh jadi pribadi yang lebih baik" },
        { time: 59, text: "She's so beautiful sometimes I stop to close my eyes", trans: "Begitu cantiknya hingga aku terdiam dan terpesona" },
        { time: 67, text: "She's exactly what I need", trans: "Sosok perempuan yang paling kubanggakan" },
        { time: 75, text: "She's my smile when I'm feeling blue", trans: "Dia adalah senyumanku saat hariku terasa berat" },
        { time: 82, text: "Happy Graduation, my favorite girl ✨", trans: "Selamat wisuda, perempuan terhebatku!" }
    ];

    // Data 14 Foto Polaroid
    const pagesData = [
        { img: "img/1.jpg", caption: "Happy Graduation Cantik! 🎓✨", sub: "Hari Wisuda · Tangga Keagungan", sticker: "🎓" },
        { img: "img/2.jpg", caption: "She's my sunshine in the rain", sub: "Kenangan Manis Kuliah", sticker: "🌸" },
        { img: "img/3.jpg", caption: "Tawa ceriamu yang selalu menenangkan", sub: "Momen Spesial Kita", sticker: "✨" },
        { img: "img/4.jpg", caption: "Ketekunanmu membuahkan gelar baru!", sub: "Sidang & Pembuktian", sticker: "📚" },
        { img: "img/5.jpg", caption: "Like a tall glass of lemonade 🍋", sub: "Sore Santai Bersama", sticker: "🍋" },
        { img: "img/6.jpg", caption: "Damai setiap melihat senyum Kae", sub: "Senja Tepi Pantai", sticker: "🌊" },
        { img: "img/7.jpg", caption: "Terima kasih untuk perhatian tulusmu", sub: "Catatan Hati", sticker: "🤍" },
        { img: "img/8.jpg", caption: "And she helps me be a better man", sub: "Tumbuh Bersama", sticker: "🌿" },
        { img: "img/9.jpg", caption: "Bidadari tercantik kebangganku", sub: "Pesona Wisuda", sticker: "👑" },
        { img: "img/10.jpg", caption: "Buket bunga terindah untukmu", sub: "Panggung Perayaan", sticker: "💐" },
        { img: "img/11.jpg", caption: "She's my smile when I'm feeling blue", sub: "Pelangi di Langitku", sticker: "⭐" },
        { img: "img/12.jpg", caption: "Topi toga bukti kerja kerasmu", sub: "Gelar Baru", sticker: "📜" },
        { img: "img/13.jpg", caption: "Menuju ribuan impian hebat di depan", sub: "Langkah Pertama", sticker: "🚀" },
        { img: "img/14.jpg", caption: "Selamanya bangga padamu, Kae! ❤️", sub: "Di Hati Kemal", sticker: "❤️" }
    ];

    // Elemen DOM
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause');
    const vinylDisc = document.getElementById('vinyl-disc');
    const progressFill = document.getElementById('progress-fill');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    const lyricsContainer = document.getElementById('lyrics-container');
    const lyricsTranslation = document.getElementById('lyrics-translation');

    const bookCover = document.getElementById('book-cover');
    const bookPages = document.getElementById('book-pages');
    const btnOpenBook = document.getElementById('btn-open-book');
    const btnCloseBook = document.getElementById('btn-close-book');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const thumbnailStrip = document.getElementById('thumbnail-strip');

    const currentPhoto = document.getElementById('current-photo');
    const authorName = document.getElementById('author-name');
    const captionDate = document.getElementById('caption-date');
    const pageSticker = document.getElementById('page-sticker');
    const pageCounter = document.getElementById('page-counter');
    const rightPageNum = document.getElementById('right-page-num');
    const polaroidFrame = document.getElementById('polaroid-frame');

    const btnCheer = document.getElementById('btn-cheer');
    const btnOpenLetter = document.getElementById('btn-open-letter');
    const letterModal = document.getElementById('letter-modal');
    const btnCloseLetter = document.getElementById('btn-close-letter');
    const sealedEnvelope = document.getElementById('sealed-envelope');
    const openedLetter = document.getElementById('opened-letter');

    const zoomModal = document.getElementById('zoom-modal');
    const zoomImg = document.getElementById('zoom-img');
    const photoZoomTrigger = document.getElementById('photo-zoom-trigger');
    const btnAutoflip = document.getElementById('btn-autoflip');

    let currentPage = 0;
    let isAutoFlip = true;
    let isSynthPlaying = false;
    let synthInterval = null;

    // Web Audio API: Suara Desiran Kertas Realistis
    function playPaperSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const bufferSize = ctx.sampleRate * 0.12;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1200, ctx.currentTime);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start();
        } catch(e) {}
    }

    // Tampilkan Halaman Tertentu
    function renderPage(idx) {
        if (idx < 0 || idx >= pagesData.length) return;
        currentPage = idx;
        const data = pagesData[idx];

        currentPhoto.src = data.img;
        authorName.textContent = data.caption;
        captionDate.textContent = data.sub;
        pageSticker.textContent = data.sticker;
        pageCounter.textContent = `Hal. ${idx + 1} / ${pagesData.length}`;
        rightPageNum.textContent = idx + 1;

        // Rotasi organik polaroid
        const rotation = (idx % 2 === 0 ? -1.5 : 1.5);
        polaroidFrame.style.transform = `rotate(${rotation}deg)`;

        // Update tombol thumbnail
        document.querySelectorAll('.thumb-btn').forEach((btn, bIdx) => {
            btn.classList.toggle('active', bIdx === idx);
        });

        playPaperSound();
    }

    // Inisialisasi Thumbnail Bar
    pagesData.forEach((_, idx) => {
        const btn = document.createElement('button');
        btn.className = `thumb-btn ${idx === 0 ? 'active' : ''}`;
        btn.textContent = idx + 1;
        btn.addEventListener('click', () => renderPage(idx));
        thumbnailStrip.appendChild(btn);
    });

    // Buka / Tutup Sampul Buku
    btnOpenBook.addEventListener('click', () => {
        bookCover.classList.add('hidden');
        bookPages.classList.remove('hidden');
        thumbnailStrip.classList.remove('hidden');
        renderPage(0);
        if (audio.paused && !isSynthPlaying) toggleMusic();
    });

    btnCloseBook.addEventListener('click', () => {
        bookPages.classList.add('hidden');
        thumbnailStrip.classList.add('hidden');
        bookCover.classList.remove('hidden');
        playPaperSound();
    });

    btnPrev.addEventListener('click', () => {
        if (currentPage > 0) renderPage(currentPage - 1);
    });

    btnNext.addEventListener('click', () => {
        if (currentPage < pagesData.length - 1) renderPage(currentPage + 1);
    });

    // Auto Flip Toggle
    btnAutoflip.addEventListener('click', () => {
        isAutoFlip = !isAutoFlip;
        btnAutoflip.classList.toggle('active', isAutoFlip);
    });

    // Audio Player & Fallback Synth
    function toggleMusic() {
        if (!audio.paused || isSynthPlaying) {
            audio.pause();
            isSynthPlaying = false;
            clearInterval(synthInterval);
            playPauseBtn.innerHTML = '<i data-feather="play"></i>';
            vinylDisc.classList.remove('spin');
            feather.replace();
        } else {
            audio.play().then(() => {
                playPauseBtn.innerHTML = '<i data-feather="pause"></i>';
                vinylDisc.classList.add('spin');
                feather.replace();
            }).catch(() => {
                // Jika file lemonade.mp3 belum ada di folder, aktifkan audio virtual
                isSynthPlaying = true;
                playPauseBtn.innerHTML = '<i data-feather="pause"></i>';
                vinylDisc.classList.add('spin');
                feather.replace();
                let fakeTime = 0;
                synthInterval = setInterval(() => {
                    fakeTime += 0.5;
                    updatePlayer(fakeTime, 85);
                    if (fakeTime >= 85) fakeTime = 0;
                }, 500);
            });
        }
    }

    playPauseBtn.addEventListener('click', toggleMusic);

    function formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function updatePlayer(current, duration) {
        currentTimeEl.textContent = formatTime(current);
        totalDurationEl.textContent = formatTime(duration);
        progressFill.style.width = `${(current / duration) * 100}%`;

        // Sinkronisasi Lirik
        const matched = [...lyricsData].reverse().find(l => current >= l.time) || lyricsData[0];
        if (lyricsContainer.textContent !== matched.text) {
            lyricsContainer.textContent = matched.text;
            lyricsTranslation.textContent = matched.trans;

            // Auto flip ke halaman foto sesuai urutan lirik
            if (isAutoFlip) {
                const lyricIdx = lyricsData.indexOf(matched);
                if (lyricIdx !== -1 && lyricIdx < pagesData.length && lyricIdx !== currentPage) {
                    renderPage(lyricIdx);
                }
            }
        }
    }

    audio.addEventListener('timeupdate', () => {
        updatePlayer(audio.currentTime, audio.duration || 85);
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = ratio * audio.duration;
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        audio.currentTime = 0;
        if (audio.paused) toggleMusic();
    });

    // Konfeti Wisuda
    btnCheer.addEventListener('click', () => {
        confetti({
            particleCount: 70,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#ec4899', '#38bdf8', '#ffffff']
        });
    });

    // Modal Surat Rahasia & Segel Lilin
    btnOpenLetter.addEventListener('click', () => {
        letterModal.classList.remove('hidden');
    });

    document.querySelector('.bookmark-ribbon').addEventListener('click', () => {
        letterModal.classList.remove('hidden');
    });

    btnCloseLetter.addEventListener('click', () => {
        letterModal.classList.add('hidden');
    });

    sealedEnvelope.addEventListener('click', () => {
        sealedEnvelope.classList.add('hidden');
        openedLetter.classList.remove('hidden');
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#e11d48', '#fbcfe8', '#fbbf24']
        });
    });

    // Zoom Foto
    photoZoomTrigger.addEventListener('click', () => {
        zoomImg.src = currentPhoto.src;
        zoomModal.classList.remove('hidden');
    });

    zoomModal.addEventListener('click', () => {
        zoomModal.classList.add('hidden');
    });

    // Animasi Kelopak Bunga (Petals Canvas)
    const canvas = document.getElementById('petals-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petals = Array.from({ length: 22 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 1 - 0.3,
        speedY: Math.random() * 1.2 + 0.5,
        rot: Math.random() * 360,
        color: ['#fbcfe8', '#f472b6', '#fed7aa', '#fde047'][Math.floor(Math.random() * 4)]
    }));

    function loopPetals() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rot += 1;
            if (p.y > height + 20) p.y = -20;
            if (p.x > width + 20) p.x = -20;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rot * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.45;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(p.size, -p.size, p.size * 1.4, 0);
            ctx.quadraticCurveTo(p.size, p.size, 0, 0);
            ctx.fill();
            ctx.restore();
        });
        requestAnimationFrame(loopPetals);
    }
    loopPetals();
});