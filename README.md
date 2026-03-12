# Online Examination System with AI Proctoring

A sophisticated full-stack web application designed to host secure, high-integrity online exams. Features an automated "AI Proctor" that monitors student behavior in real-time and a robust backend capable of handling high-concurrency submissions.

## 🚀 Features

### 👨‍🎓 Student Portal
- **Topic Selection:** Wide range of exam topics to choose from (Aptitude, DSA, SQL, etc.).
- **Multi-Language Compiler:** Integrated code editor supporting JavaScript, Python, Java, C, and C++.
- **Interactive Interface:** Clean, distraction-free UI with live timers and navigation.
- **Global Leaderboard:** Real-time overall rankings to foster competition.
- **Analytics:** Detailed performance breakdowns.

### 🛡️ AI Proctoring System
Maintains exam integrity through a point-based violation tracking system:
- **Tab Switching & Fullscreen Exit:** Monitors and penalizes navigation away from the exam.
- **Cheating Prevention:** Restricts copy-paste and right-click actions.
- **Violation Thresholds:** Automated submission and session termination if points exceed limits.

### 🔧 Administrator Dashboard
- **Management:** CRUD operations for exams and question banks.
- **Live Monitoring:** Real-time progress tracking of all active sessions.
- **Instant Alerts:** WebSockets notifications for proctoring violations.
- **Comprehensive Reports:** Detailed student history and analytics.

---

## 🛠️ Technical Stack

- **Frontend:** React, Vite, Tailwind CSS, WebSockets (STOMP).
- **Backend:** Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security.
- **Middleware:** Redis (Caching & real-time analytics), RabbitMQ (Asynchronous submission processing).
- **Database:** MySQL 8.0.
- **Infrastructure:** Docker, Docker Compose, Nginx (Load Balancing/Reverse Proxy).

---

## 📂 Project Structure

```text
Online Examination System/
├── backend/            # Spring Boot Application
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/           # React + Vite Application
│   ├── src/
│   ├── index.html
│   └── Dockerfile
├── docker-compose.yml  # Full stack orchestration
├── nginx.conf          # Nginx configuration
└── PROJECT_DESCRIPTION.md
```

---

## 🚦 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Run the Application
1. Clone the repository.
2. Navigate to the root folder.
3. Start the entire stack using Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - Frontend via Nginx: `http://localhost` (recommended)
   - Frontend Direct: `http://localhost:3000`
   - API Documentation/Backend: `http://localhost:8080/swagger-ui.html` (if applicable)

---

## ⚙️ Advanced Features
- **Asynchronous Processing:** Uses RabbitMQ to handle high loads during submission spikes.
- **Real-time Leaderboard:** Redis-powered instant rankings.
- **Secure Results:** Server-side validation and encryption for integrity.

---

## 🗺️ Roadmap / Future Enhancements

We are constantly working to improve the platform. Upcoming features include:

- **Global Leaderboard Migration:** Transitioning from local-only leaderboard to a true global ranking system across all users.
- **Persistent Session Management:** Enhancing the login/registration system to ensure stable persistent sessions and prevent redundant registrations.
- **Resource Hub:** Integration of PDF resources and study materials directly in the header.
- **User Settings:** Personalized profiles and application preferences.
- **AI Chatbot:** Intelligent assistant to help students with platform navigation and FAQs.
- **Contact Support:** Integrated "Contact Us" portal for direct feedback.
- **Recognition System:** Digital badges and certificates for achieving 100% scores.
- **Access Control:** Enhanced website access level logic for different user tiers.

---

Created by **Vijayapandian T**
