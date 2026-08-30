'use client';

import { FormEvent, useEffect, useState } from 'react';
import { faqs, process, projects, services, team } from './data';

const nebulaImages = [
  ['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1300&q=85', 'Sala de Casa Niebla con tonos tierra y luz suave'],
  ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1300&q=85', 'Cocina de diseño contemporáneo con acabados naturales'],
  ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1300&q=85', 'Patio interior con vegetación'],
  ['https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1300&q=85', 'Detalle de madera y materialidad cálida'],
];

const materialImages = [
  ['Madera', 'Textura', 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=900&q=85'],
  ['Piedra', 'Tiempo', 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=85'],
  ['Concreto', 'Luz', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85'],
  ['Acero', 'Estructura', 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=900&q=85'],
  ['Textiles', 'Uso', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85'],
  ['Vegetación', 'Sombra', 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=900&q=85'],
];

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

export default function AureaSite() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    revealables.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function closeMenu() { setMenuOpen(false); }
  function submitDemo(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }

  return (
    <main className="site">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <nav className="nav" aria-label="Navegación principal">
          <a href="#inicio" className="wordmark" aria-label="ÁUREA, inicio" onClick={closeMenu}>ÁUREA<small>Arquitectura & Interiores</small></a>
          <div className="nav-links">
            {['Proyectos', 'Servicios', 'Estudio', 'Proceso', 'Contacto'].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </div>
          <a className="nav-cta" href="#contacto">Iniciar proyecto</a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Cerrar' : 'Menú'}</button>
        </nav>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <p className="section-tag">ÁUREA / Índice</p>
        <div className="mobile-menu-links">
          {['Proyectos', 'Servicios', 'Estudio', 'Proceso', 'Contacto'].map((item, index) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}><span>0{index + 1}</span>{item}</a>)}
        </div>
        <p className="mobile-menu-note">Guadalajara, Jalisco<br />Arquitectura & Interiores</p>
      </div>

      <section id="inicio" className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Guadalajara, Jalisco</p>
          <h1 id="hero-title">Diseñamos espacios que se sienten propios.</h1>
          <p className="hero-subtext">Arquitectura e interiores contemporáneos pensados para vivir, trabajar y habitar mejor.</p>
          <div className="hero-actions"><a className="button-solid" href="#proyectos">Ver proyectos</a><a className="button-outline" href="#contacto">Cuéntanos tu idea</a></div>
          <div className="hero-meta"><span>Arquitectura</span><span>Interiores</span><span>Guadalajara</span></div>
        </div>
        <div className="hero-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88" alt="Interior contemporáneo con madera, piedra y luz natural" fetchPriority="high" /><span className="hero-caption">Casa Niebla / 01</span></div>
      </section>

      <section className="intro" aria-labelledby="recent-title">
        <p className="section-tag" data-reveal>01 — ÁUREA</p>
        <div data-reveal><h2 id="recent-title">Espacios recientes.</h2><p>Diseñamos arquitectura e interiores contemporáneos que combinan función, luz, materiales y personalidad.</p></div>
      </section>

      <section id="proyectos" className="projects" aria-label="Proyectos destacados">
        {projects.map((project, index) => (
          <article className={`project project-${index + 1}`} key={project.id} data-reveal>
            <div className="project-image-wrap" tabIndex={0} role="group" aria-label={project.title}>
              <img src={project.image} alt={project.alt} loading="lazy" />
              <div className="project-hover"><span>{project.description}</span><Arrow /></div>
            </div>
            <div className="project-info"><span className="project-number">{project.id}</span><div><h3>{project.title}</h3><p>{project.place} <i /> {project.type} <i /> {project.year}</p></div></div>
          </article>
        ))}
      </section>

      <section id="casa-niebla" className="case-study" aria-labelledby="case-title">
        <div className="case-header" data-reveal><p className="section-tag">Proyecto destacado</p><span className="case-no">01</span><div><h2 id="case-title">Casa Niebla</h2><p className="case-type">Residencial — Zapopan, Jalisco — 2026 — 280 m²</p></div></div>
        <figure className="case-hero-image" data-reveal><img src="https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=1800&q=85" alt="Exterior sobrio de Casa Niebla" loading="lazy" /><figcaption>Exterior / la casa se abre hacia sus patios</figcaption></figure>
        <div className="case-copy" data-reveal><p>Casa Niebla se organiza alrededor de dos patios que permiten que la luz cambie durante el día.</p><p>Concreto aparente, madera y vegetación crean una transición suave entre interior y exterior.</p></div>
        <div className="case-gallery">
          {nebulaImages.map(([image, alt], index) => <figure key={image} className={`case-gallery-image cg-${index + 1}`} data-reveal><img src={image} alt={alt} loading="lazy" /></figure>)}
        </div>
      </section>

      <section id="servicios" className="services" aria-labelledby="services-title">
        <div className="services-intro" data-reveal><p className="section-tag">02 — Servicios</p><h2 id="services-title">Del concepto al espacio terminado.</h2></div>
        <div className="services-layout">
          <div className="service-list">
            {services.map((service, index) => <button key={service.no} type="button" className={`service-row ${activeService === index ? 'is-active' : ''}`} onClick={() => setActiveService(index)} onMouseEnter={() => setActiveService(index)} aria-expanded={activeService === index}><span>{service.no}</span><strong>{service.title}</strong><em>{activeService === index ? '−' : '+'}</em><small>{service.description}</small></button>)}
          </div>
          <div className="service-image" aria-live="polite"><img key={services[activeService].image} src={services[activeService].image} alt={services[activeService].alt} loading="lazy" /><p>{services[activeService].description}</p></div>
        </div>
      </section>

      <section className="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy-image" data-reveal><img src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1500&q=85" alt="Arquitectura residencial entre sombras y vegetación" loading="lazy" /></div>
        <div className="philosophy-copy" data-reveal><p className="section-tag">03 — Filosofía</p><h2 id="philosophy-title">Menos ruido.<br /> <i>Más intención.</i></h2><div className="philosophy-text"><p>No buscamos llenar espacios.</p><p>Buscamos entender cómo se viven.</p><p>Cómo entra la luz.<br />Cómo se mueve una persona.<br />Qué necesita guardar.<br />Dónde quiere reunirse.<br />Qué materiales envejecen bien.</p><p>Cada proyecto comienza escuchando.</p></div></div>
        <div className="word-field" aria-hidden="true"><span>LUZ</span><span>MATERIAL</span><span>FUNCIÓN</span><span>TIEMPO</span></div>
      </section>

      <section id="proceso" className="process" aria-labelledby="process-title">
        <div className="process-title" data-reveal><p className="section-tag">04 — Proceso</p><h2 id="process-title">Cómo <br />trabajamos.</h2></div>
        <ol className="process-list">
          {process.map(([number, title, description]) => <li key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}
        </ol>
      </section>

      <section id="estudio" className="studio" aria-labelledby="studio-title">
        <div className="studio-main" data-reveal><p className="section-tag">05 — Estudio</p><h2 id="studio-title">Un estudio pequeño por <i>elección.</i></h2><p>Trabajamos con pocos proyectos al mismo tiempo para mantener una relación cercana con cada cliente y cuidar cada decisión.</p></div>
        <div className="studio-stats" data-reveal><div><strong>2019</strong><span>Fundación</span></div><div><strong>43</strong><span>Proyectos</span></div><div><strong>6</strong><span>Personas</span></div><div><strong>3</strong><span>Ciudades</span></div></div>
        <p className="fiction-note">Datos ficticios para proyecto conceptual.</p>
      </section>

      <section className="team" aria-labelledby="team-title">
        <div className="team-heading" data-reveal><p className="section-tag">Equipo</p><h2 id="team-title">Miradas distintas.<br />Una dirección.</h2></div>
        <div className="team-grid">
          {team.map(([name, role, specialty, image], index) => <article className={`team-member tm-${index + 1}`} key={name} data-reveal><img src={image} alt={`Retrato ficticio de ${name}`} loading="lazy" /><div><h3>{name}</h3><p>{role}</p><small>{specialty}</small></div></article>)}
        </div>
      </section>

      <section className="materials" aria-labelledby="materials-title">
        <div className="materials-heading" data-reveal><p className="section-tag">06 — Materiales</p><h2 id="materials-title">Materiales que<br /><i>envejecen bien.</i></h2></div>
        <div className="materials-grid">
          {materialImages.map(([material, annotation, image], index) => <figure className={`material material-${index + 1}`} key={material} data-reveal><img src={image} alt={`${material} en arquitectura e interiores`} loading="lazy" /><figcaption><span>{material}</span><small>{annotation}</small></figcaption></figure>)}
        </div>
      </section>

      <section className="testimonials" aria-labelledby="testimonials-title">
        <div data-reveal><p className="section-tag">07 — Testimonios</p><h2 id="testimonials-title">Lo que queda después del proyecto.</h2></div>
        <div className="testimonial-list">
          <figure data-reveal><blockquote>“Entendieron lo que queríamos incluso cuando nosotros no sabíamos explicarlo. Nuestra casa se siente completamente nuestra.”</blockquote><figcaption>Mariana y Diego</figcaption></figure>
          <figure data-reveal><blockquote>“El proceso fue muy claro y nunca sentimos que estuviéramos tomando decisiones a ciegas.”</blockquote><figcaption>Laura G.</figcaption></figure>
          <figure data-reveal><blockquote>“ÁUREA logró transformar un local pequeño en un espacio con muchísima identidad.”</blockquote><figcaption>Estudio Norte</figcaption></figure>
        </div>
        <p className="fiction-note">Testimonios ficticios para demostración.</p>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div className="faq-title" data-reveal><p className="section-tag">08 — Preguntas</p><h2 id="faq-title">Antes de<br />comenzar.</h2></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => <article className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={question} data-reveal><h3><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button></h3><div className="faq-answer"><p>{answer}</p></div></article>)}
        </div>
      </section>

      <section id="contacto" className="contact" aria-labelledby="contact-title">
        <div className="contact-heading" data-reveal><p className="section-tag">09 — Contacto</p><h2 id="contact-title">Cuéntanos qué quieres transformar.</h2><p>Una primera conversación es el mejor punto de partida.</p></div>
        <form className="contact-form" onSubmit={submitDemo} data-reveal>
          <label><span>Nombre</span><input type="text" name="name" autoComplete="name" required /></label>
          <label><span>Correo</span><input type="email" name="email" autoComplete="email" required /></label>
          <label><span>Tipo de proyecto</span><select name="projectType" defaultValue=""><option value="" disabled>Seleccionar</option><option>Arquitectura residencial</option><option>Interiorismo</option><option>Remodelación</option><option>Diseño comercial</option><option>Otro</option></select></label>
          <label><span>Ubicación</span><input type="text" name="location" /></label>
          <label><span>Presupuesto aproximado</span><select name="budget" defaultValue=""><option value="" disabled>Seleccionar</option><option>Menos de $500,000 MXN</option><option>$500,000 — $1,500,000 MXN</option><option>Más de $1,500,000 MXN</option><option>Prefiero conversarlo</option></select></label>
          <label className="message-field"><span>Mensaje</span><textarea name="message" rows={4} /></label>
          <div className="form-end"><button className="button-solid" type="submit">Enviar proyecto <Arrow /></button>{submitted && <p role="status">Gracias. Este formulario es demostrativo de portafolio y no envía datos.</p>}</div>
          {!submitted && <p className="form-note">Formulario demostrativo de portafolio. No se enviarán datos.</p>}
        </form>
      </section>

      <section className="location" aria-label="Ubicación ficticia"><div data-reveal><p className="section-tag">Visítanos</p><p className="location-address">Calle Forma 218,<br />Col. Americana, Guadalajara, Jalisco</p><p className="fiction-note">Dirección ficticia utilizada únicamente para demostración.</p></div><div className="location-image" data-reveal><img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85" alt="Fachada arquitectónica urbana contemporánea" loading="lazy" /></div></section>

      <section className="final-cta" aria-labelledby="final-title"><img src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1800&q=85" alt="Casa contemporánea al atardecer" loading="lazy" /><div className="final-cta-overlay"><p className="section-tag">ÁUREA / Guadalajara</p><h2 id="final-title">Hagamos espacio<br />para algo nuevo.</h2><p>Cuéntanos qué quieres construir, transformar o imaginar.</p><a className="button-solid" href="#contacto">Iniciar proyecto <Arrow /></a></div></section>

      <footer className="footer"><div className="footer-brand"><a href="#inicio" className="wordmark">ÁUREA<small>Arquitectura & Interiores</small></a><p>Espacios que se sienten propios.</p></div><div className="footer-links"><a href="#proyectos">Proyectos</a><a href="#servicios">Servicios</a><a href="#estudio">Estudio</a><a href="#proceso">Proceso</a><a href="#contacto">Contacto</a></div><div className="footer-contact"><p>Guadalajara, Jalisco</p><a href="mailto:hola@aurea-estudio.example.com">hola@aurea-estudio.example.com</a><a href="https://instagram.com/aurea.estudio" target="_blank" rel="noreferrer">@aurea.estudio</a><a href="tel:+523300002873">+52 33 0000 2873</a></div><div className="footer-legal"><p>Proyecto conceptual creado para portafolio. Todos los proyectos y datos mostrados son ficticios.</p><p>© 2026 ÁUREA Arquitectura & Interiores.</p></div></footer>
    </main>
  );
}

