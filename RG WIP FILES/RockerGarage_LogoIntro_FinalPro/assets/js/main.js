
const logo = document.querySelector('.logo-pick');
const slogan = document.querySelector('.slogan');
const enterBtn = document.querySelector('.enter-btn');

const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

tl.to(logo, {
  duration: 1,
  scale: 1,
  rotateY: 360,
  opacity: 1,
  filter: "drop-shadow(0 0 15px white)"
})
.add(() => document.getElementById('w1').style.opacity = 1)
.add(() => document.getElementById('w1').style.textShadow = '0 0 10px white')
.to(logo, {
  duration: 1,
  rotateY: 720,
  filter: "drop-shadow(0 0 20px white)"
})
.add(() => document.getElementById('w2').style.opacity = 1)
.add(() => document.getElementById('w2').style.textShadow = '0 0 10px white')
.to(logo, {
  duration: 1,
  rotateY: 1080,
  filter: "drop-shadow(0 0 30px white)"
})
.add(() => document.getElementById('w3').style.opacity = 1)
.add(() => document.getElementById('w3').style.textShadow = '0 0 10px white')
.to(logo, {
  duration: 0.5,
  scale: 1.1,
  filter: "drop-shadow(0 0 50px white)"
})
.to(slogan, { opacity: 1, duration: 0.5 })
.to(enterBtn, { display: 'block', opacity: 1, duration: 1 });
