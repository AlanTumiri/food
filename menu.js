// Constantes Globales
const NUMERO_WHATSAPP = "59168985205"; // Número de la descripción de la ciudad

// Lógica de Filtrado de Menú
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase activa de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar clase activa al botón clickeado
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        menuCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-categoria') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Variables del Modal
let currentProduct = "";
let basePrice = 0;

// Elementos del Modal DOM
const modalOverlay = document.getElementById('order-modal');
const modalProductName = document.getElementById('modal-product-name');
const modalPriceSpan = document.getElementById('modal-price');
const modalTotalPrice = document.getElementById('modal-total-price');
const checkboxes = document.querySelectorAll('.extra-checkbox');
const notesTextarea = document.getElementById('modal-notes');

function abrirModal(nombre, precio) {
    currentProduct = nombre;
    basePrice = parseFloat(precio);
    
    // Configurar textos
    modalProductName.textContent = currentProduct;
    modalPriceSpan.textContent = basePrice.toFixed(2);
    
    // Resetear formulario
    checkboxes.forEach(cb => cb.checked = false);
    notesTextarea.value = "";
    
    calcularTotal();
    modalOverlay.style.display = 'flex';
}

function cerrarModal() {
    modalOverlay.style.display = 'none';
}

function calcularTotal() {
    let total = basePrice;
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            total += parseFloat(cb.value);
        }
    });
    
    modalTotalPrice.textContent = total.toFixed(2);
}

function generarWhatsApp() {
    const total = document.getElementById('modal-total-price').textContent;
    let mensajeExtras = "";
    let extrasArray = [];
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            // Extraer el texto del label hermano
            const labelText = cb.parentElement.textContent.trim().split('(+')[0].trim();
            extrasArray.push(labelText);
        }
    });

    if (extrasArray.length > 0) {
        mensajeExtras = `%0A*Extras:* ${extrasArray.join(', ')}`;
    }

    const notas = notesTextarea.value.trim();
    const mensajeNotas = notas ? `%0A*Notas:* ${notas}` : "";

    const mensaje = `Hola, me gustaría ordenar:%0A%0A*${currentProduct}*${mensajeExtras}${mensajeNotas}%0A%0A*Total Estimado: Bs. ${total}*`;
    
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
    
    window.open(urlWhatsApp, '_blank');
    cerrarModal();
}

// Cerrar modal al hacer click fuera del contenido
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        cerrarModal();
    }
});