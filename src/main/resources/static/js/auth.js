document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("Por favor, inicia sesión para acceder a esta página.");
        window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
    }
});
