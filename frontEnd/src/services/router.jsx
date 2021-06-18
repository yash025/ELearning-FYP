// router.jsx
import { UIRouterReact, servicesPlugin, hashLocationPlugin } from '@uirouter/react';
import Login1 from "../components/Login1";
import Register from "../components/Register";
import Home from "../components/Home";
import Learning from "../components/Learning";
import Drawing from "../components/Drawing";
import Profile from "../components/Profile";

// Create router instance + setup
export const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(hashLocationPlugin);

// Register each state
const states = [
    {
        name: 'login',
        url: '/login',
        component: Login1
    },
    {
        name: 'register',
        url: '/register',
        component: Register
    },
    {
        name: 'home',
        url: '/home',
        component: Home
    },
    {
        name: 'learning',
        url: '/learning',
        component: Learning
    },
    {
        name: 'drawing',
        url: '/drawing',
        component: Drawing
    },
    {
        name: 'profile',
        url: '/profile',
        component: Profile
    }
];
states.forEach(state => router.stateRegistry.register(state));

// Set initial and fallback states
router.urlService.rules.initial({ state: 'login' });
router.urlService.rules.otherwise({ state: 'login' });

// Start the router
//router.start();