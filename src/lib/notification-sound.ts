// Web Audio API Synthesizer for high-quality, zero-dependency notification chimes

export function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonic two-tone chime (Gmail / Slack inspired)
    // Tone 1: High crisp frequency
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Tone 2: Warm fundamental body
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.1); // A5
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.setValueAtTime(0.22, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.55);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.7);

    // Clean up audio context
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1000);
  } catch (e) {
    console.debug('Audio chime playback omitted or blocked by browser policy:', e);
  }
}
