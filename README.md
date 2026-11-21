# StreamHub – Video Streaming Platform

A beginner-friendly full-stack starter project for VS Code.

## Stack
- React + Vite frontend
- Java 17+ / Spring Boot backend
- H2 embedded database by default (no database installation required)
- Optional MySQL configuration
- REST API

## Requirements
1. VS Code
2. Node.js LTS (20 or newer recommended)
3. JDK 17 or newer
4. Internet connection for the first dependency installation

Check installations in the VS Code terminal:
```powershell
node -v
npm -v
java -version
```

## Run locally (two VS Code terminals)

### Terminal 1 – backend
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
Backend: http://localhost:8080
API: http://localhost:8080/api/movies

If the Maven wrapper is not present or fails, install Maven and run:
```powershell
mvn spring-boot:run
```

### Terminal 2 – frontend
```powershell
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite, normally http://localhost:5173.

## MySQL (optional)
The app uses H2 by default so you can start without installing MySQL.
To switch to MySQL:
1. Install and start MySQL Server.
2. Create a database named `streamhub`.
3. Edit `backend/src/main/resources/application-mysql.properties` with your MySQL username/password.
4. Run backend with:
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=mysql"
```

## Features in this starter
- Browse a movie catalogue
- Search titles
- Filter by category
- View details and play demo videos
- Add/remove items from a browser-local watchlist
- Responsive layout

Demo video URLs are public sample streams. Replace them with videos you own or are licensed to stream.
This starter does not include production-grade authentication, subscriptions, DRM, or video hosting.

## Deployment overview
- Frontend: Vercel (import the GitHub repository; set Root Directory to `frontend`; Build Command `npm run build`; Output Directory `dist`).
- Backend: Render using the included `backend/Dockerfile`. Create a new Web Service, connect the GitHub repo, choose Docker, and set the Dockerfile path to `backend/Dockerfile`.
- In Vercel, set `VITE_API_URL` to the deployed backend base URL, for example `https://your-backend.onrender.com`, then redeploy the frontend.
- For a deployed backend, configure CORS to allow your Vercel domain. Update `allowedOrigins` in `backend/src/main/java/com/streamhub/config/CorsConfig.java` and redeploy.
- H2 is suitable for a demo, not durable production storage on ephemeral hosting. For a persistent deployment, use managed MySQL and the MySQL profile.

## GitHub
Create a new GitHub repository, then from the project root:
```powershell
git init
git add .
git commit -m "Initial video streaming platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/video-streaming-platform.git
git push -u origin main
```
Never commit database passwords, API keys, or other secrets.
