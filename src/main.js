import { config } from "./config.js";
import "./style.css";
import "./site-theme.css";
const $ = (selector) => document.querySelector(selector);
const esc = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const safeUrl = (value) => {
  if (!value) return "";
  try {
    const u = new URL(value, location.origin);
    return ["http:", "https:"].includes(u.protocol) ? u.href : "";
  } catch {
    return "";
  }
};
const services = config.services.filter((s) => s.enabled);
document.title = config.seo.title;
$('meta[name="description"]').content = config.seo.description;
const siteUrl = safeUrl(config.seo.siteUrl);
if (siteUrl) {
  let canonical = $('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = siteUrl;
  document
    .querySelector('meta[property="og:url"]')
    ?.setAttribute("content", siteUrl);
}
document
  .querySelector('meta[property="og:title"]')
  ?.setAttribute("content", config.seo.title);
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute("content", config.seo.description);
const ogImage = safeUrl(config.seo.ogImage);
if (ogImage)
  document
    .querySelector('meta[property="og:image"]')
    ?.setAttribute("content", ogImage);
$("#intro").textContent = config.intro;
$("#about-text").textContent = config.about;
$("#year").textContent = new Date().getFullYear();
$("#service-list").innerHTML = services
  .map(
    (s) =>
      '<article class="service-row"><span class="service-number">' +
      esc(s.tag) +
      "</span><h3>" +
      esc(s.title) +
      "</h3><p>" +
      esc(s.body) +
      '</p><div class="service-detail"><span>GOOD FIT FOR</span><p>' +
      esc(s.fit) +
      '</p></div><div class="service-detail"><span>INCLUDED IN SCOPE</span><p>' +
      esc(s.includes) +
      '</p></div><div class="service-detail"><span>WHAT IT HELPS WITH</span><p>' +
      esc(s.helps) +
      '</p></div><a class="row-link" href="#contact" aria-label="Discuss ' +
      esc(s.title) +
      '">↗</a></article>',
  )
  .join("");
$("#why-list").innerHTML = config.whyWorkWithMe
  .map(
    (item, i) =>
      '<article class="why-item"><span class="service-number">0' +
      (i + 1) +
      "</span><h3>" +
      esc(item[0]) +
      "</h3><p>" +
      esc(item[1]) +
      "</p></article>",
  )
  .join("");
$("#process-list").innerHTML = config.process
  .map(
    (item, i) =>
      "<article><span>" +
      String(i + 1).padStart(2, "0") +
      "</span><div><h3>" +
      esc(item[0]) +
      "</h3><p>" +
      esc(item[1]) +
      "</p></div></article>",
  )
  .join("");
const demos = config.demos.filter(
  (d) => d.enabled !== false && d.name && d.description,
);
$("#demo-list").innerHTML = demos.length
  ? demos
      .map((d, i) => {
        const image = safeUrl(d.image);
        const url = safeUrl(d.url);
        const source = safeUrl(d.source);
        return (
          '<article class="demo-card"><div class="demo-visual ' +
          (i % 2 ? "visual-blue" : "visual-orange") +
          '">' +
          (image
            ? '<img src="' +
              esc(image) +
              '" alt="' +
              esc(d.imageAlt || d.name + " preview") +
              '" width="' +
              esc(d.width || 1200) +
              '" height="' +
              esc(d.height || 751) +
              '" loading="lazy" decoding="async">'
            : '<div class="demo-browser"><span>' +
              esc(d.category || "WEBSITE CONCEPT") +
              "</span><strong>" +
              esc(d.previewTitle || d.name) +
              "</strong><small>" +
              esc(d.previewSub || "") +
              "</small></div>") +
          '</div><div class="demo-meta"><div><span>' +
          esc(d.category || "WEBSITE") +
          "</span><h3>" +
          esc(d.name) +
          "</h3></div>" +
          (url
            ? '<a href="' +
              esc(url) +
              '" target="_blank" rel="noopener noreferrer">LIVE PREVIEW ↗</a>'
            : "") +
          "</div><p>" +
          esc(d.description) +
          '</p><small class="demo-contribution">' +
          esc(d.contribution || "") +
          (d.technology ? " · " + esc(d.technology) : "") +
          "</small>" +
          (source
            ? '<a class="source-link" href="' +
              esc(source) +
              '" target="_blank" rel="noopener noreferrer">SOURCE CODE ↗</a>'
            : "") +
          "</article>"
        );
      })
      .join("")
  : '<div class="empty-work"><div class="empty-visual"><span class="empty-label">NO LIVE<br>PREVIEW</span></div><div class="empty-copy"><span class="eyebrow">NO LIVE DEMO AVAILABLE</span><h3>Live examples<br>will be listed here.</h3><p>Only a concept visual is available at the moment. Ask about your personal or small-business website while live examples are prepared.</p><a href="#contact">ASK ABOUT A PROJECT ↗</a></div></div>';
const packages = config.pricing.packages.filter((p) => p.enabled !== false);
$("#price-list").innerHTML = config.pricing.enabled
  ? packages
      .map(
        (p, i) =>
          '<article class="price-row"><span>0' +
          (i + 1) +
          "</span><div><h3>" +
          esc(p.title) +
          "</h3><p>" +
          esc(p.scope) +
          '</p><ul class="package-includes">' +
          (p.includes || []).map((x) => "<li>" + esc(x) + "</li>").join("") +
          "</ul>" +
          (p.pages ? "<small>PAGE LIMIT: " + esc(p.pages) + "</small>" : "") +
          (p.revisions
            ? "<small>REVISIONS: " + esc(p.revisions) + "</small>"
            : "") +
          "</div><strong>" +
          esc(p.price || "REQUEST A QUOTE") +
          '</strong><a href="#contact" aria-label="Ask about ' +
          esc(p.title) +
          '">↗</a></article>',
      )
      .join("")
  : "";
$("#pricing-note").textContent = config.pricing.note;
if (config.policies.enabled && config.policies.terms.length) {
  const box = $("#policies");
  box.hidden = false;
  const heading = document.createElement("h3");
  heading.className = "policy-title";
  heading.textContent = config.policies.title;
  const list = document.createElement("ul");
  config.policies.terms.forEach((term) => {
    const li = document.createElement("li");
    li.textContent = term;
    list.append(li);
  });
  box.append(heading, list);
}
$("#faq-list").innerHTML = config.faq
  .map(
    ([q, a]) =>
      '<details class="faq-item"><summary>' +
      esc(q) +
      "</summary><p>" +
      esc(a) +
      "</p></details>",
  )
  .join("");
if (config.portrait) {
  const img = document.createElement("img");
  img.alt = "Illustrated portrait of Varad Salunkhe";
  img.width = 850;
  img.height = 1275;
  img.loading = "lazy";
  img.addEventListener(
    "load",
    () => $(".portrait-placeholder")?.remove(),
    { once: true },
  );
  img.addEventListener("error", () => img.remove(), { once: true });
  img.src = safeUrl(config.portrait);
  $("#portrait").prepend(img);
}
const contactLinks = [];
if (config.contact.email)
  contactLinks.push(
    '<a href="mailto:' + esc(config.contact.email) + '">EMAIL ↗</a>',
  );
if (config.contact.whatsapp)
  contactLinks.push(
    '<a href="' +
      esc(safeUrl(config.contact.whatsapp)) +
      '" target="_blank" rel="noopener noreferrer">WHATSAPP ↗</a>',
  );
if (config.contact.phone)
  contactLinks.push(
    '<a href="tel:' +
      esc(config.contact.phone) +
      '">CALL ' +
      esc(config.contact.phone) +
      " ↗</a>",
  );
if (config.contact.instagram)
  contactLinks.push(
    '<a href="' +
      esc(safeUrl(config.contact.instagram)) +
      '" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>',
  );
if (config.contact.linkedin)
  contactLinks.push(
    '<a href="' +
      esc(safeUrl(config.contact.linkedin)) +
      '" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>',
  );
$("#contact-links").innerHTML = contactLinks.join("");
$("#footer-contact-links").innerHTML = contactLinks.join("");
$("#footer-service-list").innerHTML = services
  .map((s) => '<a href="#services">' + esc(s.title) + "</a>")
  .join("");
const serviceSelect = $('select[name="type"]');
services.forEach((service) => {
  const option = document.createElement("option");
  option.value = service.title;
  option.textContent = service.title;
  serviceSelect.append(option);
});
for (const range of config.budgetRanges) {
  const option = document.createElement("option");
  option.value = range;
  option.textContent = range;
  $('select[name="budget"]').append(option);
}
for (const range of config.timelines) {
  const option = document.createElement("option");
  option.value = range;
  option.textContent = range;
  $('select[name="timeline"]').append(option);
}
const form = $("#inquiry-form"),
  notice = $("#form-notice"),
  submitButton = form.querySelector("button");
const endpoint = safeUrl(config.contact.formEndpoint);
const formConfigured = Boolean(
  endpoint &&
  new URL(endpoint).hostname === "formspree.io" &&
  new URL(endpoint).pathname.startsWith("/f/"),
);
if (!formConfigured) {
  notice.className = "form-notice is-warning";
  notice.textContent =
    "Online form submission is not configured yet. Your details will not be sent here. Use WhatsApp or phone below to reach me.";
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!formConfigured) {
    notice.className = "form-notice is-warning";
    notice.textContent =
      "Your message was not sent because this form is not connected yet. Please use WhatsApp or phone below.";
    return;
  }
  submitButton.disabled = true;
  notice.className = "form-notice";
  notice.textContent = "Sending enquiry…";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Form submission failed");
    notice.className = "form-notice is-success";
    notice.textContent =
      "Your enquiry was sent successfully. I’ll get back to you soon.";
    form.reset();
  } catch {
    notice.className = "form-notice is-warning";
    notice.textContent =
      "The enquiry could not be sent. Please try again or contact me using WhatsApp or phone below.";
  } finally {
    submitButton.disabled = false;
  }
});
const toggle = $(".nav-toggle"),
  nav = $("#primary-nav");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  nav.classList.toggle("is-open", open);
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
  }),
);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true") return;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("is-open");
  toggle.focus();
});
const revealTargets = document.querySelectorAll(
  ".section-head,.service-row,.why-item,.demo-card,.empty-work,.work-note,.process-list>article,.price-row,.faq-item,.about-image,.about-copy,.contact-intro,.contact form,.quote-band",
);
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries, obs) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      }),
    { threshold: 0.1, rootMargin: "0px 0px -25px 0px" },
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
} else revealTargets.forEach((el) => el.classList.add("is-visible"));
