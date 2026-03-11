const revealItems = document.querySelectorAll(".reveal");
const spotlightCards = document.querySelectorAll(".interactive-card");

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
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

spotlightCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
  });
});
