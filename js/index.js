        // Sticky header and smooth scroll reveal animations
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.style.boxShadow = '0 8px 18px rgba(0,0,0,.12)';
                header.style.transform = 'translateY(-2px)';
            } else {
                header.style.boxShadow = 'none';
                header.style.transform = 'translateY(0)';
            }
        });

        const cards = document.querySelectorAll('.product');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        cards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity .6s ease, transform .6s ease';
            observer.observe(card);
        });

        // WhatsApp order function to link from featured cards
        function orderWhatsApp(productName) {
            const phoneNumber = '254707197141';
            const message = `Hello Shanga Za Pendo! I would like to order the ${productName}.`;
            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        }

        document.querySelectorAll('.product').forEach(productCard => {
            const button = document.createElement('button');
            button.textContent = 'Order via WhatsApp';
            button.className = 'product-order-btn';
            button.style.marginTop = '12px';
            button.style.padding = '9px 16px';
            button.style.background = '#d62828';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = '6px';
            button.style.cursor = 'pointer';
            button.style.fontWeight = '700';
            button.addEventListener('click', () => {
                const title = productCard.querySelector('h3')?.textContent || 'Product';
                orderWhatsApp(title);
            });
            productCard.appendChild(button);
        });