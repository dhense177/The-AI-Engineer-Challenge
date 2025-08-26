# 🚀 AI Chat Assistant Frontend

A beautiful, modern chat interface for your AI application built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Beautiful Design**: Modern gradient UI with glassmorphism effects
- 💬 **Real-time Chat**: Streaming responses from OpenAI's GPT models
- 🔐 **Secure API Key Input**: Password-style input for sensitive data
- ⚙️ **Configurable System Messages**: Customize AI behavior on the fly
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 🚀 **Fast Performance**: Built with Next.js 14 and optimized for speed
- 🌈 **Dark Theme**: Easy on the eyes with beautiful color schemes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend Integration**: FastAPI (Python)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Your FastAPI backend running on `http://localhost:8000`
- OpenAI API key

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

Make sure your FastAPI backend is running:

```bash
cd ../api
pip install -r requirements.txt
python app.py
```

Your backend should be accessible at `http://localhost:8000`.

## 🎯 Usage

1. **Configure API Key**: Enter your OpenAI API key in the settings panel
2. **Set System Message**: Define how the AI should behave (optional)
3. **Start Chatting**: Type your message and press Enter or click Send
4. **Enjoy**: Watch as the AI responds in real-time with streaming text!

## 🎨 Customization

### Colors and Themes

The app uses a beautiful gradient theme that can be easily customized in the CSS. The main colors are:

- **Primary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Background**: Dark slate with purple accents
- **Glass Effect**: Semi-transparent white overlays

### Styling

All styling is done with Tailwind CSS classes. You can modify the appearance by:

- Updating color classes in the components
- Adjusting the glassmorphism effects
- Changing the gradient directions

## 🔧 Development

### Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main chat interface
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/            # Reusable components (future)
└── lib/                  # Utility functions (future)
```

### Key Components

- **ChatPage**: Main chat interface with state management
- **Message Interface**: Handles user and AI messages
- **Settings Panel**: API key and system message configuration
- **Streaming Response**: Real-time AI response display

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Update Backend URL**: Remember to update the API destination in `next.config.ts` for production

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Notes

- API keys are stored only in client-side state (not persisted)
- Consider implementing proper authentication for production use
- The backend handles all sensitive operations

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**: Ensure your FastAPI server is running on port 8000
2. **CORS Issues**: The backend is configured to allow all origins for development
3. **API Key Errors**: Verify your OpenAI API key is valid and has sufficient credits

### Getting Help

- Check the browser console for error messages
- Verify your backend is running and accessible
- Ensure all environment variables are set correctly

## 🤝 Contributing

Feel free to contribute to this project by:

- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📄 License

This project is part of The AI Engineer Challenge.

---

**Happy Chatting! 🎉**
