const sampleEvents = [
    {
        id: 1,
        name: "Kwita Izina Music Festival",
        date: "2024-07-15",
        time: "18:00",
        location: "Amahoro Stadium, Kigali",
        category: "music",
        description: "Join us for an amazing evening celebrating Rwandan music and culture with traditional and modern artists. This festival brings together talented musicians from around Rwanda to perform on multiple stages. Local food vendors and traditional craft sellers will be available throughout the event. Don't miss this incredible celebration of music and Rwandan heritage!",
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
        description: "Learn about the latest technology trends and innovation opportunities in Rwanda and East Africa. This summit features keynote speakers from major tech companies, hands-on workshops, and networking opportunities. Perfect for developers, entrepreneurs, and tech enthusiasts looking to connect with the growing Rwandan tech ecosystem.",
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
        description: "Taste authentic Rwandan cuisine and learn about traditional cooking methods from local chefs. Over 20 food vendors will be serving everything from ubugali to inyama n'amaru, traditional beverages to modern fusion dishes. Live cooking demonstrations and family-friendly activities included.",
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
        description: "Watch the exciting derby match between Rwanda's top football clubs. This is one of the most anticipated matches of the season featuring intense rivalry and skilled gameplay. Stadium food and beverages available.",
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
        description: "Explore contemporary Rwandan art and traditional crafts from local artists. This exclusive exhibition features works from 15 emerging Rwandan artists working in various mediums including painting, sculpture, and digital art. Traditional ubwoba and refreshments provided.",
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
        description: "Learn digital skills including web development and mobile app creation. This intensive workshop covers HTML, CSS, JavaScript, and mobile app development basics. Laptops provided, all skill levels welcome. Certificate provided upon completion.",
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
        description: "Annual remembrance walk to honor victims and promote unity and reconciliation. This peaceful walk brings the community together to remember, reflect, and commit to never again. Light refreshments provided after the walk.",
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
        description: "Experience local street food, traditional drinks, and evening entertainment. This vibrant night market features local vendors, live music, and a variety of traditional and modern Rwandan dishes in the heart of Nyamirambo.",
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
        description: "Watch international cyclists compete in Rwanda's premier cycling event. This stage of the Tour of Rwanda features challenging hills and exciting competition as riders from around the world compete through Kigali's scenic routes.",
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
        description: "Network with entrepreneurs and learn about business opportunities in Rwanda. This exclusive forum brings together successful business leaders, investors, and emerging entrepreneurs to discuss opportunities in Rwanda's growing economy.",
        organizer: "Rwanda Development Board",
        price: "15,000 RWF",
        capacity: 120,
        registered: 89
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