/* ============================================================
   GABRIELLI PASSOS — PROPOSTA DE HONORÁRIOS
   script.js — Versão 3.0
   ============================================================ */

/* ── CONFIGURAÇÃO ─────────────────────────────────────────── */
const CONFIG = {
  senha:      'gabrielli2026',
  nome:       'Gabrielli Passos',
  mensagem:   'Sua proposta foi preparada com atenção técnica e dedicação exclusiva.',
  whatsapp:   '5513999999999',
  email:      'gabrielli@gabriellipassos.adv.br',
};

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  const loginScreen = document.getElementById('loginScreen');
  const loginForm   = document.getElementById('loginForm');
  const loginError  = document.getElementById('loginError');
  const greetScreen = document.getElementById('greetScreen');
  const proposal    = document.getElementById('proposal');
  const inputPass   = document.getElementById('inputPass');

  /* Session: já autenticado nesta aba */
  if (sessionStorage.getItem('gp_auth') === 'true') {
    loginScreen.classList.add('hidden');
    showProposal();
  }

  /* ── LOGIN ─────────────────────────────────────────────── */
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = inputPass.value.trim();

    if (pass === CONFIG.senha) {
      sessionStorage.setItem('gp_auth', 'true');
      loginScreen.classList.add('hidden');
      showGreeting();
    } else {
      loginError.classList.add('show');
      inputPass.value = '';
      inputPass.focus();
      setTimeout(() => loginError.classList.remove('show'), 3000);
    }
  });

  /* ── TYPEWRITER ────────────────────────────────────────── */
  function showGreeting() {
    greetScreen.classList.add('visible');
    document.body.style.overflow = 'hidden';

    const greetLine = document.getElementById('greetLine');
    const greetName = document.getElementById('greetName');
    const greetMsg  = document.getElementById('greetMsg');

    setTimeout(() => greetLine.classList.add('visible'), 300);

    setTimeout(() => {
      typeText(greetName, `Olá, ${CONFIG.nome}.`, 55, () => {
        setTimeout(() => {
          typeText(greetMsg, CONFIG.mensagem, 28, () => {
            setTimeout(() => {
              greetScreen.classList.add('fade-out');
              setTimeout(() => {
                greetScreen.classList.remove('visible');
                showProposal();
              }, 1000);
            }, 2000);
          });
        }, 600);
      });
    }, 800);
  }

  function typeText(el, text, speed, callback) {
    let i = 0;
    el.style.visibility = 'visible';
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i++);
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  /* ── MOSTRAR PROPOSTA ──────────────────────────────────── */
  function showProposal() {
    proposal.style.display = 'block';
    proposal.style.opacity = '0';
    proposal.style.transition = 'opacity 0.7s ease';
    document.body.style.overflow = 'auto';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      proposal.style.opacity = '1';
      window.scrollTo(0, 0);
      initAll();
    }));
  }

  /* ── NAVBAR ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('show', window.scrollY > 100);
    }, { passive: true });
  }

  /* ── BACK TO TOP ───────────────────────────────────────── */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});

/* ── ACCORDION ─────────────────────────────────────────────── */
function initAccordion() {
  document.querySelectorAll('.acc-item').forEach((item, idx) => {
    item.querySelector('.acc-head').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
    if (idx === 0) item.classList.add('open');
  });
}

/* ── COPIAR PIX ────────────────────────────────────────────── */
function initCopyPix() {
  const btn = document.getElementById('btnCopy');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const key = '386.744.308-48';
    const copy = () => {
      btn.textContent = '✓  Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 \u00A0Copiar Chave PIX';
        btn.classList.remove('copied');
      }, 2500);
    };
    navigator.clipboard
      ? navigator.clipboard.writeText(key).then(copy).catch(() => fallbackCopy(key, copy))
      : fallbackCopy(key, copy);
  });
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  Object.assign(ta.style, { position: 'fixed', opacity: '0' });
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  cb();
}

/* ── CONTADOR DE VALOR ─────────────────────────────────────── */
function animateCounter(el, target, duration) {
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease     = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = 'R$ ' + Math.floor(ease * target).toLocaleString('pt-BR') + ',00';
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = 'R$ 4.000,00';
  }
  requestAnimationFrame(update);
}

/* ── REVEAL ON SCROLL ──────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      if (e.target.closest('#fees')) {
        const counter = document.getElementById('feesCounter');
        if (counter && counter.textContent === 'R$ 0,00')
          setTimeout(() => animateCounter(counter, 4000, 1800), 300);
      }
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── CTA BUTTONS ───────────────────────────────────────────── */
function initCTA() {
  const wa = document.getElementById('btnWhatsApp');
  const em = document.getElementById('btnEmail');
  if (wa) {
    const msg = encodeURIComponent(
      'Olá, Gabrielli! De acordo com os termos da proposta de honorários referente ao Processo nº 1010535-44.2024.8.26.0223. Podemos prosseguir.'
    );
    wa.href = `https://wa.me/${CONFIG.whatsapp}?text=${msg}`;
  }
  if (em) {
    const subj = encodeURIComponent('DE ACORDO — Proposta de Honorários — Proc. 1010535-44.2024.8.26.0223');
    const body = encodeURIComponent('Olá, Gabrielli,\n\nEstou de acordo com os termos da proposta de honorários.\n\nAtenciosamente,');
    em.href = `mailto:${CONFIG.email}?subject=${subj}&body=${body}`;
  }
}

/* ── INIT ALL ──────────────────────────────────────────────── */
function initAll() {
  initAccordion();
  initCopyPix();
  initReveal();
  initCTA();
}
