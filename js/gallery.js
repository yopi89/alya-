// Galeri Foto Alya — diurutkan per kategori folder
const ALYA_PHOTOS = [

  // ── AESTHETIC (5 foto) ───────────────────────────────────
  {
    file: "aesthetic/656080569_17930138475213268_3389488791301076831_n.webp",
    caption: "Kamu cantik bahkan dari belakang. Wajar sih.",
    sticker: "🌊",
    tag: "Aesthetic"
  },
  {
    file: "aesthetic/660007799_17930138466213268_497163415395743804_n.webp",
    caption: "Pantai yang bagus. Tapi bukan itu yang aku lihat pertama.",
    sticker: "✨",
    tag: "Aesthetic"
  },
  {
    file: "aesthetic/777899022_17951559279213268_5881571492266534553_n.webp",
    caption: "Cantiknya di foto ini ga perlu diceritain.",
    sticker: "🖤",
    tag: "Aesthetic"
  },
  {
    file: "aesthetic/777899028_17951559345213268_7430731507049656157_n.webp",
    caption: "Ini foto yang bikin orang scroll balik lagi.",
    sticker: "🎀",
    tag: "Aesthetic"
  },
  {
    file: "aesthetic/780422099_17951559324213268_6887325728555561911_n.webp",
    caption: "Santai aja, tapi tetap yang paling menarik di frame.",
    sticker: "🌷",
    tag: "Aesthetic"
  },

  // ── CUTE (3 foto) ────────────────────────────────────────
  {
    file: "cute/799525572_17956638141213268_7631786848480396652_n.webp",
    caption: "Kamu sampe jadi bunga sendiri. Masuk akal sih.",
    sticker: "🧸",
    tag: "Cute"
  },
  {
    file: "cute/818598468_17956638114213268_8850160955124446505_n.webp",
    caption: "Versi dua dari yang sama. Dua-duanya bagus.",
    sticker: "🎀",
    tag: "Cute"
  },
  {
    file: "cute/clean_alya_ss_4.jpg",
    caption: "Tiga pose dan aku ga tau harus fokus yang mana.",
    sticker: "👓",
    tag: "Cute"
  },

  // ── FAVORIT (5 foto) ─────────────────────────────────────
  {
    file: "favorit/775245324_17951661810213268_4719874831984001455_n.webp",
    caption: "Foto ini masuk favorit. Rasa kamu juga tau kenapa.",
    sticker: "💖",
    tag: "Favorit"
  },
  {
    file: "favorit/776685965_17951559288213268_6067713652071585814_n.webp",
    caption: "Tatapan kameranya itu... iya, aku notice.",
    sticker: "🌺",
    tag: "Favorit"
  },
  {
    file: "favorit/777396768_17951661903213268_9044189592767086780_n.webp",
    caption: "Ga bisa dilewatin begitu aja. Udah coba, ga berhasil.",
    sticker: "⭐",
    tag: "Favorit"
  },
  {
    file: "favorit/780139888_17951559306213268_8925029962629450559_n.webp",
    caption: "Santai tapi entah kenapa susah dialihkan pandangannya.",
    sticker: "✨",
    tag: "Favorit"
  },
  {
    file: "favorit/clean_alya_ss_6.jpg",
    caption: "Ada bunga di foto ini. Tapi bukan itu yang lebih cantik.",
    sticker: "🌟",
    tag: "Favorit"
  },

  // ── KECE ABIS (4 foto) ───────────────────────────────────
  {
    file: "kece abis/774826034_17951661828213268_4787564003356196853_n.webp",
    caption: "Confident level ini beda sendiri.",
    sticker: "🔥",
    tag: "Kece"
  },
  {
    file: "kece abis/780255788_17951661780213268_2306010668180685044_n.webp",
    caption: "Pose males tapi keliatan bagus. Itu susah dilakuin.",
    sticker: "🌊",
    tag: "Kece"
  },
  {
    file: "kece abis/clean_alya_ss_1.jpg",
    caption: "Vibe foto ini ga perlu caption tambahan.",
    sticker: "🖤",
    tag: "Kece"
  },
  {
    file: "kece abis/clean_alya_ss_5.jpg",
    caption: "Tiga pose, semuanya sama kecenya. Konsisten.",
    sticker: "⚡",
    tag: "Kece"
  },

  // ── SWEET (2 foto) ───────────────────────────────────────
  {
    file: "sweet/clean_alya_ss_2.jpg",
    caption: "Santai di foto ini tapi cantiknya ga minta izin.",
    sticker: "🍯",
    tag: "Sweet"
  },
  {
    file: "sweet/clean_alya_ss_3.jpg",
    caption: "Closeup ini terlalu jelas. Dalam artian yang baik.",
    sticker: "🌸",
    tag: "Sweet"
  }
];

