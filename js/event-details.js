// Event Details page JavaScript
// Student: [Your Name]

// Sample events data (duplicate for demo purposes)
const sampleEvents = [
    {
        id: 1,
        name: "Summer Music Festival",
        date: "2024-07-15",
        time: "18:00",
        location: "Central Park, New York",
        category: "music",
        description: "Join us for an amazing evening of live music featuring local and international artists. This festival brings together talented musicians from around the world to perform on multiple stages. Food trucks and vendors will be available throughout the event. Don't miss this incredible celebration of music and community!",
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
        description: "Learn about the latest trends in technology and network with industry professionals. This conference features keynote speakers from major tech companies, hands-on workshops, and networking opportunities. Perfect for developers, entrepreneurs, and tech enthusiasts.",
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
        description: "Taste delicious food from the best food trucks in the city. Over 30 food trucks will be serving everything from tacos to gourmet burgers, Asian fusion to desserts. Live music and family-friendly activities included.",
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
        description: "Watch the exciting championship game between top teams. This is the culmination of the season featuring the two best teams battling for the championship title. Premium seating and concessions available.",
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
        description: "Explore contemporary art from emerging artists. This exclusive gallery opening features works from 15 up-and-coming artists working in various mediums including painting, sculpture, and digital art. Wine and appetizers provided.",
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
        description: "Learn Python programming from basics to advanced concepts. This intensive workshop covers variables, functions, loops, data structures, and real-world applications. Laptops provided, all skill levels welcome.",
        organizer: "Code Academy",
        price: "$50",
        capacity: 80,
        registered: 45
    }
];

let currentEvent = null;

// DOM Elements
const eventTitle = document.getElementById('eventTitle');
const eventDateTime = document.getElementById('eventDateTime');
const eventLocation = document.getElementById('eventLocation');
const eventCategory = document.getElementById('eventCategory');
const eventPrice = document.getElementById('eventPrice');
const eventDescription = document.getElementById('eventDescription');
const eventOrganizer = document.getElementById('eventOrganizer');
const registeredCount = document.getElementById('registeredCount');
const capacity = document.getElementById('capacity');
const similarEvents = document.getElementById('similarEvents');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadEventDetails();
    loadSimilarEvents();
});

// Load event details from localStorage
function loadEventDetails() {
    const eventId = localStorage.getItem('selectedEventId');
    
    if (!eventId) {
        // If no event ID, redirect to events page
        window.location.href = 'events.html';
        return;
    }
    
    currentEvent = sampleEvents.find(event => event.id == eventId);
    
    if (!currentEvent) {
        alert('Event not found!');
        window.location.href = 'events.html';
        return;
    }
    
    displayEventDetails();
}

// Display event details
function displayEventDetails() {
    eventTitle.textContent = currentEvent.name;
    eventDateTime.textContent = `${formatDate(currentEvent.date)} at ${currentEvent.time}`;
    eventLocation.textContent = currentEvent.location;
    eventCategory.textContent = currentEvent.category.charAt(0).toUpperCase() + currentEvent.category.slice(1);
    eventCategory.className = `badge ${getCategoryBadgeClass(currentEvent.category)}`;
    eventPrice.textContent = currentEvent.price;
    eventDescription.textContent = currentEvent.description;
    eventOrganizer.textContent = currentEvent.organizer;
    registeredCount.textContent = currentEvent.registered;
    capacity.textContent = currentEvent.capacity;
}

// Load similar events (same category, excluding current event)
function loadSimilarEvents() {
    const similar = sampleEvents.filter(event => 
        event.category === currentEvent.category && event.id !== currentEvent.id
    ).slice(0, 3); // Show max 3 similar events
    
    if (similar.length === 0) {
        similarEvents.innerHTML = '<div class="col-12"><p class="text-muted">No similar events found.</p></div>';
        return;
    }
    
    similarEvents.innerHTML = '';
    similar.forEach(event => {
        const eventCard = createSimilarEventCard(event);
        similarEvents.appendChild(eventCard);
    });
}

// Create similar event card
function createSimilarEventCard(event) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-3';
    
    const badgeClass = getCategoryBadgeClass(event.category);
    
    col.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h6 class="card-title">${event.name}</h6>
                <p class="card-text small">${event.description.substring(0, 80)}...</p>
                <small class="text-muted">
                    📅 ${formatDate(event.date)}<br>
                    📍 ${event.location.split(',')[0]}
                </small>
            </div>
            <div class="card-footer">
                <button class="btn btn-sm btn-outline-primary" onclick="viewEventDetails(${event.id})">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    return col;
}

// Event action functions
function registerEvent() {
    if (currentEvent.registered >= currentEvent.capacity) {
        alert('Sorry, this event is full!');
        return;
    }
    
    const confirmed = confirm(`Register for ${currentEvent.name}?`);
    if (confirmed) {
        // Simulate registration
        currentEvent.registered++;
        registeredCount.textContent = currentEvent.registered;
        alert('Registration successful! (This is a demo)');
    }
}

function shareEvent() {
    // Simple share functionality
    const shareText = `Check out this event: ${currentEvent.name} on ${formatDate(currentEvent.date)} at ${currentEvent.location}`;
    
    if (navigator.share) {
        navigator.share({
            title: currentEvent.name,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Event details copied to clipboard!');
        }).catch(() => {
            alert('Share text: ' + shareText);
        });
    }
}

function addToCalendar() {
    // Create a simple calendar link (Google Calendar format)
    const startDate = new Date(currentEvent.date + 'T' + currentEvent.time);
    const endDate = new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(currentEvent.name)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(currentEvent.description)}&location=${encodeURIComponent(currentEvent.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
}

function goBack() {
    window.history.back();
}

function viewEventDetails(eventId) {
    localStorage.setItem('selectedEventId', eventId);
    window.location.reload();
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
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