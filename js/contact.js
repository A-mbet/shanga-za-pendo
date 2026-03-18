
        const contactForm = document.querySelector('#contactForm');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                const name = document.getElementById('name').value.trim();
                let messageBox = this.querySelector('.status-message');
                if (!messageBox) {
                    messageBox = document.createElement('div');
                    messageBox.classList.add('status-message');
                    messageBox.style.padding = '12px 16px';
                    messageBox.style.borderRadius = '8px';
                    messageBox.style.marginBottom = '16px';
                }

                if (response.ok) {
                    messageBox.textContent = `Thanks ${name || 'friend'}! Your message has been sent.`;
                    messageBox.style.background = 'linear-gradient(120deg, #d0f1ff, #ffebc3)';
                    messageBox.style.color = '#0e2143';
                    messageBox.style.border = '1px solid #82c7ff';
                    this.prepend(messageBox);

                    // Open WhatsApp chat with the same message too
                    const number = '254707197141';
                    const message = `Hello Shanga Za Pendo!\nName: ${name || 'N/A'}\nEmail: ${document.getElementById('email').value.trim() || 'N/A'}\nMessage: ${document.getElementById('message').value.trim() || 'N/A'}`;
                    const waUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
                    window.open(waUrl, '_blank');

                    this.reset();
                } else {
                    messageBox.textContent = 'Oops! Something went wrong. Please try again.';
                    messageBox.style.background = '#fde8e8';
                    messageBox.style.color = '#7f1d1d';
                    messageBox.style.border = '1px solid #fca5a5';
                    this.prepend(messageBox);
                }
            }).catch(() => {
                let messageBox = this.querySelector('.status-message');
                if (!messageBox) {
                    messageBox = document.createElement('div');
                    messageBox.classList.add('status-message');
                    messageBox.style.padding = '12px 16px';
                    messageBox.style.borderRadius = '8px';
                    messageBox.style.marginBottom = '16px';
                }
                messageBox.textContent = 'Network error. Please check your connection and try again.';
                messageBox.style.background = '#fde8e8';
                messageBox.style.color = '#7f1d1d';
                messageBox.style.border = '1px solid #fca5a5';
                this.prepend(messageBox);
            });
        });

        document.querySelectorAll('.contact-info a').forEach(a => {
            a.style.transition = 'transform .2s ease';
            a.addEventListener('mouseover', () => {
                a.style.transform = 'scale(1.05)';
            });
            a.addEventListener('mouseout', () => {
                a.style.transform = 'scale(1)';
            });
        });