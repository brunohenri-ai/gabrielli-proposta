/* ============================================================
   GABRIELLI PASSOS — PROPOSTA DE HONORÁRIOS
   script.js — Versão 2.0
   ============================================================ */

/* ── CONFIGURAÇÃO ─────────────────────────────────────────── */

// Altere a senha aqui
const PASSWORD = 'gabrielli2026';

// Número de WhatsApp (somente números com DDI+DDD)
const WHATSAPP = '5513999999999'; // ← Substitua pelo número real

// E-mail
const EMAIL = 'gabrielli@gabriellipassos.adv.br'; // ← Substitua pelo e-mail real

/* ── ELEMENTOS ─────────────────────────────────────────────── */
const loginScreen = document.getElementById('loginScreen');
const greetScreen = document.getElementById('greetScreen');
const proposal    = document.getElementById('proposal');
const pwInput     = document.getElementById('pwInput');
const pwError     = document.getElementById('pwError');
const pwBtn       = document.getElementById('pwBtn');
const pwEye       = document.getElementById('pwEye');

/* ── LOGIN ─────────────────────────────────────────────────── */
pwBtn.addEventListener('click', tryLogin);
pwInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

function tryLogin() {
  if (pwInput.value.trim() === PASSWORD) {
    // 1. Fade out tela de login
    loginScreen.style.transition = 'opacity 0.5s ease';
    loginScreen.style.opacity = '0';

    setTimeout(() => {
      loginScreen.style.display = 'none';

      // 2. Mostrar tela de boas-vindas
      greetScreen.style.display = 'flex';
      greetScreen.style.opacity = '0';
      greetScreen.style.transition = 'opacity 0.5s ease';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          greetScreen.style.opacity = '1';
          // 3. Iniciar typewriter
          startTypewriter();
        });
      });
    }, 520);

  } else {
    // Senha errada
    pwError.classList.add('show');
    pwError.classList.remove('shake');
    void pwError.offsetWidth;
    pwError.classList.add('shake');
    pwInput.value = '';
    pwInput.focus();
    setTimeout(() => pwError.classList.remove('show'), 3000);
  }
}

// Toggle show/hide senha
pwEye.addEventListener('click', () => {
  if (pwInput.type === 'password') {
    pwInput.type = 'text';
    pwEye.textContent = '🙈';
  } else {
    pwInput.type = 'password';
    pwEye.textContent = '👁';
  }
});

/* ── TYPEWRITER ────────────────────────────────────────────── */
function startTypewriter() {
  const twText   = document.getElementById('twText');
  const twCursor = document.getElementById('twCursor');
  const greetSub = document.getElementById('greetSub');
  const fullText = 'Olá, Gabrielli Passos';
  let i = 0;

  // Delay antes de começar
  setTimeout(() => {
    const interval = setInterval(() => {
      twText.textContent += fullText[i];
      i++;

      if (i >= fullText.length) {
        clearInterval(interval);

        // Subtítulo aparece
        setTimeout(() => {
          greetSub.classList.add('show');
        }, 400);

        // Cursor some e proposta abre
        setTimeout(() => {
          twCursor.classList.add('off');

          // Fade out greet screen
          greetScreen.style.transition = 'opacity 0.6s ease';
          greetScreen.style.opacity = '0';

          setTimeout(() => {
            greetScreen.style.display = 'none';

            // Mostrar proposta
            proposal.style.display = 'block';
            proposal.style.opacity = '0';
            proposal.style.transition = 'opacity 0.6s ease';

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                proposal.style.opacity = '1';
                window.scrollTo(0, 0);
                initAll();
              });
            });
          }, 650);

        }, 1600);
      }
    }, 70); // velocidade de digitação
  }, 500); // delay inicial
}

/* ── ACCORDION ─────────────────────────────────────────────── */
function initAccordion() {
  document.querySelectorAll('.acc-item').forEach((item, idx) => {
    item.querySelector('.acc-head').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
    // Abre o primeiro por padrão
    if (idx === 0) item.classList.add('open');
  });
}

/* ── COPIAR PIX ────────────────────────────────────────────── */
function initCopyPix() {
  const btn = document.getElementById('btnCopy');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const key = '386.744.308-48';
    navigator.clipboard.writeText(key).then(() => {
      btn.textContent = '✓  Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 \u00A0Copiar Chave PIX';
        btn.classList.remove('copied');
      }, 2500);
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = key;
      Object.assign(ta.style, { position:'fixed', opacity:'0' });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '✓  Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 \u00A0Copiar Chave PIX';
        btn.classList.remove('copied');
      }, 2500);
    });
  });
}

/* ── CONTADOR DE VALOR ─────────────────────────────────────── */
function animateCounter(el, target, duration) {
  const start     = 0;
  const startTime = performance.now();

  function update(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo para desacelerar no final
    const ease     = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current  = Math.floor(ease * target);
    // Formata como moeda brasileira
    el.textContent = 'R$ ' + current.toLocaleString('pt-BR') + ',00';
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = 'R$ 4.000,00'; // garante valor exato
  }
  requestAnimationFrame(update);
}

/* ── SCROLL ANIMATIONS ─────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');

        // Dispara contador quando a seção de honorários entrar na tela
        if (e.target.closest('#fees')) {
          const counter = document.getElementById('feesCounter');
          if (counter && counter.textContent === 'R$ 0,00') {
            setTimeout(() => animateCounter(counter, 4000, 1800), 300);
          }
        }

        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── NAVBAR FLUTUANTE ──────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('show', window.scrollY > 100);
  }, { passive: true });
}

/* ── BACK TO TOP ───────────────────────────────────────────── */
function initBackTop() {
  const btn = document.getElementById('back-top');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── CTA BUTTONS ───────────────────────────────────────────── */
function initCTA() {
  const wa = document.getElementById('btnWhatsApp');
  const em = document.getElementById('btnEmail');

  if (wa) {
    const msg = encodeURIComponent(
      'Olá, Gabrielli! De acordo com os termos da proposta de honorários referente ao Processo nº 1010535-44.2024.8.26.0223. Podemos prosseguir.'
    );
    wa.href = `https://wa.me/${WHATSAPP}?text=${msg}`;
  }

  if (em) {
    const subj = encodeURIComponent('DE ACORDO — Proposta de Honorários — Proc. 1010535-44.2024.8.26.0223');
    const body = encodeURIComponent('Olá, Gabrielli,\n\nEstou de acordo com os termos da proposta de honorários.\n\nAtenciosamente,');
    em.href = `mailto:${EMAIL}?subject=${subj}&body=${body}`;
  }
}

/* ── LOGO FALLBACK ─────────────────────────────────────────── */
function initLogos() {
  const pairs = [
    ['loginLogoImg',   'loginLogoFallback'],
    ['coverLogoImg',   'coverLogoFallback'],
    ['navLogoImg',     'navLogoText'],
    ['closingLogoImg', 'closingLogoText'],
  ];
  pairs.forEach(([imgId, fbId]) => {
    const img = document.getElementById(imgId);
    const fb  = document.getElementById(fbId);
    if (!img || !fb) return;
    const show = () => { img.style.display = 'none'; fb.style.display = 'block'; };
    img.addEventListener('error', show);
    if (img.complete && img.naturalWidth === 0) show();
  });
}

/* ── INICIALIZAÇÃO APÓS LOGIN ──────────────────────────────── */
function initAll() {
  initAccordion();
  initCopyPix();
  initReveal();
  initNavbar();
  initBackTop();
  initCTA();
}

/* ── BOOT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLogos();
});
