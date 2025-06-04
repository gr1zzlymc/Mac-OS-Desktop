if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js", { scope: "../Mac-OS-Desktop/" })
    .then(function (reg) {
      // registration worked
      console.log("Registration succeeded. Scope is " + reg.scope);
    })
    .catch(function (error) {
      // registration failed
      console.log("Registration failed with " + error);
    });
}

let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.classList.remove("install-hidden");
  }
});

installBtn?.addEventListener("click", () => {
  installBtn.classList.add("install-hidden");
  deferredPrompt?.prompt();
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  installBtn?.classList.add("install-hidden");
});
