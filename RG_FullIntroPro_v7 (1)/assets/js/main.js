
(function(){
  const headlights = document.getElementById('headlights');
  const logo = document.getElementById('logo');
  const slogan = document.getElementById('slogan');
  const enterBtn = document.getElementById('enter');
  const ampHum = document.getElementById('ampHum');
  const v8Rev = document.getElementById('v8Rev');

  function setOpacity(el, val){ if (el) el.style.opacity = String(val); }
  function addClass(el, c){ if (el && !el.classList.contains(c)) el.classList.add(c); }
  function remClass(el, c){ if (el && el.classList.contains(c)) el.classList.remove(c); }

  function pulseHeadlights(seq){
    let i=0;
    const kick = () => {
      if (!headlights || i>=seq.length) return;
      const isFinal = i === seq.length-1;
      setOpacity(headlights, isFinal ? 0.95 : 0.78);
      setTimeout(()=> setOpacity(headlights, 0.18), isFinal ? 320 : 200);
      i++; if (i<seq.length) setTimeout(kick, seq[i]-seq[i-1]);
    };
    setOpacity(headlights, 0.16);
    setTimeout(kick, seq[0]);
  }

  function startHum(){
    if (!ampHum) return;
    ampHum.loop = true;
    const tryPlay = () => ampHum.play().catch(()=>{});
    tryPlay();
    window.addEventListener('click', tryPlay, { once:true });
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaElementSource(ampHum);
      const gain = ctx.createGain();
      src.connect(gain).connect(ctx.destination);
      gain.gain.value = 0.0;
      const start = ctx.currentTime;
      gain.gain.setValueAtTime(0.0, start);
      gain.gain.linearRampToValueAtTime(0.35, start + 2.0);
    } catch(e) { ampHum.volume = 0.35; }
  }

  function animateLogoSequence(){
    if (!logo) return;
    logo.style.opacity = "1";
    logo.style.transition = "transform 7s cubic-bezier(.22,.61,.36,1), filter 1.6s ease";
    requestAnimationFrame(()=>{
      logo.style.transform = "scale(1.45) rotateY(1080deg)";
      addClass(logo, "neon-soft");
    });
    setTimeout(()=> addClass(logo, "neon-hard"), 5200);
  }

  function animateSlogan(){
    if (!slogan) return;
    slogan.style.opacity = "1";
    addClass(slogan, "neon-soft");
    setTimeout(()=> addClass(slogan, "neon-hard"), 600);
    setTimeout(()=> { remClass(slogan, "neon-hard"); slogan.style.opacity = "0"; }, 2200);
  }

  function showEnter(){
    if (!enterBtn) return;
    enterBtn.style.opacity = "1";
    enterBtn.style.transform = "translateY(0)";
    enterBtn.classList.add("pulse");
  }

  function runMain(){
    startHum();
    animateLogoSequence();
    setTimeout(animateSlogan, 900);
    setTimeout(showEnter, 6200);
  }

  function withTimeoutAudio(el, onReady, timeoutMs){
    let done=false;
    const timer = setTimeout(()=>{ if (!done) onReady("timeout"); }, timeoutMs);
    const ok = ()=>{ if(done) return; done=true; clearTimeout(timer); onReady("ok"); };
    const err= ()=>{ if(done) return; done=true; clearTimeout(timer); onReady("error"); };
    el.addEventListener('canplaythrough', ok, { once:true });
    el.addEventListener('loadedmetadata', ok, { once:true });
    el.addEventListener('error', err, { once:true });
  }

  function runFallbackIntro(){
    pulseHeadlights([350, 1000, 1700, 2600]);
    setTimeout(runMain, 3000);
  }

  if (v8Rev && v8Rev.src) {
    withTimeoutAudio(v8Rev, (state)=>{
      if (state === "ok") {
        const d = isNaN(v8Rev.duration) ? 2.8 : Math.max(2.0, Math.min(6.0, v8Rev.duration));
        const beats = [0.10, 0.40, 0.85, Math.max(1.2, d - 0.4)];
        const seq = beats.map(b => Math.floor(b*1000));
        v8Rev.currentTime = 0;
        v8Rev.play().catch(()=>{});
        pulseHeadlights(seq);
        v8Rev.addEventListener('ended', runMain, { once:true });
      } else {
        runFallbackIntro();
      }
    }, 700);
  } else {
    runFallbackIntro();
  }
})();
