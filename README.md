# Cattle.ai - Cattle Breed Recognition Website

A React-based web application for cattle breed recognition with a modern UI built using Vite, TypeScript, and Tailwind CSS.

## 📁 Project Structure

- `001/` - Main application directory
  - `client/` - React frontend application
  - `server/` - Express.js backend server
  - `attached_assets/` - Images and other assets

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI primitives
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Icons**: Lucide React

## 🏗️ Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

1. Clone the repository
```bash
git clone https://github.com/[your-username]/Meowiger.git
cd Meowiger
```

2. Install dependencies
```bash
cd 001
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
cd 001
npm run build
```

The built files will be in `001/dist/public/`.

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. The website will be available at `https://[your-username].github.io/Meowiger/`

### Manual Deployment Setup

If you need to set up GitHub Pages manually:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "GitHub Actions" as the source
4. The deployment workflow is already configured in `.github/workflows/deploy.yml`

## 📱 Features

- Responsive design for all devices
- Modern UI with Tailwind CSS
- Cattle breed recognition functionality
- About and contact pages
- Team information display

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build process
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
