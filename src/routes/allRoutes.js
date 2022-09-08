import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Administration from '../pages/Administration';

export const PUBLIC_ROUTES = [
  { path: '/login', component: Login, restricted: true },
  { path: '/register', component: Register, restricted: true },
  { path: '/privacy', component: PrivacyPolicy, restricted: false },
  { path: '/terms', component: TermsAndConditions, restricted: false },
];

export const PRIVATE_ROUTES = [
  { path: '/home', component: Home },
  { path: '/profile', component: Profile },
  { path: '/chat/:id', component: Chat },
];

export const ADMINISTRATION_ROUTES = [
  { path: '/administration', component: Administration },
  // { path: '/administration/degrees', component: AdministrationDegree },
  // { path: '/administration/degree/:id', component: AdministrationDegree },
  // { path: '/administration/subjects', component: AdministrationSubject },
  // { path: '/administration/subject/:id', component: AdministrationSubject },
  // { path: '/administration/groups', component: AdministrationGroup },
  // { path: '/administration/group/:id', component: AdministrationGroup },
  // { path: '/administration/users', component: AdministrationUser },
  // { path: '/administration/user/:id', component: AdministrationUser },
];
