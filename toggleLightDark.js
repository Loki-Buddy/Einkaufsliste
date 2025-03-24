function toogleMode() {
    const body = document.body;
    const button = document.getElementById('toogleMode');

    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        button.textContent = 'Lightmode';
    } else {
        button.textContent = 'Darkmode';
    }
}

