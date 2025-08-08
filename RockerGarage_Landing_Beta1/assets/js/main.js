
document.querySelector('.garage-door').addEventListener('click', function() {
    const audio = document.getElementById('voice');
    audio.play();
    this.textContent = 'ENTERING...';
    this.style.borderColor = '#0f0';
    this.style.color = '#0f0';
});
