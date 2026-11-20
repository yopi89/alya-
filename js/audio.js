// Audio Controller with Web Audio API Synthesizer & Meme Soundboard
class SoundMaster {
  constructor() {
    this.ctx = null;
    this.bgmPlaying = false;
    this.isMuted = false;
    this.synthLoopTimer = null;
    this.bgmAudio = null;
    this.tempo = 140;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmAudio) {
      this.bgmAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  // Pop sound for Popcat
  playPop() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 600 + Math.random() * 250;
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.07);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  // Meow synthesizer
  playMeow() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(500, t + 0.4);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.45);
  }

  // Meme "Huh??" sound
  playHuh() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.linearRampToValueAtTime(320, t + 0.18);
    osc.frequency.linearRampToValueAtTime(280, t + 0.28);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.Q.setValueAtTime(3, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.32);
  }

  // Meme "Yippee!" sound
  playYippee() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);
    });
  }

  // Meme "Chipi Chipi" bouncy chirp
  playChipi() {
    if (this.isMuted) return;
    this.init();
    const notes = [659.25, 659.25, 587.33, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  // Cartoon boing
  playBoing() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(650, t + 0.35);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Confetti / party burst sound
  playConfetti() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + 0.25);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    this.playTaDa();
  }

  // Blowing candle sound
  playBlow() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(200, t + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.linearRampToValueAtTime(0.3, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  // Ta-Da fanfare chords
  playTaDa() {
    if (this.isMuted) return;
    this.init();
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.05;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.6);
    });
  }

  // Dramatic Batman Cinematic Brass Sound
  playBatmanTheme() {
    if (this.isMuted) return;
    this.init();
    const t = this.ctx.currentTime;

    const batmanNotes = [73.42, 87.31, 98.00, 73.42];
    batmanNotes.forEach((freq, i) => {
      const noteTime = t + i * 0.35;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, noteTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, noteTime);
      filter.frequency.linearRampToValueAtTime(600, noteTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(120, noteTime + 0.5);

      gain.gain.setValueAtTime(0.01, noteTime);
      gain.gain.linearRampToValueAtTime(0.28, noteTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.5);
    });
  }

  // Procedural 8-bit Happy Birthday Song Loop
  startBirthdaySong() {
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    this.bgmAudio = document.getElementById('bgm-audio');
    if (this.bgmAudio && this.bgmAudio.src && !this.bgmAudio.error) {
      this.bgmAudio.volume = 0.6;
      this.bgmAudio.play().catch(() => {
        this.runSynthBirthdayLoop();
      });
    } else {
      this.runSynthBirthdayLoop();
    }
  }

  stopBirthdaySong() {
    this.bgmPlaying = false;
    if (this.synthLoopTimer) {
      clearTimeout(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  runSynthBirthdayLoop() {
    if (!this.bgmPlaying) return;

    const notes = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
      'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46
    };

    const melody = [
      ['C4', 0.75], ['C4', 0.25], ['D4', 1], ['C4', 1], ['F4', 1], ['E4', 2],
      ['C4', 0.75], ['C4', 0.25], ['D4', 1], ['C4', 1], ['G4', 1], ['F4', 2],
      ['C4', 0.75], ['C4', 0.25], ['C5', 1], ['A4', 1], ['F4', 1], ['E4', 1], ['D4', 2],
      ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1], ['F4', 1], ['G4', 1], ['F4', 2.5]
    ];

    const beatDuration = 0.42;
    let totalTime = 0;

    melody.forEach(([noteName, beats]) => {
      const startTime = this.ctx.currentTime + totalTime;
      const duration = beats * beatDuration;

      if (!this.isMuted && this.bgmPlaying) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(notes[noteName], startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);

        if (beats >= 1) {
          const bass = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bass.type = 'sine';
          bass.frequency.setValueAtTime(notes[noteName] / 2, startTime);
          bassGain.gain.setValueAtTime(0.12, startTime);
          bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

          bass.connect(bassGain);
          bassGain.connect(this.ctx.destination);

          bass.start(startTime);
          bass.stop(startTime + 0.35);
        }
      }

      totalTime += duration;
    });

    this.synthLoopTimer = setTimeout(() => {
      if (this.bgmPlaying) {
        this.runSynthBirthdayLoop();
      }
    }, (totalTime + 1.2) * 1000);
  }
}

window.soundMaster = new SoundMaster();
