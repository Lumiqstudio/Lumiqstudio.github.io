document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    const message = form.querySelector(".form-message");
    const whatsappNumber = "573104239206";

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            message.textContent = "Por favor completa los campos requeridos.";
            message.classList.add("error");
            form.reportValidity();
            return;
        }

        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const service = form.elements.service.value;
        const projectMessage = form.elements.message.value.trim();
        const whatsappMessage = [
            "Hola LUMIQ Studio, quiero solicitar una cotizacion.",
            "",
            `Nombre: ${name}`,
            `Correo: ${email}`,
            `Servicio: ${service}`,
            `Mensaje: ${projectMessage}`
        ].join("\n");
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        message.textContent = "Abriendo WhatsApp para enviar tu mensaje.";
        message.classList.remove("error");
        form.reset();
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
});
