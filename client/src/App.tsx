import Header from './components/Header';
import Student from './components/Student';
import Lecturer from './components/Lecturer';
import Course from './components/Course';
import Enrollment from './components/Enrollment';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <Toaster />
      <div className="App font-body max-w-4xl mx-auto min-h-screen px-4 sm:px-8 py-8">
        <Header />
        <Routes>
          <Route path="/" element={<Student />} />
          <Route path="/students" element={<Student />} />
          <Route path="/lecturers" element={<Lecturer />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/enrollments" element={<Enrollment />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
