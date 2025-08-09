
const logo = document.querySelector('.logo-pick');
const slogan = document.querySelector('.slogan');
const enterBtn = document.querySelector('.enter-btn');
const words = document.querySelectorAll('.word');

const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

tl.to(logo, {
  duration: 5,
  scale: 2.8,
  rotateY: 1080,
  opacity: 1,
  filter: "drop-shadow(0 0 10px #fff) drop-shadow(0 0 18px #eee)"
})
.to(logo, {
  duration: 2,
  scale: 3.1,
  filter: "drop-shadow(0 0 30px #fff) drop-shadow(0 0 50px #ccc)"
})
.add(() => {
  slogan.style.opacity = 1;
})
.to(words[0], { opacity: 1, textShadow: "0 0 10px white", duration: 0.6 })
.to(words[1], { opacity: 1, textShadow: "0 0 10px white", duration: 0.6 })
.to(words[2], { opacity: 1, textShadow: "0 0 10px white", duration: 0.6 })
.to(slogan, { scale: 1, duration: 0.4 })
.to(enterBtn, {
  opacity: 1,
  duration: 1,
  onComplete: () => enterBtn.classList.add("pulse")
});
