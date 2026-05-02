// Configuración de WhatsApp
const numeroWhatsapp = "68985205"; // Reemplaza con el número de teléfono del negocio
const mensaje = "¡Hola! Me gustaría ordenar del Menú Especial de este fin de semana.";

function openWhatsApp() {
    const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}