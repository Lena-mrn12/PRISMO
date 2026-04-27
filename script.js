const shape1          = document.getElementById('product-shape');
const shape2          = document.getElementById('product-shape-2');
const svg1            = document.getElementById('product-svg');
const svg2            = document.getElementById('product-svg-2');
const bgImage         = document.getElementById('background-image');
const hexDisplay      = document.getElementById('hex-display');
const matiereDisplay  = document.getElementById('matiere-display');
const silDisplay      = document.getElementById('silhouette-display');
const hudHex          = document.getElementById('hud-hex');
const hudMatiere      = document.getElementById('hud-matiere');
const glitchLayer     = document.getElementById('glitch-layer');
const priceVal        = document.getElementById('price-val');

window.addEventListener('DOMContentLoaded', function () {

  // ── Color picker ──────────────────────────────────────────
  function applyColor(hex) {
    const full = '#' + hex.replace('#', '');
    triggerGlitchColor();
    setTimeout(function () {
      shape1.style.fill = full;
    }, 180);
    hexDisplay.textContent = full.toUpperCase();
    hudHex.textContent     = full.toUpperCase();
  }

  // Chips preset
  const chips = document.querySelectorAll('.color-chip');
  chips.forEach(function (chip) {
    if (!chip.dataset.hex) return;
    chip.addEventListener('click', function () {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyColor(chip.dataset.hex);
    });
  });

  // jscolor sur le bouton "+"
  new jscolor(document.getElementById('color-picker'), {
    onFineChange: function () {
      chips.forEach(c => c.classList.remove('active'));
      document.querySelector('.color-chip-custom').classList.add('active');
      applyColor(this.toString());
    }
  });

  // Valeur initiale
  applyColor('ff7f00');

  // ── Texture par défaut ────────────────────────────────────
  shape2.setAttribute('fill', 'url(#p-satin)');

  // ── Swatches matière ──────────────────────────────────────
  document.querySelectorAll('.tex-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.tex-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const texture = btn.dataset.texture;
      const label   = btn.dataset.label;

      // Glitch sur le SVG texture
      triggerGlitch();

      setTimeout(function () {
        if (texture === 'none') {
          shape2.setAttribute('fill', 'none');
          svg2.style.opacity = '0';
        } else {
          svg2.style.opacity = '';
          shape2.setAttribute('fill', 'url(#p-' + texture + ')');
        }
      }, 180);

      // Update labels
      fadeText(matiereDisplay, label);
      fadeText(hudMatiere, 'MAT // ' + label);

      // Update prix
      if (btn.dataset.price && priceVal) {
        fadeText(priceVal, btn.dataset.price + ',00 €');
      }
    });
  });

  // ── Sélecteur silhouette ──────────────────────────────────
  document.querySelectorAll('.sil-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.sil-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const img   = btn.dataset.img;
      const label = btn.dataset.label;

      // Transition image de fond
      bgImage.style.opacity   = '0';
      bgImage.style.transform = 'scale(1.03)';

      setTimeout(function () {
        bgImage.src             = img;
        bgImage.style.opacity   = '1';
        bgImage.style.transform = 'scale(1)';
      }, 300);

      fadeText(silDisplay, label);
    });
  });

  // ── Helpers ───────────────────────────────────────────────

  function triggerGlitch () {
    svg2.classList.add('glitching');
    glitchLayer.classList.add('active');
    setTimeout(function () {
      svg2.classList.remove('glitching');
      glitchLayer.classList.remove('active');
    }, 380);
  }

  function triggerGlitchColor () {
    svg1.classList.add('glitching');
    glitchLayer.classList.add('active');
    setTimeout(function () {
      svg1.classList.remove('glitching');
      glitchLayer.classList.remove('active');
    }, 380);
  }

  function fadeText (el, text) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(4px)';
    setTimeout(function () {
      el.textContent     = text;
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 200);
  }

  // ── Bouton panier ─────────────────────────────────────────
  const btnCart = document.getElementById('btn-cart');
  btnCart.addEventListener('click', function () {
    btnCart.classList.add('added');
    btnCart.querySelector('.btn-cart-text').textContent = 'AJOUTÉ ✓';
    setTimeout(function () {
      btnCart.classList.remove('added');
      btnCart.querySelector('.btn-cart-text').textContent = 'AJOUTER AU PANIER';
    }, 2000);
  });

});
