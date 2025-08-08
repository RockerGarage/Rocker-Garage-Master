
const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

tl.to(".logo", {
    duration: 1.2,
    scale: 1,
    rotateX: 0,
    opacity: 1,
    boxShadow: "0 0 30px white"
})
.to(".logo", {
    duration: 0.2,
    boxShadow: "0 0 0px white",
    repeat: 2,
    yoyo: true
})
.to(".slogan", {
    duration: 0.5,
    opacity: 1
})
.to(".word", {
    duration: 0.6,
    opacity: 1,
    textShadow: "0 0 12px white",
    stagger: 0.4
})
.to(".logo", {
    duration: 0.2,
    scale: 1.05,
    boxShadow: "0 0 60px white"
});
