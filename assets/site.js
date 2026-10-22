// Moteur du site : lit contenu.yml et construit la page.
// Pas besoin de toucher à ce fichier pour mettre le site à jour.

const ICONES = {
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
  premiere: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><text x="12" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.5" font-weight="700" fill="currentColor" stroke="none">Pr</text></svg>',
  photoshop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><text x="12" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="9.5" font-weight="700" fill="currentColor" stroke="none">Ps</text></svg>',
  davinci: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="9" r="3.2"/><circle cx="8.6" cy="14.8" r="3.2"/><circle cx="15.4" cy="14.8" r="3.2"/></svg>',
  protools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M6 16.5 12 6.5l6 10"/><path d="M8.6 12.2c2.2-1.2 4.6-1.2 6.8 0"/></svg>',
  flstudio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8.5c-1.6-1-3.6-1.1-5.2-.1C4.4 9.9 3.8 13.4 5 16.4c1.1 2.8 3.4 4.8 5.4 4.6.6-.1 1-.4 1.6-.4s1 .3 1.6.4c2 .2 4.3-1.8 5.4-4.6 1.2-3 .6-6.5-1.8-8-1.6-1-3.6-.9-5.2.1z"/><path d="M12 8.5c0-2.2.9-4.2 2.8-5.5"/><path d="M12.6 5.4c1.5-.9 3.4-.9 4.6.2-1.4 1.1-3.3 1.2-4.6-.2z"/></svg>',
  lien: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M8 7h9v9"/></svg>'
};

const $ = (sel) => document.querySelector(sel);

function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function paragraphes(texte) {
  return String(texte ?? "").trim().split(/\n\s*\n/).map((p) => `<p>${esc(p.trim())}</p>`).join("");
}

