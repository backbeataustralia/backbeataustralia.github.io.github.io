const resources = [
  {
    title: "Customer Handbook",
    description: "Overview of Suncare services, contact details, and support options.",
    link: "#",
  },
  {
    title: "Services Guide & Pricing",
    description: "Current services, package inclusions, and fee-for-service options.",
    link: "#",
  },
  {
    title: "Transport Checklist",
    description: "What to expect when requesting a ride for appointments or events.",
    link: "#",
  },
];

const faqs = [
  {
    question: "How do I navigate My Aged Care (MAC)?",
    answer:
      "Start by logging in to your MAC account. Use the Services tab to view approvals. If you need help, call Suncare and we can walk you through it over the phone.",
  },
  {
    question: "What should I expect in an assessment?",
    answer:
      "Assessors will ask about daily routines, mobility, home safety, and health needs. Have your Medicare card and any current care plans ready.",
  },
  {
    question: "Can I request transport to an event?",
    answer:
      "Yes. When you register for an event below you can add transport, note mobility aids, and choose to pay if it is not included in your package.",
  },
];

const events = [
  {
    id: "garden-club",
    name: "Community Garden Club",
    date: "2024-09-18",
    time: "10:00 AM",
    venue: "Coastal Community Centre",
    price: "$10 (materials)",
  },
  {
    id: "art-social",
    name: "Art & Coffee Social Group",
    date: "2024-09-24",
    time: "2:00 PM",
    venue: "Maroochydore Hub",
    price: "No cost",
  },
  {
    id: "wellness-talk",
    name: "Wellness & Falls Prevention",
    date: "2024-10-02",
    time: "11:00 AM",
    venue: "Online – video link provided",
    price: "$5 (optional donation)",
  },
];

const services = [
  {
    name: "Personal care",
    when: "Mondays 9:00 AM",
    worker: "Ava Thompson",
    bio: "Cert III Individual Support, enjoys walking groups and gardening tips.",
  },
  {
    name: "Domestic assistance",
    when: "Wednesdays 1:00 PM",
    worker: "Leo Martins",
    bio: "Trained in home safety checks, calm approach to organising kitchens.",
  },
  {
    name: "Social support outing",
    when: "Fridays 10:30 AM",
    worker: "Mia Chen",
    bio: "Loves book clubs, experienced with mobility aids and safe transport.",
  },
];

const statusDisplay = document.getElementById("customer-status");

function initResources() {
  const list = document.getElementById("resource-list");
  list.innerHTML = "";
  resources.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" aria-label="Open ${item.title}">View</a>
    `;
    list.appendChild(card);
  });
}

function initFaqs() {
  const list = document.getElementById("faq-list");
  list.innerHTML = "";
  faqs.forEach((faq) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = faq.question;
    const p = document.createElement("p");
    p.textContent = faq.answer;
    details.append(summary, p);
    list.appendChild(details);
  });
}

function initEvents() {
  const list = document.getElementById("event-list");
  list.innerHTML = "";
  events.forEach((event) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <div>
          <h3>${event.name}</h3>
          <p class="meta">${event.date} • ${event.time}</p>
          <p class="meta">${event.venue}</p>
          <p class="meta">${event.price}</p>
        </div>
      </div>
      <form class="event-form" data-event="${event.id}">
        <label>Will you attend?</label>
        <select name="attendance" required>
          <option value="">Select</option>
          <option value="attending">Yes, I'm attending</option>
          <option value="interested">Interested</option>
        </select>
        <label>Transport</label>
        <select name="transport" required>
          <option value="">Select</option>
          <option value="needed-paid">Request transport and pay</option>
          <option value="needed-funded">Request transport (funded)</option>
          <option value="self">I will arrange my own</option>
        </select>
        <label>Notes (mobility aids, support needs)</label>
        <textarea name="notes" rows="2"></textarea>
        <button type="submit" class="primary">Save</button>
      </form>
    `;
    list.appendChild(card);
  });
}

function initServices() {
  const list = document.getElementById("service-list");
  list.innerHTML = "";
  services.forEach((service) => {
    const li = document.createElement("div");
    li.className = "card";
    li.innerHTML = `
      <h3>${service.name}</h3>
      <p class="meta">${service.when}</p>
      <p><strong>${service.worker}</strong> — ${service.bio}</p>
    `;
    list.appendChild(li);
  });
  document.getElementById("stat-services").textContent = services.length;
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key, fallback) {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to parse stored data", error);
    return fallback;
  }
}

