package database

import (
	"github.com/drithh/multi-tier-architecture/graph/model"
	"github.com/go-pg/pg/v10"
)

type Repository struct {
	DB *pg.DB
}	

func (r *Repository) GetStudents() ([]*model.Student, error) {
	var students []*model.Student
	err := r.DB.Model(&students).Select()
	return students, err
}

func (r *Repository) GetStudent(nim string) (*model.Student, error) {
	var student model.Student
	err := r.DB.Model(&student).Where("nim = ?", nim).Select()
	return &student, err
}

func (r *Repository) CreateStudent(student *model.Student) error {
	_, err := r.DB.Model(&student).Insert()
	return err

}

func (r *Repository) UpdateStudent(student *model.Student) error {
	_, err := r.DB.Model(student).Where("nim = ?", student.Nim).Update()
	return err
}

func (r *Repository) DeleteStudent(nim string) error {
	_, err := r.DB.Model(&model.Student{}).Where("nim = ?", nim).Delete()
	return err
}

func (r *Repository) GetLecturers() ([]*model.Lecturer, error) {
	var lecturers []*model.Lecturer
	err := r.DB.Model(&lecturers).Select()
	return lecturers, err
}

func (r *Repository) GetLecturer(nip string) (*model.Lecturer, error) {
	var lecturer model.Lecturer
	err := r.DB.Model(&lecturer).Where("nip = ?", nip).Select()
	return &lecturer, err
}

func (r *Repository) CreateLecturer(lecturer *model.Lecturer) error {
	_, err := r.DB.Model(lecturer).Insert()
	return err
}

func (r *Repository) UpdateLecturer(lecturer *model.Lecturer) error {
	_, err := r.DB.Model(lecturer).Where("nip = ?", lecturer.Nip).Update()
	return err
}

func (r *Repository) DeleteLecturer(nip string) error {
	_, err := r.DB.Model(&model.Lecturer{}).Where("nip = ?", nip).Delete()
	return err
}

func (r *Repository) GetCourses() ([]*model.Course, error) {
	var courses []*model.Course
	err := r.DB.Model(&courses).Select()
	return courses, err
}

func (r *Repository) GetCourse(code string) (*model.Course, error) {
	var course model.Course
	err := r.DB.Model(&course).Where("code = ?", code).Select()
	return &course, err
}

func (r *Repository) CreateCourse(course *model.Course) error {
	_, err := r.DB.Model(course).Insert()
	return err
}

func (r *Repository) UpdateCourse(course *model.Course) error {
	_, err := r.DB.Model(course).Where("code = ?", course.Code).Update()
	return err
}

func (r *Repository) DeleteCourse(code string) error {
	_, err := r.DB.Model(&model.Course{}).Where("code = ?", code).Delete()
	return err
}

func (r *Repository) GetEnrollments() ([]*model.Enrollment, error) {
	var enrollments []*model.Enrollment
	err := r.DB.Model(&enrollments).Select()
	return enrollments, err
}

func (r *Repository) GetEnrollment(student string, course string) (*model.Enrollment, error) {
	var enrollment model.Enrollment
	err := r.DB.Model(&enrollment).Where("student_nim = ? AND course_code = ?", student, course).Select()
	return &enrollment, err
}

func (r *Repository) CreateEnrollment(enrollment *model.Enrollment) error {
	_, err := r.DB.Model(enrollment).Insert()
	return err
}

func (r *Repository) UpdateEnrollment(enrollment *model.Enrollment) error {
	_, err := r.DB.Model(enrollment).Where("student_nim = ? AND course_code = ?", enrollment.StudentNim, enrollment.CourseCode).Update()
	return err
}

func (r *Repository) DeleteEnrollment(student string, course string) error {
	_, err := r.DB.Model(&model.Enrollment{}).Where("student_nim = ? AND course_code = ?", student, course).Delete()
	return err
}

	