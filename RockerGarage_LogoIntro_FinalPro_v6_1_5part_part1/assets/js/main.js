
const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
const logo = document.getElementById('logo');
const slogan = document.getElementById('slogan');
const enterBtn = document.getElementById('enter');
const headlights = document.getElementById('headlights');
const ampHum = document.getElementById('ampHum');

// Play amp hum with gentle fade-in (needs user gesture on some browsers)
function playHum() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const track = ctx.createMediaElementSource(ampHum);
  const gain = ctx.createGain();
  track.connect(gain).connect(ctx.destination);
  gain.gain.value = 0.0;
  ampHum.play().catch(()=>{});
  gsap.to(gain.gain, { value: 0.35, duration: 2.0, ease: "power2.out" });
}
window.addEventListener('click', () => { if (ampHum.paused) playHum(); }, { once: true });

// Sealed-beam warm-up: deeper dips, brighter peaks, longer settle
const headlightFlicker = gsap.timeline({ paused: true });
headlightFlicker
  .to(headlights, { opacity: 0.00, duration: 0.08 })
  .to(headlights, { opacity: 0.48, duration: 0.10 })
  .to(headlights, { opacity: 0.10, duration: 0.12 })
  .to(headlights, { opacity: 0.66, duration: 0.14 })
  .to(headlights, { opacity: 0.16, duration: 0.16 })
  .to(headlights, { opacity: 0.74, duration: 0.18 })
  .to(headlights, { opacity: 0.24, duration: 0.22 })
  .to(headlights, { opacity: 0.82, duration: 0.28 })
  .to(headlights, { opacity: 0.30, duration: 0.30 })
  .to(headlights, { opacity: 0.90, duration: 0.36 })
  .to(headlights, { opacity: 0.52, duration: 0.50 });

// Main intro sequence
tl.to(logo, { duration: 5.0, scale: 1.45, rotateY: 1080, opacity: 1,
              filter: "drop-shadow(0 0 12px #fff) drop-shadow(0 0 20px #eee)" })
  .to(logo, { duration: 1.8, scale: 1.56,
              filter: "drop-shadow(0 0 30px #fff) drop-shadow(0 0 52px #d9d9d9)" }, ">-0.2")
  .add(() => { headlightFlicker.play(0); playHum(); }, "-=4.2")
  .to(slogan, { opacity: 1, duration: 1.0 }, ">-0.1")
  .to(slogan, { filter: "drop-shadow(0 0 16px #fff)", duration: 0.4 })
  .to(slogan, { opacity: 0, duration: 1.3, delay: 0.8 })
  .to(logo, { filter: "drop-shadow(0 0 36px #fff) drop-shadow(0 0 64px #cfcfcf)", duration: 0.5 }, "<")
  .to(enterBtn, { opacity: 1, duration: 1.1, onComplete: () => enterBtn.classList.add('pulse') });
