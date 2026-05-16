// lib/sound.ts
export function playClick() {
  const ctx = new window.AudioContext()
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = "triangle"
  o.frequency.value = 410
  g.gain.value = 0.13
  o.connect(g); g.connect(ctx.destination)
  o.start();
  o.stop(ctx.currentTime + 0.045)
  setTimeout(()=>ctx.close(),90)
}
