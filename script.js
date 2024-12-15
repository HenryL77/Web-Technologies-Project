const menuItems = [
    { id: 1, name: "Burger", price: 5.99, img: "./images/burger.webp", description: "Juicy beef burger with fresh lettuce and tomato." },
    { id: 2, name: "Pizza", price: 8.99, img: "./images/pizza.webp", description: "Delicious cheese pizza with your choice of toppings." },
    { id: 3, name: "Salad", price: 4.99, img: "./images/salad.jpg", description: "Fresh garden salad with a variety of vegetables." },
    { id: 4, name: "Pasta", price: 7.99, img: "./images/pasta.jpg", description: "Classic pasta with marinara sauce and cheese." },
    { id: 5, name: "Fries", price: 2.99, img: "./images/fries.jpg", description: "Crispy golden fries, perfect as a side." },
    { id: 6, name: "Chicken Wrap", price: 6.49, img: "./images/chicken_wrap.jpg", description: "Grilled chicken wrapped with fresh veggies." },
    { id: 7, name: "Sushi Roll", price: 9.99, img: "./images/sushi_rolls.webp", description: "Exquisite sushi rolls with fresh fish and rice." },
    { id: 8, name: "Tacos", price: 3.99, img: "./images/tacos.webp", description: "Soft or hard shell tacos filled with meat." },
    { id: 9, name: "Sodas", price: 1.99, img: "./images/sodas.jpg", description: "Refreshing fizzy beverages." },
    { id: 10, name: "Fruit Juice", price: 2.49, img: "./images/juice.jpg", description: "Freshly squeezed fruit juice." },
    { id: 11, name: "Water", price: 0.99, img: "./images/bottled_water.jpg", description: "Pure and refreshing bottled water." },
    { id: 12, name: "Iced Tea", price: 1.79, img: "./images/iced_tea.jpg", description: "Chilled iced tea with a hint of lemon." },
    { id: 13, name: "Coffee", price: 2.29, img: "./images/coffee.jpg", description: "Rich and aromatic brewed coffee." }
];

const cart = [];

// Function to open different tabs
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'menu') {
        renderMenuItems();
    }
}

// Registration form submission
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const preferences = document.getElementById('preferences').value;

    const userData = { username, email, password, preferences };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    this.reset();
});

// Show registered users
document.getElementById('show-users').addEventListener('click', function () {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userListDiv = document.getElementById('user-list');
    userListDiv.innerHTML = '';

    if (users.length === 0) {
        userListDiv.innerHTML = 'No registered users.';
    } else {
        users.forEach(user => {
            userListDiv.innerHTML += `<p>Username: ${user.username}, Email: ${user.email}, Dietary Preferences: ${user.preferences || 'None'}</p>`;
        });
    }
});

// Clear registered users
document.getElementById('clear-users').addEventListener('click', function () {
    localStorage.removeItem('users'); // Clear users from local storage
    document.getElementById('user-list').innerHTML = 'No registered users.'; // Update the displayed list
    alert('All registered users have been cleared.');
});

// Function to render menu items
function renderMenuItems() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = ''; // Clear previous items

    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item';
        menuItemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width:100px; height:100px; object-fit:cover;">
            <h3>${item.name} - $${item.price.toFixed(2)}</h3>
            <p>${item.description}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(menuItemDiv);
    });
}

// Function to add item to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    if (item) {
        cart.push(item);
        updateCart();
    }
}

// Function to update cart display
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';  // Clear current cart items
    let total = 0;

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover;">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItemDiv);
        total += item.price;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to clear the cart
function clearCart() {
    cart.length = 0; // Clears the cart
    updateCart();
}

// Function to purchase items in the cart
function purchaseItems() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before proceeding to purchase.");
        return;
    }

    let purchaseSummary = "You are about to purchase the following items:\n\n";
    let total = 0;

    cart.forEach(item => {
        purchaseSummary += `${item.name} - $${item.price.toFixed(2)}\n`;
        total += item.price;
    });

    purchaseSummary += `\nTotal: $${total.toFixed(2)}\n\nDo you want to proceed with the purchase?`;

    if (confirm(purchaseSummary)) {
        alert("Thank you for your purchase! Your order has been placed.");
        clearCart(); // Clear the cart after purchase
    }
}