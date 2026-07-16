I'll update the README content with your project name "TrackFleet" and GitHub username "CodeWithAkki". Since I couldn't access your specific repository, I've adapted the content accordingly.

# 🚚 TrackFleet - Shipment Tracking API

![GitHub](https://img.shields.io/github/license/Codewithakk/TrackFleet)
![Node.js](https://img.shields.io/badge/node-18.x-green)
![Express](https://img.shields.io/badge/express-4.x-blue)
![MongoDB](https://img.shields.io/badge/mongodb-atlas-green)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen)
![Render](https://img.shields.io/badge/deployed-render-purple)

A comprehensive Node.js API for tracking cargo shipments with real-time location updates, geospatial queries, and ETA calculations. Built as part of the MERN Stack Tracking Assignment.

## Assignment Fulfillment

This project implements a complete Track Fleet  backend using Node.js, Express, and MongoDB with all required features:

### Backend Implementation
- **CRUD Operations**: Complete RESTful API endpoints for shipment management
- **Data Modeling**: Comprehensive shipment schema with nested documents and geospatial data
- **Geospatial Support**: MongoDB 2dsphere indexes for location-based queries
- **ETA Calculation**: Intelligent algorithms considering route, distance, and current location
- **Location History**: Track all checkpoint updates with timestamps
- **Docker Support**: Full containerization with Docker Compose for easy deployment
- **Error Handling**: Comprehensive error middleware with detailed validation
- **Logging**: Winston logger for production monitoring
- **Security**: Helmet, CORS, and input sanitization

## 🔌 API Endpoints

### Shipment Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/shipments` | Retrieve all shipments with pagination support |
| GET    | `/api/shipments/:trackingNumber` | Get specific shipment by tracking number |
| POST   | `/api/shipments` | Create a new shipment |
| PUT    | `/api/shipments/:trackingNumber` | Update shipment details |
| DELETE | `/api/shipments/:trackingNumber` | Delete a shipment |

### Location & Status Updates
| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH  | `/api/shipments/:trackingNumber/location` | Update current location |
| PATCH  | `/api/shipments/:trackingNumber/status` | Update shipment status |
| POST   | `/api/shipments/:trackingNumber/checkpoints` | Add a new checkpoint |
| PATCH  | `/api/shipments/:trackingNumber/checkpoints/:checkpointId` | Update a checkpoint |
| DELETE | `/api/shipments/:trackingNumber/checkpoints/:checkpointId` | Delete a checkpoint |

### Analytics & Utilities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/shipments/:trackingNumber/eta` | Get estimated delivery time |
| GET    | `/api/shipments/:trackingNumber/history` | Get full location history |
| GET    | `/api/shipments/:trackingNumber/distance` | Get route distance |
| GET    | `/api/shipments/nearby` | Find shipments near a location |
| POST   | `/api/shipments/seed` | Seed database with sample data |
| POST   | `/api/shipments/seed/india` | Seed with India-specific data |

### System Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/health` | Health check endpoint |

## 📊 Data Model

### Shipment Schema

```javascript
{
  trackingNumber: {            // Unique tracking identifier (required)
    type: String,
    required: true,
    unique: true
  },
  containerId: {               // Container identifier
    type: String,
    required: true
  },
  status: {                    // Current shipment status
    type: String,
    enum: ['pending', 'in_transit', 'out_for_delivery', 'delivered', 'exception'],
    default: 'pending'
  },
  origin: {                    // Origin location
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {            // [longitude, latitude]
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    address: String
  },
  destination: {              // Destination location
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {            // [longitude, latitude]
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    address: String
  },
  currentLocation: {          // Current location
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {            // [longitude, latitude]
      type: [Number],
      index: '2dsphere'
    },
    address: String,
    timestamp: Date
  },
  route: [{                   // Route waypoints
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number, Number],
      address: String
    },
    estimatedArrival: Date,
    order: Number
  }],
  checkpoints: [{             // Checkpoint history
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number, Number],
      address: String
    },
    status: String,
    notes: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  currentEta: {               // Current estimated delivery date
    type: Date
  },
  distance: {                 // Total distance in kilometers
    type: Number,
    default: 0
  },
  deliveredAt: Date,          // Delivery timestamp
  estimatedDelivery: Date,    // Original estimated delivery
  weight: Number,            // Shipment weight in kg
  dimensions: {              // Package dimensions
    length: Number,
    width: Number,
    height: Number,
    unit: { type: String, default: 'cm' }
  },
  customerInfo: {            // Customer details
    name: String,
    email: String,
    phone: String,
    address: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Indexes
- `trackingNumber`: Unique index for fast lookups
- `origin.coordinates`: 2dsphere for origin queries
- `destination.coordinates`: 2dsphere for destination queries
- `currentLocation.coordinates`: 2dsphere for location updates


## 🛠️ Technologies & Tools

### Core Technologies
- **Node.js** (v18+) - JavaScript runtime
- **Express** (v4.18+) - Web framework
- **MongoDB** (v6.0+) - NoSQL database
- **Mongoose** (v7.0+) - ODM for MongoDB

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation
- **Rate Limiter** - API rate limiting

### Development Tools
- **Nodemon** - Hot reload for development
- **Winston** - Logging
- **Dotenv** - Environment variable management
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Infrastructure
- **Docker** & **Docker Compose** - Containerization
- **Render** - Deployment
- **GitHub Actions** - CI/CD

## 🔧 Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/get-started) (optional, for containerized deployment)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB installation
- [Git](https://git-scm.com/)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=0.0.0.0

# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/trackfleet?retryWrites=true&w=majority
MONGO_OPTIONS='{"useNewUrlParser":true,"useUnifiedTopology":true}'

# Security
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=http://localhost:3000
# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### Installation Options

#### Option 1: Standard Setup

```bash
# Clone the repository
git clone https://github.com/Codewithakk/TrackFleet.git
cd TrackFleet

# Install dependencies
npm install

# Create .env file with your configuration
cp .env.example .env
# Edit .env with your actual values

# Start development server with auto-reload
npm run dev

# Or start production server
npm start
```

#### Option 2: Docker Setup (Recommended for Production)

```bash
# Clone the repository
git clone https://github.com/Codewithakk/TrackFleet.git
cd TrackFleet

# Create .env file
cp .env.example .env
# Edit .env with your actual values

# Build and run with Docker Compose
docker-compose up -d --build

# Or use the deployment script
chmod +x docker-deploy.sh
./docker-deploy.sh
```

## 📁 Project Structure

```
TrackFleet/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   ├── logger.js            # Winston logger configuration
│   │   └── redis.js             # Redis configuration (optional)
│   ├── controllers/
│   │   ├── shipment.controller.js
│   │   └── health.controller.js
│   ├── middleware/
│   │   ├── error.middleware.js
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── rateLimiter.js
│   ├── models/
│   │   └── shipment.model.js    # Shipment schema
│   ├── routes/
│   │   ├── shipment.routes.js
│   │   └── health.routes.js
│   ├── services/
│   │   ├── shipment.service.js
│   │   └── location.service.js
│   ├── utils/
│   │   ├── location.utils.js
│   │   ├── eta.utils.js
│   │   └── validators.js
│   └── server.js               # Application entry point
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── logs/                       # Application logs
├── .env.example                # Example environment variables
├── .dockerignore
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Docker image configuration
├── package.json
├── package-lock.json
├── postman-collection.json     # API testing collection
├── README.md
└── LICENSE
```

## 🐳 Docker Commands Reference

### Building and Running
```bash
# Build and start all services (API + MongoDB)
docker-compose up -d --build

# Start without rebuilding
docker-compose up -d

# Build only the API service
docker-compose build api

# Start a specific service
docker-compose up -d api
```

### Monitoring and Management
```bash
# View running containers
docker ps

# View container logs (all services)
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f api

# View logs for MongoDB
docker-compose logs -f mongodb

# Check container health
curl http://localhost:5000/health

# Get container stats
docker stats

# Inspect MongoDB data
docker exec -it trackfleet-mongo mongosh
```

### Stopping and Cleaning
```bash
# Stop containers
docker-compose down

# Stop containers and remove volumes (deletes database data)
docker-compose down -v

# Stop containers, remove volumes, and images
docker-compose down -v --rmi all

# Clean up unused Docker resources
docker system prune -a --volumes
```

### Troubleshooting
```bash
# Check if services are healthy
docker-compose ps

# Test API endpoint
curl http://localhost:5000/health

# Access MongoDB shell
docker exec -it trackfleet-mongo mongosh --eval "db.runCommand({ ping: 1 })"

# Check container logs for errors
docker-compose logs --tail=100 api

# Rebuild after code changes
docker-compose up -d --build --force-recreate
```

## 📝 API Usage Examples

### Create a Shipment
```bash
POST /api/shipments
Content-Type: application/json

{
  "trackingNumber": "TRK123456",
  "containerId": "CONT9876",
  "origin": {
    "coordinates": [77.2167, 28.6139],
    "address": "New Delhi, India"
  },
  "destination": {
    "coordinates": [72.8777, 19.0760],
    "address": "Mumbai, India"
  },
  "customerInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "weight": 15.5,
  "dimensions": {
    "length": 30,
    "width": 20,
    "height": 15
  }
}
```

### Update Location
```bash
PATCH /api/shipments/TRK123456/location
Content-Type: application/json

{
  "coordinates": [75.8577, 26.9124],
  "address": "Jaipur, Rajasthan",
  "status": "in_transit"
}
```

### Get Shipment Details
```bash
GET /api/shipments/TRK123456
```

### Get ETA
```bash
GET /api/shipments/TRK123456/eta
```

### Get Location History
```bash
GET /api/shipments/TRK123456/history
```

## 🚢 Deployment

### Render Deployment (Recommended)

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New Web Service"
   - Connect your GitHub account and select the repository

2. **Configure Service**
   ```yaml
   Name: trackfleet-api
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Add Environment Variables**
   - `NODE_ENV`: production
   - `PORT`: 5000
   - `MONGO_URI`: Your MongoDB Atlas URI
   - All other required variables from `.env.example`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy

### Manual Deployment
```bash
# Install PM2 for process management
npm install -g pm2

# Build and start the application
npm install --production
pm2 start src/server.js --name trackfleet

# Save PM2 configuration
pm2 save
pm2 startup
```

### Environment-Specific Configuration

#### Development
```env
NODE_ENV=development
LOG_LEVEL=debug
```

#### Production
```env
NODE_ENV=production
LOG_LEVEL=info
RATE_LIMIT_ENABLED=true
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/shipment.test.js
```

## 📊 Performance Optimization

- **Database Indexing**: All geospatial fields are indexed with 2dsphere
- **Query Optimization**: Projection queries for reduced data transfer
- **Caching**: Redis support for frequently accessed data (optional)
- **Rate Limiting**: Prevent abuse with configurable rate limits
- **Compression**: Gzip compression for API responses
- **Connection Pooling**: MongoDB connection pooling for better performance

## 🔒 Security Features

- **Helmet.js**: Secure HTTP headers
- **CORS**: Configurable CORS policies
- **Input Validation**: Express-validator for all inputs
- **XSS Protection**: Input sanitization
- **Rate Limiting**: Prevent brute force attacks
- **JWT Authentication**: Optional JWT implementation
- **Environment Variables**: All sensitive data in .env

## 📝 Assumptions & Considerations

1. **Geospatial Data**: MongoDB Atlas with 2dsphere indexing is used for location queries
2. **ETA Calculation**: Based on average speed and remaining distance
3. **Unique Identifiers**: Each shipment has unique trackingNumber and containerId
4. **Location Format**: Coordinates are in [longitude, latitude] format
5. **Timezone**: All timestamps are in UTC
6. **Database**: MongoDB Atlas is used in production, local MongoDB for development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- MongoDB for the excellent geospatial features
- Express.js community for the robust framework
- Docker for making deployment seamless
- Render for hosting the API

---

**Built with ❤️ for the MERN Stack Tracking Assignment**