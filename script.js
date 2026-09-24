const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => nav.classList.toggle("open"));
toggle?.setAttribute("aria-expanded", "false");
toggle?.addEventListener("click", () => toggle.setAttribute("aria-expanded", String(nav.classList.contains("open"))));

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const header = document.querySelector(".site-header");
const scrollProgress = document.querySelector(".scroll-progress");
const parallaxTargets = document.querySelectorAll(".hero-image, .about-image, .journal-image");
let scrollFrame;

function updateScrollMotion() {
  const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  if (scrollProgress) scrollProgress.style.transform = `scaleX(${scrollRatio})`;
  parallaxTargets.forEach(target => {
    const rect = target.getBoundingClientRect();
    const distanceFromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
    target.style.setProperty("--parallax", `${Math.max(-22, Math.min(22, distanceFromCenter * -0.035))}px`);
  });
  scrollFrame = undefined;
}

window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 40);
  if (window.scrollY > 40) {
    header.style.background = "rgba(29,27,24,.92)";
    header.style.backdropFilter = "blur(12px)";
  } else {
    header.style.background = "rgba(29,27,24,.82)";
    header.style.backdropFilter = "blur(18px) saturate(130%)";
  }
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollMotion);
});
updateScrollMotion();

const navSections = [...document.querySelectorAll(".nav a[href^='#']")]
  .map(link => ({ link, section: document.querySelector(link.getAttribute("href")) }))
  .filter(item => item.section);
if ("IntersectionObserver" in window && navSections.length) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navSections.forEach(item => item.link.removeAttribute("aria-current"));
      navSections.find(item => item.section === entry.target)?.link.setAttribute("aria-current", "page");
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  navSections.forEach(item => navObserver.observe(item.section));
}

document.querySelectorAll("[data-filter]").forEach(filterButton => {
  filterButton.addEventListener("click", () => {
    const selectedFilter = filterButton.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(button => {
      const isSelected = button === filterButton;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
    document.querySelectorAll("[data-project-key]").forEach(projectCard => {
      const matches = selectedFilter === "all" || projectCard.dataset.category === selectedFilter;
      projectCard.hidden = !matches;
    });
  });
});

document.querySelectorAll("[data-auth-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    message.textContent = "Thanks — account features will be available soon.";
  });
});

document.querySelectorAll(".password-toggle").forEach(toggleButton => {
  toggleButton.addEventListener("click", () => {
    const passwordInput = toggleButton.closest(".password-field")?.querySelector("input");
    if (!passwordInput) return;
    const shouldShow = passwordInput.type === "password";
    passwordInput.type = shouldShow ? "text" : "password";
    toggleButton.textContent = shouldShow ? "Hide" : "Show";
    toggleButton.setAttribute("aria-label", `${shouldShow ? "Hide" : "Show"} password`);
    toggleButton.setAttribute("aria-pressed", String(shouldShow));
  });
});

document.querySelectorAll("[data-inquiry-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    form.querySelector(".form-message").textContent = "Thank you — your inquiry has been received. We will be in touch soon.";
    form.reset();
  });
});

const estimateLabels = {
  1500: "$1,000 - $2,000",
  3000: "$2,000 - $4,000",
  5500: "$4,000 - $7,000",
  8000: "$7,000+"
};

const savedBriefTarget = document.querySelector("[data-saved-brief]");
const favoritesTarget = document.querySelector("[data-favorites]");
const favoriteGrid = document.querySelector("[data-favorite-grid]");
const favoriteCount = document.querySelector("[data-favorite-count]");
const briefStatus = document.querySelector("[data-brief-status]");

