import React, { useEffect, useState } from "react";

const ExamJail = ({ studentId, examId }) => {
  const [isExamActive, setIsExamActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startExam = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setHasStarted(true);
      setIsExamActive(true);
    } catch (err) {
      console.error("Error attempting to enable fullscreen:", err);
      alert("Please allow fullscreen to start the exam.");
    }
  };

  useEffect(() => {
    if (!hasStarted) return; // Only apply restraints once started

    const reportViolation = async (violationType) => {
      try {
        await fetch("/api/proctor/violation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            examId,
            violationType,
            timestamp: new Date().toISOString(),
          }),
        });
        console.warn(`Warning: ${violationType} detected!`);
        alert(`Warning: ${violationType} restricted action detected during the exam!`);
      } catch (error) {
        console.error("Failed to report violation", error);
      }
    };

    // 2. Detect when user leaves the tab using Page Visibility API
    const handleVisibilityChange = () => {
      if (document.hidden) {
        reportViolation("TAB_SWITCH");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 3. Detect Fullscreen Exit
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        reportViolation("FULLSCREEN_EXIT");
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // 4. Block ctrl+c, ctrl+v, ctrl+u, F12
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "C")) ||
        (e.ctrlKey && (e.key === "v" || e.key === "V")) ||
        (e.ctrlKey && (e.key === "u" || e.key === "U")) ||
        e.key === "F12"
      ) {
        e.preventDefault(); // Block the default behavior
        reportViolation("COPY_ATTEMPT");
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // 5. Disable Right-Click Context Menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      reportViolation("RIGHT_CLICK");
    };
    window.addEventListener("contextmenu", handleContextMenu);

    // B. The "Heartbeat" (Integrity)
    const sendHeartbeat = async () => {
      try {
        await fetch("/api/proctor/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId, examId }),
        });
      } catch (error) {
        console.error("Heartbeat failed", error);
      }
    };

    const heartbeatInterval = setInterval(() => {
      if (isExamActive && !document.hidden) {
        sendHeartbeat();
      }
    }, 10000);

    // Cleanup listeners on unmount or when dependencies change
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(heartbeatInterval);
    };
  }, [studentId, examId, isExamActive, hasStarted]);

  if (!hasStarted) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Ready to begin your Exam?</h2>
        <p>This exam requires fullscreen and restricts tab switching, right clicks, and copying.</p>
        <button 
          onClick={startExam} 
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
        >
          Start Exam
        </button>
      </div>
    );
  }

  return (
    <div
      className="exam-jail-container"
      style={{ padding: "20px", textAlign: "center" }}
    >
      <h1>Exam In Progress</h1>
      <p style={{ color: "red", fontWeight: "bold" }}>
        Do not switch tabs, exit fullscreen, or use keyboard shortcuts.
      </p>
      {/* Actual Exam Components go here */}
    </div>
  );
};

export default ExamJail;
