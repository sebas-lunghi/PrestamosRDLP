// Inicializa EmailJS con tu User ID
(function() {
    emailjs.init("bvZoW8fvEFXWqQ7a-");  // Reemplaza con tu User ID de EmailJS
})();

// Función para actualizar el nombre del archivo cargado
function updateFileName(fileId) {
    const fileInput = document.getElementById(fileId);
    const fileNameSpan = document.getElementById(`file-name-${fileId}`);
    
    if (fileInput.files.length > 0) {
        fileNameSpan.textContent = fileInput.files[0].name; // Actualizar con el nombre del archivo
    } else {
        fileNameSpan.textContent = 'Ningún archivo seleccionado'; // Si no hay archivo
    }
}

// Función para validar los campos antes de enviar el formulario
function validateForm() {
    let valid = true;
    let missingFields = [];

    // Verificar si los campos obligatorios están llenos
    const requiredFields = ['name', 'dni', 'fecha', 'organismo', 'telefono', 'email', 'contacto', 'telefonocontacto', 'Parentezco'];
    requiredFields.forEach(function(field) {
        const input = document.getElementById(field);
        if (!input.value) {
            valid = false;
            missingFields.push(input.previousElementSibling.textContent.trim()); // Obtener el nombre del campo
        }
    });

    // Verificar si se cargaron los archivos obligatorios
    const requiredFiles = ['firma', 'dni1', 'dni2', 'cbu', 'movimientos', 'servicio', 'afectacion', 'selfie-dni'];
    requiredFiles.forEach(function(fileId) {
        const fileInput = document.getElementById(fileId);
        if (fileInput.files.length === 0) {
            valid = false;
            missingFields.push(fileInput.previousElementSibling.textContent.trim()); // Obtener el nombre del archivo
        }
    });

    // Si hay campos incompletos, mostrar un mensaje de error
    if (!valid) {
        alert('Es obligatoria la carga de: ' + missingFields.join(', '));
        return false; // Detener el envío del formulario
    }

    return true; // Si todo es válido, permitir el envío
}

// Maneja el envío del formulario
document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    if (validateForm()) {
        // Configura los parámetros del correo
        const formData = new FormData(this);
        
        // Envía el formulario usando EmailJS
        emailjs.sendForm('service_tfqevdi', 'template_cc0767c', formData)
            .then(function(response) {
                alert('Los datos fueron enviados correctamente');
            }, function(error) {
                alert('Hubo un error al enviar el formulario');
            });
    }
});
