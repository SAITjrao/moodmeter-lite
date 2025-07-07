# Moodmeter Frontend

## Overview
Moodmeter is a frontend application that integrates with a backend API for sentiment analysis. Users can input text, and the application will classify the sentiment as Positive, Neutral, or Negative, providing a justification for the classification.

## Project Structure
```
moodmeter-frontend
├── public
│   └── index.html
├── src
│   ├── App.js
│   ├── api
│   │   └── sentiment.js
│   ├── components
│   │   ├── SentimentForm.js
│   │   └── SentimentResult.js
│   └── index.js
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd moodmeter-frontend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Usage
- Navigate to the application in your web browser.
- Enter text in the input form and submit it.
- The sentiment analysis result will be displayed below the form.

## API Integration
The frontend communicates with the backend API for sentiment analysis. Ensure that the backend server is running and accessible at the specified endpoint.

## License
This project is licensed under the MIT License.