class PhotoGallery {
  constructor() {
    this.currentIdx = 0;
    this.filteredList = [...ALYA_PHOTOS];
    this.container = null;
    this.lightbox = null;
    this.likes = {};
  }

  init() {
    try {
      localStorage.removeItem('alya_gallery_likes');
    } catch(e) {}
    this.likes = {};

    this.container = document.getElementById('polaroid-grid');
    this.lightbox = document.getElementById('gallery-lightbox');
    
    this.renderGallery();
    this.initLightbox();
    this.initFilterTabs();
  }

  renderGallery() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.filteredList.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      
      const rot = ((index % 6) - 2.5) * 1.3;
      card.style.setProperty('--card-rot', `${rot}deg`);

      const photoLikes = this.likes[item.file] || 1;

      card.innerHTML = `
        <div class="polaroid-pin">📌</div>
        <div class="polaroid-sticker">${item.sticker}</div>
        <div class="polaroid-img-box">
          <img src="foto/${item.file}" alt="${item.caption}" loading="lazy">
        </div>
        <div class="polaroid-caption">
          <p class="caption-text">${item.caption}</p>
          <div class="polaroid-footer">
            <span class="polaroid-tag">#${item.tag}</span>
            <button class="like-btn" data-file="${item.file}" title="Kasih like">
              ❤️ <span class="like-count">${photoLikes}</span>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.polaroid-img-box').addEventListener('click', () => {
        this.openLightbox(index);
      });

      const likeBtn = card.querySelector('.like-btn');
      likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleLike(item.file, likeBtn);
      });

      this.container.appendChild(card);
    });
  }

  handleLike(file, buttonEl) {
    this.likes[file] = (this.likes[file] || 1) + 1;
    
    const countSpan = buttonEl.querySelector('.like-count');
    if (countSpan) countSpan.textContent = this.likes[file];

    buttonEl.classList.remove('like-bump');
    void buttonEl.offsetWidth;
    buttonEl.classList.add('like-bump');

    if (window.soundMaster) {
      window.soundMaster.playBoing();
    }
  }

  initLightbox() {
    if (!this.lightbox) return;

    const closeBtn = document.getElementById('lb-close');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevPhoto());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPhoto());

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.prevPhoto();
      if (e.key === 'ArrowRight') this.nextPhoto();
    });

    let touchStartX = 0;
    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) this.nextPhoto();
      if (touchEndX > touchStartX + 50) this.prevPhoto();
    }, { passive: true });
  }

  openLightbox(index) {
    this.currentIdx = index;
    this.updateLightboxContent();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (this.lightbox) {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  prevPhoto() {
    this.currentIdx = (this.currentIdx - 1 + this.filteredList.length) % this.filteredList.length;
    this.updateLightboxContent();
  }

  nextPhoto() {
    this.currentIdx = (this.currentIdx + 1) % this.filteredList.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const item = this.filteredList[this.currentIdx];
    if (!item) return;

    const img = document.getElementById('lb-img');
    const caption = document.getElementById('lb-caption');
    const count = document.getElementById('lb-counter');

    if (img) img.src = `foto/${item.file}`;
    if (caption) caption.textContent = `${item.sticker} ${item.caption}`;
    if (count) count.textContent = `${this.currentIdx + 1} / ${this.filteredList.length}`;
  }

  initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tag = tab.getAttribute('data-tag');
        if (tag === 'All') {
          this.filteredList = [...ALYA_PHOTOS];
        } else {
          this.filteredList = ALYA_PHOTOS.filter(p => p.tag === tag);
        }
        this.renderGallery();
      });
    });
  }
}

window.photoGallery = new PhotoGallery();
