
(function(){
  const headlights = document.getElementById('headlights');
  const logo = document.getElementById('logo');
  const enterBtn = document.getElementById('enter');
  const ampHum = document.getElementById('ampHum');
  const v8Rev = document.getElementById('v8Rev');

  function setOpacity(el, val){ if (el) el.style.opacity = String(val); }

  function pulseHeadlights(seq=[300, 600, 900, 1400]){
    let i=0;
    const kick = () => {
      if (!headlights || i>=seq.length) return;
      setOpacity(headlights, i < seq.length-1 ? 0.75 : 0.95);
      setTimeout(()=> setOpacity(headlights, 0.22), 160 + i*10);
      i++; if (i<seq.length) setTimeout(kick, seq[i]-seq[i-1]);
    };
    setOpacity(headlights, 0.18);
    setTimeout(kick, seq[0]);
  }

  function startHum(){
    if (!ampHum) return;
    const tryPlay = () => ampHum.play().catch(()=>{});
    ampHum.volume = 0.35;
    ampHum.loop = true;
    tryPlay();
    window.addEventListener('click', () => { tryPlay(); }, { once:true });
  }

  function startMain(){
    if (logo) logo.style.filter = "drop-shadow(0 0 28px rgba(255,255,255,.70))";
    if (enterBtn) enterBtn.classList.add('pulse');
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

  if (v8Rev && v8Rev.src) {
    withTimeoutAudio(v8Rev, (state)=>{
      if (state==="ok") {
        v8Rev.currentTime = 0;
        v8Rev.play().catch(()=>{});
        pulseHeadlights([250, 700, 1150, 1850]);
        v8Rev.addEventListener('ended', () => { startHum(); startMain(); }, { once:true });
      } else {
        pulseHeadlights([300, 900, 1600, 2400]);
        setTimeout(()=>{ startHum(); startMain(); }, 2600);
      }
    }, 600);
  } else {
    pulseHeadlights([300, 900, 1600, 2400]);
    setTimeout(()=>{ startHum(); startMain(); }, 2600);
  }
})();
