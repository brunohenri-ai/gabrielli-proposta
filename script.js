/* ============================================================
   GABRIELLI PASSOS — PROPOSTA DE HONORÁRIOS
   script.js — Versão 1.0
   ============================================================ */

/* ── CONFIGURAÇÃO ─────────────────────────────────────────── */

// Altere a senha aqui
const PASSWORD = 'gabrielli2026';

// Número de WhatsApp da advogada (somente números, com código do país)
// Exemplo: 5513999999999 (55 = Brasil, 13 = DDD, xxxxxxxxx = número)
const WHATSAPP_NUMBER = '5511999999999'; // ← Substitua pelo número real

// E-mail da advogada
const EMAIL = 'gabrielli@gabriellipassos.adv.br'; // ← Substitua pelo e-mail real

/* ── TELA DE SENHA ─────────────────────────────────────────── */

const passwordScreen = document.getElementById('password-screen');
const proposal       = document.getElementById('proposal');
const pwInput        = document.getElementById('pw-input');
const pwError        = document.getElementById('pw-error');
const pwBtn          = document.getElementById('pw-btn');
const pwToggle       = document.getElementById('pw-toggle');

// Verificar senha ao clicar no botão
pwBtn.addEventListener('click', checkPassword);

// Verificar senha ao pressionar Enter
pwInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPassword();
});

function checkPassword() {
  const val = pwInput.value.trim();

  if (val === PASSWORD) {
    // Senha correta → transição suave
    passwordScreen.style.transition = 'opacity 0.6s ease';
    passwordScreen.style.opacity = '0';
    setTimeout(() => {
      passwordScreen.style.display = 'none';
      proposal.style.display = 'block';
      // Trigger scroll animations após mostrar proposta
      initScrollAnimations();
      // Scroll ao topo
      window.scrollTo(0, 0);
    }, 650);
  } else {
    // Senha incorreta → shake + mensagem
    showError('Senha incorreta. Tente novamente.');
    pwInput.value = '';
    pwInput.focus();
    triggerShake();
  }
}

function showError(msg) {
  pwError.textContent = msg;
  pwError.classList.add('visible');
  setTimeout(() => pwError.classList.remove('visible'), 3500);
}

function triggerShake() {
  pwInput.classList.remove('shake');
  void pwInput.offsetWidth; // reflow para reiniciar animação
  pwInput.classList.add('shake');
  setTimeout(() => pwInput.classList.remove('shake'), 500);
}

// Toggle visibilidade da senha
pwToggle.addEventListener('click', () => {
  if (pwInput.type === 'password') {
    pwInput.type = 'text';
    pwToggle.textContent = '🙈';
  } else {
    pwInput.type = 'password';
    pwToggle.textContent = '👁';
  }
});

/* ── ACCORDION — CLÁUSULAS ─────────────────────────────────── */

function initAccordion() {
  const items = document.querySelectorAll('.acc-item');

  items.forEach(item => {
    const header = item.querySelector('.acc-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fechar todos os outros
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
        }
      });

      // Toggle atual
      item.classList.toggle('open', !isOpen);
    });
  });

  // Abrir o primeiro por padrão
  if (items.length > 0) {
    items[0].classList.add('open');
  }
}

/* ── COPIAR CHAVE PIX ──────────────────────────────────────── */

function initCopyPix() {
  const btn = document.getElementById('btn-copy-pix');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const pixKey = '386.744.308-48';
    navigator.clipboard.writeText(pixKey).then(() => {
      btn.textContent = '✓ Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '<span>📋</span> Copiar Chave PIX';
        btn.classList.remove('copied');
      }, 2500);
    }).catch(() => {
      // Fallback para navegadores sem clipboard API
      const ta = document.createElement('textarea');
      ta.value = pixKey;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = '✓ Copiado!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '<span>📋</span> Copiar Chave PIX';
        btn.classList.remove('copied');
      }, 2500);
    });
  });
}

/* ── SCROLL ANIMATIONS (Intersection Observer) ─────────────── */

function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Delay escalonado para elementos em grupo
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: mostrar tudo imediatamente
    reveals.forEach(el => el.classList.add('visible'));
  }
}

/* ── HEADER FLUTUANTE ──────────────────────────────────────── */

function initStickyHeader() {
  const header = document.getElementById('sticky-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  }, { passive: true });
}

/* ── BOTÃO VOLTAR AO TOPO ──────────────────────────────────── */

function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── BOTÕES DE CTA ─────────────────────────────────────────── */

function initCTA() {
  const btnWhatsApp = document.getElementById('btn-whatsapp');
  const btnEmail    = document.getElementById('btn-email');

  if (btnWhatsApp) {
    const msg = encodeURIComponent(
      'Olá, Gabrielli! De acordo com os termos da proposta de honorários — Processo nº 1010535-44.2024.8.26.0223. Podemos prosseguir.'
    );
    btnWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  }

  if (btnEmail) {
    const subject = encodeURIComponent('DE ACORDO — Proposta de Honorários — Proc. 1010535-44.2024.8.26.0223');
    const body    = encodeURIComponent(
      'Olá, Gabrielli,\n\nEstou de acordo com os termos apresentados na proposta de honorários.\n\nPodemos prosseguir.\n\nAtenciosamente,'
    );
    btnEmail.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }
}

/* ── LOGO FALLBACK ─────────────────────────────────────────── */

function initLogoFallback() {
  // Se a imagem do logo falhar, mostrar o monograma elegante
  const logos = document.querySelectorAll('.logo-img');
  logos.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallback = img.nextElementSibling;
      if (fallback && fallback.classList.contains('logo-fallback')) {
        fallback.style.display = 'flex';
      }
    });
    // Forçar verificação imediata
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });
}

/* ── INICIALIZAÇÃO ─────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initLogoFallback();
  initAccordion();
  initCopyPix();
  initBackToTop();
  initCTA();
  // initStickyHeader e initScrollAnimations são chamados após login
  // pois o #proposal fica oculto inicialmente
});
