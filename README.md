# BookWise - University Library Management System

BookWise is a comprehensive digital library management solution designed specifically for universities. It provides a modern, user-friendly platform for students to discover, borrow, and manage books while offering administrators powerful tools for library operations.

## 🎯 Project Overview

BookWise transforms traditional library operations into a seamless digital experience, featuring AI-powered book recommendations, real-time availability tracking, and comprehensive administrative controls. The system supports the complete book borrowing lifecycle from discovery to return.

## ✨ Key Features

### 🔐 Authentication & User Management

- **Multi-role Authentication**: Secure login system with USER and ADMIN roles
- **University Integration**: University ID-based registration with card verification
- **Account Approval System**: Admin-controlled user approval workflow
- **Session Management**: Secure session handling with NextAuth.js

### 📚 Book Discovery & Management

- **Smart Search**: Advanced search functionality with filters and pagination
- **AI-Powered Recommendations**: Personalized book suggestions using Google's text embedding models
- **Book Categorization**: Genre-based organization and filtering
- **Visual Book Display**: Dynamic book covers with color-coded themes
- **Book Details**: Comprehensive information including ratings, availability, and multimedia content

### 🎯 Borrowing System

- **Real-time Availability**: Live tracking of book availability and copies
- **Borrowing Workflow**: Streamlined book borrowing with eligibility checks
- **Due Date Management**: 7-day borrowing period with automatic due date calculation
- **Return Tracking**: Status monitoring (BORROWED, RETURNED, LATE RETURN)
- **Receipt Generation**: PDF receipt generation for borrowed books
- **Overdue Management**: Automatic overdue detection and notifications

### 👤 User Experience

- **Personal Dashboard**: User profile with borrowing history and activity tracking
- **Borrowed Books Management**: Visual carousel of currently borrowed books
- **Rating System**: 5-star rating system for books
- **Bookmark Feature**: Save favorite books for later
- **Responsive Design**: Mobile-first responsive interface
- **Dark Theme**: Modern dark UI with custom color schemes

### ⚡ AI & Recommendation Engine

- **Vector Embeddings**: Google Text Embedding Model for semantic book similarity
- **Collaborative Filtering**: User behavior-based recommendations powered by Alternating Least Squares (ALS) algorithm
- **Real-time Data Streaming**: Redis Streams for live user interaction processing
- **Similar Books**: AI-powered book suggestions based on content similarity
- **User Interaction Tracking**: Activity monitoring for improved recommendations
- **Microservice Architecture**: Separate Python FastAPI service for ML model training and inference

## 🤖 Recommendation Microservice

BookWise features a dedicated Python-based recommendation service that handles machine learning operations and collaborative filtering. This microservice is designed to run independently and can be deployed on platforms like Hugging Face Spaces.

### Key Features

- **Collaborative Filtering**: Uses Implicit ALS (Alternating Least Squares) algorithm for matrix factorization
- **Real-time Processing**: Consumes user interactions via Redis Streams
- **Weighted Interactions**: Different interaction types have varying weights:
  - VIEW: 1 point
  - RATE: 2 × rating value
  - FAVORITE: 3 points
  - BORROW: 4 points
- **Batch Training**: On-demand model retraining via secure API endpoint
- **Scalable Architecture**: Containerized deployment with Docker

### Technical Stack

- **FastAPI**: High-performance web framework for the API
- **Implicit**: Matrix factorization library for collaborative filtering
- **Pandas & SciPy**: Data processing and sparse matrix operations
- **Redis**: Real-time data streaming and caching
- **Supabase**: Database integration for storing recommendations
- **Docker**: Containerized deployment

### Service Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App  │───▶│  Redis Streams   │───▶│ Python Service  │
│                 │    │                  │    │                 │
│ User Actions    │    │ Real-time Queue  │    │ ML Processing   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │   Supabase DB   │
                                               │                 │
                                               │ Recommendations │
                                               └─────────────────┘
