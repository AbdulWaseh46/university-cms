import React, { createContext, useContext, useState, useEffect } from 'react';

// ── Create the context ──────────────────────────────────────────────
const AppContext = createContext();

// ── Custom hook for easy consumption ───────────────────────────────
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
};

// ── Helper: load from localStorage ─────────────────────────────────
const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// ── Helper: save to localStorage ───────────────────────────────────
const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('localStorage save failed:', err);
  }
};

// ── Provider ────────────────────────────────────────────────────────
export const AppProvider = ({ children }) => {
  // ── State ──────────────────────────────────────────────────────
  const [students, setStudents] = useState(() =>
    loadFromStorage('cms_students', [])
  );
  const [courses, setCourses] = useState(() =>
    loadFromStorage('cms_courses', [])
  );
  const [enrollments, setEnrollments] = useState(() =>
    loadFromStorage('cms_enrollments', [])
  );
  const [toasts, setToasts] = useState([]);

  // ── Persist to localStorage on every change ────────────────────
  useEffect(() => { saveToStorage('cms_students', students); }, [students]);
  useEffect(() => { saveToStorage('cms_courses', courses); }, [courses]);
  useEffect(() => { saveToStorage('cms_enrollments', enrollments); }, [enrollments]);

  // ── Toast helpers ──────────────────────────────────────────────
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  // ── STUDENT CRUD ───────────────────────────────────────────────
  const addStudent = (data) => {
    const student = {
      id: `STU-${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      major: data.major.trim(),
      year: data.year,
      createdAt: new Date().toISOString(),
    };
    setStudents(prev => [...prev, student]);
    addToast(`Student "${student.name}" added successfully!`, 'success');
    return student;
  };

  const deleteStudent = (id) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    // Also remove all enrollments for this student
    setEnrollments(prev => prev.filter(e => e.studentId !== id));
    addToast(`Student "${student?.name}" removed.`, 'error');
  };

  // ── COURSE CRUD ────────────────────────────────────────────────
  const addCourse = (data) => {
    const course = {
      id: `CRS-${Date.now()}`,
      code: data.code.trim().toUpperCase(),
      name: data.name.trim(),
      instructor: data.instructor.trim(),
      credits: Number(data.credits),
      description: data.description?.trim() || '',
      createdAt: new Date().toISOString(),
    };
    setCourses(prev => [...prev, course]);
    addToast(`Course "${course.name}" added successfully!`, 'success');
    return course;
  };

  const deleteCourse = (id) => {
    const course = courses.find(c => c.id === id);
    setCourses(prev => prev.filter(c => c.id !== id));
    // Also remove all enrollments for this course
    setEnrollments(prev => prev.filter(e => e.courseId !== id));
    addToast(`Course "${course?.name}" removed.`, 'error');
  };

  // ── ENROLLMENT CRUD ────────────────────────────────────────────
  const enrollStudent = (studentId, courseId) => {
    // Duplicate check
    const already = enrollments.find(
      e => e.studentId === studentId && e.courseId === courseId
    );
    if (already) {
      addToast('Student is already enrolled in this course!', 'error');
      return false;
    }
    const enrollment = {
      id: `ENR-${Date.now()}`,
      studentId,
      courseId,
      enrolledAt: new Date().toISOString(),
    };
    setEnrollments(prev => [...prev, enrollment]);
    const student = students.find(s => s.id === studentId);
    const course = courses.find(c => c.id === courseId);
    addToast(`${student?.name} enrolled in ${course?.name}!`, 'success');
    return true;
  };

  const removeEnrollment = (id) => {
    setEnrollments(prev => prev.filter(e => e.id !== id));
    addToast('Enrollment removed.', 'error');
  };

  // ── Derived helpers ────────────────────────────────────────────
  const getStudentEnrollments = (studentId) =>
    enrollments
      .filter(e => e.studentId === studentId)
      .map(e => ({ ...e, course: courses.find(c => c.id === e.courseId) }));

  const getCourseEnrollments = (courseId) =>
    enrollments
      .filter(e => e.courseId === courseId)
      .map(e => ({ ...e, student: students.find(s => s.id === e.studentId) }));

  // ── Provide value ──────────────────────────────────────────────
  return (
    <AppContext.Provider value={{
      students, courses, enrollments, toasts,
      addStudent, deleteStudent,
      addCourse, deleteCourse,
      enrollStudent, removeEnrollment,
      getStudentEnrollments, getCourseEnrollments,
      addToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};
