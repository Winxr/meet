// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'white';
    }
});

// Enhanced Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        
        // Create floating notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${productName} added to cart!</span>
        `;
        document.body.appendChild(notification);
        
        // Animate button
        this.classList.add('added');
        const originalText = this.innerHTML;
        this.innerHTML = `
            <i class="fas fa-check"></i>
            <span class="btn-text">Added to Cart</span>
        `;
        
        // Remove notification and reset button
        setTimeout(() => {
            notification.remove();
            this.classList.remove('added');
            this.innerHTML = originalText;
        }, 2000);
        
        // Animate product image
        const image = product.querySelector('img');
        image.style.transform = 'scale(1.1)';
        setTimeout(() => {
            image.style.transform = 'scale(1)';
        }, 200);
    });
});

// Login form handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Here you would typically send this data to a server
        console.log('Login attempt:', { email, password });
        alert('Login functionality would be implemented here');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add smooth reveal animation for products
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(-20deg) translateZ(-100px)';
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add typing effect to hero text
const heroText = document.querySelector('.hero h1');
const text = heroText.textContent;
heroText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Enhanced 3D tilt effect for product cards
document.querySelectorAll('.product-card').forEach(card => {
    let bounds;
    let mouseLeaveDelay;

    function rotateToMouse(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        }
        const distance = Math.sqrt(center.x**2 + center.y**2);

        card.style.transform = `
            perspective(1000px)
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )
            translate3d(0, -2%, 0)
        `;

        // Rotate image in opposite direction for enhanced 3D effect
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = `
                rotate3d(
                    ${-center.y / 100},
                    ${center.x / 100},
                    0,
                    ${Math.log(distance)}deg
                )
                scale3d(1.15, 1.15, 1.15)
                translateZ(50px)
            `;
        }
    }

    card.addEventListener('mouseenter', e => {
        bounds = card.getBoundingClientRect();
        document.addEventListener('mousemove', rotateToMouse);
        clearTimeout(mouseLeaveDelay);
    });

    card.addEventListener('mouseleave', () => {
        mouseLeaveDelay = setTimeout(() => {
            document.removeEventListener('mousemove', rotateToMouse);
            card.style.transform = 'perspective(1000px) rotate3d(0, 0, 0, 0deg) translate3d(0, 0, 0)';
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'rotate3d(0, 0, 0, 0deg) scale3d(1, 1, 1) translateZ(0)';
            }
        }, 100);
    });
});

// Add smooth shadow update on hover
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const shadowX = (x - 0.5) * 30;
        const shadowY = (y - 0.5) * 30;
        
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.2),
            0 15px 35px rgba(0,0,0,0.1)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
    });
});

// Add Quick View functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price-tag').textContent;
        const productImage = product.querySelector('img').src;
        
        // Here you can implement a modal or popup with product details
        alert(`Quick View:\n${productName}\n${productPrice}`);
    });
});

// Size selection functionality
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons in this product card
        const productCard = this.closest('.product-card');
        productCard.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Add 3D press effect
        this.style.transform = 'translateZ(10px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateZ(5px)';
        }, 150);
    });
});

// Buy Now button functionality
document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', function() {
        const product = this.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const size = product.querySelector('.size-btn.active')?.textContent || 'Default';
        const price = product.querySelector('.price-tag').textContent;
        
        alert(`Quick Checkout:\nProduct: ${productName}\nSize: ${size}\nPrice: ${price}`);
    });
});

// Enhanced hover effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * 10;
        
        card.style.transform = `
            perspective(2000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
        `;
        
        // Move product info for parallax effect
        const info = card.querySelector('.product-info');
        info.style.transform = `
            translateZ(50px)
            translateX(${rotateY * 2}px)
            translateY(${rotateX * 2}px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) translateZ(0)';
        const info = card.querySelector('.product-info');
        info.style.transform = 'translateZ(30px)';
    });
});

// Add image loading handler
document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.src = 'placeholder.png'; // Add a placeholder image for failed loads
    });
});

// Ensure consistent card heights
function adjustCardHeights() {
    const cards = document.querySelectorAll('.product-card');
    let maxHeight = 0;
    
    // Reset heights
    cards.forEach(card => card.style.height = 'auto');
    
    // Find max height
    cards.forEach(card => {
        maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    
    // Apply max height to all cards
    cards.forEach(card => card.style.height = `${maxHeight}px`);
}

// Run on load and resize
window.addEventListener('load', adjustCardHeights);
window.addEventListener('resize', adjustCardHeights);

function checkLogin() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

// Add logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

// Add this to handle logout button click
document.querySelector('.login-btn').addEventListener('click', function(e) {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        e.preventDefault();
        logout();
    }
});

// Check login status when page loads
window.addEventListener('load', checkLogin); 