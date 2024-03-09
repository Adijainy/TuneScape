# TUNESCAPE

## Overview

Tunescape is a music streaming application designed to bring people together through synchronized listening experiences. Whether you want to create a private space for you and your friends or join a public lobby to discover new music with like-minded individuals, Tunescape offers a seamless platform for communal listening.

## Features

- #### **Anonymous Login**

  Tunescape allows users to log in anonymously, ensuring privacy while still enabling participation in the listening experience.

- #### **Create Private or Public Lobby**

  Users have the option to create their own private lobbies for exclusive listening sessions with friends or colleagues. Alternatively, they can explore public lobbies to join larger communities of music enthusiasts.

- #### **Join Private Lobby with Lobby Code**

  To join a private lobby, users simply need to enter the lobby code provided by the host. This ensures that only invited individuals can access the private listening session.

- #### **Explore and Join Public Lobbies**

  Users can browse through a list of public lobbies and join any that pique their interest. This feature encourages social interaction and the discovery of new music among a wider audience.

- #### **Synchronized Listening**

  All users within a lobby experience synchronized playback of the selected songs, creating a shared listening experience regardless of geographical location.

- #### **Leader Controls**

  The host of the lobby, known as the leader, has exclusive control over the music queue and playback. They can add songs to the queue, skip to the next or previous track, and play/pause the music for all participants.

- #### **Listener Mode**
  Participants in the lobby who are not designated as leaders have limited control and can only tune in to the synchronized music playback. This ensures a cohesive listening experience without the risk of interference from multiple users.

## Installation Instructions

### Prerequisites

Before installing the application, ensure you have the following tools installed:

- Node.js and npm (or yarn)

### Installation Steps

1. **Fork the repository:**
   Navigate to the project repository on GitHub at [TuneScape](https://github.com/Adijainy/TuneScape) and click the "Fork" button. This will create a copy of the repository in your own GitHub account.

2. **Clone the repository locally:**
   Open your terminal and navigate to the directory where you want to work on the project. Then, use the `git clone` command to clone your forked repository, replacing `<your-username>` with your actual GitHub username:

   ```bash
   git clone https://github.com/<your-username>/TuneScape.git
   ```

3. **Install dependencies:**
   Navigate into the project directory:

   ```bash
   cd TuneScape
   ```

   Install dependencies for both the client and server applications:

   ```bash
   npm install
   ```

4. **Main Folder Environment Setup:**
   In the main folder, create a .env file and add the following variables:

   ```plaintext
   VITE_RAPID_API_KEY={your_own_api_key}
   VITE_RAPID_API_HOST={the_rapid_api_host}
   VITE_BASE_URL={backend_url}
   ```

5. **Server Folder Environment Setup:**
   In the server folder, create a .env file and add the following variables:

   ```plaintext
   PORT={port_number}
   DATABASE_URL={mongodb_url}
   ```

6. **Start the application:**

   - **Client Application:**
     Start the development server:

     ```bash
     npm run dev
     ```

   - **Server Application:**
     Navigate to the server directory:

     ```bash
     cd server
     ```

     Start the server:

     ```bash
     npm run dev
     ```

**Additional Notes:**

- For production deployment, additional configuration steps might be necessary depending on your chosen hosting environment.
- Ensure you replace `<your-username>` in the clone command with your actual GitHub username.

Following these steps should successfully set up your local development environment for the TuneScape application.

## Additional Dependencies or Libraries Used

By running `npm install` in both the `main` and `server` directories, you can automatically install the following additional dependencies:

**Client-Side:**

- `axios`
- `react-hook-form`
- `react-icons`
- `react-router-dom`
- `react-hot-toast`
- `react-redux`
- `redux-toolkit`
- `socket.io-client`

**Server-Side:**

- `cors`
- `dotenv`
- `express`
- `mongoose`
- `nodemon`
- `socket.io`