```

### API Endpoints

- **GET /**: Health check endpoint
- **POST /train**: Secure model training endpoint (requires Bearer token authentication)

### Data Flow

1. **User Interaction Capture**: Main app captures user actions (views, ratings, borrows, favorites)
2. **Stream Publishing**: Interactions are published to Redis Streams in real-time
3. **Stream Consumption**: Python service consumes interactions and stores them in Supabase
4. **Model Training**: Periodic or on-demand training of the ALS model using interaction data
5. **Recommendation Generation**: Model generates personalized recommendations for each user
6. **Storage**: Recommendations are stored in the `user_cf_recs` table
7. **Retrieval**: Main app fetches recommendations for display to users

### Deployment Options

#### Hugging Face Spaces (Recommended)

```bash
# Deploy directly to Hugging Face Spaces
# Files needed: main.py, requirements.txt, Dockerfile, .env
```

#### Local Development

```bash
# Navigate to recommendation service directory
cd bookwise-recommender/bookwise

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your credentials

# Run the service
uvicorn main:app --host 0.0.0.0 --port 7860
```

#### Docker Deployment

```bash
# Build the container
docker build -t bookwise-recommender .

# Run the container
docker run -p 7860:7860 --env-file .env bookwise-recommender
```

### Environment Variables (Recommendation Service)

```env
# Supabase Configuration
SUPABASE_URL="your-supabase-url"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Upstash Redis
UPSTASH_REDIS_URL="your-redis-url"

# QStash (for webhook workflows)
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="your-qstash-token"
QSTASH_CURRENT_SIGNING_KEY="your-current-signing-key"
QSTASH_NEXT_SIGNING_KEY="your-next-signing-key"

# Security
TRAINING_AUTH_TOKEN="your-secure-training-token"
```

### Model Training

The recommendation model can be trained on-demand by making a secure POST request:

```bash
curl -X POST "https://your-service-url/train" \
  -H "Authorization: Bearer YOUR_TRAINING_AUTH_TOKEN"
```

### Performance Considerations

- **Matrix Factorization**: Uses 50 factors with 15 iterations for optimal balance of accuracy and speed
- **Batch Processing**: Processes interactions in batches for efficiency
- **Memory Management**: Sparse matrices used to handle large user-item interaction datasets
- **Caching**: Redis caching for frequently accessed data
- **Horizontal Scaling**: Stateless service design allows for easy scaling

## 🏗️ Technical Architecture

### Frontend Stack

- **Next.js 15**: React framework with App Router and Server Components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Framer Motion**: Smooth animations and micro-interactions
- **Radix UI**: Accessible, unstyled UI components
- **React Hook Form**: Form management with validation
- **Zustand**: Lightweight state management

### Backend & Database

- **PostgreSQL**: Primary database with vector extension for embeddings
- **Drizzle ORM**: Type-safe database operations
- **Neon Database**: Serverless PostgreSQL hosting
- **Redis (Upstash)**: Caching and real-time data streaming
- **Supabase**: Vector similarity search for recommendations

### Authentication & Security

- **NextAuth.js**: Complete authentication solution
- **bcrypt**: Password hashing and security
- **Rate Limiting**: Upstash-based request rate limiting
- **CSRF Protection**: Built-in security measures

### AI & Machine Learning

- **Google AI SDK**: Text embedding generation
- **Vector Database**: pgvector for similarity search
- **Collaborative Filtering**: Custom recommendation algorithms

### File Management & Storage

- **ImageKit**: Image optimization and CDN
- **PDF Generation**: React-PDF for receipt generation
- **File Upload**: Secure university card upload system

### Monitoring & Analytics

- **User Activity Tracking**: Comprehensive interaction logging
- **Performance Monitoring**: Built-in analytics and reporting
- **Error Handling**: Robust error management and logging

## 📁 Project Structure

```
bookwise/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/             # Login page
│   │   └── sign-up/             # Registration page
│   ├── (root)/                   # Main application routes
│   │   ├── books/[id]/          # Individual book pages
│   │   ├── library/             # Book search and discovery
│   │   ├── my-profile/          # User dashboard
│   │   └── page.tsx             # Homepage
│   ├── admin/                    # Administrative panel
│   │   ├── books/               # Book management
│   │   ├── users/               # User management
│   │   ├── borrow-records/      # Borrowing history
│   │   └── account-requests/    # Account approvals
│   └── api/                      # API routes
│       ├── auth/                # Authentication endpoints
│       ├── embed/               # AI embedding generation
│       ├── seed/                # Database seeding
│       └── workflows/           # Background job handlers
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components (Radix + Tailwind)
│   ├── admin/                   # Admin-specific components
│   └── [feature-components]     # Feature-specific components
├── database/                     # Database configuration
│   ├── schema.ts                # Drizzle schema definitions
│   ├── drizzle.ts              # Database connection
│   └── redis.ts                # Redis configuration
├── lib/                         # Utility libraries
│   ├── actions/                 # Server actions
│   ├── admin/                   # Admin-specific utilities
│   ├── utils.ts                 # General utilities
│   └── validations.ts           # Zod validation schemas
├── store/                       # State management
├── hooks/                       # Custom React hooks
├── constants/                   # Application constants
└── types.d.ts                  # TypeScript type definitions
```

## 🎨 UI/UX Design

### Design System

- **Color Palette**: Dark theme with gold (#C8A573) accent colors
- **Typography**: IBM Plex Sans with Bebas Neue for headings
- **Icons**: Lucide React and custom SVG icons
- **Responsive Breakpoints**: Mobile-first design with custom breakpoints
- **Animations**: Smooth transitions and micro-interactions

### Component Library

- **Reusable Components**: 40+ custom components
- **Accessibility**: WCAG compliant with keyboard navigation
- **Loading States**: Skeleton loaders for all async content
- **Error Handling**: User-friendly error messages and fallbacks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (Neon recommended)
- Redis instance (Upstash recommended)
- ImageKit account for image management
- Google AI API key for embeddings

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host/database"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your-public-key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="your-url-endpoint"
IMAGEKIT_PRIVATE_KEY="your-private-key"

# Upstash Redis
UPSTASH_REDIS_URL="your-redis-url"
UPSTASH_REDIS_TOKEN="your-redis-token"
QSTASH_URL="your-qstash-url"
QSTASH_TOKEN="your-qstash-token"

# Google AI
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-key"

# Supabase (for vector search)
SUPABASE_URL="your-supabase-url"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (Resend)
RESEND_TOKEN="your-resend-token"
```

