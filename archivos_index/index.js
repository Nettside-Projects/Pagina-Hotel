document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('.frame-input, .frame-input-4');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const span = this.parentElement.querySelector('span');
            if (span) {
                span.style.display = 'none';
            }
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (this.value === '') {
                const span = this.parentElement.querySelector('span');
                if (span) {
                    span.style.display = 'block';
                }
                this.parentElement.classList.remove('focused');
            }
        });
    });
});
