// ============================================================
// TOASTS
// ============================================================
const toastContainer = document.getElementById('toast-container');

const ICONS = {
  success: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  error: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
};

function showToast(message, type = 'success', timeout = 4000) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${ICONS[type] || ICONS.success}</span>
    <span class="toast-message"></span>
    <button type="button" class="toast-close" aria-label="Fechar">${ICONS.close}</button>
  `;
  toast.querySelector('.toast-message').textContent = message;

  const dismiss = () => {
    if (toast.classList.contains('leaving')) return;
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 220);
  };
  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  toastContainer.appendChild(toast);
  setTimeout(dismiss, timeout);
}

// ============================================================
// ESTADO DE IMAGENS
// pendingImages: array de itens { type: 'kept' | 'new', url?, file?, previewUrl, objectUrl? }
// ============================================================
const fileInput = document.getElementById('images');
const preview = document.getElementById('preview');
const uploadArea = document.getElementById('upload-area');

let pendingImages = [];

function revokeAllObjectUrls() {
  pendingImages.forEach((p) => {
    if (p.objectUrl) URL.revokeObjectURL(p.objectUrl);
  });
}

function clearPendingImages() {
  revokeAllObjectUrls();
  pendingImages = [];
  if (preview) preview.innerHTML = '';
  if (fileInput) fileInput.value = '';
}

function syncKeptImagesField() {
  const field = document.getElementById('kept_images');
  if (!field) return;
  const kept = pendingImages.filter((p) => p.type === 'kept').map((p) => p.url);
  field.value = JSON.stringify(kept);
}

function renderPreview() {
  if (!preview) return;
  preview.innerHTML = '';

  pendingImages.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'preview-item';

    const coverBadge = index === 0 ? '<span class="preview-cover">Capa</span>' : '';

    div.innerHTML = `
      <img src="${item.previewUrl}" alt="">
      ${coverBadge}
      <button type="button" class="preview-remove" aria-label="Remover imagem">${ICONS.close}</button>
    `;

    div.querySelector('.preview-remove').addEventListener('click', () => {
      if (item.objectUrl) URL.revokeObjectURL(item.objectUrl);
      pendingImages.splice(index, 1);
      renderPreview();
    });

    preview.appendChild(div);
  });

  syncKeptImagesField();
}

function addFiles(files) {
  const remaining = 6 - pendingImages.length;
  if (remaining <= 0) {
    showToast('Máximo de 6 imagens por produto.', 'error');
    return;
  }
  const accepted = Array.from(files)
    .filter((f) => f.type.startsWith('image/'))
    .slice(0, remaining);

  accepted.forEach((file) => {
    const objectUrl = URL.createObjectURL(file);
    pendingImages.push({
      type: 'new',
      file,
      previewUrl: objectUrl,
      objectUrl,
    });
  });

  renderPreview();
}

if (fileInput) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length) {
      addFiles(fileInput.files);
    }
    fileInput.value = '';
  });
}

if (uploadArea && fileInput) {
  ['dragenter', 'dragover'].forEach((ev) => {
    uploadArea.addEventListener(ev, (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach((ev) => {
    uploadArea.addEventListener(ev, (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
    });
  });
  uploadArea.addEventListener('drop', (e) => {
    if (e.dataTransfer?.files?.length) {
      addFiles(e.dataTransfer.files);
    }
  });
}

// ============================================================
// CONTADOR DE CARACTERES (descrição curta)
// ============================================================
const shortInput = document.getElementById('shortDescription');
const shortCount = document.getElementById('short-count');
if (shortInput && shortCount) {
  const updateCount = () => {
    shortCount.textContent = shortInput.value.length;
  };
  shortInput.addEventListener('input', updateCount);
  updateCount();
}

// ============================================================
// FORM: novo / edição
// ============================================================
const form = document.getElementById('product-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const cancelEditBtn = document.getElementById('cancel-edit');
const formTitle = document.getElementById('form-title');
const formSubtitle = document.getElementById('form-subtitle');
const formPanel = document.getElementById('form-panel');

let editingId = null;

function setFormMode(mode, product) {
  if (mode === 'edit' && product) {
    editingId = product.id;
    if (formTitle) formTitle.textContent = `Editando: ${product.name}`;
    if (formSubtitle)
      formSubtitle.textContent =
        'Altere os dados e clique em Salvar alterações. As imagens marcadas como Capa aparecem no catálogo.';
    if (submitText) submitText.textContent = 'Salvar alterações';
    if (cancelEditBtn) cancelEditBtn.hidden = false;
  } else {
    editingId = null;
    if (formTitle) formTitle.textContent = 'Novo produto';
    if (formSubtitle)
      formSubtitle.textContent =
        'Preencha os dados e envie imagens. O produto aparece no catálogo imediatamente.';
    if (submitText) submitText.textContent = 'Cadastrar produto';
    if (cancelEditBtn) cancelEditBtn.hidden = true;
  }
}

function fillFormWithProduct(product) {
  form.elements.name.value = product.name || '';
  form.elements.category.value = product.category || 'decoracao';
  form.elements.shortDescription.value = product.shortDescription || '';
  form.elements.longDescription.value = product.longDescription || '';
  form.elements.features.value = (product.features || []).join('\n');
  form.elements.price.value = product.price ?? '';
  form.elements.leadTimeDays.value = product.leadTimeDays ?? 5;
  form.elements.badge.value = product.badge || '';

  // Campos EN
  if (form.elements.name_en) form.elements.name_en.value = product.name_en || '';
  if (form.elements.shortDescription_en)
    form.elements.shortDescription_en.value = product.shortDescription_en || '';
  if (form.elements.longDescription_en)
    form.elements.longDescription_en.value = product.longDescription_en || '';
  if (form.elements.features_en)
    form.elements.features_en.value = (product.features_en || []).join('\n');
  if (form.elements.badge_en) form.elements.badge_en.value = product.badge_en || '';

  if (shortCount) shortCount.textContent = form.elements.shortDescription.value.length;

  clearPendingImages();
  const urls = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];
  urls.forEach((url) => {
    pendingImages.push({ type: 'kept', url, previewUrl: url });
  });
  renderPreview();
}

function startEdit(product) {
  fillFormWithProduct(product);
  setFormMode('edit', product);
  if (formPanel) formPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  form.elements.name.focus({ preventScroll: true });
  highlightEditing(product.id);
}

function cancelEdit() {
  setFormMode('new');
  form.reset();
  clearPendingImages();
  if (shortCount) shortCount.textContent = '0';
  highlightEditing(null);
}

if (cancelEditBtn) {
  cancelEditBtn.addEventListener('click', () => {
    cancelEdit();
    formPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (form && submitBtn) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = editingId ? 'Salvando...' : 'Cadastrando...';

    try {
      const fd = new FormData(form);
      // Remove qualquer file input auto-incluído e usa apenas os novos controlados
      fd.delete('images');
      pendingImages
        .filter((p) => p.type === 'new')
        .forEach((p) => fd.append('images', p.file));

      // Garante que o campo hidden reflita o estado atual
      fd.set('kept_images', JSON.stringify(
        pendingImages.filter((p) => p.type === 'kept').map((p) => p.url),
      ));

      const url = editingId
        ? `/admin/api/products/${editingId}`
        : '/admin/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body: fd });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Erro ${res.status}`);
      }

      showToast(
        editingId ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!',
        'success',
      );

      cancelEdit();
      await loadProducts();
    } catch (err) {
      showToast(err.message || 'Falha ao salvar produto', 'error', 6000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
      // Restaura o label dinâmico (o innerHTML troca o span pelo texto cru)
      if (submitText) submitText.textContent = editingId ? 'Salvar alterações' : 'Cadastrar produto';
      const newSubmitText = document.getElementById('submit-text');
      if (newSubmitText) {
        newSubmitText.textContent = editingId ? 'Salvar alterações' : 'Cadastrar produto';
      }
    }
  });
}

