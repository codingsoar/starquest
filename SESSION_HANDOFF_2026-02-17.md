# Session Handoff (2026-02-17)

## 목적
- 이 터미널 세션에서 진행한 변경 내용을 다음 작업 때 바로 이어갈 수 있도록 정리.

## 사용자 요청 흐름 요약
1. 프로젝트 분석 요청
2. 실행/접속 문제 점검 요청
3. 관리자 기능 변경 요청
   - 클래스(과목)별 학생 등록 구조
   - 관리자 첫 화면을 과목(class) 관리 페이지로
   - 과목 클릭 시 상세 관리(학생 추가/삭제)
4. 과목 카드 UI 요청
   - 좌측 순번 영역
   - 교사, 개설일, 소개, 과목명 배치
5. 과목 목록 1열 요청
   - 한 행에 과목 1개
6. `새 과목` 버튼 동작 요청
   - 버튼 클릭 시 바로 과목 생성

## 핵심 구현 사항

### 1) 인증/학생 데이터 구조
- 파일: `src/stores/useAuthStore.js`
- 변경:
  - 학생 데이터에 `courseIds`(배정 과목 목록) 도입
  - `normalizeStudent`로 데이터 정규화
  - 새 API:
    - `addStudentToCourse(courseId, studentId, name, password)`
    - `removeStudentFromCourse(courseId, studentId)`
    - `getStudentsByCourse(courseId)`
  - persist 마이그레이션 추가 (`version: 2`)

### 2) 관리자 페이지 구조 개편
- 파일: `src/pages/AdminPage.jsx`
- 변경:
  - 기본 진입 화면 = 과목(Class) 관리
  - 과목 카드 클릭 -> 과목 상세 관리 화면 이동
  - 과목 상세에서 학생 등록/삭제
  - 과목 카드 UI:
    - 왼쪽 순번 바
    - 과목명/교사명/개설일/소개/학생수 표시
  - 과목 목록 레이아웃:
    - 1열(`space-y`)로 변경하여 한 행에 1개
  - `새 과목` 버튼:
    - 모달 없이 즉시 생성
    - 생성 직후 해당 과목 상세 화면으로 이동

### 3) 학생 측 과목 노출 제한
- 파일: `src/pages/CourseSelectPage.jsx`
- 변경:
  - 학생은 본인 `courseIds`에 있는 과목만 표시
  - 배정 과목 없으면 안내 메시지 출력

### 4) 프로필 페이지 반영
- 파일: `src/pages/ProfilePage.jsx`
- 변경:
  - 프로필 진행도도 배정 과목 기준으로 표시

### 5) 기본 데이터 보정
- 파일: `src/data/sampleCourses.js`
- 변경:
  - `defaultStudents`에 `courseIds` 추가

### 6) 정리 작업
- 파일: `src/pages/StagePage.jsx`
- 변경:
  - 린트 에러 정리 및 화면 코드 정리

## 최근 검증 결과
- `npm run lint` 통과
- `npm run build` 통과
- 개발 서버 접속 확인:
  - `http://localhost:5180/` 응답 200
  - `http://127.0.0.1:5180/` 응답 200

## 실행 가이드 (다음 세션용)
- 권장 실행:
```powershell
npx vite --host 0.0.0.0 --port 5180
```
- 접속:
  - `http://localhost:5180/`

## 메모 / 주의사항
- 이 저장소에는 일부 파일에 한글 인코딩 깨짐 흔적이 남아 있음.
- `npm run dev -- --host ... --port ...`가 환경에 따라 인자 전달이 꼬여 포트가 바뀌는 경우가 있었음.
  - 고정 실행은 `npx vite --host 0.0.0.0 --port 5180` 권장.
- CSS 경고 1건 존재:
  - `src/index.css`에서 Google Fonts `@import` 순서 경고 (빌드 실패 아님).

## 현재 주요 수정 파일
- `src/stores/useAuthStore.js`
- `src/pages/AdminPage.jsx`
- `src/pages/CourseSelectPage.jsx`
- `src/pages/ProfilePage.jsx`
- `src/pages/StagePage.jsx`
- `src/data/sampleCourses.js`

