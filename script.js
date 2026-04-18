// ==================== DESTINATIONS DATA - ALL WORKING IMAGES ====================
const destinations = [
  {
    name: "Maldives",
    image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?w=600&h=400&auto=compress",
    description: "Crystal clear waters and overwater bungalows",
    price: "$1,299",
    category: "beach"
  },
  {
    name: "Paris",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?w=600&h=400&auto=compress",
    description: "City of Love and Lights, Eiffel Tower views",
    price: "$999",
    category: "city"
  },
  {
    name: "Dubai",
    image: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?w=600&h=400&auto=compress",
    description: "Luxury shopping and modern architecture",
    price: "$1,499",
    category: "city"
  },
  {
    name: "Switzerland",
    image: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?w=600&h=400&auto=compress",
    description: "Alpine beauty and scenic train rides",
    price: "$1,799",
    category: "mountain"
  },
  {
    name: "Bali",
    image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?w=600&h=400&auto=compress",
    description: "Tropical paradise with rich culture",
    price: "$899",
    category: "beach"
  },
  {
    name: "Santorini",
    image: "https://images.pexels.com/photos/1584047/pexels-photo-1584047.jpeg?w=600&h=400&auto=compress",
    description: "White-washed buildings and stunning sunsets",
    price: "$1,199",
    category: "beach"
  },
  {
    name: "Rome",
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?w=600&h=400&auto=compress",
    description: "Ancient history and Italian cuisine",
    price: "$1,099",
    category: "city"
  },
  {
    name: "Japan",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?w=600&h=400&auto=compress",
    description: "Cherry blossoms and futuristic cities",
    price: "$1,999",
    category: "city"
  },
  {
    name: "New York",
    image: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?w=600&h=400&auto=compress",
    description: "The city that never sleeps",
    price: "$1,299",
    category: "city"
  },
  {
    name: "London",
    image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?w=600&h=400&auto=compress",
    description: "Royal palaces and Big Ben",
    price: "$1,199",
    category: "city"
  },
  {
    name: "Sydney",
    image: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?w=600&h=400&auto=compress",
    description: "Opera House and beautiful harbors",
    price: "$1,599",
    category: "city"
  },
  {
    name: "Machu Picchu",
    image: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?w=600&h=400&auto=compress",
    description: "Ancient Incan citadel",
    price: "$1,399",
    category: "historical"
  }
];

// Load destinations on places page
function loadDestinations() {
  const container = document.getElementById('destinationsGrid');
  if (!container) return;
  
  container.innerHTML = '';
  
  destinations.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.onclick = () => {
      window.location.href = `booking.html?destination=${encodeURIComponent(dest.name)}`;
    };
    
    card.innerHTML = `
      <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?w=600&h=400&auto=compress'">
      <h3>${dest.name}</h3>
      <p>${dest.description}</p>
      <div class="price">Starting from ${dest.price}</div>
    `;
    
    container.appendChild(card);
  });
}

