const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 40) {
    header.style.background = "rgba(29,27,24,.92)";
    header.style.backdropFilter = "blur(12px)";
  } else {
    header.style.background = "rgba(29,27,24,.82)";
    header.style.backdropFilter = "blur(18px) saturate(130%)";
  }
});

document.querySelectorAll("[data-auth-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const message = form.querySelector(".form-message");
    message.textContent = "Thanks — account features will be available soon.";
  });
});

document.querySelectorAll("[data-inquiry-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    form.querySelector(".form-message").textContent = "Thank you — your inquiry has been received. We will be in touch soon.";
    form.reset();
  });
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

const testimonialTrack = document.querySelector(".testimonial-track");
if (testimonialTrack) {
  const duplicate = testimonialTrack.firstElementChild.cloneNode(true);
  duplicate.setAttribute("aria-hidden", "true");
  testimonialTrack.appendChild(duplicate);
}
