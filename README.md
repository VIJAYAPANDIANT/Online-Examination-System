# Online Examination System with AI Proctoring

**Live Demo:** [online-examination-system-m6sf.vercel.app](https://online-examination-system-m6sf.vercel.app/)

## 📝 Overview

The **Online Examination System** is a cutting-edge, full-stack platform designed to revolutionize the way academic and professional assessments are conducted. In an era of remote learning, maintaining the integrity of examinations is paramount. This system bridges the gap between convenience and security by integrating advanced **AI Proctoring** capabilities with a seamless user experience.

Key objectives of this platform:
- **Integrity First:** Using real-time monitoring to prevent common cheating methods like tab switching and unauthorized external Hilfe.
- **Scalability:** Built on a robust backend architecture (Spring Boot + RabbitMQ) to ensure that hundreds of students can submitleur exams simultaneously without lag.
- **Versatility:** Not just for multiple-choice questions; the integrated multi-language compiler allows for real-time coding assessments.

---

## 🚀 Features in Detail

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

## 🔄 User Workflow

To ensure a smooth and secure testing experience, the system follows a structured workflow:

1.  **Registration & Secure Login:** Users create an account to track their progress. The system uses secure authentication to protect student data.
2.  **Dashboard & Topic Selection:** Students choose from a diverse range of topics (Aptitude, DSA, Web Dev, etc.) tailored to their curriculum.
3.  **The Exam Environment:** Once started, the AI Proctoring system activates. Students work through questions while being monitored for tab-switches or unauthorized navigation.
4.  **Real-Time Coding (Optional):** For technical exams, students can write, compile, and execute code directly within the browser using the integrated editor.
5.  **Submission & Instant Results:** Upon completion or time-up, exams are automatically submitted to the backend for grading.
6.  **Analytics & Leaderboard:** Students receive immediate feedback on their performance and can see where they stand on the global leaderboard.

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
