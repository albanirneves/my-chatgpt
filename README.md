
# ChatGPT-Powered Interactive Chat Application

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Project Structure](#project-structure)
8. [License](#license)

---

## Introduction

This project is a web-based chat application powered by OpenAI's GPT technology. Users can interact with the chat system to receive AI-generated responses, and the application includes features for dynamic pricing based on token usage during sessions.

---

## Features

- **Interactive Chat Interface**: Users can send messages and receive AI responses in real time.
- **Session Pricing**: Calculates session costs based on input and output tokens.
- **Dynamic Styling**: Responsive and visually appealing design for enhanced user experience.
- **Custom Instructions**: Load specific instructions for the AI model from an external file (`instructions.txt`).
- **Error Handling**: Handles API and internal server errors gracefully.

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Framework for building the RESTful API.
- **OpenAI API**: Integration with OpenAI's GPT model.
- **dotenv**: Environment variable management.
- **HTML/CSS/JavaScript**: Frontend design and functionality.

---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the `.env.example` file to `.env` and configure the required variables.

4. Start the application:
   ```bash
   npm start
   ```

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Type your message in the input box and press Enter to interact with the AI.
3. Observe the session cost updates in real-time based on the token usage.

---

## Configuration

The application requires an `.env` file with the following variables:

- **OPENAI_API_KEY**: Your OpenAI API key.
- **MODEL**: The OpenAI GPT model to use (e.g., `gpt-4`).
- **TEMPERATURE**: The temperature setting for the AI responses.
- **INPUT_PRICE**: Cost per input token.
- **OUTPUT_PRICE**: Cost per output token.

---

## Project Structure

```
.
├── public              # Frontend
   ├── app.js
   ├── index.html
   ├── styles.css
├── index.js            # Main server file
├── package.json        # Node.js dependencies
├── .env                # Environment variables
└── instructions.txt    # Custom AI instructions
```

---

## Author
Albanir Neves
albanirneves.dev@gmail.com