// ============================================================
// LISTA: render, filtro, edit, delete
// ============================================================
const list = document.getElementById('products-list');
const countBadge = document.getElementById('count-badge');
const statCount = document.getElementById('stat-count');
const statCategories = document.getElementById('stat-categories');
const searchInput = document.getElementById('list-search');

let allProducts = [];
let currentFilter = '';

const CATEGORY_LABELS = {
  decoracao: 'Decoração',
  utilidades: 'Utilidades',
  personalizados: 'Personalizados',
  prototipos: 'Protótipos',
};

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function highlightEditing(id) {
  document.querySelectorAll('.product-item').forEach((el) => {
    el.classList.toggle('product-item--editing', el.dataset.id === id);
  });
}

function renderProducts(products) {
  if (!list) return;
  if (!products.length) {
    const message =
      allProducts.length === 0
        ? 'Nenhum produto cadastrado ainda.'
        : 'Nenhum produto encontrado para essa busca.';
    list.innerHTML = `<p class="muted">${message}</p>`;
    return;
  }

  list.innerHTML = '';
  products.forEach((p) => {
    const item = document.createElement('div');
    item.className = 'product-item';
    item.dataset.id = p.id;

    const img = p.image
      ? `<img src="${p.image}" alt="" class="product-thumb" loading="lazy">`
      : `<div class="product-thumb product-thumb--empty">📦</div>`;

    const categoryLabel = CATEGORY_LABELS[p.category] || p.category;

    item.innerHTML = `
      ${img}
      <div class="product-info">
        <div class="product-name"></div>
        <div class="product-meta">
          <span>${categoryLabel}</span>
          <span class="sep">·</span>
          <span>${p.leadTimeDays} dias úteis</span>
          ${p.badge ? `<span class="sep">·</span><span>${p.badge}</span>` : ''}
        </div>
      </div>
      <span class="product-price">${formatPrice(p.price)}</span>
      <div class="product-actions">
        <button type="button" class="btn-edit" aria-label="Editar produto">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
          </svg>
        </button>
        <button type="button" class="btn-delete" aria-label="Excluir produto">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"/>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
          </svg>
        </button>
      </div>
    `;

    item.querySelector('.product-name').textContent = p.name;

    item.querySelector('.btn-edit').addEventListener('click', () => {
      startEdit(p);
    });

    item.querySelector('.btn-delete').addEventListener('click', () => {
      openDeleteModal(p.id, p.name);
    });

    list.appendChild(item);
  });

  if (editingId) highlightEditing(editingId);
}

