const navToggle = document.querySelector("[data-nav-toggle]");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.addEventListener("click", (event) => {
  if (!primaryNav || !navToggle) {
    return;
  }

  const clickedInsideNav = event.target.closest(".site-header");
  if (!clickedInsideNav && primaryNav.classList.contains("is-open")) {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

const glossarySearch = document.querySelector("[data-glossary-search]");
if (glossarySearch) {
  glossarySearch.addEventListener("input", () => {
    const query = glossarySearch.value.trim().toLowerCase();
    document.querySelectorAll("[data-glossary-item]").forEach((item) => {
      item.hidden = query.length > 0 && !item.textContent.toLowerCase().includes(query);
    });
  });
}

document.addEventListener("click", (event) => {
  const rollButton = event.target.closest("[data-roll]");
  if (!rollButton) {
    return;
  }

  const sides = Number(rollButton.dataset.roll);
  const output = document.getElementById("diceResult");
  if (!sides || !output) {
    return;
  }

  const result = Math.floor(Math.random() * sides) + 1;
  output.textContent = `d${sides}: ${result}`;
});
