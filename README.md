# Event Management System (EventCraft)

A modern, full-featured Event Management System built with **React** and **Vite**, designed to help users plan events by connecting with premium vendors for catering, florals, decorations, and lighting services.

![EventCraft](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Demo Credentials](#demo-credentials)
- [Key Features](#key-features)
- [Design System](#design-system)
- [Contributing](#contributing)

## Features

### 🎯 Core Features
- **Multi-role Authentication** - Support for User, Vendor, and Admin roles
- **Vendor Browsing & Filtering** - Browse vendors by category (Catering, Florist, Decoration, Lighting)
- **Shopping Cart & Checkout** - Easy-to-use cart management with multi-step checkout
- **Order Management** - Track orders from received to delivery
- **Guest List Management** - Manage event attendees with RSVP tracking
- **Vendor Dashboard** - Add, edit, and manage products
- **Admin Dashboard** - User and vendor management, membership plans
- **Real-time Toast Notifications** - User feedback on actions
- **Responsive Design** - Mobile-friendly interface with beautiful dark theme

### 💼 Vendor Features
- Product/Service Management (add, edit, delete)
- View transactions and incoming orders
- Track order fulfillment status
- Custom request management

### 👥 User Features
- Browse and filter vendors by category
- Add items to cart and checkout
- Place and track orders
- Manage guest list with RSVP tracking
- Request custom items from vendors

### 🔐 Admin Features
- User account management
- Vendor account management
- Vendor membership plans and pricing
- View all platform orders
- Platform analytics

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18.2** | UI Framework |
| **Vite 4.4** | Build Tool & Dev Server |
| **CSS-in-JS** | Inline styles with design system |
| **React Hooks** | State management (useState, useContext) |
| **ES6+** | Modern JavaScript |

## Project Structure

```
ems-project/
├── src/
│   ├── EventManagementSystem.jsx    # Main App component
│   └── main.jsx                     # React entry point
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## Installation

### Prerequisites
- Node.js 14+ and npm 6+
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogendradayal/Event-Management-System.git
   cd Event-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

The app will be available at `http://localhost:5173`

### Troubleshooting

If you encounter issues during installation, try the following:
- Ensure that you have the correct Node.js version installed (Node.js 14+ recommended).
- Clear cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json` file, then reinstall dependencies.


## Usage

### Starting the App
```bash
npm run dev
```

After the development server starts, open your browser and navigate to:
```
http://localhost:5173
```

### Navigation
1. **Home Page** - Overview of the platform
2. **Login/Signup** - Choose role and authenticate
3. **Dashboard** - Access role-specific features
4. **Logout** - Exit your session

## User Roles

### 👤 User (Customer)
- Browse vendors by category
- Add items to cart
- Proceed through multi-step checkout
- Track order status
- Manage guest list with RSVP
- Request custom items

**Demo Credentials:**
- Email: `user@ems.com`
- Password: `user123`

### 🏪 Vendor
- Register and manage business profile
- Add and manage products/services with custom pricing
- View incoming orders and transactions
- Update order fulfillment status
- Respond to custom requests from users

**Demo Credentials:**
- Email: `vendor@ems.com`
- Password: `vendor123`

**Pre-loaded Vendors:**
1. Golden Fork Catering - Catering services
2. Bloom Florists - Floral arrangements
3. Glitter Decorations - Event decorations
4. Luminary Lighting - Professional lighting

### 👨‍💼 Admin
- Manage all user accounts
- Manage vendor accounts
- Create and update membership plans for vendors
- View all orders across the platform
- Monitor platform analytics

**Demo Credentials:**
- Email: `admin@ems.com`
- Password: `admin123`

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | `user@ems.com` | `user123` |
| Vendor | `vendor@ems.com` | `vendor123` |
| Admin | `admin@ems.com` | `admin123` |

## Key Features

### 🎨 UI/UX Highlights
- **Dark Theme** - Easy on the eyes with gold, blue, and green accent colors
- **Responsive Grid Layouts** - Auto-fill responsive cards
- **Smooth Animations** - Modal transitions and button hover effects
- **Progress Indicators** - Step-by-step checkout visualization
- **Custom Badges** - Status indicators with color coding
- **Real-time Feedback** - Toast notifications for user actions

### 🛒 Shopping Experience
1. **Browse** - Filter vendors by category
2. **Select** - View vendor details and products
3. **Add to Cart** - Quantity management with +/- buttons
4. **Review** - Multi-step checkout (Details → Review → Confirm)
5. **Pay** - Support for Cash and UPI payment methods
6. **Track** - Real-time order status updates

### 💰 Vendor Management
- Add custom products with emoji icons
- Set flexible pricing
- Track all transacted orders
- Manage order fulfillment workflow
- View customer requests for custom items

### 🎁 Event Planning
- Guest list management with table assignments
- RSVP tracking (Pending, Confirmed, Declined)
- Request custom items from vendors
- Centralized order tracking

## Design System

### Colors
- **Primary Accent**: `#e8b86d` (Gold)
- **Secondary Accent**: `#5b8dee` (Blue)
- **Tertiary Accent**: `#4fd1a5` (Green)
- **Danger**: `#f87171` (Red)
- **Background**: `#0a0f1e` (Dark Navy)
- **Surface**: `#111827` (Dark Gray)
- **Text**: `#e8edf5` (Light)
- **Muted**: `#6b7a99` (Gray)

### Typography
- **Display Font**: Playfair Display (serif)
- **Body Font**: DM Sans (sans-serif)

### Spacing & Layout
- **Border Radius**: 14px
- **Max Container Width**: 1100px
- **Grid Gap**: 20px
- **Responsive Breakpoint**: 640px

## Features to Extend

- [ ] Backend API integration (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Image uploads for products
- [ ] Advanced filtering and search
- [ ] Rating and reviews
- [ ] Wishlist functionality
- [ ] Bulk order management
- [ ] Analytics dashboard

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Yogendra Dayal**
- GitHub: [@yogendradayal](https://github.com/yogendradayal)

## Support
For support, issues, or suggestions, please open an issue on the GitHub repository.
---

**Built with using React & Vite**
