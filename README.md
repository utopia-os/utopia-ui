# 🌍 Utopia Map [![](https://img.shields.io/opencollective/backers/utopia-project)](https://opencollective.com/utopia-project#section-contributors)  [![Join us on Telegram](https://img.shields.io/badge/Join-Telegram-blue?logo=telegram)](https://t.me/UtopiaMap)

The Utopia Map is a flexible collaborative app for decentralized coordination and real-life networking that can be adapted to the specific requirements of different networks. Its central element is the interactive geographical map, where users can add and manage **Items** in predefined **Layers**.

Utopia Map is made for networks and initiatives that aim to connect people in real life. By providing a custom instance of Utopia Map, each network can grow and coordinate its ecosystem effectively while encouraging real-world interactions and collaborations.

**Utopia Map** is based on our library **[Utopia UI](https://github.com/utopia-map/lib)**.

## 📋 Table of Contents

- [Key Features](#key-features)
- [Architecture](#architecture)
- [Core Concepts](#core-concepts)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment Options](#deployment-options)
- [Examples](#examples)
- [Support](#support)

## ✨ Key Features

- **Interactive Map**: The core feature is an intuitive geographical map where users can add, edit, and manage items like members, activities, and resources. Each map instance has its own identity, users, and unique configuration.
- **Customizable Layers**: Items are organized into predefined Layers, each with specific icons, colors, texts, and Map Markers. This ensures clarity and relevance for different networks.
- **Dynamic Map Markers**: Geographic positions of items are indicated on the map by adaptive and customizable Map Markers
- **Popups**: Clicking a Map Marker reveals a Popup — a compact preview of the Item with its most relevant information. Define custom Popups for each of your Layers.
- **Profiles**: Each Item has a dedicated Profile that showcases all its associated data, making it easier to explore and manage. Define custom profiles for each of your Layers.
- **Authentication System**: Built-in user authentication with login, signup, and password reset functionality
- **Permission Management**: Role-based access control for different user types
- **Gaming Elements**: Quest system for gamification and user engagement

## 🏗️ Architecture

Utopia Map consists of three main parts:

### 1. Frontend Application (`/frontend`)
A React-based single-page application that provides the user interface for the map and all its features.

### 2. Component Library (`/lib` - published as `utopia-ui`)
A reusable React component library (v3.0.106) that contains all the UI components needed to build mapping applications.

### 3. Backend (`/backend`)
A Directus-powered backend that handles data management, user authentication, and API services.

## 🔑 Core Concepts

- **Maps**: Each instance can have its own identity, users, and unique configuration
- **Items**: Geographic entities added to the map (members, activities, resources)
- **Layers**: Predefined categories for organizing items with specific icons, colors, and markers
- **Popups**: Compact previews shown when clicking map markers
- **Profiles**: Detailed views for each item with customizable templates
- **Tags**: Flexible categorization system for items
- **Permissions**: Fine-grained role-based access control
- **Attestations**: Verification system for items and users

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** & **DaisyUI** for styling
- **React Router** for navigation
- **@directus/sdk** for backend communication
- **Leaflet** for map functionality


### Component Library (Utopia UI)
- **Rollup** for building
- **TypeScript** for type safety
- **Vitest** for unit testing
- **Cypress** for component testing
- **TypeDoc** for documentation

### Backend
- **Directus CMS**
- **Docker**
- **GraphQL** & **REST API**

## 🚀 Getting Started

### Prerequisites
- Node.js (see `.tool-versions` for specific version)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/utopia-os/utopia-map.git
cd utopia-map
```

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

#### Component Library Development
```bash
cd lib
npm install
npm run start  # Watch mode
npm run build  # Production build
```

#### Backend Setup
```bash
cd backend
docker-compose up
```

## Get your Map! 🌱 🌍

Start mapping and growing your community ecosystem together with your custom map.

[Join us on Telegram](https://t.me/UtopiaMap)

## Support Utopia Map 💚

We are building Utopia Map as an free and opensource tool. To keep this project sustainable and accessible, we need financial support as well as Developrs, UX Designer, Community Managers and Content Creators.

[Join us on Telegram](https://t.me/UtopiaMap) and support us on [OpenCollective](https://opencollective.com/utopia-project)

<a href="https://opencollective.com/utopia-project">
    <img width="250" src="https://opencollective.com/utopia-project/donate/button@2x.png?color=blue" style="margin-bottom:20px;" />
</a>