function handlePersonalForm() {
  const form = document.getElementById("personal-form");
  const statusEl = document.getElementById("personal-status");
  const saved = loadFromLocalStorage("personal", {});
  if (saved["living-arrangement"]) {
    form.querySelector("#living-arrangement").value = saved["living-arrangement"];
    document.getElementById("stat-profile").textContent = "Saved";
  }
  form.querySelector("#likes").value = saved.likes || "";
  form.querySelector("#background").value = saved.background || "";
  form.querySelector("#dislikes").value = saved.dislikes || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      "living-arrangement": form.querySelector("#living-arrangement").value,
      likes: form.querySelector("#likes").value,
      background: form.querySelector("#background").value,
      dislikes: form.querySelector("#dislikes").value,
    };
    saveToLocalStorage("personal", data);
    statusEl.textContent = "Profile saved";
    document.getElementById("stat-profile").textContent = "Saved";
  });
}

function handleHomeSafetyForm() {
  const form = document.getElementById("home-safety");
  const statusEl = document.getElementById("home-status");
  const saved = loadFromLocalStorage("home", {});
  form.querySelector("#home-address").value = saved["home-address"] || "";
  form.querySelector("#stories").value = saved.stories || "";
  form.querySelector("#living-type").value = saved["living-type"] || "Independent house";
  form.querySelector("#features").value = saved.features || "";
  if (saved["home-address"]) {
    document.getElementById("stat-home").textContent = "Saved";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      "home-address": form.querySelector("#home-address").value,
      stories: form.querySelector("#stories").value,
      "living-type": form.querySelector("#living-type").value,
      features: form.querySelector("#features").value,
    };
    saveToLocalStorage("home", data);
    statusEl.textContent = "Home safety saved";
    document.getElementById("stat-home").textContent = "Saved";
  });
}

function handleMedicalForm() {
  const form = document.getElementById("medical-form");
  const statusEl = document.getElementById("medical-status");
  const saved = loadFromLocalStorage("medical", {});
  form.querySelector("#medical-notes").value = saved.notes || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = { notes: form.querySelector("#medical-notes").value };
    saveToLocalStorage("medical", data);
    statusEl.textContent = "Medical update saved";
  });
}

function handleEventForms() {
  const savedRegistrations = loadFromLocalStorage("registrations", {});
  const forms = document.querySelectorAll(".event-form");
  forms.forEach((form) => {
    const id = form.dataset.event;
    if (savedRegistrations[id]) {
      form.elements.attendance.value = savedRegistrations[id].attendance;
      form.elements.transport.value = savedRegistrations[id].transport;
      form.elements.notes.value = savedRegistrations[id].notes || "";
    }
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        attendance: form.elements.attendance.value,
        transport: form.elements.transport.value,
        notes: form.elements.notes.value,
        name: form.closest("article").querySelector("h3").textContent,
      };
      savedRegistrations[id] = data;
      saveToLocalStorage("registrations", savedRegistrations);
      renderRegistrationSummary(savedRegistrations);
    });
  });

  document
    .getElementById("clear-registrations")
    .addEventListener("click", () => {
      localStorage.removeItem("registrations");
      renderRegistrationSummary({});
    });

  renderRegistrationSummary(savedRegistrations);
}

function renderRegistrationSummary(registrations) {
  const list = document.getElementById("registration-summary");
  list.innerHTML = "";
  const entries = Object.values(registrations);
  document.getElementById("stat-events").textContent = entries.length;
  if (!entries.length) {
    const empty = document.createElement("li");
    empty.textContent = "No registrations yet";
    list.appendChild(empty);
    return;
  }
  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.name}</strong>
      <p class="meta">${entry.attendance} • ${entry.transport}</p>
      ${entry.notes ? `<p>${entry.notes}</p>` : ""}
    `;
    list.appendChild(li);
  });
}

function handleStatus() {
  const savedStatus = loadFromLocalStorage("customer-status", statusDisplay.value);
  statusDisplay.value = savedStatus;
  document.getElementById("status-display").textContent = savedStatus;

  statusDisplay.addEventListener("change", () => {
    saveToLocalStorage("customer-status", statusDisplay.value);
    document.getElementById("status-display").textContent = statusDisplay.value;
  });
}

function handleQuickScroll() {
  document.querySelectorAll("[data-scroll-to]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTo);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function handleTextSize() {
  const slider = document.getElementById("text-size");
  const root = document.documentElement;
  const storedSize = loadFromLocalStorage("text-size", slider.value);
  root.style.setProperty("--body-size", `${storedSize}px`);
  slider.value = storedSize;

  slider.addEventListener("input", () => {
    root.style.setProperty("--body-size", `${slider.value}px`);
    saveToLocalStorage("text-size", slider.value);
  });
}

function handleSidebarHighlight() {
  const links = document.querySelectorAll(".sidebar-link");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  document.querySelectorAll("main section").forEach((section) => observer.observe(section));
}

function init() {
  initResources();
  initFaqs();
  initEvents();
  initServices();
  handlePersonalForm();
  handleHomeSafetyForm();
  handleMedicalForm();
  handleEventForms();
  handleStatus();
  handleQuickScroll();
  handleTextSize();
  handleSidebarHighlight();
}

window.addEventListener("DOMContentLoaded", init);
