type Click = { freq: number; decay: number; gain: number };
type Sweep = { from: number; to: number; attack: number; hold: number; end: number; gain: number };
type Sound = { click: Click; sweep: Sweep };

const master = 0.5;
const wet = 0.15;
const tail = 0.25;

const openSound: Sound = {
  click: { freq: 560, decay: 0.014, gain: 0.6 },
  sweep: { from: 420, to: 760, attack: 0.008, hold: 0.08, end: 0.17, gain: 0.3 },
};

const closeSound: Sound = {
  click: { freq: 780, decay: 0.012, gain: 0.45 },
  sweep: { from: 700, to: 370, attack: 0.012, hold: 0.09, end: 0.2, gain: 0.3 },
};

const bumpSound = { from: 680, to: 1100, drop: 1.3, decay: 0.02, gain: 0.4, floor: 0.35 };

let ctx: AudioContext | undefined;
let reverb: ConvolverNode | undefined;

function context() {
  if (typeof window === "undefined" || !("AudioContext" in window)) return;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function impulse(ac: AudioContext) {
  const n = Math.floor(ac.sampleRate * tail);
  const buffer = ac.createBuffer(2, n, ac.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    let smooth = 0;
    let energy = 0;
    for (let i = 0; i < n; i++) {
      smooth += (Math.random() * 2 - 1 - smooth) * 0.25;
      data[i] = smooth * Math.exp((-i / ac.sampleRate) * 18);
      energy += data[i] * data[i];
    }
    const scale = 1 / Math.sqrt(energy);
    for (let i = 0; i < n; i++) data[i] *= scale;
  }
  return buffer;
}

function bus(ac: AudioContext) {
  const dry = ac.createGain();
  dry.gain.value = master;
  dry.connect(ac.destination);
  const out = ac.createGain();
  out.gain.value = master;
  out.connect(ac.destination);
  if (!reverb) {
    reverb = ac.createConvolver();
    reverb.normalize = false;
    reverb.buffer = impulse(ac);
    const wetGain = ac.createGain();
    wetGain.gain.value = wet;
    reverb.connect(wetGain).connect(ac.destination);
  }
  out.connect(reverb);
  return { dry, out };
}

function voice(ac: AudioContext, out: GainNode, sweep: Sweep, t: number) {
  const o = ac.createOscillator();
  o.frequency.setValueAtTime(sweep.from, t);
  o.frequency.exponentialRampToValueAtTime(sweep.to, t + sweep.end);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(sweep.gain, t + sweep.attack);
  g.gain.setValueAtTime(sweep.gain, t + sweep.hold);
  g.gain.exponentialRampToValueAtTime(0.0001, t + sweep.end);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + sweep.end + 0.02);
}

function play({ click, sweep }: Sound) {
  const ac = context();
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  const { dry, out } = bus(ac);

  const c = ac.createOscillator();
  c.frequency.value = click.freq;
  const cg = ac.createGain();
  cg.gain.setValueAtTime(click.gain, t);
  cg.gain.setTargetAtTime(0, t, click.decay);
  c.connect(cg).connect(dry);
  c.start(t);
  c.stop(t + click.decay * 8);

  voice(ac, out, sweep, t);
}

export function playBump(strength: number) {
  const ac = context();
  if (!ac) return;
  const t = ac.currentTime + 0.005;
  const { out } = bus(ac);
  const { from, to, drop, decay, gain, floor } = bumpSound;
  const freq = from + (to - from) * strength;
  const o = ac.createOscillator();
  o.frequency.setValueAtTime(freq * drop, t);
  o.frequency.exponentialRampToValueAtTime(freq, t + decay);
  const g = ac.createGain();
  g.gain.setValueAtTime(gain * (floor + (1 - floor) * strength), t);
  g.gain.setTargetAtTime(0, t, decay);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + decay * 8);
}

export const playOpen = () => play(openSound);
export const playClose = () => play(closeSound);
