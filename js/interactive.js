// Interactive Animations, Confetti Engine, Meme Ornaments & Birthday Surprises
document.addEventListener('DOMContentLoaded', () => {
  if (window.popcatGame) window.popcatGame.init();
  if (window.photoGallery) window.photoGallery.init();

  // 1. Runaway "Bukan Alya" Button
  const runawayBtn = document.getElementById('btn-not-alya');
  if (runawayBtn) {
    const dodge = () => {
      const maxX = window.innerWidth - runawayBtn.offsetWidth - 40;
      const maxY = window.innerHeight - runawayBtn.offsetHeight - 40;
      const randomX = Math.max(20, Math.floor(Math.random() * maxX));
      const randomY = Math.max(20, Math.floor(Math.random() * maxY));

      runawayBtn.style.position = 'fixed';
      runawayBtn.style.left = `${randomX}px`;
      runawayBtn.style.top = `${randomY}px`;
      runawayBtn.style.zIndex = '9999';

      if (window.soundMaster) window.soundMaster.playBoing();
    };

    runawayBtn.addEventListener('mouseenter', dodge);
    runawayBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodge();
    });

    runawayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Eits gak bisa bohong! Ngaku aja kalo kamu Alya! 😼😹");
      dodge();
    });
  }

  // 2. Gate Unlock ("IYA GUA ALYA!")
  const enterBtn = document.getElementById('btn-enter-party');
  const gateOverlay = document.getElementById('gate-overlay');
  if (enterBtn && gateOverlay) {
    enterBtn.addEventListener('click', () => {
      if (window.soundMaster) {
        window.soundMaster.init();
        window.soundMaster.startBirthdaySong();
        window.soundMaster.playTaDa();
      }

      gateOverlay.classList.add('fade-out');
      setTimeout(() => {
        gateOverlay.style.display = 'none';
      }, 700);

      spawnConfettiShower(70);
      spawnFloatingCats();
    });
  }

  // 3. Audio Toggle Button
  const audioToggle = document.getElementById('audio-toggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      if (window.soundMaster) {
        const muted = window.soundMaster.toggleMute();
        audioToggle.classList.toggle('muted', muted);
        const label = audioToggle.querySelector('.audio-label');
        if (label) label.textContent = muted ? 'Muted 🔇' : 'Music 🎵';
      }
    });
  }

  // 4. Custom MP3 File Loader
  const musicFileInput = document.getElementById('custom-music-input');
  if (musicFileInput) {
    musicFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const audioEl = document.getElementById('bgm-audio');
        if (audioEl) {
          audioEl.src = URL.createObjectURL(file);
          audioEl.load();
          if (window.soundMaster) {
            window.soundMaster.stopBirthdaySong();
            window.soundMaster.startBirthdaySong();
          }
        }
      }
    });
  }

  // 5. Candle Blowing
  const candleFlame = document.getElementById('candle-flame');
  const candleSmoke = document.getElementById('candle-smoke');
  const candleBtn = document.getElementById('btn-blow-candle');
  const candleMessage = document.getElementById('candle-wishes-box');
  let candleBlown = false;

  const blowCandle = () => {
    if (candleBlown) {
      candleBlown = false;
      if (candleFlame) candleFlame.style.display = 'block';
      if (candleSmoke) candleSmoke.style.display = 'none';
      if (candleMessage) candleMessage.classList.remove('active');
      if (candleBtn) candleBtn.innerHTML = '💨 Klik Untuk Tiup Lilin!';
      if (window.soundMaster) window.soundMaster.playBoing();
      return;
    }

    candleBlown = true;
    if (candleFlame) candleFlame.style.display = 'none';
    if (candleSmoke) {
      candleSmoke.style.display = 'block';
      candleSmoke.classList.add('puff');
    }

    if (window.soundMaster) {
      window.soundMaster.playBlow();
      setTimeout(() => {
        window.soundMaster.playConfetti();
      }, 500);
    }

    if (candleMessage) {
      candleMessage.classList.add('active');
    }

    if (candleBtn) {
      candleBtn.innerHTML = '🕯️ Nyalain Lilin Lagi';
    }

    spawnConfettiShower(60);
  };

  if (candleFlame) candleFlame.addEventListener('click', blowCandle);
  if (candleBtn) candleBtn.addEventListener('click', blowCandle);

  // 6. Surprise Gift Box
  const giftBox = document.getElementById('gift-box');
  const giftPopup = document.getElementById('gift-modal');
  const closeGiftBtn = document.getElementById('close-gift-modal');

  if (giftBox && giftPopup) {
    giftBox.addEventListener('click', () => {
      giftBox.classList.add('opened');
      if (window.soundMaster) {
        window.soundMaster.playTaDa();
        window.soundMaster.playConfetti();
      }
      spawnConfettiShower(50);
      setTimeout(() => {
        giftPopup.classList.add('active');
      }, 600);
    });
  }

  if (closeGiftBtn && giftPopup) {
    closeGiftBtn.addEventListener('click', () => {
      giftPopup.classList.remove('active');
    });
  }

  // 7. BATMAN SPECIAL TRANSMISSION (BAT-SIGNAL)
  const batSignalBtn = document.getElementById('btn-activate-batsignal');
  const batmanModal = document.getElementById('batman-modal');
  const closeBatmanBtn = document.getElementById('close-batman-modal');

  if (batSignalBtn && batmanModal) {
    batSignalBtn.addEventListener('click', () => {
      if (window.soundMaster) {
        window.soundMaster.playBatmanTheme();
      }
      spawnBatConfettiShower(40);
      batmanModal.classList.add('active');
    });
  }

  if (closeBatmanBtn && batmanModal) {
    closeBatmanBtn.addEventListener('click', () => {
      batmanModal.classList.remove('active');
    });
  }

  // 8. Cat Fortune Teller Generator
  const fortuneBtn = document.getElementById('btn-get-fortune');
  const fortuneResult = document.getElementById('fortune-text');

  const FORTUNES = [
    "✨ Ramalan Hari Ini: Kamu beruntung banget punya orang yang sengaja bikinin web lucu ini khusus buat kamu wkwk!",
    "🍲 Ramalan Rezeki: Dalam waktu dekat kamu bakal dapet traktiran makanan enak tanpa dipungut biaya!",
    "🚀 Ramalan Masa Depan: Semua target, impian, dan cita-cita kamu bakal tercapai dengan mulus tanpa hambatan!",
    "💖 Ramalan Hati: Hari ini kamu dilindungi dari segala bentuk overthinking, badmood, dan hal-hal yang bikin pusing!",
    "😺 Ramalan Kucing: Kamu resmi dinobatkan jadi Ratu Kucing Paling Asik se-Indonesia Raya!",
    "💰 Ramalan Finansial: Saldo ATM kamu bakal se-gendut perut kucing oren abis makan whiskas!",
    "⭐ Ramalan Aura: Auranya glowing maksimal 1000%, matahari aja auto sungkem!"
  ];

  if (fortuneBtn && fortuneResult) {
    fortuneBtn.addEventListener('click', () => {
      if (window.soundMaster) {
        window.soundMaster.playMeow();
        window.soundMaster.playBoing();
      }

      fortuneResult.classList.remove('fade-in');
      void fortuneResult.offsetWidth;

      const randomIdx = Math.floor(Math.random() * FORTUNES.length);
      fortuneResult.textContent = FORTUNES[randomIdx];
      fortuneResult.classList.add('fade-in');
    });
  }

  // 9. Typewriter Birthday Letter
  initTypewriter();

  // 10. INTERACTIVE MEME SOUNDBOARD
  initMemeSoundboard();

  // 11. INTERACTIVE PEEKING CORNER CATS
  initPeekingCats();

  // 12. MAGICAL CAT PAW CURSOR TRAIL
  initCursorTrail();
});

