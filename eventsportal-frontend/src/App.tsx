import { useEffect, useState } from 'react';
import { eventsAPI } from './services/api';
import Footer from './components/Footer';
import './App.css';

type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  contact: string;
  quantity: number;
  price: number;
  imageUrl: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type FilterType = 'all' | 'upcoming' | 'free' | 'paid';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventsAPI.getAllEvents();
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
        // For demo purposes, let's add some sample events
        const sampleEvents: Event[] = [
          {
            id: 1,
            title: "Tech Conference 2024",
            description: "Join us for the biggest tech conference of the year featuring keynote speakers, workshops, and networking opportunities.",
            location: "Convention Center, Downtown",
            startTime: "2024-03-15T09:00:00",
            endTime: "2024-03-15T18:00:00",
            contact: "tech@events.com",
            quantity: 500,
            price: 150,
            imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
            category: "TECHNOLOGY",
            status: "ACTIVE",
            createdAt: "2024-01-15T10:00:00",
            updatedAt: "2024-01-15T10:00:00"
          },
          {
            id: 2,
            title: "Music Festival",
            description: "A three-day music festival featuring local and international artists across multiple genres.",
            location: "Central Park",
            startTime: "2024-04-20T14:00:00",
            endTime: "2024-04-22T23:00:00",
            contact: "music@festival.com",
            quantity: 2000,
            price: 75,
            imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
            category: "MUSIC",
            status: "ACTIVE",
            createdAt: "2024-01-10T10:00:00",
            updatedAt: "2024-01-10T10:00:00"
          },
          {
            id: 3,
            title: "Art Exhibition",
            description: "Contemporary art exhibition showcasing works from emerging artists.",
            location: "Modern Art Gallery",
            startTime: "2024-03-01T10:00:00",
            endTime: "2024-03-30T18:00:00",
            contact: "art@gallery.com",
            quantity: 100,
            price: 0,
            imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
            category: "ART",
            status: "ACTIVE",
            createdAt: "2024-01-05T10:00:00",
            updatedAt: "2024-01-05T10:00:00"
          },
          {
            id: 4,
            title: "Sports Championship",
            description: "Annual sports championship featuring top athletes competing in various disciplines including basketball, soccer, and athletics.",
            location: "Olympic Stadium",
            startTime: "2024-05-10T08:00:00",
            endTime: "2024-05-12T22:00:00",
            contact: "sports@championship.com",
            quantity: 15000,
            price: 45,
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
            category: "SPORTS",
            status: "ACTIVE",
            createdAt: "2024-01-20T10:00:00",
            updatedAt: "2024-01-20T10:00:00"
          },
          {
            id: 5,
            title: "Food & Wine Festival",
            description: "Celebrate culinary excellence with world-renowned chefs, wine tastings, and gourmet food experiences.",
            location: "Riverside Gardens",
            startTime: "2024-06-15T11:00:00",
            endTime: "2024-06-17T23:00:00",
            contact: "food@festival.com",
            quantity: 800,
            price: 120,
            imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
            category: "FOOD",
            status: "ACTIVE",
            createdAt: "2024-01-25T10:00:00",
            updatedAt: "2024-01-25T10:00:00"
          }
        ];
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    switch (filterType) {
      case 'upcoming':
        filtered = filtered.filter(event => new Date(event.startTime) > new Date());
        break;
      case 'free':
        filtered = filtered.filter(event => event.price === 0);
        break;
      case 'paid':
        filtered = filtered.filter(event => event.price > 0);
        break;
      default:
        break;
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, filterType]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return '#4caf50';
      case 'CANCELLED':
        return '#f44336';
      case 'COMPLETED':
        return '#2196f3';
      default:
        return '#ff9800';
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🎉 Events Portal</h1>
            <p>Discover amazing events happening around you</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{events.length}</span>
              <span className="stat-label">Total Events</span>
            </div>
            <div className="stat">
              <span className="stat-number">{filteredEvents.length}</span>
              <span className="stat-label">Showing</span>
            </div>
          </div>
        </div>
      </header>
      
      <nav className="navigation">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-section">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Events
          </button>
          <button
            className={`filter-btn ${filterType === 'upcoming' ? 'active' : ''}`}
            onClick={() => setFilterType('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`filter-btn ${filterType === 'free' ? 'active' : ''}`}
            onClick={() => setFilterType('free')}
          >
            Free Events
          </button>
          <button
            className={`filter-btn ${filterType === 'paid' ? 'active' : ''}`}
            onClick={() => setFilterType('paid')}
          >
            Paid Events
          </button>
        </div>
      </nav>
      
      <main className="events-container">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading events...</p>
          </div>
        ) : error && events.length === 0 ? (
          <div className="error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
            <button onClick={() => {
              setSearchTerm('');
              setFilterType('all');
            }}>Clear Filters</button>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
                <div className="event-image-container">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="event-image" />
                  ) : (
                    <div className="event-image-placeholder">
                      <span>📅</span>
                    </div>
                  )}
                  <div className="event-status" style={{ backgroundColor: getStatusColor(event.status) }}>
                    {event.status}
                  </div>
                  {event.price === 0 && (
                    <div className="free-badge">FREE</div>
                  )}
                </div>
                <div className="event-content">
                  <h2>{event.title}</h2>
                  <p className="event-description">
                    {event.description.length > 100 
                      ? `${event.description.substring(0, 100)}...` 
                      : event.description
                    }
                  </p>
                  <div className="event-details">
                    <p><strong>📍</strong> {event.location}</p>
                    <p><strong>📅</strong> {formatDate(event.startTime)}</p>
                    <p><strong>💰</strong> {event.price === 0 ? 'Free' : `$${event.price}`}</p>
                    <p><strong>🎫</strong> {event.quantity} tickets left</p>
                  </div>
                  <div className="event-category">
                    <span className="category-tag">{event.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Event Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeEventModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeEventModal}>×</button>
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <span className="modal-category">{selectedEvent.category}</span>
            </div>
            <div className="modal-body">
              <div className="modal-image">
                {selectedEvent.imageUrl ? (
                  <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
                ) : (
                  <div className="modal-image-placeholder">📅</div>
                )}
              </div>
              <div className="modal-details">
                <p className="modal-description">{selectedEvent.description}</p>
                <div className="modal-info">
                  <p><strong>📍 Location:</strong> {selectedEvent.location}</p>
                  <p><strong>📅 Start:</strong> {formatDate(selectedEvent.startTime)}</p>
                  {selectedEvent.endTime && (
                    <p><strong>⏰ End:</strong> {formatDate(selectedEvent.endTime)}</p>
                  )}
                  <p><strong>💰 Price:</strong> {selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price}`}</p>
                  <p><strong>🎫 Available:</strong> {selectedEvent.quantity} tickets</p>
                  <p><strong>📞 Contact:</strong> {selectedEvent.contact}</p>
                  <p><strong>📊 Status:</strong> {selectedEvent.status}</p>
                </div>
                <div className="modal-actions">
                  <button className="btn-primary">Book Now</button>
                  <button className="btn-secondary">Share Event</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
