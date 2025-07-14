// Main JavaScript file for Event Locator
// Student: [Your Name]
// Course: Computer Science 2nd Year
// Assignment: Web Development Project

// Sample event data - in real application this would come from a database
const sampleEvents = [
    {
        id: 1,
        name: "Kwita Izina Music Festival",
        date: "2024-07-15",
        time: "18:00",
        location: "Amahoro Stadium, Kigali",
        category: "music",
        description: "Join us for an amazing evening celebrating Rwandan music and culture with traditional and modern artists.",
        organizer: "Rwanda Cultural Events",
        price: "5,000 RWF",
        capacity: 500,
        registered: 234
    },
    {
        id: 2,
        name: "Kigali Tech Summit 2024",
        date: "2024-08-20",
        time: "09:00",
        location: "Kigali Convention Centre, Kigali",
        category: "business",
        description: "Learn about the latest technology trends and innovation opportunities in Rwanda and East Africa.",
        organizer: "Rwanda Tech Hub",
        price: "Free",
        capacity: 200,
        registered: 156
    },
    {
        id: 3,
        name: "Ubwiyunge Food Festival",
        date: "2024-07-25",
        time: "12:00",
        location: "Kimisagara Market, Kigali",
        category: "food",
        description: "Taste authentic Rwandan cuisine and learn about traditional cooking methods from local chefs.",
        organizer: "Rwanda Culinary Association",
        price: "3,000 RWF",
        capacity: 300,
        registered: 98
    },
    {
        id: 4,
        name: "Rayon Sports vs APR Match",
        date: "2024-08-10",
        time: "19:30",
        location: "Nyamirambo Regional Stadium, Kigali",
        category: "sports",
        description: "Watch the exciting derby match between Rwanda's top football clubs.",
        organizer: "Rwanda Football Federation",
        price: "2,000 RWF",
        capacity: 1000,
        registered: 687
    },
    {
        id: 5,
        name: "Ubunyangamugayo Art Exhibition",
        date: "2024-07-18",
        time: "18:30",
        location: "Inema Art Center, Kacyiru",
        category: "arts",
        description: "Explore contemporary Rwandan art and traditional crafts from local artists.",
        organizer: "Rwanda Arts Council",
        price: "1,500 RWF",
        capacity: 150,
        registered: 67
    },
    {
        id: 6,
        name: "Digital Skills Workshop",
        date: "2024-08-05",
        time: "10:00",
        location: "University of Rwanda, Gikondo Campus",
        category: "education",
        description: "Learn digital skills including web development and mobile app creation.",
        organizer: "Rwanda Coding Academy",
        price: "10,000 RWF",
        capacity: 80,
        registered: 45
    },
    {
        id: 7,
        name: "Genocide Memorial Walk",
        date: "2024-08-15",
        time: "08:00",
        location: "Kigali Genocide Memorial, Gisozi",
        category: "education",
        description: "Annual remembrance walk to honor victims and promote unity and reconciliation.",
        organizer: "Aegis Trust Rwanda",
        price: "Free",
        capacity: 500,
        registered: 312
    },
    {
        id: 8,
        name: "Nyamirambo Night Market",
        date: "2024-07-28",
        time: "19:00",
        location: "Biryogo Market, Nyamirambo",
        category: "food",
        description: "Experience local street food, traditional drinks, and evening entertainment.",
        organizer: "Nyamirambo Community",
        price: "1,000 RWF",
        capacity: 400,
        registered: 156
    },
    {
        id: 9,
        name: "Tour of Rwanda Cycling Race",
        date: "2024-08-02",
        time: "14:00",
        location: "Kimihurura - Rebero Route, Kigali",
        category: "sports",
        description: "Watch international cyclists compete in Rwanda's premier cycling event.",
        organizer: "Rwanda Cycling Federation",
        price: "Free",
        capacity: 2000,
        registered: 1243
    },
    {
        id: 10,
        name: "Ubusabane Business Forum",
        date: "2024-08-12",
        time: "14:30",
        location: "Serena Hotel Kigali, Kiyovu",
        category: "business",
        description: "Network with entrepreneurs and learn about business opportunities in Rwanda.",
        organizer: "Rwanda Development Board",
        price: "15,000 RWF",
        capacity: 120,
        registered: 89
    }
];

// DOM Elements
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const dateInput = document.getElementById('dateInput');
const categorySelect = document.getElementById('categorySelect');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setDefaultDate();
});

// Set up event listeners
function setupEventListeners() {
    // Search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
    
    // Category card clicks
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            selectCategory(category);
        });
    });
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    
    const city = cityInput.value.trim();
    const date = dateInput.value;
    const category = categorySelect.value;
    
    // Basic validation
    if (!city && !date && !category) {
        alert('Please enter at least one search criteria.');
        return;
    }
    
    // Store search parameters in localStorage (simple way for student project)
    const searchParams = {
        city: city,
        date: date,
        category: category
    };
    
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    
    // Navigate to events page
    window.location.href = 'events.html';
}

// Set default date to today
function setDefaultDate() {
    if (dateInput) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateInput.value = formattedDate;
    }
}

// Select category from quick category cards
function selectCategory(category) {
    // Update dropdown
    if (categorySelect) {
        categorySelect.value = category;
    }
    
    // Update visual feedback
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-category') === category) {
            card.classList.add('active');
        }
    });
    
    // Trigger search automatically
    setTimeout(() => {
        if (searchForm) {
            searchForm.dispatchEvent(new Event('submit'));
        }
    }, 300);
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Utility function to get category badge class
function getCategoryBadgeClass(category) {
    const classes = {
        'music': 'badge-music',
        'sports': 'badge-sports',
        'food': 'badge-food',
        'arts': 'badge-arts',
        'business': 'badge-business',
        'education': 'badge-education'
    };
    return classes[category] || 'bg-secondary';
}

// Export functions for use in other files
window.EventLocator = {
    sampleEvents: sampleEvents,
    formatDate: formatDate,
    getCategoryBadgeClass: getCategoryBadgeClass
};