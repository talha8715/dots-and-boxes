// Install Prompt Handling
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show install button (add this to your UI)
    const installBtn = document.createElement('button');
    installBtn.id = 'installBtn';
    installBtn.className = 'btn btn-primary';
    installBtn.innerHTML = '<i class="fas fa-download"></i> Install App';
    installBtn.onclick = showInstallPrompt;

    const controls = document.querySelector('.game-controls');
    if (controls) {
        controls.appendChild(installBtn);
    }
});

function showInstallPrompt() {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
        } else {
            console.log('User dismissed install');
        }
        deferredPrompt = null;

        // Remove install button
        const installBtn = document.getElementById('installBtn');
        if (installBtn) installBtn.remove();
    });
}

window.addEventListener('appinstalled', () => {
    if (window.location.href.includes('index.html')) {
      window.location.href = '/';
    }
  });

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}