function idYoutube(url) {
  const m = String(url || "").match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function plateforme(url) {
  if (!url) return null;
  if (/youtu\.?be/.test(url)) return { nom: "YouTube", icone: ICONES.youtube };
  if (/instagram\.com/.test(url)) return { nom: "Instagram", icone: ICONES.instagram };
  return { nom: "Voir", icone: ICONES.lien };
}

function imageProjet(p) {
  if (p.image) return p.image;
  const id = idYoutube(p.lien);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

function categoriesVisibles(c) {
  return (c.categories || []).filter((cat) => Array.isArray(cat.projets) && cat.projets.length > 0);
}

// ---------- En-tête et pied de page ----------
function entete(c) {
  const s = c.site || {};
  const liens = [
    { id: "accueil", txt: "Accueil" },
    { id: "qui-suis-je", txt: "Qui suis-je" },
    ...categoriesVisibles(c).map((cat) => ({ id: cat.id, txt: cat.titre })),
    { id: "contact", txt: "Contact" }
  ];
  $("#entete").innerHTML = `
    <div class="entete-in">
      <a class="logo" href="#accueil">${esc(s.marque)}<span>.</span></a>
      <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="menu">${liens.map((l) => `<li><a href="#${esc(l.id)}" data-cible="${esc(l.id)}">${esc(l.txt)}</a></li>`).join("")}</ul>
    </div>`;
  const burger = $(".burger"), menu = $(".menu");
  burger.addEventListener("click", () => {
    const ouvert = menu.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", ouvert);
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) { menu.classList.remove("ouvert"); burger.setAttribute("aria-expanded", false); }
  });

  const k = c.contact || {};
  $("#pied").innerHTML = `
    <div class="pied-in">
      <span>© ${new Date().getFullYear()} ${esc(s.marque)} · ${esc(s.nom)}</span>
      <nav>
        ${k.instagram_lien ? `<a href="${esc(k.instagram_lien)}" target="_blank" rel="noopener">Instagram</a>` : ""}
        ${k.linkedin_lien ? `<a href="${esc(k.linkedin_lien)}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
        ${k.email ? `<a href="mailto:${esc(k.email)}">Email</a>` : ""}
      </nav>
    </div>`;
}

// Souligne dans le menu la section en cours de lecture
function suivreSections() {
  const liens = document.querySelectorAll(".menu a");
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (!e.isIntersecting) return;
      liens.forEach((a) => a.classList.toggle("actif", a.dataset.cible === e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main > section[id]").forEach((s) => obs.observe(s));
}

// ---------- Sections ----------
function sectionAccueil(c) {
  const s = c.site || {}, a = c.accueil || {};
  const premiere = categoriesVisibles(c)[0];
  return `
    <section id="accueil" class="hero apparait">
      <p class="surtitre">${esc(s.nom)}</p>
      <h1>${esc(s.marque)}<span>.</span></h1>
      <p class="sous-titre">${esc(a.intro)}</p>
      <div class="hero-bas">
        ${premiere ? `<a class="bouton" href="#${esc(premiere.id)}">${esc(a.bouton || "Voir mes projets")} ↓</a>` : ""}
        <span class="hero-meta">${esc(s.statut)} · ${esc(s.ville)}</span>
      </div>
    </section>`;
}

// Icône d'un logiciel d'après son nom (sans icône connue : un simple tiret)
function logiciel(nom) {
  const n = String(nom).toLowerCase().replace(/[\s-]/g, "");
  const cle = n.includes("premiere") ? "premiere"
    : n.includes("photoshop") ? "photoshop"
    : n.includes("davinci") || n.includes("resolve") ? "davinci"
    : n.includes("protools") ? "protools"
    : n.includes("flstudio") || n.includes("fruity") ? "flstudio"
    : null;
  return cle ? `<li class="avec-icone">${ICONES[cle]}${esc(nom)}</li>` : `<li>${esc(nom)}</li>`;
}

function sectionApropos(c) {
  const s = c.site || {}, a = c.a_propos || {};
  const [prenom, ...reste] = String(s.nom || "").split(" ");
  return `
    <section id="qui-suis-je">
      <h2 class="titre-section">Qui suis-je</h2>
      <div class="apropos">
        ${a.photo ? `<div class="apropos-photo"><img src="${esc(a.photo)}" alt="${esc(s.nom)}" loading="lazy"></div>` : "<div></div>"}
        <div>
          <h3 class="nom"><span class="vert">${esc(prenom)}</span> ${esc(reste.join(" "))}</h3>
          <p class="ville">${esc(s.statut)} · ${esc(s.ville)}</p>
          <div class="texte">${paragraphes(a.texte)}</div>
          <div class="boites">
            ${(a.logiciels || []).length ? `<div class="boite"><h3>Logiciels</h3><ul class="logiciels">${a.logiciels.map(logiciel).join("")}</ul></div>` : ""}
            ${(a.services || []).length ? `<div class="boite"><h3>Services</h3><ul>${a.services.map((l) => `<li>${esc(l)}</li>`).join("")}</ul></div>` : ""}
          </div>
        </div>
      </div>
    </section>`;
}

function carte(p) {
  const img = imageProjet(p);
  const pf = plateforme(p.lien);
  const roles = Array.isArray(p.roles) ? p.roles : String(p.roles || "").split(",").map((r) => r.trim()).filter(Boolean);
  const tag = p.lien ? "a" : "div";
  const attrs = p.lien ? ` href="${esc(p.lien)}" target="_blank" rel="noopener"` : "";
  return `
    <${tag} class="carte"${attrs}>
      <div class="carte-img">
        ${img ? `<img src="${esc(img)}" alt="${esc(p.titre)}" loading="lazy">` : `<div class="carte-vide">${esc((window.__site || {}).marque || "")}</div>`}
        ${pf ? `<span class="plateforme">${pf.icone}${pf.nom}</span>` : ""}
      </div>
      <div class="carte-titre">
        <h3>${esc(p.titre)}</h3>
        <p class="client">${esc(p.client)}</p>
      </div>
      ${roles.length ? `<ul class="roles">${roles.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>` : ""}
    </${tag}>`;
}

function sectionCategorie(cat) {
  return `
    <section id="${esc(cat.id)}">
      <h2 class="titre-section">${esc(cat.titre)}</h2>
      <p class="sous-titre">${esc(cat.description)}</p>
      <div class="grille">${cat.projets.map(carte).join("")}</div>
    </section>`;
}

function sectionContact(c) {
  const s = c.site || {}, k = c.contact || {};
  const envoye = new URLSearchParams(location.search).has("envoye");
  const retour = location.href.split(/[?#]/)[0] + "?envoye=1#contact";
  return `
    <section id="contact">
      <h2 class="titre-section">Contact</h2>
      <div class="contact">
        <div class="coord">
          <div><p class="etiq">Nom</p><p class="val">${esc(s.nom)}</p></div>
          ${k.email ? `<div><p class="etiq">Email</p><a class="val" href="mailto:${esc(k.email)}">${esc(k.email)}</a></div>` : ""}
          ${k.telephone ? `<div><p class="etiq">Téléphone</p><a class="val" href="tel:${esc(String(k.telephone).replace(/\s/g, ""))}">${esc(k.telephone)}</a></div>` : ""}
          <div class="reseaux">
            ${k.instagram_lien ? `<a class="reseau" href="${esc(k.instagram_lien)}" target="_blank" rel="noopener">${ICONES.instagram}${esc(k.instagram_pseudo || "Instagram")}</a>` : ""}
            ${k.linkedin_lien ? `<a class="reseau" href="${esc(k.linkedin_lien)}" target="_blank" rel="noopener">${ICONES.linkedin}${esc(k.linkedin_nom || "LinkedIn")}</a>` : ""}
          </div>
        </div>
        ${k.formulaire === false || !k.email ? "" : envoye
          ? `<div class="merci"><h3>Merci !</h3><p>Ton message est bien parti, je te réponds rapidement.</p></div>`
          : `<form action="https://formsubmit.co/${esc(k.email)}" method="POST">
              <h3>Une demande ?</h3>
              <p class="aide">Projet, devis, question : écris-moi ici.</p>
              <input type="hidden" name="_subject" value="Nouveau message depuis le site ${esc(s.marque)}">
              <input type="hidden" name="_template" value="table">
              <input type="hidden" name="_next" value="${esc(retour)}">
              <input type="text" name="_honey" class="cache" tabindex="-1" autocomplete="off">
              <label>Nom<input type="text" name="nom" required autocomplete="name"></label>
              <label>Email<input type="email" name="email" required autocomplete="email"></label>
              <label>Message<textarea name="message" required></textarea></label>
              <button class="bouton" type="submit">Envoyer</button>
            </form>`}
      </div>
    </section>`;
}

// ---------- Démarrage ----------
async function demarrer() {
  let c;
  try {
    const r = await fetch("contenu.yml", { cache: "no-cache" });
    if (!r.ok) throw new Error(`Fichier contenu.yml introuvable (${r.status})`);
    c = jsyaml.load(await r.text());
  } catch (e) {
    $("#contenu").innerHTML = `<div class="erreur"><h2>Oups, le site n'a pas pu se charger</h2>
      <p>Il y a sûrement une petite erreur dans <strong>contenu.yml</strong> (un espace en trop ou en moins, un guillemet oublié...). Voici l'endroit indiqué :</p>
      <pre>${esc(e.message)}</pre></div>`;
    return;
  }
  window.__site = c.site;
  document.title = `${c.site?.marque} · ${c.site?.nom}`;
  entete(c);
  $("#contenu").innerHTML = [
    sectionAccueil(c),
    sectionApropos(c),
    ...categoriesVisibles(c).map(sectionCategorie),
    sectionContact(c)
  ].join("");
  suivreSections();
  // le contenu est construit après le chargement : on rejoue le lien #ancre éventuel
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
}

demarrer();
