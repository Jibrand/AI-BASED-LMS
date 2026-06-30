import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import SuperadminDashboard from './pages/SuperadminDashboard';
import GenericScreen from './pages/GenericScreen';
import LeaderboardPage from './pages/LeaderboardPage';
import StudentQuizzes from './pages/StudentQuizzes';
import StudentAssignments from './pages/StudentAssignments';
import StudentResources from './pages/StudentResources';
import StudentPlanner from './pages/StudentPlanner';
import StudentAITutor from './pages/StudentAITutor';
import TeacherStudents from './pages/TeacherStudents';
import TeacherClasses from './pages/TeacherClasses';
import TeacherAssignments from './pages/TeacherAssignments';
import TeacherSubmissions from './pages/TeacherSubmissions';
import TeacherQuizzes from './pages/TeacherQuizzes';
import TeacherQuizBuilder from './pages/TeacherQuizBuilder';
import TeacherAnnouncements from './pages/TeacherAnnouncements';
import SuperAdminStudents from './pages/SuperAdminStudents';
import SuperAdminTeachers from './pages/SuperAdminTeachers';
import SuperAdminClasses from './pages/SuperAdminClasses';
import SuperAdminAssignments from './pages/SuperAdminAssignments';
import SuperAdminQuizzes from './pages/SuperAdminQuizzes';
import SuperAdminLogs from './pages/SuperAdminLogs';
import SuperAdminAnnouncements from './pages/SuperAdminAnnouncements';
import SuperAdminAICopilot from './pages/SuperAdminAICopilot';
import TeacherAIAssistant from './pages/TeacherAIAssistant';
import SuperAdminReports from './pages/SuperAdminReports';
import TeacherAIKnowledgeBase from './pages/TeacherAIKnowledgeBase';
import StudentFinance from './pages/StudentFinance';
import SuperAdminFinance from './pages/SuperAdminFinance';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Default redirect to student */}
        <Route index element={<Navigate to="/student" replace />} />
        
        {/* Student Routes */}
        <Route path="student">
          <Route index element={<StudentDashboard />} />
          <Route path="ai-tutor" element={<StudentAITutor />} />
          <Route path="homework-solver" element={<GenericScreen title="Homework Solver" />} />
          <Route path="quizzes" element={<StudentQuizzes />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="resources" element={<StudentResources />} />
          <Route path="planner" element={<StudentPlanner />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="finance" element={<StudentFinance />} />
        </Route>
        
        {/* Teacher Routes */}
        <Route path="teacher">
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="quizzes" element={<TeacherQuizzes />} />
          <Route path="assignments" element={<TeacherAssignments />} />
          <Route path="submissions" element={<TeacherSubmissions />} />
          <Route path="quiz-builder" element={<TeacherQuizBuilder />} />
          <Route path="announcements" element={<TeacherAnnouncements />} />
          <Route path="ai-assistant" element={<TeacherAIAssistant />} />
          <Route path="ai-knowledge" element={<TeacherAIKnowledgeBase />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
        </Route>
        
        {/* Superadmin Routes */}
        <Route path="superadmin">
          <Route index element={<SuperadminDashboard />} />
          <Route path="students" element={<SuperAdminStudents />} />
          <Route path="teachers" element={<SuperAdminTeachers />} />
          <Route path="classes" element={<SuperAdminClasses />} />
          <Route path="assignments" element={<SuperAdminAssignments />} />
          <Route path="quizzes" element={<SuperAdminQuizzes />} />
          <Route path="announcements" element={<SuperAdminAnnouncements />} />
          <Route path="logs" element={<SuperAdminLogs />} />
          <Route path="ai-copilot" element={<SuperAdminAICopilot />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="reports" element={<SuperAdminReports />} />
          <Route path="finance" element={<SuperAdminFinance />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
