CREATE TABLE students (
  nim CHAR(16) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL
);

CREATE TABLE lecturers (
  nip CHAR(32) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL
);


CREATE TABLE courses (
  code CHAR(16) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  credit INT NOT NULL,
  semester INT NOT NULL,
  lecturer_nip CHAR(32) NOT NULL,
  FOREIGN KEY (lecturer_nip) REFERENCES lecturers(nip) ON DELETE CASCADE
);

CREATE TABLE enrollments (
  student_nim CHAR(16) NOT NULL,
  course_code CHAR(16) NOT NULL,
  grade FLOAT NOT NULL,
  PRIMARY KEY (student_nim, course_code),
  FOREIGN KEY (student_nim) REFERENCES students(nim) ON DELETE CASCADE,
  FOREIGN KEY (course_code) REFERENCES courses(code) ON DELETE CASCADE
);


