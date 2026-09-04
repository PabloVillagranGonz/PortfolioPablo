document.addEventListener('DOMContentLoaded', function () {

  // Inicializar EmailJS
  emailjs.init('zFMrbrrk_SkLb_JR3');

  // Tiempo de carga (anti-bot)
  const formLoadedAt = Date.now();

  const form = document.getElementById('contact-form');
  const sendBtn = document.getElementById('cf-send');
  const status = document.getElementById('cf-status');

  if (!form || !sendBtn || !status) {
    console.error('Formulario o elementos no encontrados');
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = form.message.value.trim();

    // ⏱️ Anti-spam por tiempo (mínimo 2s)
    if (Date.now() - formLoadedAt < 2000) {
      status.textContent = 'Envío demasiado rápido.';
      return;
    }

    // 🕷️ Honeypot
    if (form.phone.value.trim() !== '') {
      status.textContent = 'Formulario inválido.';
      return;
    }

    // Validaciones
    if (name.length < 2) {
      status.textContent = 'El nombre es demasiado corto.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Email no válido.';
      return;
    }

    if (message.length < 10) {
      status.textContent = 'El mensaje es demasiado corto.';
      return;
    }

    if (!form.consent.checked) {
      status.textContent = 'Debes aceptar la política de privacidad para enviar el mensaje.';
      return;
    }

    // Envío
    const SERVICE_ID = 'service_j30lsnr';
    const TEMPLATE_ID = 'template_h0i4mwv';

    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando...';
    status.textContent = '';

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      form.reset();
      status.style.color = '';
      status.textContent = 'Mensaje enviado correctamente. ¡Gracias!';
    } catch (err) {
      console.error(err);
      status.style.color = '#ffbaba';
      status.textContent = 'Error al enviar el mensaje. Inténtalo más tarde.';
    }

    sendBtn.disabled = false;
    sendBtn.textContent = 'Enviar mensaje';
  });
});