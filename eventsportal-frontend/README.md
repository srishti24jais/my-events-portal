# Events Portal Frontend

A modern, feature-rich React-based frontend for the Events Portal application that connects to the Spring Boot backend.

## ✨ Features

- 🎉 **Event Display**: Beautiful grid layout showcasing all events
- 🔍 **Smart Search**: Search events by title, description, or location
- 🏷️ **Advanced Filtering**: Filter by All, Upcoming, Free, or Paid events
- 📊 **Real-time Stats**: Live event count and filtering statistics
- 🎨 **Modern UI**: Glassmorphism design with smooth animations
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔄 **Interactive Modals**: Detailed event information in popup modals
- 🎫 **Event Booking**: Ready-to-implement booking functionality
- 📈 **Status Indicators**: Visual status badges for event states
- 🆓 **Free Event Badges**: Clear identification of free events
- ⚡ **Fast Loading**: Optimized performance with loading states
- 🛡️ **Error Handling**: Graceful error handling with retry options

## 🚀 Live Demo Features

### Sample Events Included:
- **Tech Conference 2024**: Technology event with workshops
- **Music Festival**: Multi-day music festival
- **Art Exhibition**: Free contemporary art showcase

### Interactive Elements:
- Click any event card to view detailed information
- Use search bar to find specific events
- Filter events by category and price
- Responsive design adapts to any screen size

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔗 Backend Connection

The frontend is configured to connect to the Spring Boot backend at:
- **URL**: `http://localhost:8080`
- **API Base Path**: `/api`
- **CORS**: Configured to allow requests from `http://localhost:5173`

### Available Endpoints

- `GET /api/events/all` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events/{id}/book` - Book an event (requires authentication)

## 📁 Project Structure

```
src/
├── App.tsx              # Main application component
├── App.css              # Application styles
├── main.tsx             # Application entry point
├── main.css             # Global styles
├── components/
│   └── Footer.tsx       # Footer component
├── services/
│   └── api.ts           # API service configuration
└── pages/               # Additional pages (if any)
```

## 🎨 Design Features

### Modern UI Elements:
- **Glassmorphism Effects**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-to-blue gradients
- **Smooth Animations**: Hover effects and transitions
- **Status Badges**: Color-coded event status indicators
- **Category Tags**: Visual category identification
- **Loading Spinners**: Animated loading states

### Responsive Design:
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout on tablets
- **Desktop Experience**: Enhanced features on larger screens
- **Touch-Friendly**: Optimized for touch interactions

## 🛠️ Technologies Used

- **React 18** - UI framework with hooks
- **TypeScript** - Type safety and better development experience
- **Axios** - HTTP client with interceptors
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with animations
- **Glassmorphism** - Modern design trend

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Environment Variables

Create a `.env` file in the root directory to customize:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🎯 Key Features Explained

### Search & Filtering
- **Real-time Search**: Instant filtering as you type
- **Multi-field Search**: Search across title, description, and location
- **Category Filters**: Quick access to different event types
- **Price Filters**: Separate free and paid events

### Event Cards
- **Rich Information**: Title, description, location, date, price
- **Visual Indicators**: Status badges, free event badges
- **Interactive**: Click to view detailed modal
- **Responsive Images**: Optimized image display with placeholders

### Modal System
- **Detailed View**: Complete event information
- **Booking Actions**: Ready-to-implement booking buttons
- **Share Functionality**: Social sharing capabilities
- **Responsive Design**: Works on all screen sizes

## 🐛 Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend has proper CORS configuration in `WebConfig.java`.

### Connection Issues
1. Verify the backend is running on port 8080
2. Check that the backend has the `/api/events/all` endpoint
3. Ensure CORS is properly configured

### Build Issues
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `npm run dev -- --force`

### Sample Data
If the backend is not available, the app will display sample events for demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Ready to discover amazing events!** The Events Portal provides a modern, user-friendly interface for browsing and booking events with a beautiful design and smooth user experience. 