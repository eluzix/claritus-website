
function keepInTouch(self) {
    console.log(self);

    let emailField = document.getElementById('subscribe-email');
    let emailFieldIcon = document.getElementById('subscribe-email-icon');

    emailField.hidden = true;
    emailFieldIcon.style.display = 'none';
    self.style.display = 'none';

    let successMessage = document.getElementById('subscribe-success');
    successMessage.hidden = false;
}