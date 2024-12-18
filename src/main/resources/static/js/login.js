document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", handleLogin);
});

function handleLogin(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8089/ecommers/api/auth/login", { // URL actualizada
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Credenciales inválidas");
            }
            return response.json();
        })
        .then(data => {
            // Guardar el token en localStorage
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.userId);
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html"; // Redirigir a la página principal
        })
        .catch(error => {
            console.error("Error:", error);
            const errorElement = document.getElementById("login-error");
            errorElement.style.display = "block";
        });
}
