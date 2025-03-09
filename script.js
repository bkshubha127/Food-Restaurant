// Sample menu data
const menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, and our special sauce",
        price: 79,
        image: "images/burger.jpg"
    },
    {
        id: 2,
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomatoes, and basil on a thin crust",
        price: 299,
        image: "images/pizza.jpg"
    },
    {
        id: 3,
        name: "Macaroni Pasta",
        description: "Creamy macaroni pasta with cheesy goodness and herbs",
        price: 159,
        image: "images/pasta.jpg"
    },
    {
        id: 4,
        name: "Veggie Sandwich",
        description: "Fresh vegetables and cheese in toasted whole wheat bread",
        price: 109,
        image: "images/sandwich.jpg"
    },
    {
        id: 5,
        name: "Schezwan Noodles",
        description: "Spicy Schezwan noodles with vegetables and savory sauce",
        price: 189,
        image: "images/noodles.jpg"
    },
    {
        id: 6,
        name: "Veg Paneer Wrap",
        description: "Crispy paneer and veggies in a whole wheat wrap",
        price: 197,
        image: "images/wrap.jpg"
    }
];

// Cart data
let cart = [];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const cartButton = document.getElementById('cartButton');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const menuContainer = document.getElementById('menuContainer');
    const cartSection = document.getElementById('cartSection');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const orderSection = document.getElementById('orderSection');
    const orderForm = document.getElementById('orderForm');
    const orderNowBtn = document.getElementById('orderNowBtn');

    // Display menu items
    function displayMenu() {
        menuContainer.innerHTML = '';
        
        menuItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item';
            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">₹${item.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                        
                    </div>
                </div>
            `;
            menuContainer.appendChild(menuItemElement);
        });
        
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                addToCart(id);
            });
        });
    }

    // Add item to cart
    function addToCart(id) {
        const item = menuItems.find(item => item.id === id);
        
        const existingItem = cart.find(cartItem => cartItem.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            });
        }
        
        updateCart();
    }

    // Update cart display
    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
                <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
            `;
            cartItems.appendChild(cartItemElement);
        });
        
        cartTotal.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
        cartCount.textContent = `(${cart.reduce((total, item) => total + item.quantity, 0)})`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                
                if (e.target.classList.contains('increase')) {
                    increaseQuantity(id);
                } else if (e.target.classList.contains('decrease')) {
                    decreaseQuantity(id);
                }
            });
        });
    }

    // Increase item quantity
    function increaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    }

    // Decrease item quantity
    function decreaseQuantity(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCart();
        }
    }

    // Event Listeners
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would handle login authentication here
            loginModal.style.display = 'none';
            loginButton.textContent = 'Logout';
            alert('You have been logged in successfully!');
        });
    }

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some items first!');
                return;
            }
            
            if (orderSection) orderSection.style.display = 'none';
            if (cartSection) cartSection.style.display = 'block';
            // Scroll to cart section
            cartSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some items first!');
                return;
            }
            
            cartSection.style.display = 'none';
            orderSection.style.display = 'block';
            // Scroll to order section
            orderSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (orderNowBtn) {
        orderNowBtn.addEventListener('click', () => {
            // Scroll to menu section
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would handle order submission here
            alert('Thank you for your order! Your food will be delivered soon.');
            // Reset the form and cart
            orderForm.reset();
            cart = [];
            updateCart();
            orderSection.style.display = 'none';
        });
    }

    // Initialize the page
    displayMenu();
});

// Save cart to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('restaurantCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Function to handle user authentication (mock)
function authenticateUser(email, password) {
    // In a real application, this would communicate with a backend
    return new Promise((resolve, reject) => {
        // Mock authentication
        if (email && password) {
            resolve({
                name: "Customer",
                email: email,
                id: "user123"
            });
        } else {
            reject("Invalid credentials");
        }
    });
}