(() => {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const currentEl = document.getElementById("pres-current");
  const totalEl = document.getElementById("pres-total");
  const prevBtn = document.getElementById("pres-prev");
  const nextBtn = document.getElementById("pres-next");
  const fullscreenBtn = document.getElementById("pres-fullscreen");

  let index = 0;

  function replayEntranceAnimation(slide) {
    const heading = slide.querySelector("h1");
    if (!heading) return;
    heading.style.animation = "none";
    void heading.offsetWidth;
    heading.style.animation = "";
  }

  function render() {
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    if (currentEl) currentEl.textContent = String(index + 1);
    replayEntranceAnimation(slides[index]);
  }

  function goTo(newIndex) {
    if (newIndex < 0 || newIndex >= slides.length) return;
    index = newIndex;
    render();
  }

  prevBtn?.addEventListener("click", () => goTo(index - 1));
  nextBtn?.addEventListener("click", () => goTo(index + 1));

  document.addEventListener("keydown", (event) => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) goTo(index + 1);
    if (["ArrowLeft", "PageUp"].includes(event.key)) goTo(index - 1);
    if (event.key === "Home") goTo(0);
    if (event.key === "End") goTo(slides.length - 1);
  });

  fullscreenBtn?.addEventListener("click", () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen?.();
    }
  });

  if (totalEl) totalEl.textContent = String(slides.length);
  render();
})();
