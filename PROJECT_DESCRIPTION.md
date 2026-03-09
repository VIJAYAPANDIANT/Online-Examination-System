# Online Examination System with AI Proctoring

## Project Overview
The **Online Examination System** is a sophisticated full-stack web application designed to host secure, high-integrity online exams. It features an automated "AI Proctor" that monitors student behavior in real-time and a robust backend architecture capable of handling high-concurrency exam submissions.

## Core Features and Functionalities

### 1. Student Portal & Exam Interface
- **Topic Selection:** Students can browse and select from various exam topics.
- **Interactive Exam Environment:** A clean, distraction-free UI for answering questions with a live timer and question navigation sidebar.
- **Real-time Feedback:** Optional immediate feedback on question correctness (configurable).
- **Result & Analytics:** Post-exam breakdown of scores, accuracy percentage, and comparative leaderboard ranking.

### 2. Administrator Dashboard
- **Exam Management:** Complete CRUD (Create, Read, Update, Delete) operations for exams and their associated question banks.
- **Live Monitoring:** A real-time dashboard to monitor all active exam sessions and student progress.
- **Proctoring Control:** Admins receive instant alerts via WebSockets when violations occur.
- **Student Analytics:** View comprehensive reports on student performance and violation history.

### 3. AI Proctoring System
The system uses a point-based violation tracking mechanism to ensure exam integrity.
- **Automated Detection:** Tracks browser-level events such as:
  - **Tab Switching:** Penalized for navigating away from the exam.
  - **Exiting Fullscreen:** Forced focus on the exam interface.
  - **Copy-Paste & Right-Click Prevention:** Restricts common cheating methods.
- **Violation Point System:** Each infraction adds "Violation Points" to the student's session.
- **Auto-Termination:** If a student reaches a predefined threshold (e.g., 50 points), the exam is automatically submitted, and the session is terminated.

### 4. Advanced Technical Features
- **Asynchronous Submission:** Exam results are processed via **RabbitMQ**, ensuring the system remains responsive even during heavy load.
- **Real-time Leaderboard:** Powered by **Redis**, providing instant global rankings and performance stats.
- **Session Persistence:** State is managed across the client and server to prevent data loss during network interruptions.
- **Secure Results:** Results can be encrypted and are validated server-side to prevent tampering.

## How the System Works (Workflow)

1.  **Preparation:** The Administrator creates an Exam, defines passing criteria, and adds Multiple Choice Questions (MCQs).
2.  **Authentication:** Students log in and select their assigned exam.
3.  **Active Session:**
    - The **Frontend (React)** starts the exam timer and activates the proctoring listeners.
    - browser events (like tab switches) are sent to the **Backend (Spring Boot)**.
4.  **Proctoring Logic:** 
    - The `ProctorService` updates violation points in **Redis**.
    - If violations exceed the limit, an `ExamAutoSubmitEvent` is triggered.
    - Concurrent admins are notified via **WebSockets**.
5.  **Submission:** 
    - Upon clicking finish (or auto-termination), a message is sent to **RabbitMQ**.
    - The `SubmissionWorkerService` picks up the message, calculates the final grade, and saves it to **MySQL**.
6.  **Certification:** If the student passes, a **Certificate** is generated and becomes available in their portal.
7.  **Finalization:** The leaderboard is updated, and the student's result is archived for admin review.

## Technology Stack
- **Frontend:** React, Vite, Tailwind CSS, WebSockets (STOMP).
- **Backend:** Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security.
- **Middleware:** Redis (Caching & Sessions), RabbitMQ (Message Broker).
- **Database:** MySQL 8.0.
- **Infrastructure:** Docker, Docker Compose, Nginx.
