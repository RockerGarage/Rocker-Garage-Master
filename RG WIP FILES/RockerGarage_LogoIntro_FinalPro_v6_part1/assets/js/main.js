
const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
const logo = document.getElementById('logo');
const slogan = document.getElementById('slogan');
const enter = document.getElementById('enter');
const headlights = document.getElementById('headlights');

// Old-school sealed-beam warm-up
const headlightFlicker = gsap.timeline({ paused: true })
  .to(headlights, { opacity: 0.25, duration: 0.06 })
  .to(headlights, { opacity: 0.02, duration: 0.09 })
  .to(headlights, { opacity: 0.38, duration: 0.07 })
  .to(headlights, { opacity: 0.06, duration: 0.08 })
  .to(headlights, { opacity: 0.55, duration: 0.25 })
  .to(headlights, { opacity: 0.42, duration: 0.35 })
  .to(headlights, { opacity: 0.58, duration: 0.45 })
  .to(headlights, { opacity: 0.5, duration: 0.6 });

tl.to(logo, { duration: 5.0, scale: 1.45, rotateY: 1080, opacity: 1, filter: "drop-shadow(0 0 12px #fff) drop-shadow(0 0 20px #eee)" })
  .to(logo, { duration: 1.6, scale: 1.56, filter: "drop-shadow(0 0 28px #fff) drop-shadow(0 0 46px #d9d9d9)" }, ">-0.2")
  .add(() => headlightFlicker.play(0), "-=4.4")
  .to(slogan, { opacity: 1, duration: 0.9 }, ">-0.2")
  .to(slogan, { filter: "drop-shadow(0 0 14px #fff)", duration: 0.4 })
  .to(slogan, { opacity: 0, duration: 1.2, delay: 0.6 })
  .to(logo, { filter: "drop-shadow(0 0 34px #fff) drop-shadow(0 0 60px #ccc)", duration: 0.4 }, "<")
  .to(enter, { opacity: 1, duration: 1.1, onComplete: () => enter.classList.add('pulse') });

enter.addEventListener('click', (e) => { e.preventDefault(); /* hook route here */ });