function renderDashboard() {
  const brief = JSON.parse(localStorage.getItem("oak-grain-brief") || "null");
  const favorites = JSON.parse(localStorage.getItem("oak-grain-favorites") || "[]");
  if (briefStatus) briefStatus.textContent = brief ? "Brief saved" : "Not started";
  if (savedBriefTarget && brief) {
    savedBriefTarget.textContent = `${brief.piece} in ${brief.wood}, ${brief.size.toLowerCase()} size, planned around ${estimateLabels[brief.budget] || brief.budget}. Reference: ${brief.reference}.`;
  }
  if (favoriteCount) favoriteCount.textContent = `${favorites.length} saved`;
  if (favoriteGrid) {
    if (!favorites.length) {
      favoriteGrid.innerHTML = "<p data-favorites>No saved pieces yet. Tap the heart on a project you love.</p>";
    } else {
      const favoriteCards = favorites.map(title => {
        const projectCard = [...document.querySelectorAll("[data-project-key]")].find(card => card.querySelector("h3")?.textContent.trim() === title);
        if (!projectCard) return "";
        const image = projectCard.querySelector("img").src;
        const link = projectCard.querySelector("h3 a").href;
        return `<a class="favorite-card" href="${link}"><img src="${image}" alt=""><span>${title}</span></a>`;
      }).join("");
      favoriteGrid.innerHTML = favoriteCards;
    }
  }
  document.querySelectorAll(".favorite-button").forEach(button => {
    const projectCard = button.closest("[data-project-key]");
    const title = projectCard?.querySelector("h3")?.textContent.trim();
    const saved = favorites.includes(title);
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${title}`);
  });
}

document.querySelectorAll(".favorite-button").forEach(button => {
  button.addEventListener("click", () => {
    const title = button.closest("[data-project-key]")?.querySelector("h3")?.textContent.trim();
    const favorites = JSON.parse(localStorage.getItem("oak-grain-favorites") || "[]");
    const nextFavorites = favorites.includes(title) ? favorites.filter(item => item !== title) : [...favorites, title];
    localStorage.setItem("oak-grain-favorites", JSON.stringify(nextFavorites));
    renderDashboard();
  });
});

const builderForm = document.querySelector("[data-builder-form]");
if (builderForm) {
  const estimate = builderForm.querySelector("[data-estimate]");
  const estimateCopy = builderForm.querySelector("[data-estimate-copy]");
  const inquiryLink = builderForm.querySelector("[data-builder-inquiry]");
  const referenceInput = builderForm.querySelector("input[type='file']");
  const referencePreview = builderForm.querySelector("[data-reference-preview]");
  const referenceImage = referencePreview?.querySelector("img");
  const referenceName = referencePreview?.querySelector("[data-reference-name]");
  let referenceObjectUrl;
  const builderSteps = [...builderForm.querySelectorAll("[data-builder-step]")];
  const progressSteps = [...document.querySelectorAll("[data-progress-step]")];
  let activeStep = 1;
  const showBuilderStep = stepNumber => {
    activeStep = stepNumber;
    builderSteps.forEach(step => step.classList.toggle("is-active", Number(step.dataset.builderStep) === stepNumber));
    progressSteps.forEach(step => step.classList.toggle("is-active", Number(step.dataset.progressStep) === stepNumber));
  };
  builderForm.querySelectorAll(".builder-next").forEach(button => button.addEventListener("click", () => showBuilderStep(Math.min(activeStep + 1, builderSteps.length))));
  builderForm.querySelectorAll(".builder-back").forEach(button => button.addEventListener("click", () => showBuilderStep(Math.max(activeStep - 1, 1))));
  const updateEstimate = () => {
    const formData = new FormData(builderForm);
    const price = Number(formData.get("budget"));
    estimate.textContent = estimateLabels[price];
    estimateCopy.textContent = `Based on a ${formData.get("size").toLowerCase()} ${formData.get("wood").toLowerCase()} ${formData.get("piece").toLowerCase()}. The final quote follows a design conversation.`;
  };
  builderForm.addEventListener("input", updateEstimate);
  builderForm.addEventListener("change", updateEstimate);
  referenceInput?.addEventListener("change", () => {
    const file = referenceInput.files[0];
    if (referenceObjectUrl) URL.revokeObjectURL(referenceObjectUrl);
    if (!file || !referencePreview || !referenceImage || !referenceName) {
      referencePreview?.setAttribute("hidden", "");
      return;
    }
    referenceObjectUrl = URL.createObjectURL(file);
    referenceImage.src = referenceObjectUrl;
    referenceName.textContent = file.name;
    referencePreview.removeAttribute("hidden");
  });
  builderForm.addEventListener("submit", event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(builderForm));
    values.reference = builderForm.querySelector("input[type='file']").files[0]?.name || "No reference image";
    localStorage.setItem("oak-grain-brief", JSON.stringify(values));
    builderForm.querySelector(".form-message").textContent = "Your brief is saved in the project desk below.";
    const subject = `${values.piece} commission inquiry`;
    const body = [
      "Hello, I would like to discuss a custom piece.",
      "",
      `Piece: ${values.piece}`,
      `Wood: ${values.wood}`,
      `Size: ${values.size}`,
      `Budget: ${estimateLabels[values.budget] || values.budget}`,
      `Reference image: ${values.reference}`,
      "",
      `Notes: ${values.notes || "No additional notes"}`
    ].join("\n");
    inquiryLink.href = `mailto:hello@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    inquiryLink.hidden = false;
    renderDashboard();
  });
}

