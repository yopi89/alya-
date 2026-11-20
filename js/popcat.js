// Popcat Clicker Game Engine (Reset Fresh on Every Visit)
class PopcatGame {
  constructor() {
    this.score = 0; // Always fresh 0
    this.isOpen = false;
    this.element = null;
    this.counterEl = null;
    this.badgeEl = null;
    this.cpsEl = null;
    this.clicksInLastSec = 0;
    this.milestones = {
      5: "Mulai panas nih jempolnya kamu! 🔥",
      15: "Popcat seneng banget liat kamu senyum! 😻",
      30: "Kecepatan jempol di luar nalar! 🚀",
      50: "Udah 50x! Semangat terus buat Alya! ⭐",
      69: "Angka keramat detected 👀",
      100: "KAMU RATU PALING GOKIL SE-GALAXY! 👑🐱",
      150: "Layak dapat traktiran seblak seumur hidup! 🍲",
      200: "Energi positif kamu ga ada obat! 🔥"
    };
  }

  init() {
    // Clear any previous saved score from localStorage so it resets every reload
    try {
      localStorage.removeItem('popcat_alya_score');
    } catch(e) {}

    this.score = 0;
    this.element = document.getElementById('popcat-character');
    this.counterEl = document.getElementById('popcat-count');
    this.badgeEl = document.getElementById('popcat-badge');
    this.cpsEl = document.getElementById('popcat-cps');

    this.updateCounter();
    if (this.badgeEl) {
      this.badgeEl.textContent = "Klik Popcat untuk mulai! 👆";
    }

    if (!this.element) return;

    const triggerPop = (e) => {
      e.preventDefault();
      this.pop();
    };

    const triggerRelease = (e) => {
      e.preventDefault();
      this.unpop();
    };

    this.element.addEventListener('pointerdown', triggerPop);
    window.addEventListener('pointerup', triggerRelease);

    window.addEventListener('keydown', (e) => {
      if ((e.code === 'Space' || e.key === 'Enter') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        if (!this.isOpen) {
          this.pop();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        this.unpop();
      }
    });

    setInterval(() => {
      if (this.cpsEl) {
        this.cpsEl.textContent = `${this.clicksInLastSec} CPS`;
      }
      this.clicksInLastSec = 0;
    }, 1000);
  }

  pop() {
    this.score++;
    this.clicksInLastSec++;
    this.isOpen = true;

    if (window.soundMaster) {
      window.soundMaster.playPop();
    }

    if (this.element) {
      this.element.classList.add('open');
      this.element.classList.remove('closed');
    }

    this.updateCounter();
    this.spawnFloatingPlusOne();
    this.checkMilestones();
  }

  unpop() {
    this.isOpen = false;
    if (this.element) {
      this.element.classList.remove('open');
      this.element.classList.add('closed');
    }
  }

  updateCounter() {
    if (this.counterEl) {
      this.counterEl.textContent = this.score.toLocaleString();
    }
  }

  spawnFloatingPlusOne() {
    if (!this.element) return;
    const rect = this.element.getBoundingClientRect();
    const plusOne = document.createElement('div');
    plusOne.className = 'floating-pop-text';
    
    const texts = ['+1', 'POP!', 'HABEDE!', 'ALYA!', '🐾', '🎂', '+1 PAHALA', 'SEMANGAT!'];
    plusOne.textContent = texts[Math.floor(Math.random() * texts.length)];

    const randomX = (Math.random() - 0.5) * 120;
    plusOne.style.left = `${rect.left + rect.width / 2 + randomX}px`;
    plusOne.style.top = `${rect.top + 40}px`;

    document.body.appendChild(plusOne);

    setTimeout(() => {
      plusOne.remove();
    }, 900);
  }

  checkMilestones() {
    if (this.milestones[this.score]) {
      const msg = this.milestones[this.score];
      if (this.badgeEl) {
        this.badgeEl.textContent = msg;
        this.badgeEl.classList.remove('bounce-badge');
        void this.badgeEl.offsetWidth;
        this.badgeEl.classList.add('bounce-badge');
      }

      if (window.soundMaster) {
        window.soundMaster.playConfetti();
      }

      if (window.spawnConfettiShower) {
        window.spawnConfettiShower(35);
      }
    }
  }
}

window.popcatGame = new PopcatGame();
