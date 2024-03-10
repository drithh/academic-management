package database

import (
	"database/sql"

	"github.com/drithh/multi-tier-architecture/graph/model"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetStudents() ([]*model.Student, error) {
	rows, err := r.DB.Query("SELECT * FROM students")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var students []*model.Student
	for rows.Next() {
		var student model.Student
		err := rows.Scan(&student.Nim, &student.Name, &student.Address)
		if err != nil {
			return nil, err
		}
		students = append(students, &student)
	}

	return students, nil
}

func (r *Repository) GetStudent(nim string) (*model.Student, error) {
	row := r.DB.QueryRow("SELECT * FROM students WHERE nim = $1", nim)
	var student model.Student
	err := row.Scan(&student.Nim, &student.Name, &student.Address)
	if err != nil {
		return nil, err
	}

	return &student, nil
}

func (r *Repository) CreateStudent(student *model.Student) error {
	_, err := r.DB.Exec("INSERT INTO students (nim, name, address) VALUES ($1, $2, $3)", student.Nim, student.Name, student.Address)
	return err
}

func (r *Repository) UpdateStudent(student *model.Student) error {
	_, err := r.DB.Exec("UPDATE students SET name = $1, address = $2 WHERE nim = $3", student.Name, student.Address, student.Nim)
	return err
}

func (r *Repository) DeleteStudent(nim string) error {
	_, err := r.DB.Exec("DELETE FROM students WHERE nim = $1", nim)
	return err
}

func (r *Repository) GetLecturers() ([]*model.Lecturer, error) {
	rows, err := r.DB.Query("SELECT * FROM lecturers")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var lecturers []*model.Lecturer
	for rows.Next() {
		var lecturer model.Lecturer
		err := rows.Scan(&lecturer.Nip, &lecturer.Name, &lecturer.Address)
		if err != nil {
			return nil, err
		}
		lecturers = append(lecturers, &lecturer)
	}

	return lecturers, nil
}

func (r *Repository) GetLecturer(nip string) (*model.Lecturer, error) {
	row := r.DB.QueryRow("SELECT * FROM lecturers WHERE nip = $1", nip)
	var lecturer model.Lecturer
	err := row.Scan(&lecturer.Nip, &lecturer.Name, &lecturer.Address)
	if err != nil {
		return nil, err
	}

	return &lecturer, nil
}

func (r *Repository) CreateLecturer(lecturer *model.Lecturer) error {
	_, err := r.DB.Exec("INSERT INTO lecturers (nip, name, address) VALUES ($1, $2, $3)", lecturer.Nip, lecturer.Name, lecturer.Address)
	return err
}

func (r *Repository) UpdateLecturer(lecturer *model.Lecturer) error {
	_, err := r.DB.Exec("UPDATE lecturers SET name = $1, address = $2 WHERE nip = $3", lecturer.Name, lecturer.Address, lecturer.Nip)
	return err
}

func (r *Repository) DeleteLecturer(nip string) error {
	_, err := r.DB.Exec("DELETE FROM lecturers WHERE nip = $1", nip)
	return err
}

func (r *Repository) GetCourses() ([]*model.Course, error) {
	rows, err := r.DB.Query("SELECT * FROM courses")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courses []*model.Course
	for rows.Next() {
		var course model.Course
		err := rows.Scan(&course.Code, &course.Name, &course.Credit, &course.Semester, &course.LecturerNip)
		if err != nil {
			return nil, err
		}
		courses = append(courses, &course)
	}

	return courses, nil
}

func (r *Repository) GetCourse(code string) (*model.Course, error) {
	row := r.DB.QueryRow("SELECT * FROM courses WHERE code = $1", code)
	var course model.Course
	err := row.Scan(&course.Code, &course.Name, &course.Credit, &course.Semester, &course.LecturerNip)
	if err != nil {
		return nil, err
	}

	return &course, nil
}

func (r *Repository) CreateCourse(course *model.Course) error {
	_, err := r.DB.Exec("INSERT INTO courses (code, name, credit, semester, lecturer_nip) VALUES ($1, $2, $3, $4, $5)", course.Code, course.Name, course.Credit, course.Semester, course.LecturerNip)
	return err
}

func (r *Repository) UpdateCourse(course *model.Course) error {
	_, err := r.DB.Exec("UPDATE courses SET name = $1, credit = $2, semester = $3, lecturer_nip = $4 WHERE code = $5", course.Name, course.Credit, course.Semester, course.LecturerNip, course.Code)
	return err
}

func (r *Repository) DeleteCourse(code string) error {
	_, err := r.DB.Exec("DELETE FROM courses WHERE code = $1", code)
	return err
}

func (r *Repository) GetEnrollments() ([]*model.Enrollment, error) {
	rows, err := r.DB.Query("SELECT * FROM enrollments")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var enrollments []*model.Enrollment
	for rows.Next() {
		var enrollment model.Enrollment
		err := rows.Scan(&enrollment.StudentNim, &enrollment.CourseCode, &enrollment.Grade)
		if err != nil {
			return nil, err
		}
		enrollments = append(enrollments, &enrollment)
	}

	return enrollments, nil
}

func (r *Repository) GetEnrollment(student string, course string) (*model.Enrollment, error) {
	row := r.DB.QueryRow("SELECT * FROM enrollments WHERE student_nim = $1 AND course_code = $2", student, course)
	var enrollment model.Enrollment
	err := row.Scan(&enrollment.StudentNim, &enrollment.CourseCode, &enrollment.Grade)
	if err != nil {
		return nil, err
	}

	return &enrollment, nil
}

func (r *Repository) CreateEnrollment(enrollment *model.Enrollment) error {
	_, err := r.DB.Exec("INSERT INTO enrollments (student_nim, course_code, grade) VALUES ($1, $2, $3)", enrollment.StudentNim, enrollment.CourseCode, enrollment.Grade)
	return err
}

func (r *Repository) UpdateEnrollment(enrollment *model.Enrollment) error {
	_, err := r.DB.Exec("UPDATE enrollments SET grade = $1 WHERE student_nim = $2 AND course_code = $3", enrollment.Grade, enrollment.StudentNim, enrollment.CourseCode)
	return err
}

func (r *Repository) DeleteEnrollment(student string, course string) error {
	_, err := r.DB.Exec("DELETE FROM enrollments WHERE student_nim = $1 AND course_code = $2", student, course)
	return err
}
