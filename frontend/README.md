# 🔮 Mystical Fortune Teller Chat

A mystical, immersive chat interface where you consult with an AI fortune teller through animated fortune cookies and cosmic animations. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🍪 **Interactive Fortune Cookies**: Watch cookies crack in half with realistic jagged edges when generating responses
- 🌟 **Cosmic Background**: Dark cosmic theme with deep indigo, midnight blue, and glowing purple accents
- 📜 **Parchment-Style Messages**: User messages appear as handwritten scroll notes, AI responses on fortune paper strips
- 🎭 **Mystical Animations**: Floating crystal balls, particle effects, and smooth fade transitions
- 🔮 **Generate Fortune Button**: Get instant random fortunes without typing anything
- 🔐 **API Key Verification**: Secure verification system with timeout protection
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 🎨 **Cinzel Typography**: Elegant serif fonts for that authentic fortune teller vibe

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for complex UI animations
- **Icons**: Custom mystical imagery and Lucide React
- **Backend Integration**: FastAPI (Python) with streaming responses

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

## 🎯 How to Use

### 🔑 Getting Started
1. **Enter Your API Key**: Input your OpenAI API key in the mystical configuration panel
2. **Verify Your Key**: Click "Verify Key" to ensure your API key is valid
3. **Start Chatting**: Type your question and press Enter or click the fortune cookie button

### 🍪 Fortune Cookie Experience
- **Ask Questions**: Type your deepest questions and watch the fortune cookie crack
- **Watch the Magic**: See the cookie break with realistic jagged edges along its crease line
- **Read Your Fortune**: Watch as the AI response appears on a paper strip emerging from the cookie
- **Automatic Cleanup**: Messages fade away after responses complete, keeping the interface clean

### 🔮 Generate Fortune Button
- **Instant Fortunes**: Click the "GENERATE FORTUNE" button in the header for random wisdom
- **No Typing Required**: Get mystical insights without asking specific questions
- **Automatic Fade**: Generated fortunes automatically disappear after 8 seconds

## 🎨 Visual Design

### Color Scheme
- **Background**: Dark cosmic (deep indigo/midnight blue)
- **Primary**: Rich purple with glowing magenta and teal accents
- **Highlights**: Gold for buttons and important symbols
- **Messages**: Parchment beige with amber tones

### Typography
- **Headers**: Cinzel (elegant serif for tarot-style headers)
- **Body Text**: Inter (clean sans-serif for readability)
- **Input**: Italicized Cinzel for mystical feel

### Animations
- **Cookie Cracking**: Realistic jagged-edge breaking using CSS clip-path
- **Message Fade**: Smooth opacity transitions for all messages
- **Floating Elements**: Crystal balls and mystical particles in motion
- **Paper Unrolling**: Fortune paper strips emerging from cookies

## 🔧 Technical Features

### Message System
- **User Messages**: Purple text on parchment-style backgrounds
- **AI Responses**: Black, bold, italicized text on fortune paper strips
- **Auto-Fade**: Messages automatically disappear after responses complete
- **Scrollable Chat**: Fixed-height chat area with custom scrollbar

### API Integration
- **Streaming Responses**: Real-time text generation from OpenAI
- **Key Verification**: 5-second timeout with proper error handling
- **Error Handling**: Graceful fallbacks for API failures
- **Model Support**: Compatible with GPT-4.1-mini and other OpenAI models

### State Management
- **Message History**: Temporary storage with automatic cleanup
- **Loading States**: Visual feedback during API calls
- **Error States**: Clear error messages for failed operations
- **Animation States**: Coordinated animations for smooth UX

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

3. **Update Backend URL**: Remember to update the API destination for production

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **API Key Verification**: Validates keys before allowing chat
- **Timeout Protection**: 5-second timeout prevents hanging requests
- **Client-Side Storage**: Keys stored only in memory (not persisted)
- **Error Handling**: Graceful degradation for security issues

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Error**: Ensure your FastAPI server is running on port 8000
2. **API Key Verification Fails**: Check your OpenAI API key and internet connection
3. **Messages Not Appearing**: Verify your API key is valid and verified
4. **Animations Not Working**: Ensure JavaScript is enabled and no console errors

### Getting Help

- Check the browser console for error messages
- Verify your backend is running and accessible
- Ensure all environment variables are set correctly
- Check that your OpenAI API key has sufficient credits

## 🎭 Customization

### Animation Timing
- **Cookie Cracking**: Instant when button is pressed
- **Message Fade**: 12 seconds with 8-second delay
- **Fortune Generation**: 8-second display before fade

### Visual Elements
- **Cookie Break Angle**: Configurable in the clip-path polygons
- **Message Styling**: Parchment backgrounds with custom borders
- **Color Schemes**: Easily modifiable through Tailwind classes

## 🤝 Contributing

Feel free to contribute to this mystical project by:

- Reporting bugs in the fortune-telling system
- Suggesting new mystical features
- Improving the cookie cracking animations
- Enhancing the cosmic visual effects

## 📄 License

This project is part of The AI Engineer Challenge.

---

**May the cosmic forces guide your fortunes! 🔮✨**
