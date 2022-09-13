import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import ForgotPassword from '../pages/ForgotPassword';
import CreatePassword from '../pages/CreatePassword';
import Administration from '../pages/Administration';
import AdministerDegree from '../pages/administration/AdministerDegree';
import AdministerSubject from '../pages/administration/AdministerSubject';
import AdministerGroup from '../pages/administration/AdministerGroup';
import AdministerUser from '../pages/administration/AdministerUser';
import AdministrationDegrees from '../pages/administration/AdministrationDegrees';
import AdministrationSubjects from '../pages/administration/AdministrationSubjects';
import AdministrationGroups from '../pages/administration/AdministrationGroups';
import AdministrationUsers from '../pages/administration/AdministrationUsers';
import AdministrationStatistics from '../pages/administration/AdministrationStatistics';

export const PUBLIC_ROUTES = [
  { path: '/login', component: Login, restricted: true },
  { path: '/register', component: Register, restricted: true },
  { path: '/privacy', component: PrivacyPolicy, restricted: false },
  { path: '/terms', component: TermsAndConditions, restricted: false },
  { path: '/forgotPassword', component: ForgotPassword, restricted: true },
  { path: '/createPassword', component: CreatePassword, restricted: false },
];

export const PRIVATE_ROUTES = [
  { path: '/home', component: Home },
  { path: '/profile', component: Profile },
  { path: '/chat/:id', component: Chat },
];

export const ADMINISTRATION_ROUTES = [
  { path: '/administration', component: Administration },
  { path: '/administration/degrees', component: AdministrationDegrees },
  { path: '/administration/degree/:id', component: AdministerDegree },
  { path: '/administration/subjects', component: AdministrationSubjects },
  { path: '/administration/subject/:id', component: AdministerSubject },
  { path: '/administration/groups', component: AdministrationGroups },
  { path: '/administration/group/:id', component: AdministerGroup },
  { path: '/administration/users', component: AdministrationUsers },
  { path: '/administration/user/:id', component: AdministerUser },
  { path: '/administration/statistics', component: AdministrationStatistics },
];
