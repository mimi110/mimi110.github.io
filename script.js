// Smooth scroll for on-page anchors (keeps external links normal)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// Typewriter (safe across pages that don't have the hero)
(function(){
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  if (!typedTextSpan || !cursorSpan) return;

  const textArray = ["developer", "designer"];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay + 1100);
    }
  }

  setTimeout(type, newTextDelay + 250);
})();

// Always reset scroll on reload
window.onbeforeunload = function () { window.scrollTo(0, 0); };

// Universal modal for images with [data-enlarge]
(function(){
  // Create modal once and reuse
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'imgModal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <button class="close" aria-label="Close preview" type="button">Close ✕</button>
    <img alt="">
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('img');
  const modalClose = modal.querySelector('.close');

  function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  // Open for any click on an IMG with data-enlarge
  document.addEventListener('click', (e)=>{
    const img = e.target.closest('img[data-enlarge]');
    if (img) { openModal(img.src, img.alt); }
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
})();
