package database

import (
	"gorm.io/gorm"
)

type Student struct {
	gorm.Model
	Nim     string `gorm:"primaryKey"`
	Name    string `gorm:"not null"`
	Address string `gorm:"not null"`
}

type Lecturer struct {
	gorm.Model
	Nip     string `gorm:"primaryKey"`
	Name    string `gorm:"not null"`
	Address string `gorm:"not null"`
}

type Course struct {
	gorm.Model
	Code     string `gorm:"primaryKey"`
	Name     string `gorm:"not null"`
	Credit   int    `gorm:"not null"`
	Semester int    `gorm:"not null"`
	Lecturer Lecturer
	
}



