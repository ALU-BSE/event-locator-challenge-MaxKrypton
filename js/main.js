const sampleEvents = [
    {
        id: 1,
        name: "Summer Music Festival",
        date: "2024-07-15",
        time: "18:00",
        location: "Central Park, New York",
        category: "music",
        description: "Join us for an amazing evening of live music featuring local and international artists.",
        organizer: "NYC Events",
        price: "$25",
        capacity: 500,
        registered: 234
    },
    {
        id: 2,
        name: "Tech Conference 2024",
        date: "2024-08-20",
        time: "09:00",
        location: "Convention Center, San Francisco",
        category: "business",
        description: "Learn about the latest trends in technology and network with industry professionals.",
        organizer: "TechCorp",
        price: "Free",
        capacity: 200,
        registered: 156
    },
    {
        id: 3,
        name: "Food Truck Festival",
        date: "2024-07-25",
        time: "12:00",
        location: "Downtown Square, Austin",
        category: "food",
        description: "Taste delicious food from the best food trucks in the city.",
        organizer: "Austin Food Events",
        price: "$15",
        capacity: 300,
        registered: 98
    },
    {
        id: 4,
        name: "Basketball Championship",
        date: "2024-08-10",
        time: "19:30",
        location: "Sports Arena, Chicago",
        category: "sports",
        description: "Watch the exciting championship game between top teams.",
        organizer: "Chicago Sports",
        price: "$40",
        capacity: 1000,
        registered: 687
    },
    {
        id: 5,
        name: "Art Gallery Opening",
        date: "2024-07-18",
        time: "18:30",
        location: "Modern Art Museum, Los Angeles",
        category: "arts",
        description: "Explore contemporary art from emerging artists.",
        organizer: "LA Art Society",
        price: "$20",
        capacity: 150,
        registered: 67
    },
    {
        id: 6,
        name: "Programming Workshop",
        date: "2024-08-05",
        time: "10:00",
        location: "University Campus, Boston",
        category: "education",
        description: "Learn Python programming from basics to advanced concepts.",
        organizer: "Code Academy",
        price: "$50",
        capacity: 80,
        registered: 45
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