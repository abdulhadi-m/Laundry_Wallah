document.addEventListener('DOMContentLoaded', () => {
    // ELEMENT
    const addButtons = document.querySelectorAll('.btn-add');
    const noItemsMsg = document.querySelector('.no-items-added');
    const totalAmountEl = document.querySelector('.total-price');
    const listContainer = document.getElementById('cart-list-container');
    const bookForm = document.querySelector('.booking-form-box form');
    const successMsg = document.querySelector('.success-message');
    const bookNowBtn = document.querySelector('.btn-book-now'); 
    const separator = document.querySelector('.separator-added-items');
    let cart = [];
    if(bookNowBtn) {
        bookNowBtn.disabled = true;
    }
    // FUNCTIONS 
    function toggleItem(button) {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const existingItemIndex = cart.findIndex(item => item.name === name);
        if (existingItemIndex > -1) {
            cart.splice(existingItemIndex, 1);
            button.classList.remove('btn-remove');
            button.innerHTML = `Add Item <ion-icon class="icon-plus" name="add-circle-outline"></ion-icon>`;
        } else {
            cart.push({ name, price });
            button.classList.add('btn-remove');
            button.innerHTML = `Remove Item <ion-icon class="icon-plus" name="remove-circle-outline"></ion-icon>`;
        }
        updateCartUI();
    }
    function updateCartUI() {
        listContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => total += item.price);
        if (cart.length === 0) {
            noItemsMsg.style.display = 'block';
            if(bookNowBtn) bookNowBtn.disabled = true; 
        } else {
            noItemsMsg.style.display = 'none';
            if(bookNowBtn) bookNowBtn.disabled = false; 
            cart.forEach((item, index) => {
                const row = document.createElement('div');
                row.classList.add('cart-item-row');
                row.innerHTML = `
                    <span style="width: 15%; text-align: center;">${index + 1}</span>
                    <span style="flex-grow: 1; text-align: left; padding-left: 10px;">${item.name}</span>
                    <span style="width: 25%; text-align: right;">&#8377;${item.price.toFixed(2)}</span>
                `;
                listContainer.appendChild(row);
            });
        }
        totalAmountEl.innerHTML = `&#8377;${total.toFixed(2)}`;
    }
    function handleBooking(e) {
        e.preventDefault(); 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phno').value;
        if (!name || !email || !phone) {
            alert("Please fill in all details.");
            return;
        }
        successMsg.style.display = 'flex';
        setTimeout(() => {
            successMsg.style.display = 'none';
            bookForm.reset();
            cart = [];
            updateCartUI(); 
            addButtons.forEach(btn => {
                btn.classList.remove('btn-remove');
                btn.innerHTML = `Add Item <ion-icon class="icon-plus" name="add-circle-outline"></ion-icon>`;
            });
        }, 4000);
    }
    // EVENT LISTENERS 
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleItem(this);
        });
    });
    if(bookForm) {
        bookForm.addEventListener('submit', handleBooking);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECT ELEMENTS ---
    const addButtons = document.querySelectorAll('.btn-add');
    const noItemsMsg = document.querySelector('.no-items-added');
    const totalAmountEl = document.querySelector('.total-price');
    const listContainer = document.getElementById('cart-list-container');
    const bookForm = document.querySelector('.booking-form-box form');
    const successMsg = document.querySelector('.success-message');
    const bookNowBtn = document.querySelector('.btn-book-now'); 
    
    // --- 2. STATE (DATA) ---
    let cart = [];

    // Initialize Button State
    if(bookNowBtn) bookNowBtn.disabled = true;

    // --- 3. FUNCTIONS ---

    function toggleItem(button) {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const existingItemIndex = cart.findIndex(item => item.name === name);

        if (existingItemIndex > -1) {
            // REMOVE
            cart.splice(existingItemIndex, 1);
            button.classList.remove('btn-remove');
            button.innerHTML = `Add Item <ion-icon class="icon-plus" name="add-circle-outline"></ion-icon>`;
        } else {
            // ADD
            cart.push({ name, price });
            button.classList.add('btn-remove');
            button.innerHTML = `Remove Item <ion-icon class="icon-plus" name="remove-circle-outline"></ion-icon>`;
        }
        updateCartUI();
    }

    function updateCartUI() {
        listContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => total += item.price);

        if (cart.length === 0) {
            noItemsMsg.style.display = 'block';
            if(bookNowBtn) bookNowBtn.disabled = true; 
        } else {
            noItemsMsg.style.display = 'none';
            if(bookNowBtn) bookNowBtn.disabled = false; 

            cart.forEach((item, index) => {
                const row = document.createElement('div');
                row.classList.add('cart-item-row');
                
                row.innerHTML = `
                    <span style="width: 15%; text-align: center;">${index + 1}</span>
                    <span style="flex-grow: 1; text-align: left; padding-left: 10px;">${item.name}</span>
                    <span style="width: 25%; text-align: right;">&#8377;${item.price.toFixed(2)}</span>
                `;
                listContainer.appendChild(row);
            });
        }
        totalAmountEl.innerHTML = `&#8377;${total.toFixed(2)}`;
    }

    
    function handleBooking(e) {
        e.preventDefault(); 

        if (cart.length === 0) {
            alert("Please add services to cart.");
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phno').value;

        if (!name || !email || !phone) {
            alert("Please fill in all details.");
            return;
        }

        
        const submitBtn = document.querySelector('.btn-book-now');
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        
        let orderSummary = "";
        cart.forEach((item, index) => {
            orderSummary += `${index + 1}. ${item.name} - ₹${item.price}\n`;
        });
        
        const totalCost = document.querySelector('.total-price').innerText;

        const templateParams = {
            user_name: name,
            user_email: email,
            user_phone: phone,
            order_details: orderSummary,
            total_cost: totalCost
        };

        // SEND EMAIL
        
        emailjs.send('service_s4mijyk', 'template_v58rddd', templateParams)
            .then(function() {
                
                successMsg.style.display = 'flex';
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                    bookForm.reset();
                    cart = [];
                    updateCartUI();
                    
                    
                    addButtons.forEach(btn => {
                        btn.classList.remove('btn-remove');
                        btn.innerHTML = `Add Item <ion-icon class="icon-plus" name="add-circle-outline"></ion-icon>`;
                    });
                    
                    submitBtn.innerText = "Book now";
                    
                }, 4000);

            }, function(error) {
                
                alert("Failed to send email. Please try again.");
                console.log('FAILED...', error);
                submitBtn.innerText = "Book now";
                submitBtn.disabled = false;
            });
    }
    
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleItem(this);
        });
    });

    if(bookForm) {
        bookForm.addEventListener('submit', handleBooking);
    }
});