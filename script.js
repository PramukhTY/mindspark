document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Grab the form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation (checks if fields are not empty)
    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
    } else {
        // Display a confirmation message
        document.getElementById('formResponse').textContent = 'Thank you for reaching out, ' + name + '! We will get back to you soon.';
        document.getElementById('contactForm').reset();  // Reset the form fields
    }
});
