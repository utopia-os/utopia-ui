# Contribution Guide

## Setup Dev Environment

**Utopia UI** is just a React component library. To run it locally while making changes to it, you need to link it to a React app that uses its components. For this purpose, it is recommended to clone the `utopia-map` repository and link `utopia-ui` inside of it. This guide explains how to set everything up.

### Setup `utopia-ui`

1. **Clone the `utopia-ui` repository:**
   ```bash
   git clone https://github.com/utopia-os/utopia-ui.git
   cd utopia-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build `utopia-ui`:**
   Run the build script to prepare `utopia-ui` for use:
   ```bash
   npm run build
   ```

4. **Link `utopia-ui` globally:**
   This makes the local version of `utopia-ui` available to be linked into other projects:
   ```bash
   npm link
   ```


### 2. Setup `utopia-map` and Link `utopia-ui`

1. **Clone the `utopia-map` repository:**
   ```bash
   git clone https://github.com/utopia-os/utopia-map.git
   cd utopia-map
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link `utopia-ui` into `utopia-map`:**
   Use `npm link` to connect your local `utopia-ui` instance to `utopia-map`:
   ```bash
   npm link utopia-ui
   ```

4. **Start the development environment:**
   Run the local development environment for `utopia-map` to test changes in `utopia-ui`:
   ```bash
   npm run dev
   ```

### 3. Developing and Testing Changes

While working on `utopia-ui`, any changes you make need to be reflected in `utopia-map`. To ensure this `utopia-ui` has a watcher script, run it to 
automatically rebuild when files change:
   ```bash
   npm start
   ```


## Layout System

* use [heroicons](https://heroicons.com/) or alternatively [React Icons](https://react-icons.github.io/react-icons/)  
* use [Daisy UI](https://daisyui.com/) with [tailwindcss](https://tailwindcss.com/)
* make use of the Daisy UI [theme colors](https://daisyui.com/docs/colors/)
