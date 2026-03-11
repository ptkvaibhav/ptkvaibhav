const revealItems = document.querySelectorAll(".reveal");
const interactiveCards = document.querySelectorAll(".interactive-card");
const progressIndicator = document.querySelector(".progress-indicator");
const rotatingWord = document.querySelector(".rotating-word");
const heroScene = document.querySelector(".hero-scene");
const floatCards = document.querySelectorAll(".float-card");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

interactiveCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
  });
});

if (rotatingWord) {
  const words = (rotatingWord.dataset.words || "")
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);

  let wordIndex = 0;

  if (words.length > 1) {
    window.setInterval(() => {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingWord.textContent = words[wordIndex];
    }, 1800);
  }
}

const updateProgress = () => {
  if (!progressIndicator) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressIndicator.style.width = `${Math.min(progress, 100)}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if (heroScene && floatCards.length > 0) {
  const baseTransforms = new Map();
  const refreshBaseTransforms = () => {
    floatCards.forEach((card) => {
      card.style.transform = "";
      const cardStyle = window.getComputedStyle(card);
      baseTransforms.set(card, cardStyle.transform === "none" ? "" : cardStyle.transform);
    });
  };

  refreshBaseTransforms();

  heroScene.addEventListener("pointermove", (event) => {
    const bounds = heroScene.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const xPercent = (x / bounds.width - 0.5) * 2;
    const yPercent = (y / bounds.height - 0.5) * 2;

    floatCards.forEach((card) => {
      const depth = Number(card.dataset.depth || 12);
      const offsetX = xPercent * depth * 0.35;
      const offsetY = yPercent * depth * 0.28;
      const rotateX = yPercent * depth * -0.08;
      const rotateY = xPercent * depth * 0.08;
      const base = baseTransforms.get(card);

      card.style.transform =
        `${base} translate3d(${offsetX}px, ${offsetY}px, 0) ` +
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });

  heroScene.addEventListener("pointerleave", () => {
    floatCards.forEach((card) => {
      card.style.transform = baseTransforms.get(card);
    });
  });

  window.addEventListener("resize", refreshBaseTransforms);
}
