// SoundMaster v6 — 9 meme sounds via HTMLAudioElement + BGM Nadin Amizah
class SoundMaster {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.bgmPlaying = false;
    this.isMuted = false;
    this.synthLoopTimer = null;
    this.bgmAudio = document.getElementById('bgm-audio');
    this._buffers = {};
    this._audioEls = {}; // HTMLAudioElement pool
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AC();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-6, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.1, this.ctx.currentTime);

    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.ctx.destination);
  }

  // Play MP3 via HTMLAudioElement (works on file:// AND localhost).
  // Falls back to synthFn if file fails to load.
  _playFile(filename, synthFn) {
    if (this.isMuted) return;
    this.init();

    // Reuse cached element, or create a new one
    let audio = this._audioEls[filename];
    if (!audio) {
      audio = new Audio('assets/sounds/' + filename);
      audio.preload = 'auto';
      this._audioEls[filename] = audio;
    }

    audio.volume = 0.9;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // File unavailable — run synth fallback
        if (synthFn) synthFn.call(this);
      });
    }
  }

  _playBuffer(buffer) {
    if (!this.ctx || this.isMuted) return;
    const src = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    src.buffer = buffer;
    gain.gain.setValueAtTime(0.9, this.ctx.currentTime);
    src.connect(gain);
    gain.connect(this.masterGain);
    src.start();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) this.bgmAudio.muted = this.isMuted;
    // Mute/unmute all cached HTMLAudioElements
    Object.values(this._audioEls).forEach(el => { el.muted = this.isMuted; });
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1.0, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // ── POP (Popcat click) ────────────────────────────────────
  playPop() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200 + Math.random() * 400, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(t); osc.stop(t + 0.08);
  }

  // ── 1. MEOW — meow-1.mp3 ─────────────────────────────────
  playMeow() { this._playFile('meow-1.mp3', this._synthMeow); }
  _synthMeow() {
    const t = this.ctx.currentTime;
    [[300,950,520],[600,1900,1040]].forEach(([s,p,e],i) => {
      const osc=this.ctx.createOscillator(), gain=this.ctx.createGain(), filt=this.ctx.createBiquadFilter();
      osc.type=i===0?'sawtooth':'triangle'; osc.frequency.setValueAtTime(s,t); osc.frequency.linearRampToValueAtTime(p,t+.14); osc.frequency.exponentialRampToValueAtTime(e,t+.55);
      filt.type='bandpass'; filt.frequency.setValueAtTime(1400,t); filt.Q.setValueAtTime(4,t);
      gain.gain.setValueAtTime(.01,t); gain.gain.linearRampToValueAtTime(i===0?.9:.5,t+.08); gain.gain.exponentialRampToValueAtTime(.001,t+.6);
      osc.connect(filt); filt.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+.6);
    });
  }

  // ── 2. HUH — huh-cat-meme.mp3 ───────────────────────────
  playHuh() { this._playFile('huh-cat-meme.mp3', this._synthHuh); }
  _synthHuh() {
    const t = this.ctx.currentTime;
    ['sawtooth','square'].forEach((type,i) => {
      const osc=this.ctx.createOscillator(), gain=this.ctx.createGain(), filt=this.ctx.createBiquadFilter();
      osc.type=type; osc.frequency.setValueAtTime(i===0?380:190,t); osc.frequency.exponentialRampToValueAtTime(i===0?70:90,t+.42);
      filt.type='lowpass'; filt.frequency.setValueAtTime(1800,t); filt.frequency.exponentialRampToValueAtTime(300,t+.42);
      gain.gain.setValueAtTime(.01,t); gain.gain.linearRampToValueAtTime(i===0?1.0:.5,t+.04); gain.gain.exponentialRampToValueAtTime(.001,t+.48);
      osc.connect(filt); filt.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+.48);
    });
  }

  // ── 3. YIPPEE — yippee-tbh.mp3 ──────────────────────────
  playYippee() { this._playFile('yippee-tbh.mp3', this._synthYippee); }
  _synthYippee() {
    [392,523.25,659.25,783.99,1046.5,1318.5,1567.98,2093].forEach((freq,i) => {
      const t=this.ctx.currentTime+i*.065, osc=this.ctx.createOscillator(), gain=this.ctx.createGain();
      osc.type=i%2===0?'triangle':'sine'; osc.frequency.setValueAtTime(freq,t);
      gain.gain.setValueAtTime(.8,t); gain.gain.exponentialRampToValueAtTime(.001,t+.22);
      osc.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+.22);
    });
  }

  // ── 4. OIIA OIIA — oiia-oiia-sound.mp3 ─────────────────
  playOiia() { this._playFile('oiia-oiia-sound.mp3', this._synthChipi); }

  // ── 5. CAT LAUGH — cat-laugh-meme-1.mp3 ─────────────────
  playCatLaugh() { this._playFile('cat-laugh-meme-1.mp3', this._synthYippee); }

  // ── 6. BOING — cartoon-boing_7vRWDlc.mp3 ───────────────
  playBoing() { this._playFile('cartoon-boing_7vRWDlc.mp3', this._synthBoing); }
  _synthBoing() {
    const t=this.ctx.currentTime;
    [[60,1400,350,1.0],[120,700,180,.6]].forEach(([s,peak,end,vol]) => {
      const osc=this.ctx.createOscillator(), gain=this.ctx.createGain();
      osc.type='sine'; osc.frequency.setValueAtTime(s,t); osc.frequency.exponentialRampToValueAtTime(peak,t+.45); osc.frequency.exponentialRampToValueAtTime(end,t+.85);
      gain.gain.setValueAtTime(vol,t); gain.gain.exponentialRampToValueAtTime(.001,t+.95);
      osc.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+.95);
    });
  }

  // ── 7. BARK FART — bark-fart_XRsy1HE.mp3 ──────────────
  playBarkFart() { this._playFile('bark-fart_XRsy1HE.mp3', this._synthBoing); }

  // ── 8. YA ALLAH — ya-allah-cantik-banget.mp3 ───────────
  playYaAllah() { this._playFile('ya-allah-cantik-banget.mp3', this._synthMeow); }

  // ── 9. YAPAPA — yapapa-cat_UwLkrYZ.mp3 ─────────────────
  playYapapa() { this._playFile('yapapa-cat_UwLkrYZ.mp3', this._synthChipi); }

  _synthChipi() {
    [[659.25,0],[659.25,.1],[587.33,.2],[523.25,.3],[659.25,.4],[783.99,.52],[880,.64],[783.99,.76],[659.25,.88]].forEach(([freq,delay]) => {
      const t=this.ctx.currentTime+delay, osc=this.ctx.createOscillator(), gain=this.ctx.createGain();
      osc.type='square'; osc.frequency.setValueAtTime(freq,t);
      gain.gain.setValueAtTime(.6,t); gain.gain.exponentialRampToValueAtTime(.001,t+.09);
      osc.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+.1);
    });
  }

  // ── TA-DA (gift/confetti) ─────────────────────────────────
  playTaDa() {
    if (this.isMuted) return;
    this.init();
    [261.63,392,523.25,659.25,783.99,1046.5].forEach((freq,i) => {
      const t=this.ctx.currentTime+i*.04, osc=this.ctx.createOscillator(), gain=this.ctx.createGain();
      osc.type=i<2?'sawtooth':'triangle'; osc.frequency.setValueAtTime(freq,t);
      gain.gain.setValueAtTime(.7,t); gain.gain.exponentialRampToValueAtTime(.001,t+1.0);
      osc.connect(gain); gain.connect(this.masterGain); osc.start(t); osc.stop(t+1.0);
    });
  }

  playConfetti() { if (!this.isMuted) { this.init(); this.playTaDa(); } }

  // ── BLOW (candle) ─────────────────────────────────────────
  playBlow() {
    if (this.isMuted) return;
    this.init();
    const t=this.ctx.currentTime, bufSize=this.ctx.sampleRate*.7;
    const buf=this.ctx.createBuffer(1,bufSize,this.ctx.sampleRate);
    const data=buf.getChannelData(0);
    for (let i=0;i<bufSize;i++) data[i]=Math.random()*2-1;
    const noise=this.ctx.createBufferSource(); noise.buffer=buf;
    const filt=this.ctx.createBiquadFilter(); filt.type='lowpass'; filt.frequency.setValueAtTime(900,t); filt.frequency.linearRampToValueAtTime(180,t+.7);
    const gain=this.ctx.createGain(); gain.gain.setValueAtTime(.05,t); gain.gain.linearRampToValueAtTime(.6,t+.15); gain.gain.exponentialRampToValueAtTime(.001,t+.7);
    noise.connect(filt); filt.connect(gain); gain.connect(this.masterGain); noise.start(t);
  }

  // ── Batman theme (synth fallback, tombol dihapus) ────────
  playBatmanTheme() { this._synthYippee.call(this); }

  // ── BGM: Semua Akan Dirayakan - Nadin Amizah ─────────────
  startBirthdaySong() {
    if (this.bgmPlaying) return;
    this.bgmPlaying = true;
    if (this.bgmAudio) {
      this.bgmAudio.volume = 0.65;
      this.bgmAudio.muted = false;
      this.bgmAudio.play().catch(err => console.warn('BGM:', err));
    }
  }

  stopBirthdaySong() {
    this.bgmPlaying = false;
    if (this.bgmAudio) { this.bgmAudio.pause(); this.bgmAudio.currentTime = 0; }
    if (this.synthLoopTimer) { clearTimeout(this.synthLoopTimer); this.synthLoopTimer = null; }
  }
}

window.soundMaster = new SoundMaster();

// Unlock AudioContext on first user gesture
(function() {
  const unlock = () => { if (window.soundMaster) window.soundMaster.init(); };
  document.addEventListener('click', unlock, { once: true });
  document.addEventListener('touchstart', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
})();
