# El-Mirabel Bar & Lounge - Wine E-commerce Website

A modern React-based e-commerce website for El-Mirabel Bar & Lounge, featuring a premium wine catalog, shopping cart functionality, event reservations, and more.

## 🍷 Features

- **Wine Catalog**: Browse and search through premium wine collection
- **Shopping Cart**: Add items, manage quantities, and checkout
- **Product Details**: Detailed product pages with images and descriptions
- **Event Reservations**: Contact form for booking events
- **Events Gallery**: View upcoming and past events
- **Responsive Design**: Mobile-friendly interface
- **Price Filtering**: Filter wines by price range
- **Search Functionality**: Search wines by name

## 🚀 Live Demo

Visit the live website: [El-Mirabel Bar & Lounge](https://ayobamshy.github.io/react-elmirabel)

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Professional animations
- **Local Storage** - Cart persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayobamshy/react-elmirabel.git
   cd react-elmirabel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

## 🚀 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push to GitHub**: The website automatically deploys when you push to the `main` branch
2. **GitHub Actions**: The workflow will build and deploy to GitHub Pages
3. **Settings**: Ensure GitHub Pages is enabled in your repository settings

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 📁 Project Structure

```
react-elmirabel/
├── public/
│   └── images/          # Product and website images
├── src/
│   ├── components/      # React components
│   ├── data/           # Static data (catalog)
│   ├── App.jsx         # Main app component
│   └── main.jsx        # App entry point
├── package.json         # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## 🎨 Customization

### Adding New Wines

Edit `src/data/catalog.js` to add new wine products:

```javascript
{
  id: 7,
  image: '/images/catalog/new-wine.avif',
  name: 'New Wine Name',
  price: 85000
}
```

### Styling

The project uses Tailwind CSS. Modify `src/index.css` for custom styles.

## 🔧 Configuration

### GitHub Pages Setup

1. Update the `homepage` field in `package.json` with your GitHub username
2. Ensure the repository is public
3. Enable GitHub Pages in repository settings

### Environment Variables

Create a `.env` file for environment-specific configurations:

```env
VITE_APP_TITLE=El-Mirabel Bar & Lounge
VITE_APP_DESCRIPTION=Premium wine collection and events
```

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🐛 Troubleshooting

### Common Issues

1. **Build fails**: Ensure all dependencies are installed
2. **Images not loading**: Check image paths in `public/images/`
3. **Routing issues**: Verify `react-router-dom` is installed

### Development Tips

- Use `npm run dev` for development
- Use `npm run preview` to test production build locally
- Check browser console for errors

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

For questions or support, please contact El-Mirabel Bar & Lounge.

---

**Built with ❤️ for El-Mirabel Bar & Lounge**