// Interactive Meme Soundboard
function initMemeSoundboard() {
  const buttons = document.querySelectorAll('.btn-meme-sound');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const soundType = btn.getAttribute('data-sound');
      if (window.soundMaster) {
        if (soundType === 'meow') window.soundMaster.playMeow();
        else if (soundType === 'huh') window.soundMaster.playHuh();
        else if (soundType === 'yippee') window.soundMaster.playYippee();
        else if (soundType === 'chipi') window.soundMaster.playChipi();
        else if (soundType === 'batman') window.soundMaster.playBatmanTheme();
        else if (soundType === 'boing') window.soundMaster.playBoing();
      }

      // Spawn burst of emojis from button
      const rect = btn.getBoundingClientRect();
      const emoji = btn.querySelector('.btn-emoji') ? btn.querySelector('.btn-emoji').textContent : '✨';
      for (let i = 0; i < 4; i++) {
        const p = document.createElement('div');
        p.className = 'cursor-paw-sparkle';
        p.textContent = emoji;
        p.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 50}px`;
        p.style.top = `${rect.top - 10 + (Math.random() - 0.5) * 20}px`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    });
  });
}

// Interactive Peeking Corner Cats
function initPeekingCats() {
  const leftCat = document.getElementById('peeking-cat-left');
  const leftBubble = document.getElementById('peeking-bubble-left');
  const rightCat = document.getElementById('peeking-cat-right');
  const rightBubble = document.getElementById('peeking-bubble-right');

  const catQuotes = [
    "Meong! Habede Alya! 🐾",
    "Alya cantik banget hari ini! 😻",
    "Batman standby di atap! 🦇",
    "Bagi kado ultah dong! 🎁",
    "Traktir seblak yuk kak! 🍲",
    "Kucing oren ikut sungkem! 🙇‍♂️",
    "Habede ratu semesta! 👑",
    "Jangan lupa bahagia ya! ✨"
  ];

  const bananaQuotes = [
    "HAPPY HAPPY HAPPY! 😸🎉",
    "BANANA CAT APPROVED! 🍌",
    "YIPPEEEEEEE!! ✨",
    "Jempol kram nge-pop! 😼",
    "Semangat terus Alya! ⭐",
    "Absurd level 99999+! 🚀"
  ];

  if (leftCat && leftBubble) {
    leftCat.addEventListener('click', () => {
      if (window.soundMaster) window.soundMaster.playMeow();
      const q = catQuotes[Math.floor(Math.random() * catQuotes.length)];
      leftBubble.textContent = q;
      leftCat.classList.remove('bounce-badge');
      void leftCat.offsetWidth;
      leftCat.classList.add('bounce-badge');
    });
  }

  if (rightCat && rightBubble) {
    rightCat.addEventListener('click', () => {
      if (window.soundMaster) {
        if (Math.random() > 0.5) window.soundMaster.playYippee();
        else window.soundMaster.playHuh();
      }
      const q = bananaQuotes[Math.floor(Math.random() * bananaQuotes.length)];
      rightBubble.textContent = q;
      rightCat.classList.remove('bounce-badge');
      void rightCat.offsetWidth;
      rightCat.classList.add('bounce-badge');
    });
  }
}

// Magical Cat Paw Cursor Trail
function initCursorTrail() {
  let lastTime = 0;
  const trailEmojis = ['🐾', '✨', '💖', '🐱', '⭐', '🧁'];

  const spawnTrail = (x, y) => {
    const now = Date.now();
    if (now - lastTime < 65) return; // Throttle ~15fps
    lastTime = now;

    const el = document.createElement('div');
    el.className = 'cursor-paw-sparkle';
    el.textContent = trailEmojis[Math.floor(Math.random() * trailEmojis.length)];
    el.style.left = `${x - 12 + (Math.random() - 0.5) * 16}px`;
    el.style.top = `${y - 12 + (Math.random() - 0.5) * 16}px`;
    document.body.appendChild(el);

    setTimeout(() => el.remove(), 750);
  };

  window.addEventListener('pointermove', (e) => {
    spawnTrail(e.clientX, e.clientY);
  }, { passive: true });
}

// Typewriter Functionality (Personal, Warm, Direct to Alya)
function initTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  if (!textEl) return;

  const fullLetter = `Woi Alya! 🎂✨

Selamat ulang tahun ya! 🎉
Cieee nambah umur lagi nih, makin dewasa tapi untungnya makin manis dan makin cakep juga wkwk.

Gua sengaja bikinin web meme kucing absurd ini spesial buat kamu, biar hari ultah kamu makin seru, rame, dan kamu bisa senyum-senyum sendiri pas buka ini! 🐱✨

Di hari spesial kamu ini, doa gua tulus banget buat kamu:
🐾 Semoga kamu selalu sehat, panjang umur, dan bahagia terus setiap hari.
🌸 Semua urusan kamu, kuliah, karir, dan masa depan kamu dimudahkan dan dilancarkan.
💖 Rezeki kamu melimpah ruah biar bisa jajan enak terus.
🍰 Dijauhin dari hal-hal yang bikin overthinking, dan selalu dikelilingi orang-orang baik yang tulus sayang sama kamu.
✨ Semoga apapun impian, cita-cita, dan doa terbaik kamu di tahun ini bisa terwujud satu per satu!

Makasih ya udah selalu jadi orang yang asik, manis, dan baik banget selama ini.
Tetep jadi Alya yang ceria, gokil, dan jangan pernah ngerasa sendirian. Kalo kamu butuh teman cerita, teman curhat, atau teman jalan, kamu tau harus nyari siapa kan? 😎

Sekali lagi, Happy Birthday ya Alya! 🥳👑
- Dari orang yang selalu siap ada buat kamu 🐾💖`;

  let i = 0;
  let timer = null;
  textEl.textContent = '';

  function typeChar() {
    if (i < fullLetter.length) {
      textEl.textContent += fullLetter.charAt(i);
      i++;
      const char = fullLetter.charAt(i - 1);
      const delay = (char === '\n' || char === '.') ? 240 : 25;
      timer = setTimeout(typeChar, delay);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && i === 0) {
        typeChar();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(textEl);

  const replayBtn = document.getElementById('btn-replay-letter');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      if (timer) clearTimeout(timer);
      textEl.textContent = '';
      i = 0;
      typeChar();
      if (window.soundMaster) window.soundMaster.playTaDa();
    });
  }
}

// Global Confetti Shower Generator
window.spawnConfettiShower = function(count = 50) {
  const colors = ['#ff4081', '#ffeb3b', '#00e676', '#00b0ff', '#aa00ff', '#ff9100', '#ffffff'];
  const symbols = ['🎉', '✨', '🐾', '💖', '🎂', '⭐', '🎈'];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';

    if (Math.random() < 0.4) {
      confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      confetti.style.fontSize = `${Math.random() * 16 + 14}px`;
    } else {
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 8;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size * (Math.random() > 0.5 ? 1 : 2)}px`;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    }

    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = `-20px`;
    confetti.style.animationDuration = `${Math.random() * 2.5 + 2}s`;
    confetti.style.animationDelay = `${Math.random() * 0.5}s`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4500);
  }
};

