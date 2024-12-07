<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $asunto = htmlspecialchars($_POST['asunto']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Correo al que se enviarán los datos
    $to = "iair@alimentarmdp.com.ar";  // Cambia esto por tu correo

    // Asunto del correo
    $subject = "Nuevo mensaje desde el formulario de contacto de alimentar";

    // Cuerpo del mensaje
    $body = "Nombre: $nombre\nCorreo electrónico: $email\nAsunto: $asunto\n\nMensaje:\n$mensaje";

    // Cabeceras del correo
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "<p>¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.</p>";
    } else {
        echo "<p>Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.</p>";
    }
}
?>
