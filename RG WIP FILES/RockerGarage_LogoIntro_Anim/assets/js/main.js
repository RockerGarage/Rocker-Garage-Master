
const tl = gsap.timeline();

tl.to(".logo", {
    duration: 1.2,
    opacity: 1,
    scale: 5,
    rotateX: 0,
    ease: "power2.out",
    boxShadow: "0 0 40px white",
})
.to(".logo", {
    duration: 0.3,
    boxShadow: "0 0 0px white",
    repeat: 3,
    yoyo: true
})
.addLabel("sloganIn")
.to(".slogan", {
    duration: 0.3,
    opacity: 1
})
.to(".word", {
    duration: 0.5,
    opacity: 1,
    textShadow: "0 0 10px white",
    stagger: 0.5
})
.to(".logo", {
    duration: 0.2,
    scale: 5.2,
    boxShadow: "0 0 80px white",
    ease: "power4.out"
});