document.querySelectorAll("[data-newsletter-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    localStorage.setItem("oak-grain-newsletter", form.querySelector("input").value);
    form.querySelector(".form-message").textContent = "You are on the list. I will send the next workshop note your way.";
    form.reset();
  });
});

renderDashboard();

document.querySelector("[data-clear-dashboard]")?.addEventListener("click", () => {
  localStorage.removeItem("oak-grain-brief");
  localStorage.removeItem("oak-grain-favorites");
  renderDashboard();
  if (savedBriefTarget) savedBriefTarget.textContent = "No brief saved yet. Build one above to see it here.";
});

const projects = {
  "walnut-lounge": { number: "01 / SELECTED WORK", title: "Walnut Lounge", summary: "A relaxed, low-profile lounge designed around long evenings and warm natural light.", material: "Solid walnut", finish: "Hand-rubbed oil", type: "Custom seating", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85" },
  "oak-dining-table": { number: "02 / SELECTED WORK", title: "Oak Dining Table", summary: "A generously proportioned table made for everyday meals, celebrations, and everything in between.", material: "White oak", finish: "Natural matte", type: "Custom dining", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85" },
  "studio-chair": { number: "03 / SELECTED WORK", title: "Studio Chair", summary: "A quiet, sculptural chair that celebrates its joinery and the character of the timber.", material: "Ash", finish: "Clear hardwax oil", type: "Occasional seating", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=85" },
  "lowline-cabinet": { number: "04 / SELECTED WORK", title: "Lowline Cabinet", summary: "A tailored storage piece that brings visual calm and practical order to a living space.", material: "American walnut", finish: "Hand-finished", type: "Bespoke cabinetry", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=85" }
};

const projectKey = new URLSearchParams(window.location.search).get("project");
const project = projects[projectKey];
if (project) {
  document.title = `${project.title} — Oak & Grain`;
  document.querySelector("[data-project-image]").src = project.image;
  document.querySelector("[data-project-image]").alt = project.title;
  document.querySelector("[data-project-number]").textContent = project.number;
  document.querySelector("[data-project-title]").textContent = project.title;
  document.querySelector("[data-project-summary]").textContent = project.summary;
  document.querySelector("[data-project-specs]").innerHTML = `<div><dt>Material</dt><dd>${project.material}</dd></div><div><dt>Finish</dt><dd>${project.finish}</dd></div><div><dt>Commission</dt><dd>${project.type}</dd></div>`;
}

const revealTargets = document.querySelectorAll(".intro-grid > *, .section-heading > *, .gallery .project, .statement-inner, .process-title, .steps .step, .about-image, .about-copy, .visit > *, .quotes blockquote, .instagram-grid img, .contact-grid > *, .project-detail > *");
revealTargets.forEach(target => target.classList.add("reveal"));

document.querySelectorAll(".gallery .project, .steps .step, .instagram-grid img").forEach((target, index) => {
  target.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -35px" });
  revealTargets.forEach(target => revealObserver.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add("is-visible"));
}