### Installation & Setup

1. **Clone the repository**:

```bash
git clone <repository-url>
cd bookwise
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up the database**:

```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:migrate

# Optional: Open Drizzle Studio
npm run db:studio
```

4. **Seed the database**:

```bash
npm run seed
# or use the API endpoint
curl http://localhost:3000/api/seed
```

5. **Generate book embeddings**:

```bash
curl http://localhost:3000/api/embed
```

6. **Start the development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

### Core Tables

- **users**: User accounts with university verification
- **books**: Book inventory with metadata and availability
- **borrow_records**: Borrowing transactions and history
- **book_embeddings**: AI-generated vector embeddings for recommendations
- **interactions**: User activity tracking for personalization
- **user_cf_recs**: Collaborative filtering recommendations

### Key Relationships

- Users can borrow multiple books (one-to-many)
- Books can be borrowed by multiple users over time
- Each book has vector embeddings for similarity search
- User interactions feed the recommendation engine

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Apply database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:push` - Push schema changes to database
- `npm run db:pull` - Pull schema from database

## 🧪 Testing & Quality Assurance

### Code Quality

- **TypeScript**: Full type coverage for enhanced reliability
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automated code formatting
- **Error Boundaries**: Graceful error handling throughout the app

### Performance Optimization

- **Server Components**: Optimized rendering with React Server Components
- **Image Optimization**: Next.js Image component with ImageKit CDN
- **Code Splitting**: Automatic code splitting for optimal loading
- **Caching**: Redis-based caching for improved performance

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm run start`
3. Ensure all environment variables are configured

## 🤝 Contributing

This is a comprehensive library management system built for educational purposes. The codebase demonstrates modern web development practices and can serve as a reference for similar projects.

### Development Guidelines

- Follow TypeScript best practices
- Use Server Components where possible
- Implement proper error handling
- Write descriptive commit messages
- Test features thoroughly before deployment

## 📄 License

This project is built for educational and demonstration purposes. Please ensure you have proper licenses for all third-party services used in production.

## 🙏 Acknowledgments

- **Next.js Team** for the excellent React framework
- **Vercel** for deployment and hosting solutions
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Google AI** for powerful embedding models
- **Upstash** for serverless Redis and workflow automation

---

**BookWise** - Transforming university library management through modern technology and intelligent automation.
