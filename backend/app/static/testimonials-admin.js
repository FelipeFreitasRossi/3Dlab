// ============================================================
// Admin de depoimentos — mesmo padrão visual do admin de produtos
// ============================================================
const $ = (id) => document.getElementById(id);

const toastContainer = $('toast-container');
function showToast(message, type = 'success', timeout = 4000) {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = '<span class="toast-message"></span>';
  toast.querySelector('.toast-message').textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 220);
  }, timeout);
}

const form = $('testimonial-form');
const submitBtn = $('submit-btn');
const submitText = $('submit-text');
const cancelBtn = $('cancel-edit');
const formTitle = $('form-title');
const listEl = $('testimonials-list');
const quoteInput = $('quote');
const quoteCount = $('quote-count');

let editingId = null;
let items = [];

function updateQuoteCount() {
  if (quoteCount) quoteCount.textContent = `${quoteInput.value.length} / 500`;
}
quoteInput?.addEventListener('input', updateQuoteCount);

function setMode(editing) {
  formTitle.textContent = editing ? 'Editar depoimento' : 'Novo depoimento';
  submitText.textContent = editing ? 'Salvar alterações' : 'Publicar depoimento';
  cancelBtn.hidden = !editing;
}

function resetForm() {
  editingId = null;
  form.reset();
  $('rating').value = '5';
  setMode(false);
  updateQuoteCount();
  highlight();
}

function highlight() {
  document.querySelectorAll('.product-item').forEach((el) => {
    el.classList.toggle('product-item--editing', el.dataset.id === editingId);
  });
}

function startEdit(t) {
  editingId = t.id;
  $('quote').value = t.quote || '';
  $('author').value = t.author || '';
  $('role').value = t.role || '';
  $('rating').value = String(t.rating || 5);
  $('quote_en').value = t.quote_en || '';
  $('role_en').value = t.role_en || '';
  if (t.quote_en || t.role_en) document.querySelector('.translation-section').open = true;
  setMode(true);
  updateQuoteCount();
  highlight();
  $('form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

cancelBtn?.addEventListener('click', resetForm);

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  submitBtn.disabled = true;
  try {
    const res = await fetch(
      editingId ? `/admin/api/testimonials/${editingId}` : '/admin/api/testimonials',
      { method: editingId ? 'PUT' : 'POST', body: new FormData(form) },
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(typeof err.detail === 'string' ? err.detail : `Erro ${res.status}`);
    }
    showToast(editingId ? 'Depoimento atualizado!' : 'Depoimento publicado!');
    resetForm();
    await load();
  } catch (err) {
    showToast(err.message || 'Falha ao salvar', 'error', 6000);
  } finally {
    submitBtn.disabled = false;
  }
});

function render() {
  $('count-badge').textContent = items.length;
  $('stat-count').textContent = items.length;
  $('stat-rating').textContent = items.length
    ? (items.reduce((s, t) => s + (t.rating || 5), 0) / items.length).toFixed(1).replace('.', ',')
    : '—';

  if (!items.length) {
    listEl.innerHTML = '<p class="muted">Nenhum depoimento ainda. Enquanto a lista estiver vazia, o site mostra os depoimentos padrão.</p>';
    return;
  }

  listEl.innerHTML = '';
  items.forEach((t) => {
    const row = document.createElement('div');
    row.className = 'product-item';
    row.dataset.id = t.id;
    row.innerHTML = `
      <div class="product-info">
        <div class="product-name"></div>
        <div class="product-meta"><span class="t-role"></span><span class="sep">·</span><span class="t-stars"></span></div>
        <div class="product-meta t-quote"></div>
      </div>
      <div class="product-actions">
        <button type="button" class="btn-edit" aria-label="Editar depoimento">✎</button>
        <button type="button" class="btn-delete" aria-label="Excluir depoimento">🗑</button>
      </div>`;
    row.querySelector('.product-name').textContent = t.author;
    row.querySelector('.t-role').textContent = t.role;
    row.querySelector('.t-stars').textContent = '★'.repeat(t.rating || 5);
    row.querySelector('.t-quote').textContent = t.quote;
    row.querySelector('.btn-edit').addEventListener('click', () => startEdit(t));
    row.querySelector('.btn-delete').addEventListener('click', () => openDelete(t));
    listEl.appendChild(row);
  });
  highlight();
}

async function load() {
  try {
    const res = await fetch('/api/testimonials');
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    items = await res.json();
    render();
  } catch (err) {
    listEl.innerHTML = '<p class="muted">Não foi possível carregar os depoimentos.</p>';
  }
}

// Exclusão
const modal = $('delete-modal');
let pendingDelete = null;
function openDelete(t) {
  pendingDelete = t;
  $('delete-name').textContent = t.author;
  modal.hidden = false;
  $('delete-cancel').focus();
}
function closeDelete() {
  modal.hidden = true;
  pendingDelete = null;
}
$('delete-cancel')?.addEventListener('click', closeDelete);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeDelete(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeDelete(); });
$('delete-confirm')?.addEventListener('click', async () => {
  if (!pendingDelete) return;
  const { id } = pendingDelete;
  try {
    const res = await fetch(`/admin/api/testimonials/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    closeDelete();
    showToast('Depoimento excluído.');
    if (editingId === id) resetForm();
    await load();
  } catch (err) {
    showToast('Falha ao excluir: ' + err.message, 'error', 6000);
  }
});

$('logout-btn')?.addEventListener('click', async () => {
  await fetch('/admin/api/logout', { method: 'POST' });
  window.location.href = '/admin/login';
});

setMode(false);
updateQuoteCount();
load();