// ==================== BOOKING FUNCTIONS ====================
function bookTrip() {
  const destination = document.getElementById('destination')?.value;
  const travelDate = document.getElementById('travelDate')?.value;
  const travelers = document.getElementById('travelers')?.value;
  const packageType = document.getElementById('packageType')?.value;
  const fullName = document.getElementById('fullName')?.value;
  const email = document.getElementById('emailBooking')?.value;
  const phone = document.getElementById('phone')?.value;
  
  if (!destination || !travelDate || !travelers || !fullName || !email || !phone) {
    alert('Please fill in all fields!');
    return;
  }
  
  // Get package price
  let packagePrice = 0;
  let packageName = "";
  if (packageType === 'standard') { packagePrice = 999; packageName = "Standard"; }
  else if (packageType === 'deluxe') { packagePrice = 1499; packageName = "Deluxe"; }
  else { packagePrice = 1999; packageName = "Premium"; }
  
  const totalPrice = packagePrice * parseInt(travelers);
  
  // Create booking confirmation
  const bookingDetails = `
    🎉 <strong>Booking Confirmed!</strong><br><br>
    <strong>Name:</strong> ${fullName}<br>
    <strong>Destination:</strong> ${destination}<br>
    <strong>Travel Date:</strong> ${travelDate}<br>
    <strong>Travelers:</strong> ${travelers}<br>
    <strong>Package:</strong> ${packageName}<br>
    <strong>Total Price:</strong> $${totalPrice}<br><br>
    📧 Confirmation sent to: ${email}<br>
    📞 Contact: ${phone}<br><br>
    ✨ Thank you for booking with Travel Explorer!
  `;
  
  // Show modal
  const modal = document.getElementById('confirmationModal');
  const bookingDetailsElement = document.getElementById('bookingDetails');
  if (modal && bookingDetailsElement) {
    bookingDetailsElement.innerHTML = bookingDetails;
    modal.style.display = 'flex';
  } else {
    alert(bookingDetails);
  }
  
  // Save to localStorage
  const bookings = JSON.parse(localStorage.getItem('travelBookings') || '[]');
  bookings.push({
    id: Date.now(),
    destination,
    travelDate,
    travelers,
    packageType,
    packageName,
    totalPrice,
    fullName,
    email,
    phone,
    bookingDate: new Date().toLocaleString()
  });
  localStorage.setItem('travelBookings', JSON.stringify(bookings));
  
  // Reset form
  document.getElementById('bookingForm')?.reset();
}

function closeModal() {
  const modal = document.getElementById('confirmationModal');
  if (modal) modal.style.display = 'none';
}

// ==================== CONTACT FORM ====================
function sendMessage() {
  const name = document.getElementById('contactName')?.value;
  const email = document.getElementById('contactEmail')?.value;
  const subject = document.getElementById('contactSubject')?.value;
  const message = document.getElementById('contactMessage')?.value;
  
  if (!name || !email || !message) {
    alert('Please fill in all required fields!');
    return;
  }
  
  alert(`✨ Thank you ${name}!\n\nYour message has been sent successfully.\nWe'll get back to you within 24 hours.`);
  
  document.getElementById('contactForm')?.reset();
}

// ==================== NEWSLETTER ====================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`🎉 Thanks for subscribing!\nWe'll send travel deals to ${email}`);
    this.reset();
  });
}

// ==================== ANIMATED COUNTERS ====================
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        setTimeout(updateCounter, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// ==================== CHECK URL PARAMS FOR BOOKING ====================
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const destination = urlParams.get('destination');
  if (destination && document.getElementById('destination')) {
    const select = document.getElementById('destination');
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === destination) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

// ==================== PROFILE FUNCTIONS ====================
function loadProfileStats() {
  const bookings = JSON.parse(localStorage.getItem('travelBookings') || '[]');
  const wishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
  
  const orderCountElem = document.getElementById('orderCount');
  const wishlistStatElem = document.getElementById('wishlistStat');
  
  if (orderCountElem) orderCountElem.innerText = bookings.length;
  if (wishlistStatElem) wishlistStatElem.innerText = wishlist.length;
  
  // Load recent orders
  const recentOrdersElem = document.getElementById('recentOrders');
  if (recentOrdersElem && bookings.length > 0) {
    recentOrdersElem.innerHTML = bookings.slice(-3).reverse().map(booking => `
      <div class="order-card">
        <strong>${booking.destination}</strong><br>
        Date: ${booking.travelDate} | Travelers: ${booking.travelers}<br>
        Total: $${booking.totalPrice}
      </div>
    `).join('');
  } else if (recentOrdersElem) {
    recentOrdersElem.innerHTML = '<p>No bookings yet. Start your adventure!</p>';
  }
}

// ==================== WISHLIST FUNCTIONS ====================
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');
  const wishlistCountElem = document.getElementById('wishlistCount');
  if (wishlistCountElem) wishlistCountElem.innerText = wishlist.length;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('travelCart') || '[]');
  const cartCountElem = document.getElementById('cartCount');
  if (cartCountElem) cartCountElem.innerText = cart.length;
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  loadDestinations();
  animateCounters();
  checkUrlParams();
  loadProfileStats();
  updateWishlistCount();
  updateCartCount();
});