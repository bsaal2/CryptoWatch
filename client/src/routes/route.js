import React from 'react';

const Home = React.lazy(() => import('../views/pages/Home'));
const Watchlist = React.lazy(() => import('../views/pages/Watchlist'));
const Notification = React.lazy(() => import('../views/pages/Notification'));

const routeList = [
    {
        path: '/', 
        name: 'home',
        component: <Home /> 
    },
    {
        path: '/watchlist',
        name: 'watchlist',
        component: <Watchlist />
    },
    {
        path: '/notification',
        name: 'notification',
        component: <Notification />
    }
];

export default routeList;