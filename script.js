const animatedItems = Array.from(document.querySelectorAll("[data-animate]"));

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animatedItems.forEach((item) => item.classList.add("is-visible"));
} else {
  animatedItems.forEach((item, index) => {
    window.setTimeout(() => {
      item.classList.add("is-visible");
    }, 140 * index);
  });
}

const highlightDurationMs = 1400;

const highlightSource = (target) => {
  target.classList.remove("source-highlight");
  void target.offsetWidth;
  target.classList.add("source-highlight");
  window.setTimeout(() => {
    target.classList.remove("source-highlight");
  }, highlightDurationMs);
};

document.addEventListener("click", (event) => {
  const sup = event.target.closest("sup");
  if (!sup) {
    return;
  }

  const dataTarget = sup.dataset.source;
  const link = sup.querySelector("a[href^='#']") || sup.closest("a[href^='#']");
  const href = link ? link.getAttribute("href") : "";
  const targetId = dataTarget
    ? dataTarget.replace(/^#/, "")
    : href.startsWith("#")
      ? href.slice(1)
      : "";

  if (!targetId) {
    return;
  }

  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  highlightSource(target);
});
