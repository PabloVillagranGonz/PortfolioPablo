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

  // Muestra el estado del formulario; el color lo pone el CSS según el tipo (error / success)
  function setStatus(text, type) {
    status.textContent = text;
    status.classList.remove('is-error', 'is-success');
    if (type) status.classList.add('is-' + type);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.from_name.value.trim();
    const email = form.from_email.value.trim();
    const message = form.message.value.trim();

    // ⏱️ Anti-spam por tiempo (mínimo 2s)
    if (Date.now() - formLoadedAt < 2000) {
      setStatus('Envío demasiado rápido.', 'error');
      return;
    }

    // 🕷️ Honeypot
    if (form.phone.value.trim() !== '') {
      setStatus('Formulario inválido.', 'error');
      return;
    }

    // Validaciones
    if (name.length < 2) {
      setStatus('El nombre es demasiado corto.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('Email no válido.', 'error');
      return;
    }

    if (message.length < 10) {
      setStatus('El mensaje es demasiado corto.', 'error');
      return;
    }

    if (!form.consent.checked) {
      setStatus('Debes aceptar la política de privacidad para enviar el mensaje.', 'error');
      return;
    }

    // Envío
    const SERVICE_ID = 'service_j30lsnr';
    const TEMPLATE_ID = 'template_h0i4mwv';

    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando...';
    setStatus('');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      form.reset();
      setStatus('Mensaje enviado correctamente. ¡Gracias!', 'success');
    } catch (err) {
      console.error(err);
      setStatus('Error al enviar el mensaje. Inténtalo más tarde o escríbeme a pablovillagrangonz@gmail.com.', 'error');
    }

    sendBtn.disabled = false;
    sendBtn.textContent = 'Enviar mensaje';
  });
});