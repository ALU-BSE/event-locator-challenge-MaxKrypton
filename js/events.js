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

let filteredEvents = [...sampleEvents];
let currentSortOrder = 'date';

// DOM Elements
const eventsList = document.getElementById('eventsList');
const resultsHeader = document.getElementById('resultsHeader');
const resultsCount = document.getElementById('resultsCount');
const sortSelect = document.getElementById('sortSelect');
const filterCategory = document.getElementById('filterCategory');
const noResults = document.getElementById('noResults');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadSearchParams();
    setupEventListeners();
    displayEvents();
});

// Load search parameters from localStorage
function loadSearchParams() {
    const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
    
    if (searchParams.city || searchParams.date || searchParams.category) {
        filterEvents(searchParams);
        updateResultsHeader(searchParams);
    } else {
        resultsHeader.textContent = 'All Events';
        filteredEvents = [...sampleEvents];
    }
}

// Set up event listeners
function setupEventListeners() {
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    if (filterCategory) {
        filterCategory.addEventListener('change', handleCategoryFilter);
    }
}

// Filter events based on search parameters
function filterEvents(params) {
    filteredEvents = sampleEvents.filter(event => {
        let matches = true;
        
        // Filter by city (simple check - contains search term)
        if (params.city) {
            matches = matches && event.location.toLowerCase().includes(params.city.toLowerCase());
        }
        
        // Filter by date
        if (params.date) {
            matches = matches && event.date === params.date;
        }
        
        // Filter by category
        if (params.category) {
            matches = matches && event.category === params.category;
        }
        
        return matches;
    });
}

// Update results header based on search
function updateResultsHeader(params) {
    let headerText = 'Search Results';
    
    if (params.city) {
        headerText += ` in ${params.city}`;
    }
    
    if (params.category) {
        headerText += ` - ${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Events`;
    }
    
    if (params.date) {
        const formattedDate = formatDate(params.date);
        headerText += ` on ${formattedDate}`;
    }
    
    resultsHeader.textContent = headerText;
}

// Display events
function displayEvents() {
    if (filteredEvents.length === 0) {
        eventsList.classList.add('d-none');
        noResults.classList.remove('d-none');
        resultsCount.textContent = 'No events found matching your criteria.';
        return;
    }
    
    eventsList.classList.remove('d-none');
    noResults.classList.add('d-none');
    resultsCount.textContent = `Found ${filteredEvents.length} event(s)`;
    
    eventsList.innerHTML = '';
    
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.appendChild(eventCard);
    });
}

// Create event card HTML
function createEventCard(event) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    const badgeClass = getCategoryBadgeClass(event.category);
    const formattedDate = formatDate(event.date);
    
    col.innerHTML = `
        <div class="card event-card h-100">
            <div class="card-header">
                <h5 class="card-title mb-0">${event.name}</h5>
                <small class="text-muted">${event.organizer}</small>
            </div>
            <div class="card-body">
                <p class="card-text">${event.description}</p>
                <div class="mb-2">
                    <small class="text-muted">
                        <strong>📅 ${formattedDate}</strong><br>
                        <strong>🕒 ${event.time}</strong><br>
                        <strong>📍 ${event.location}</strong><br>
                        <strong>💰 ${event.price}</strong>
                    </small>
                </div>
                <span class="badge ${badgeClass}">${event.category}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary btn-sm" onclick="viewEventDetails(${event.id})">
                    View Details
                </button>
                <button class="btn btn-outline-success btn-sm" onclick="quickRegister(${event.id})">
                    Quick Register
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Handle sorting
function handleSort() {
    const sortBy = sortSelect.value;
    currentSortOrder = sortBy;
    
    filteredEvents.sort((a, b) => {
        switch(sortBy) {
            case 'date':
                return new Date(a.date) - new Date(b.date);
            case 'name':
                return a.name.localeCompare(b.name);
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });
    
    displayEvents();
}

// Handle category filter
function handleCategoryFilter() {
    const category = filterCategory.value;
    
    if (category) {
        filteredEvents = sampleEvents.filter(event => event.category === category);
    } else {
        filteredEvents = [...sampleEvents];
    }
    
    // Apply current sort
    handleSort();
}

// Clear all filters
function clearFilters() {
    filteredEvents = [...sampleEvents];
    filterCategory.value = '';
    sortSelect.value = 'date';
    resultsHeader.textContent = 'All Events';
    localStorage.removeItem('searchParams');
    handleSort();
}

// View event details
function viewEventDetails(eventId) {
    localStorage.setItem('selectedEventId', eventId);
    window.location.href = 'event-details.html';
}

// Quick register function (placeholder)
function quickRegister(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (event) {
        alert(`Thanks for registering for ${event.name}! (This is a demo - no actual registration occurred)`);
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function getCategoryBadgeClass(category) {
    const classes = {
        'music': 'bg-danger',
        'sports': 'bg-warning text-dark',
        'food': 'bg-success',
        'arts': 'bg-info',
        'business': 'bg-primary',
        'education': 'bg-secondary'
    };
    return classes[category] || 'bg-secondary';
}