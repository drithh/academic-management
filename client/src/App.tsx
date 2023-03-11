import Header from './components/Header';
import Student from './components/Student';
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
          <Route path="/lecturers" element={<div>Lecturers</div>} />
          <Route path="/courses" element={<div>Courses</div>} />
          <Route path="/enrollments" element={<div>Enrollments</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
