const showNotification = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#000",
            border: "1px solid #ffea00",
        },
    }).showToast();
}
