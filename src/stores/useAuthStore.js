import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultStudents } from '../data/sampleCourses';

const normalizeStudent = (student) => ({
    ...student,
    courseIds: Array.isArray(student.courseIds) ? student.courseIds : [],
});

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isAdmin: false,
            registeredStudents: defaultStudents.map(normalizeStudent),

            loginStudent: (studentId, password) => {
                const students = get().registeredStudents;
                const found = students.find(s => s.studentId === studentId && s.password === password);
                if (found) {
                    set({ user: { ...normalizeStudent(found), role: 'student' }, isAdmin: false });
                    return true;
                }
                return false;
            },

            loginAdmin: (adminId, password) => {
                const defaultAdmin = { adminId: 'admin', password: 'admin1234' };
                if (adminId === defaultAdmin.adminId && password === defaultAdmin.password) {
                    set({ user: { adminId, name: '관리자', role: 'admin' }, isAdmin: true });
                    return true;
                }
                return false;
            },

            logout: () => set({ user: null, isAdmin: false }),

            addStudentToCourse: (courseId, studentId, name, password) => {
                if (!courseId || !studentId || !name) {
                    return { ok: false, reason: 'invalid_input' };
                }

                const normalizedStudentId = studentId.trim();
                const normalizedName = name.trim();
                const normalizedPassword = (password || '1234').trim() || '1234';
                const students = get().registeredStudents.map(normalizeStudent);
                const existing = students.find(s => s.studentId === normalizedStudentId);

                if (existing && existing.name !== normalizedName) {
                    return { ok: false, reason: 'name_mismatch' };
                }

                set(state => {
                    const currentStudents = state.registeredStudents.map(normalizeStudent);
                    const foundIndex = currentStudents.findIndex(s => s.studentId === normalizedStudentId);

                    if (foundIndex === -1) {
                        return {
                            registeredStudents: [
                                ...currentStudents,
                                { studentId: normalizedStudentId, name: normalizedName, password: normalizedPassword, courseIds: [courseId] },
                            ],
                        };
                    }

                    const foundStudent = currentStudents[foundIndex];
                    const nextCourseIds = foundStudent.courseIds.includes(courseId)
                        ? foundStudent.courseIds
                        : [...foundStudent.courseIds, courseId];

                    return {
                        registeredStudents: currentStudents.map((student, index) =>
                            index === foundIndex
                                ? { ...student, password: normalizedPassword || student.password, courseIds: nextCourseIds }
                                : student
                        ),
                    };
                });

                return { ok: true };
            },

            removeStudentFromCourse: (courseId, studentId) => {
                if (!courseId || !studentId) return;
                set(state => ({
                    registeredStudents: state.registeredStudents
                        .map(normalizeStudent)
                        .map(student =>
                            student.studentId === studentId
                                ? { ...student, courseIds: student.courseIds.filter(id => id !== courseId) }
                                : student
                        )
                        .filter(student => student.courseIds.length > 0),
                }));
            },

            getStudentsByCourse: (courseId) => {
                return get().registeredStudents.map(normalizeStudent).filter(student => student.courseIds.includes(courseId));
            },

            changePassword: (studentId, oldPassword, newPassword) => {
                const students = get().registeredStudents;
                const found = students.find(s => s.studentId === studentId && s.password === oldPassword);
                if (found) {
                    set({
                        registeredStudents: students.map(s =>
                            s.studentId === studentId ? { ...s, password: newPassword } : s
                        ),
                    });
                    return true;
                }
                return false;
            },
        }),
        {
            name: 'starquest-auth',
            version: 2,
            migrate: (persistedState) => {
                if (!persistedState) return persistedState;
                return {
                    ...persistedState,
                    registeredStudents: (persistedState.registeredStudents || []).map(normalizeStudent),
                    user: persistedState.user?.role === 'student'
                        ? { ...persistedState.user, courseIds: Array.isArray(persistedState.user.courseIds) ? persistedState.user.courseIds : [] }
                        : persistedState.user,
                };
            },
        }
    )
);
