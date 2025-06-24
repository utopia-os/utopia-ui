# Utopia UI [![npm version](https://img.shields.io/npm/v/utopia-ui.svg)](https://www.npmjs.com/package/utopia-ui)  ![Build Status](https://img.shields.io/github/actions/workflow/status/utopia-os/utopia-ui/test.build.yml?branch=main) ![Test Coverage](https://utopia-os.org/utopia-map/test-coverage.svg) [![Docs Coverage](https://utopia-os.org/utopia-map/coverage.svg)](https://utopia-os.org/utopia-map/utopia-ui/coverage.svg) ![License](https://img.shields.io/github/license/utopia-os/utopia-ui)

**Reusable React Components for Building Mapping Apps for Real Life Communities**

*Real change happens in real life when we meet in person and connect as local communities manifesting their ideas with the earth. When we help each other to step out of our bubbles at home and start building common infrastructure to meet human needs in harmony with Mother Earth.*

*That is why Utopia UI exists. It is a comprehensive React component library for minimalist, fast, intuitive and mobile-first map applications, as a tool for local connection and decentralized networking. We believe in maps as the perfect link between digital tools and real life action.*

*It can work with any backend or p2p database and any kind of data structure.*

## 📋 Table of Contents

- [Mission](#mission)
- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Components](#components)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Development](#development)
- [Contributing](#contributing)
- [Support](#support)

## 🎯 Mission 

Utopia UI's mission is to provide open source building blocks to create beautiful applications with a focus on real life impact, local communities and gamification. 

The building blocks are designed to allow different networks and communities to assemble their map and app for their specific needs and purpose.

It is the base of [Utopia Map](https://github.com/utopia-os/utopia-map).

## ✨ Features

### Core Features
- **Interactive Map**: Leaflet-based mapping with customizable layers (Projects, Events, People, etc.)
- **Flexible API Interface**: Works with any backend or p2p database
- **CRUD Operations**: Create, update, delete items with full form validation
- **Authentication System**: Complete user authentication API interface
- **Profile Management**: Customizable profiles with multiple templates
- **App Shell**: Responsive navigation with sidebar and top bar

### Advanced Features
- **Permission System**: Role-based access control
- **Gaming Elements**: Quest system for user engagement
- **Rich Text Editing**: TipTap-based markdown editor
- **Image Management**: Upload, crop, and compress images
- **Tag System**: Flexible categorization and filtering
- **Responsive Design**: Mobile-first approach with PWA support

## 📦 Installation

Inside your **React** project run:

```bash
npm install utopia-ui
```


## 🚀 Getting Started

### Quick Start

```typescript
import { UtopiaMap, AppShell, AuthProvider } from 'utopia-ui'

function App() {
  return (
    <AuthProvider userApi={userApiInstance}>
      <AppShell appName="My Community Map">
        <UtopiaMap
          center={[50.6, 15.5]}
          zoom={5}
          height="100dvh"
          width="100dvw"
        >
          <Layer
            name="events"
            markerIcon={{
              image: "calendar.svg",
              size: 13,
            }}
            markerShape="square"
            markerDefaultColor="#700"
            data={events}
            menuIcon="calendar"
            menuColor="#700"
            menuText="events"
            itemType={itemTypeEvent}
          />
          <Layer
            name="places"
            markerIcon={{
              image: "point.svg",
            }}
            markerShape="circle"
            markerDefaultColor="#007"
            data={places}
            menuIcon="point"
            menuColor="#007"
            menuText="places"
            itemType={itemTypePlace}
          />
        </UtopiaMap>
      </AppShell>
    </AuthProvider>
  )
}

```

### Step-by-Step Guide

1. **Explore Examples**: Check out [`/examples`](/examples) to see complete implementations
2. **Read Documentation**: Visit [the docs](https://utopia-os.org/utopia-ui/) for detailed API reference
3. **Join Community**: Connect with us on [Telegram](https://t.me/UtopiaMap)
4. **Contribute**: See the [Contribution Guide](/CONTRIBUTING.md) for development setup

## 🧩 Components

![Utopia UI Components](Components.svg)

### Core Components

#### Map Components
- **`UtopiaMap`** - Main interactive map component
- **`Layer`** - Individual map layers with custom styling
- **`Tags`** - Tag management and filtering system
- **`Permissions`** - Access control wrapper

#### App Structure
- **`AppShell`** - Main application layout
- **`SideBar`** - Navigation sidebar
- **`Content`** - Main content area
- **`NavBar`** - Top navigation bar

#### Authentication
- **`AuthProvider`** - Authentication context
- **`LoginPage`** - User login form
- **`SignupPage`** - User registration form
- **`RequestPasswordPage`** - Password reset request
- **`SetNewPasswordPage`** - Password reset form

#### Profile System
- **`ProfileView`** - Display item profiles
- **`ProfileForm`** - Edit item profiles
- **`UserSettings`** - User account settings

#### Gaming
- **`Quests`** - Quest system component
- **`Modal`** - Gaming modal dialogs

#### Form Components
- **`TextInput`** - Text input with validation
- **`TextAreaInput`** - Multi-line text input
- **`ComboBoxInput`** - Dropdown with search
- **`RichTextEditor`** - Markdown editor
- **`Autocomplete`** - Auto-completing input

#### Templates
- **`DialogModal`** - Modal dialog wrapper
- **`CardPage`** - Card-based page layout
- **`ItemCard`** - Item display card
- **`Tabs`** - Tab navigation
- **`LoadingMapOverlay`** - Loading states

## 📚 Examples

The library includes three complete example implementations:

### 1. Basic Map (`/examples/1-basic-map`)
A minimal implementation showing how to set up a basic interactive map.

```bash
cd examples/1-basic-map
npm install
npm run dev
```

### 2. Static Layers (`/examples/2-static-layers`)
Demonstrates how to create predefined layers with custom icons and styling.

```bash
cd examples/2-static-layers
npm install
npm run dev
```

### 3. Tags (`/examples/3-tags`)
Shows the implementation of a tagging system for categorizing and filtering items.

```bash
cd examples/3-tags
npm install
npm run dev
```

## 📖 API Reference

### UtopiaMap Component

The main map component that displays items across different layers.

#### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `height` | `string` | - | No | Height of the map container |
| `width` | `string` | - | No | Width of the map container |
| `center` | `[number, number]` | - | No | Initial map center position |
| `zoom` | `number` | - | No | Initial zoom level |
| `tags` | `Tag[]` | - | No | Array of tags to display |
| `geo` | `GeoJsonObject` | - | No | GeoJSON object for map data |
| `showFilterControl` | `boolean` | `false` | No | Show filter control |
| `showLayerControl` | `boolean` | `false` | No | Show layer control |
| `showGratitudeControl` | `boolean` | `false` | No | Show gratitude control |
| `showThemeControl` | `boolean` | `false` | No | Show theme control |
| `showZoomControl` | `boolean` | `false` | No | Show zoom control |
| `infoText` | `string` | - | No | Additional information text |
| `donationWidget` | `boolean` | `false` | No | Show donation widget |
| `defaultTheme` | `string` | - | No | Default theme for the map |
| `expandLayerControl` | `boolean` | `false` | No | Expand layer control by default |

#### Layer Props

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `name` | `string` | `'places'` | No | Layer name |
| `menuIcon` | `string` | `'MapPinIcon'` | No | Menu icon |
| `menuText` | `string` | `'add new place'` | No | Menu text |
| `menuColor` | `string` | `'#2E7D32'` | No | Menu color |
| `markerIcon` | `object` | - | No | Custom marker icon configuration |
| `markerShape` | `'circle'` \| `'square'` | `'circle'` | No | Shape of the marker |
| `markerDefaultColor` | `string` | `'#777'` | No | Default marker color |
| `markerDefaultColor2` | `string` | `'RGBA(35, 31, 32, 0.2)'` | No | Secondary marker color |
| `api` | `ItemsApi` | - | No | API for layer items |
| `itemType` | `string` | - | No | Type of items in the layer |
| `userProfileLayer` | `boolean` | `false` | No | Is this a user profile layer |
| `customEditLink` | `string` | - | No | Custom edit link |
| `customEditParameter` | `string` | - | No | Custom edit parameter |
| `public_edit_items` | `boolean` | - | No | Allow public item editing |
| `listed` | `boolean` | `true` | No | Show layer in layer list |

### API Interfaces

#### ItemsApi Interface
```typescript
interface ItemsApi<T> {
  getItems(filter?: Filter): Promise<T[]>
  getItem(id: string): Promise<T>
  createItem(item: Partial<T>): Promise<T>
  updateItem(id: string, item: Partial<T>): Promise<T>
  deleteItem(id: string): Promise<void>
}
```

#### UserApi Interface
```typescript
interface UserApi {
  login(email: string, password: string): Promise<User>
  logout(): Promise<void>
  getCurrentUser(): Promise<User | null>
  register(userData: RegisterData): Promise<User>
  requestPasswordReset(email: string): Promise<void>
  resetPassword(token: string, password: string): Promise<void>
}
```

## 🤝 Contributing

We welcome contributions! This library is in active development and we're looking for:

- **Web Developers** - React/TypeScript expertise
- **UX Designers** - Mobile-first design patterns
- **Community Managers** - Documentation and community building
- **Visionaries** - Product direction and strategy
- **Artists** - Icons, illustrations, and visual design

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run the test suite**: `npm run test:unit && npm run test:component`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write tests for new components
- Update documentation for API changes
- Use conventional commit messages
- Ensure accessibility compliance

See our [Contribution Guide](/CONTRIBUTING.md) for detailed setup instructions.

## 🌍 Community

*This Library is in alpha stage. You are very welcome to participate in the development*

Join our community and help shape the future of real-life networking apps:

- **Telegram**: [https://t.me/UtopiaMap](https://t.me/UtopiaMap)
- **GitHub Discussions**: Share ideas and ask questions
- **OpenCollective**: Support the project financially

## 💚 Support

We are building Utopia UI as a free and open-source tool. To keep this project sustainable and accessible, we need your support:

### Financial Support

<a href="https://opencollective.com/utopia-project">
    <img width="300" src="https://opencollective.com/utopia-project/donate/button@2x.png?color=blue" />
</a>

### Other Ways to Support

- ⭐ Star the repository
- 🐛 Report bugs and issues
- 📝 Improve documentation
- 🔗 Share the project with others
- 💡 Contribute ideas and feedback

## 📄 License

This project is licensed under GPL-3.0-only. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **BrowserStack** - Cross-browser testing platform
- **OpenCollective** - Transparent funding platform
- **All Contributors** - Everyone who has contributed to this project

---

*Built with ❤️ for real-life communities around the world*

This project is tested with BrowserStack
