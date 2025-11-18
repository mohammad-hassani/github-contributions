# 🎯 GitHub Contributions Tracker

<div align="center">

![GitHub Contributions](https://img.shields.io/badge/GitHub-Contributions-green?style=for-the-badge&logo=github)
![Electron](https://img.shields.io/badge/Electron-33.0.0-blue?style=for-the-badge&logo=electron)
![License](https://img.shields.io/badge/License-ISC-purple?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Linux-orange?style=for-the-badge)

*A minimal, beautiful desktop app to track your GitHub contributions in real-time*

[![Download](https://img.shields.io/badge/Download-Now-brightgreen?style=for-the-badge)](https://github.com/mohammad-hassani/github-contributions/releases)

</div>

## ✨ Features

- 🎨 **Beautiful Visual Display** - GitHub-style contribution graph right on your desktop
- 🌙 **Dark/Light Themes** - Switch between themes to match your preference
- 🔧 **Minimal Configuration** - Just add your GitHub username and token
- 📱 **Always Accessible** - System tray integration for quick access
- 🖱️ **Draggable Window** - Position it anywhere on your screen
- 💾 **Persistent Settings** - Your preferences are saved automatically
- 🌐 **Offline Detection** - Smart handling of online/offline states
- 🔄 **Real-time Updates** - Fetches the latest contribution data

## 🚀 Quick Start

### Installation

#### Download Pre-built Binaries

1. Go to the [Releases](https://github.com/mohammad-hassani/github-contributions/releases) page
2. Download the appropriate version for your system:
   - **Linux**: `.deb` or `.AppImage`

#### Build from Source

```bash
# Clone the repository
git clone https://github.com/mohammad-hassani/github-contributions.git
cd github-contributions

# Install dependencies
npm install

# Run the application
npm start
```

### Initial Setup

1. **Right-click** on the app window and select **"Settings"**
2. Enter your **GitHub username**
3. Create a **GitHub Personal Access Token**:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - No scopes needed - just create a simple token
   - Copy and paste the token into the app
4. Choose your preferred **theme** (Light/Dark)
5. Click **Save**

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/mohammad-hassani/github-contributions/raw/main/icon.png" alt="App Icon" width="120">
</div>

*The app displays your contribution graph in a compact, draggable window.*

## 🎮 Usage

### Basic Controls

- **Right-click** anywhere on the app to open the context menu
- **Left-click and drag** to move the window around
- **System tray icon** - Click to show/hide the app
- **Settings panel** - Configure username, token, and theme

### Context Menu Options

- **Open** - Show and focus the app window
- **Settings** - Open the configuration panel
- **Close** - Exit the application

## 🛠️ Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/mohammad-hassani/github-contributions.git
cd github-contributions

# Install dependencies
npm install

# Run in development mode
npm start
```

### Building for Distribution

```bash
# Build for Linux
npm run build

# Build specific formats
npm run build:deb        # Linux .deb package
npm run build:appimage   # Linux .AppImage
npm run release          # Build and publish to GitHub
```

### Project Structure

```
github-contributions/
├── main.js              # Electron main process
├── renderer.js          # Frontend logic and API calls
├── index.html           # UI structure and styling
├── icon.png             # Application icon
├── package.json         # Dependencies and build config
└── README.md           # This file
```

## 🔧 Configuration

### GitHub Token Setup

The app requires a GitHub Personal Access Token for API access:

1. Visit [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Contributions Tracker")
4. **No scopes required** - the app only needs public access
5. Click "Generate token"
6. Copy the token and paste it in the app settings

### Settings Storage

- Settings are stored locally using `localStorage`
- Window position and size are automatically saved
- All data remains on your local machine

## 🐛 Troubleshooting

### Common Issues

**Q: App shows "No contribution data found"**
- Verify your GitHub username is correct
- Ensure your token is valid and not expired
- Check your internet connection

**Q: App window disappears**
- Check the system tray for the app icon
- Right-click the tray icon and select "Open"

**Q: Token authentication fails**
- Generate a new token from GitHub settings
- Ensure no extra spaces when pasting the token
- Verify the token hasn't expired

**Q: App won't start**
- Try running with `--no-sandbox` flag: `electron . --no-sandbox`
- Ensure you have proper display server permissions (Linux)
- Check that Node.js and Electron dependencies are properly installed

### Debug Mode

To enable debug logging:
1. Open developer tools with `F12` (if enabled)
2. Check the browser console for API responses and errors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Open a Pull Request

### Areas for Improvement

- [ ] Add contribution streak counter
- [ ] Support for multiple GitHub accounts
- [ ] Customizable color themes
- [ ] Export contribution data
- [ ] Notification for new contributions
- [ ] Integration with GitHub Actions

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Electron](https://electronjs.org/) - Cross-platform desktop app framework
- [GitHub GraphQL API](https://docs.github.com/en/graphql) - For fetching contribution data
- The open-source community for inspiration and tools

## 📞 Support

If you encounter any issues or have suggestions:

- 🐛 [Report a bug](https://github.com/mohammad-hassani/github-contributions/issues)
- 💡 [Request a feature](https://github.com/mohammad-hassani/github-contributions/issues/new?template=feature_request.md)
- 📧 Email: hasani9821.mh@gmail.com

---

<div align="center">

**Made with ❤️ by [Mohammad Hassani](https://github.com/mohammad-hassani)**

[⭐ Star this repo](https://github.com/mohammad-hassani/github-contributions) if it helped you track your GitHub journey!

</div>