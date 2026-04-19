# MY WEB - LinkBot Pairing Website

This is the pairing website for the MY WEB - LinkBot WhatsApp bot. Users can visit this website to request pairing with the bot.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🤖 Easy-to-use pairing form
- 💾 Data storage and logging
- 🔐 Secure form validation
- 📊 Feature showcase

## Files

- **index.html** - Main website page with pairing form
- **style.css** - Styling and responsive design
- **script.js** - Form handling and validation
- **server.js** - Optional Node.js backend (for storing pairing requests)

## Installation & Usage

### Option 1: Static Hosting (Simplest)
Just upload these files to any static hosting service:
- Netlify (free)
- Vercel (free)
- GitHub Pages (free)
- Any web hosting service

Simply drag and drop the files or push to your repository.

### Option 2: Node.js Server

#### Prerequisites
- Node.js 14+ installed
- npm or yarn

#### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
PORT=3000
BOT_OWNER_NAME=SiyamThanda
BOT_OWNER_NUMBER=+27765160521
BOT_OWNER_EMAIL=sillindelwasimelane@gmail.com
```

3. Start the server:
```bash
npm start
```

4. Open your browser and go to `http://localhost:3000`

## Form Fields

The pairing form collects:
- **Name** (Required) - User's full name
- **WhatsApp Number** (Required) - User's WhatsApp number (without country code)
- **Email** (Optional) - User's email for communication
- **Message** (Optional) - Additional information or feature requests

## Bot Owner Information

- **Name:** SiyamThanda
- **Email:** sillindelwasimelane@gmail.com
- **WhatsApp:** +27765160521
- **WhatsApp Channel:** https://whatsapp.com/channel/0029Vb7bGEQIHphDP72VD81b

## How It Works

1. Users visit the website
2. They fill in the pairing form with their details
3. The form stores the data (locally or on server)
4. The bot owner receives the pairing request
5. Bot owner contacts the user to complete pairing
6. User pairs their WhatsApp with the bot

## Data Storage

- **Local Storage:** Form data is stored in browser's localStorage as backup
- **Server Storage:** If using Node.js server, data is stored in memory (can be extended to database)

## Customization

To customize the website with your information:

1. Edit **index.html**:
   - Change owner information in the "Owner Info" section
   - Update WhatsApp channel link
   - Update email address

2. Edit **style.css**:
   - Change color scheme by modifying CSS variables in `:root`
   - Adjust fonts and sizes
   - Customize animations

3. Edit **script.js**:
   - Modify validation logic
   - Change form handling behavior
   - Add additional API integrations

## Deploying to GitHub Pages

1. Create a new repository named `MY-WEB-LinkBot-Website`

2. Clone the repo and copy website files:
```bash
git clone https://github.com/yourusername/MY-WEB-LinkBot-Website.git
cd MY-WEB-LinkBot-Website
cp -r website/* .
```

3. Push to GitHub:
```bash
git add .
git commit -m "Initial commit: LinkBot pairing website"
git push -u origin main
```

4. Enable GitHub Pages:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and save
   - Your site will be published at `https://yourusername.github.io/MY-WEB-LinkBot-Website`

## Deploying to Netlify

1. Login to Netlify (or create free account)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `./website` or leave as `./`
5. Click Deploy

## Deploying to Vercel

1. Login to Vercel (or create free account)
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Vercel will auto-detect static files
6. Click Deploy

## Bot Features Mentioned on Website

The website showcases these LinkBot features:
- 🤖 **AI Powered** - GPT and Gemini integration
- 👁️ **View Once Media** - Recover view-once photos, videos, and voice notes
- ⚙️ **Advanced Commands** - Group management, stickers, translation, and more
- 🔒 **Secure & Private** - No data harvesting

## Support

For issues or questions:
- Email: sillindelwasimelane@gmail.com
- WhatsApp: +27765160521
- WhatsApp Channel: https://whatsapp.com/channel/0029Vb7bGEQIHphDP72VD81b

## License

© 2026 MY WEB - LinkBot. All rights reserved.

---

**Version:** 1.0.0  
**Last Updated:** 2026-04-19  
**Bot Owner:** SiyamThanda
