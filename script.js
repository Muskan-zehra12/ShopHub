

// Product Data
const products = [
    {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        category: 'electronics',
        price: 79.99,
        oldPrice: 129.99,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        badge: 'Sale'
    },
    {
        id: 2,
        name: 'Smart Watch Series 6',
        category: 'electronics',
        price: 199.99,
        oldPrice: 299.99,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        badge: 'Hot'
    },
    {
        id: 3,
        name: 'Premium Laptop Backpack',
        category: 'accessories',
        price: 49.99,
        oldPrice: 79.99,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        badge: ''
    },
    {
        id: 4,
        name: 'Running Shoes Pro',
        category: 'fashion',
        price: 89.99,
        oldPrice: 149.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        badge: 'New'
    },
    {
        id: 5,
        name: 'Smart Coffee Maker',
        category: 'home',
        price: 129.99,
        oldPrice: 199.99,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
        badge: 'Sale'
    },
    {
        id: 6,
        name: 'Designer Sunglasses',
        category: 'fashion',
        price: 159.99,
        oldPrice: 249.99,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
        badge: 'Hot'
    },
    {
        id: 7,
        name: 'Portable Bluetooth Speaker',
        category: 'electronics',
        price: 59.99,
        oldPrice: 99.99,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
        badge: ''
    },
    {
        id: 8,
        name: 'Premium Yoga Mat',
        category: 'fitness',
        price: 29.99,
        oldPrice: 49.99,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
        badge: 'New'
    },
    {
        id: 9,
        name: 'Wireless Gaming Mouse',
        category: 'electronics',
        price: 69.99,
        oldPrice: 99.99,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
        badge: 'Sale'
    },
    {
        id: 10,
        name: 'Leather Wallet',
        category: 'accessories',
        price: 39.99,
        oldPrice: 69.99,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
        badge: ''
    },
    {
        id: 11,
        name: 'Fitness Tracker Band',
        category: 'fitness',
        price: 79.99,
        oldPrice: 129.99,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
        badge: 'Hot'
    },
    {
        id: 12,
        name: 'Modern Table Lamp',
        category: 'home',
        price: 44.99,
        oldPrice: 74.99,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
        badge: 'New'
    }
];

// Global State
let cart = [];
let wishlist = [];
let currentCategory = 'all';
let searchQuery = '';

// Initialize on DOM Load
$(document).ready(function() {
    renderProducts();
    setupEventListeners();
    startCountdown();
    
    // Smooth scroll for navigation
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
});

// Render Products
function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const productsHTML = filteredProducts.map(product => `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <button class="wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}" 
                            onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h5 class="product-name">${product.name}</h5>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.rating})</span>
                    </div>
                    <div class="product-price-container">
                        <div>
                            <span class="product-price">$${product.price.toFixed(2)}</span>
                            ${product.oldPrice ? `<span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    $('#productsContainer').html(productsHTML);
    
    // Add animation
    $('.product-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
        $(this).addClass('fadeInUp');
    });
}

// Generate Star Rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showNotification('Product added to cart!', 'success');
    
    // Animate cart icon
    $('#cartBtn').addClass('bounce');
    setTimeout(() => $('#cartBtn').removeClass('bounce'), 500);
}

// Update Cart Display
function updateCart() {
    $('#cartCount').text(cart.length);

    if (cart.length === 0) {
        $('#cartItems').html(`
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h5>Your cart is empty</h5>
                <p>Add some products to get started!</p>
            </div>
        `);
        $('#cartTotal').text('$0.00');
        return;
    }

    const cartHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h6 class="cart-item-name">${item.name}</h6>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="fw-bold">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="remove-cart-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');

    $('#cartItems').html(cartHTML);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    $('#cartTotal').text(`$${total.toFixed(2)}`);
}

// Update Quantity
function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Item removed from cart', 'info');
}

// Toggle Wishlist
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push(product);
        showNotification('Added to wishlist!', 'success');
    }

    $('#wishlistCount').text(wishlist.length);
    renderProducts();
}

// Check if in Wishlist
function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart Toggle
    $('#cartBtn').click(function() {
        $('#cartSidebar').addClass('active');
        $('#cartOverlay').fadeIn();
        $('body').css('overflow', 'hidden');
    });

    $('#closeCart, #cartOverlay').click(function() {
        $('#cartSidebar').removeClass('active');
        $('#cartOverlay').fadeOut();
        $('body').css('overflow', 'auto');
    });

    // Category Filter
    $('.category-btn').click(function() {
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        currentCategory = $(this).data('category');
        renderProducts();
        
        // Smooth scroll to products
        $('html, body').animate({
            scrollTop: $('#products').offset().top - 100
        }, 500);
    });

    // Search
    $('#searchInput').on('input', function() {
        searchQuery = $(this).val();
        renderProducts();
    });

    // Newsletter Form
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        if (email) {
            showNotification('Successfully subscribed to newsletter!', 'success');
            $(this).find('input[type="email"]').val('');
        }
    });

    // Checkout Button
    $(document).on('click', '.checkout-btn', function() {
        if (cart.length > 0) {
            showNotification('Proceeding to checkout...', 'success');
            // Here you would normally redirect to checkout page
        } else {
            showNotification('Your cart is empty!', 'warning');
        }
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    const bgColor = {
        success: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        error: 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)'
    };

    const notification = $(`
        <div class="notification" style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor[type]};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideInRight 0.5s;
            max-width: 300px;
        ">
            <i class="fas fa-check-circle me-2"></i>${message}
        </div>
    `);
    
    $('body').append(notification);
    setTimeout(() => {
        notification.fadeOut(() => notification.remove());
    }, 3000);
}

// Countdown Timer
function startCountdown() {
    const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#hours').text(hours.toString().padStart(2, '0'));
        $('#minutes').text(minutes.toString().padStart(2, '0'));
        $('#seconds').text(seconds.toString().padStart(2, '0'));

        if (distance < 0) {
            clearInterval(timer);
            $('#countdown').html('<h3>Deal Expired!</h3>');
        }
    }, 1000);
}

// Add CSS Animation Classes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .bounce {
        animation: bounce 0.5s;
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .navbar.scrolled {
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);



