// Lógica para el botón de reinicio (Reset Diagnosis)
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      // Recarga la página de forma limpia para reiniciar el estado y limpiar los selectores
      location.reload();
    });
  }

  // Lógica para el botón de copiar reporte con soporte bilingüe (Español / Inglés)
  const copyBtn = document.getElementById("copy-report-btn");
  const feedback = document.getElementById("copy-feedback");

  if (copyBtn) {
    // Función auxiliar para detectar el idioma actual de la página
    const getCurrentLanguage = () => {
      // Revisa el atributo lang del documento HTML
      return document.documentElement.lang || "es";
    };

    copyBtn.addEventListener("click", () => {
      const lang = getCurrentLanguage();
      const isEnglish = lang.startsWith("en");

      // Recopilamos datos clave del momento
      const now = new Date().toLocaleString();

      // Construimos el reporte adaptado al idioma correspondiente
      let reportText = "";
      if (isEnglish) {
        reportText = `--- C-BAND TELEPORT DIAGNOSTIC REPORT ---
• Date/Time: ${now}
• Station: REDTV, C.A.
• System: GS497 Web Application Tool
• Status: Troubleshooting steps compiled successfully.
--------------------------------------------`;
      } else {
        reportText = `--- REPORTE DE DIAGNÓSTICO DE TELEPUERTO BANDA C ---
• Fecha/Hora: ${now}
• Estación: REDTV, C.A.
• Sistema: Herramienta Web GS497
• Estado: Pasos de diagnóstico recopilados exitosamente.
--------------------------------------------------`;
      }

      // Copiamos al portapapeles de manera segura utilizando la API del navegador
      navigator.clipboard
        .writeText(reportText)
        .then(() => {
          if (feedback) {
            // Muestra el mensaje de éxito en el idioma correspondiente
            feedback.innerText = isEnglish
              ? "Report copied!"
              : "¡Reporte copiado!";
            feedback.style.display = "inline";
            setTimeout(() => {
              feedback.style.display = "none";
            }, 3000);
          }
        })
        .catch((err) => {
          console.error("Error copying to clipboard: ", err);
        });
    });
  }
});
