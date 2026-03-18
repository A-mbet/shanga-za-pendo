
    const cart = [];
    const phoneNumber = '254707197141'; 

    function addToCart(name, basePrice, imageUrl) {
        const existing = cart.find(item => item.name === name && item.imageUrl === imageUrl);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ name, basePrice, imageUrl, quantity: 1 });
        }
        renderCart();
    }

    function getUnitPrice() {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        return totalQty > 1 ? 250 : null;
    }

    function renderCart() {
        const cartItems = document.querySelector('#cart-items');
        const cartQtyEl = document.querySelector('#cart-quantity');
        const cartTotalEl = document.querySelector('#cart-total');

        if (!cartItems) return;

        const discountPrice = getUnitPrice();
        let totalQty = 0;
        let totalPrice = 0;

        cartItems.innerHTML = '';
        cart.forEach(item => {
            totalQty += item.quantity;
            const unitPrice = discountPrice !== null ? discountPrice : item.basePrice;
            const subTotal = unitPrice * item.quantity;
            totalPrice += subTotal;

            const li = document.createElement('li');
            li.textContent = `${item.name} x ${item.quantity} @ KES ${unitPrice} each = KES ${subTotal}`;
            cartItems.appendChild(li);
        });

        cartQtyEl.textContent = `Total items: ${totalQty}`;
        cartTotalEl.textContent = `Total price: KES ${totalPrice}`;
    }

    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            renderCart();
        }
    }

    function checkoutCart() {
        if (cart.length === 0) {
            alert('Your cart is empty. Add items first.');
            return;
        }

        const discountPrice = getUnitPrice();
        let totalQty = 0;
        let totalPrice = 0;
        let lines = [];

        cart.forEach(item => {
            const unitPrice = discountPrice !== null ? discountPrice : item.basePrice;
            const subTotal = unitPrice * item.quantity;
            totalQty += item.quantity;
            totalPrice += subTotal;
            lines.push(`${item.name} x ${item.quantity} @ KES ${unitPrice} = KES ${subTotal}`);
        });

        const message = `Hello Shanga Za Pendo!\nI want to order ${totalQty} items (KES ${discountPrice !== null ? 250 : '300'} each).\n` +
            lines.join('\n') +
            `\nTotal: KES ${totalPrice}`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.getAttribute('data-name');
                const price = Number(btn.getAttribute('data-price'));
                const imageUrl = btn.getAttribute('data-image');
                addToCart(name, price, imageUrl);
            });
        });

        const checkoutBtn = document.querySelector('#checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkoutCart);
        }

        renderCart();
})