function applyFilter() {
  const q = currentFilter.trim().toLowerCase();
  if (!q) {
    renderProducts(allProducts);
    return;
  }
  const filtered = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q),
  );
  renderProducts(filtered);
}

async function loadProducts() {
  if (!list) return;
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    allProducts = await res.json();

    if (countBadge) countBadge.textContent = allProducts.length;
    if (statCount) statCount.textContent = allProducts.length;
    if (statCategories) {
      const unique = new Set(allProducts.map((p) => p.category));
      statCategories.textContent = unique.size;
    }
    applyFilter();
  } catch (err) {
    list.innerHTML = `<p class="muted">Erro ao carregar: ${err.message}</p>`;
    if (statCount) statCount.textContent = '—';
    if (statCategories) statCategories.textContent = '—';
  }
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    currentFilter = e.target.value;
    applyFilter();
  });
}

// ============================================================
// MODAL DE EXCLUSÃO
// ============================================================
const deleteModal = document.getElementById('delete-modal');
const deleteNameEl = document.getElementById('delete-name');
const deleteCancelBtn = document.getElementById('delete-cancel');
const deleteConfirmBtn = document.getElementById('delete-confirm');

let pendingDeleteId = null;

function openDeleteModal(id, name) {
  if (!deleteModal) return;
  pendingDeleteId = id;
  if (deleteNameEl) deleteNameEl.textContent = name;
  deleteModal.hidden = false;
  deleteCancelBtn?.focus();
}

function closeDeleteModal() {
  if (!deleteModal) return;
  deleteModal.hidden = true;
  pendingDeleteId = null;
}

if (deleteCancelBtn) deleteCancelBtn.addEventListener('click', closeDeleteModal);
if (deleteModal) {
  deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) closeDeleteModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && deleteModal && !deleteModal.hidden) closeDeleteModal();
});

if (deleteConfirmBtn) {
  deleteConfirmBtn.addEventListener('click', async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    const originalText = deleteConfirmBtn.textContent;
    deleteConfirmBtn.disabled = true;
    deleteConfirmBtn.textContent = 'Excluindo...';

    try {
      const res = await fetch(`/admin/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      closeDeleteModal();
      showToast('Produto excluído.', 'success');
      if (editingId === id) cancelEdit();
      await loadProducts();
    } catch (err) {
      showToast('Falha ao excluir: ' + err.message, 'error', 6000);
    } finally {
      deleteConfirmBtn.disabled = false;
      deleteConfirmBtn.textContent = originalText;
    }
  });
}

// ============================================================
// LOGOUT
// ============================================================
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/admin/api/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  });
}

// ============================================================
// BOOT
// ============================================================
loadProducts();