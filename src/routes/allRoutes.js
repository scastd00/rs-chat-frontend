import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import ForgotPassword from '../pages/ForgotPassword';
import CreatePassword from '../pages/CreatePassword';
import Administration from '../pages/administration/Administration';
import AdministrationDegrees from '../pages/administration/degrees/AdministrationDegrees';
import AdministrationSubjects from '../pages/administration/subjects/AdministrationSubjects';
import AdministrationGroups from '../pages/administration/groups/AdministrationGroups';
import AdministrationUsers from '../pages/administration/users/AdministrationUsers';
import AdministrationStatistics from '../pages/administration/statistics/AdministrationStatistics';
import AddUser from '../pages/administration/users/AddUser';
import EditUser from '../pages/administration/users/EditUser';
import ListUsers from '../pages/administration/users/ListUsers';
import EditDegree from '../pages/administration/degrees/EditDegree';
import EditSubject from '../pages/administration/subjects/EditSubject';
import EditGroup from '../pages/administration/groups/EditGroup';
import Logout from '../pages/Logout';
import GlobalInfoSender from '../pages/administration/GlobalInfoSender';
import UserProfile from '../pages/UserProfile';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import Error from '../pages/Error';

export const PUBLIC_ROUTES = [
  { path: '/login', component: Login, restricted: true },
  { path: '/register', component: Register, restricted: true },
  { path: '/privacy', component: PrivacyPolicy, restricted: false },
  { path: '/terms', component: TermsAndConditions, restricted: false },
  { path: '/forgotPassword', component: ForgotPassword, restricted: true },
  { path: '/createPassword', component: CreatePassword, restricted: false },
  { path: '/error', component: Error, restricted: false },
];

export const PRIVATE_ROUTES = [
  { path: '/home', component: Home },
  { path: '/profile', component: Profile },
  { path: '/chat', component: Chat },
  { path: '/logout', component: Logout },
  { path: '/user/:username', component: UserProfile },
];

export const TEACHER_ROUTES = [
  { path: '/teacher', component: TeacherDashboard },
];

export const ADMINISTRATION_ROUTES = [
  { path: '/administration', component: Administration },
  { path: '/administration/degrees', component: AdministrationDegrees },
  { path: '/administration/degrees/edit/:id', component: EditDegree },
  { path: '/administration/subjects', component: AdministrationSubjects },
  { path: '/administration/subjects/edit/:id', component: EditSubject },
  { path: '/administration/groups', component: AdministrationGroups },
  { path: '/administration/groups/edit/:id', component: EditGroup },
  { path: '/administration/users', component: AdministrationUsers },
  { path: '/administration/users/add', component: AddUser },
  { path: '/administration/users/edit/:id', component: EditUser },
  { path: '/administration/users/list', component: ListUsers },
  { path: '/administration/statistics', component: AdministrationStatistics },
  { path: '/administration/message', component: GlobalInfoSender },
];
