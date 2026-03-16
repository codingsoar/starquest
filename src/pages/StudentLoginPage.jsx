import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button, Input } from "@heroui/react";
import { KeyRound } from 'lucide-react';

export default function StudentLoginPage() {
    const navigate = useNavigate();
    const { loginStudent, changePassword } = useAuthStore();

    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showChangePw, setShowChangePw] = useState(false);
    const [cpStudentId, setCpStudentId] = useState('');
    const [cpOldPw, setCpOldPw] = useState('');
    const [cpNewPw, setCpNewPw] = useState('');
    const [cpConfirmPw, setCpConfirmPw] = useState('');
    const [cpMsg, setCpMsg] = useState('');
    const [cpSuccess, setCpSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!studentId.trim() || !password.trim()) {
            setError('Please enter both User ID and Password.');
            return;
        }

        setIsSubmitting(true);
        const ok = await loginStudent(studentId.trim(), password);
        setIsSubmitting(false);

        if (ok) {
            navigate('/dashboard');
            return;
        }

        setError('Invalid User ID or Password.');
    };

    const handleChangePassword = () => {
        setCpMsg('');
        setCpSuccess(false);

        if (!cpStudentId.trim() || !cpOldPw.trim() || !cpNewPw.trim()) {
            setCpMsg('Please fill in all fields.');
            return;
        }

        if (cpNewPw !== cpConfirmPw) {
            setCpMsg('New passwords do not match.');
            return;
        }

        if (cpNewPw.length < 4) {
            setCpMsg('Password must be at least 4 characters long.');
            return;
        }

        if (changePassword(cpStudentId.trim(), cpOldPw, cpNewPw)) {
            setCpSuccess(true);
            setCpMsg('Password changed successfully.');
            return;
        }

        setCpMsg('Invalid Student ID or Old Password.');
    };

    const resetChangePwModal = () => {
        setShowChangePw(false);
        setCpStudentId('');
        setCpOldPw('');
        setCpNewPw('');
        setCpConfirmPw('');
        setCpMsg('');
        setCpSuccess(false);
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col overflow-hidden relative selection:bg-accent-pink selection:text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Main gradient mesh */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-purple/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-lighten"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-lighten"></div>
                <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten"></div>

                {/* Subtle gamified decorative shapes */}
                <div className="absolute top-20 left-20 text-accent-yellow/40 animate-pulse hidden md:block">
                    <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>pentagon</span>
                </div>
                <div className="absolute bottom-20 right-40 text-accent-pink/30 animate-bounce hidden md:block" style={{ animationDuration: '3s' }}>
                    <span className="material-symbols-outlined text-5xl">circle</span>
                </div>
                <div className="absolute top-1/2 left-10 text-primary/30 hidden md:block">
                    <span className="material-symbols-outlined text-4xl">change_history</span>
                </div>
                <div className="absolute bottom-1/3 right-10 text-accent-purple/30 hidden md:block">
                    <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>star</span>
                </div>
            </div>

            <div className="layout-container flex h-full grow flex-col z-10 justify-center items-center p-4">
                {/* Login Card */}
                <div className="bg-white dark:bg-[#1a2c33] rounded-2xl shadow-xl w-full max-w-[480px] overflow-hidden border border-white/50 dark:border-white/5 backdrop-blur-sm relative">
                    {/* Top Decoration Line */}
                    <div className="h-2 w-full bg-gradient-to-r from-accent-purple via-primary to-secondary"></div>

                    <div className="p-8 md:p-10 flex flex-col gap-6">
                        {/* Header Section */}
                        <div className="flex flex-col items-center gap-4 text-center">
                            {/* Logo Placeholder */}
                            <div className="size-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center shadow-lg shadow-primary/30 mb-2 group cursor-default hover:scale-105 transition-transform duration-300">
                                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-dark-text dark:text-white text-3xl font-extrabold tracking-tight">Welcome Back!</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-medium">Ready to level up your skills today?</p>
                            </div>
                        </div>
                        {/* Form Section */}
                        <form className="flex flex-col gap-5 mt-2" onSubmit={handleSubmit}>
                            {/* ID Input */}
                            <div className="space-y-1.5 group">
                                <label className="text-dark-text dark:text-slate-200 text-sm font-bold flex items-center gap-2" htmlFor="user-id">
                                    <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
                                    Student ID
                                </label>
                                <div className="relative">
                                    <input
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#25363d] px-4 py-3.5 text-dark-text dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                        id="user-id"
                                        placeholder="Enter Student ID"
                                        type="text"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-1.5 group">
                                <div className="flex items-center justify-between">
                                    <label className="text-dark-text dark:text-slate-200 text-sm font-bold flex items-center gap-2" htmlFor="password">
                                        <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-accent-pink hover:text-accent-pink/80 text-sm font-bold transition-colors"
                                        onClick={() => setShowChangePw(true)}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#25363d] px-4 py-3.5 text-dark-text dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                        id="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                            {/* Primary Button */}
                            <button disabled={isSubmitting} className="mt-2 w-full bg-primary hover:bg-secondary text-white font-bold text-lg h-12 rounded-xl shadow-lg shadow-primary/25 hover:shadow-secondary/40 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group disabled:cursor-not-allowed disabled:opacity-60">
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">login</span>
                                <span>{isSubmitting ? 'Signing In...' : 'Log In'}</span>
                            </button>


                        </form>
                    </div>

                    {/* Bottom decorative accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800"></div>
                </div>

                {/* Footer Text */}
                <div className="mt-8 text-center text-slate-400/80 dark:text-slate-500 text-xs">
                    <p>© 2026 LEVEL UP LEARNING.</p>
                </div>
            </div>

            <Modal isOpen={showChangePw} onClose={resetChangePwModal} placement="center" backdrop="blur" classNames={{ base: "bg-white dark:bg-[#1a2c33] border border-slate-200 dark:border-white/10" }}>
                <ModalContent>
                    <ModalHeader>
                        <span className="flex items-center gap-2 text-slate-900 dark:text-white"><KeyRound size={18} /> 비밀번호 변경</span>
                    </ModalHeader>
                    <ModalBody className="space-y-4 py-4">
                        <div className="space-y-1.5">
                            <label className="text-slate-700 dark:text-slate-200 text-sm font-bold block">학생 ID (User ID)</label>
                            <input 
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#25363d] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                type="text"
                                value={cpStudentId} 
                                onChange={(e) => setCpStudentId(e.target.value)} 
                                placeholder="아이디를 입력하세요"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-slate-700 dark:text-slate-200 text-sm font-bold block">현재 비밀번호</label>
                            <input 
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#25363d] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                type="password" 
                                value={cpOldPw} 
                                onChange={(e) => setCpOldPw(e.target.value)} 
                                placeholder="현재 사용 중인 비밀번호"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-slate-700 dark:text-slate-200 text-sm font-bold block">새로운 비밀번호</label>
                            <input 
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#25363d] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                type="password" 
                                value={cpNewPw} 
                                onChange={(e) => setCpNewPw(e.target.value)} 
                                placeholder="새 비밀번호 (4자리 이상)"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-slate-700 dark:text-slate-200 text-sm font-bold block">새로운 비밀번호 확인</label>
                            <input 
                                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-[#25363d] px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                type="password" 
                                value={cpConfirmPw} 
                                onChange={(e) => setCpConfirmPw(e.target.value)} 
                                placeholder="새 비밀번호를 한 번 더 입력"
                            />
                        </div>
                        {cpMsg && <p className={`text-sm font-semibold mt-2 ${cpSuccess ? 'text-green-500' : 'text-red-500'}`}>{cpMsg}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" className="text-slate-600 dark:text-slate-300" onPress={resetChangePwModal}>닫기</Button>
                        {!cpSuccess && <Button color="primary" onPress={handleChangePassword}>변경하기</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