// Bat-Confetti Shower (Bats & Yellow Sparkles)
function spawnBatConfettiShower(count = 40) {
  const batSymbols = ['🦇', '🖤', '⭐', '✨', '🦇', '💛'];
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'confetti-piece';
    b.textContent = batSymbols[Math.floor(Math.random() * batSymbols.length)];
    b.style.fontSize = `${Math.random() * 18 + 16}px`;
    b.style.left = `${Math.random() * 100}vw`;
    b.style.top = `-20px`;
    b.style.animationDuration = `${Math.random() * 2.5 + 2}s`;
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 4500);
  }
}

function spawnFloatingCats() {
  const catMemes = ['🐱', '😹', '🧁', '🎉', '🐾', '😻', '🍌', '🍞'];
  setInterval(() => {
    if (document.hidden) return;
    const floater = document.createElement('div');
    floater.className = 'ambient-floating-emoji';
    floater.textContent = catMemes[Math.floor(Math.random() * catMemes.length)];
    floater.style.left = `${Math.random() * 95}vw`;
    floater.style.fontSize = `${Math.random() * 20 + 20}px`;
    floater.style.animationDuration = `${Math.random() * 6 + 7}s`;
    document.body.appendChild(floater);

    setTimeout(() => floater.remove(), 14000);
  }, 2500);
}
