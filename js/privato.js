// Verifica se l'utente è autorizzato ad accedere alla pagina
function verificaAccesso() {
    // In questo esempio, si controlla se un flag "accessoAutorizzato" è impostato su true in localStorage
    // Puoi implementare la tua logica di autenticazione/autorizzazione qui
    return localStorage.getItem('accessoAutorizzato') === 'true';
}

// Nascondi la pagina se l'utente non è autorizzato
if (!verificaAccesso()) {
    // Nascondi la pagina impostando il display del body su "none"
    document.body.style.display = 'none';
}
