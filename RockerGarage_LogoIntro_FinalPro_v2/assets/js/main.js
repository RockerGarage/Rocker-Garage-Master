
const logo = document.querySelector('.logo-pick');
const slogan = document.querySelector('.slogan');
const enterBtn = document.querySelector('.enter-btn');

const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

tl.to(logo, {
  duration: 2.5,
  scale: 3,
  rotateY: 360,
  opacity: 1,
  filter: "drop-shadow(0 0 15px white)"
})
.add(() => {
  const w1 = document.getElementById('w1');
  w1.style.opacity = 1;
  w1.style.textShadow = '0 0 10px white';
})
.to(logo, {
  duration: 2.5,
  rotateY: 720,
  filter: "drop-shadow(0 0 25px white)"
})
.add(() => {
  const w2 = document.getElementById('w2');
  w2.style.opacity = 1;
  w2.style.textShadow = '0 0 10px white';
})
.to(logo, {
  duration: 2.5,
  rotateY: 1080,
  filter: "drop-shadow(0 0 35px white)"
})
.add(() => {
  const w3 = document.getElementById('w3');
  w3.style.opacity = 1;
  w3.style.textShadow = '0 0 10px white';
})
.to(slogan, { opacity: 1, duration: 0.5 })
.to(logo, {
  duration: 0.6,
  scale: 3.3,
  filter: "drop-shadow(0 0 60px white)"
})
.to(enterBtn, { opacity: 1, duration: 1 });
