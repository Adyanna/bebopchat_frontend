import ChatPage from '@features/chats/pages/chat-page/chat-page';
import ChatEmpty from '@features/chats/pages/chat-empty/chat-empty';
import ChatWindow from '@features/chats/pages/chat-window/chat-window';
import ContactsPage from '@features/contacts/pages/contacts-page';
import StatusPage from '@features/status/pages/status-page';
import UnderConstructionPage from '@core/components/under-construction/under-construction-page';
import React from 'react';
import { createBrowserRouter } from 'react-router';
import { redirect } from 'react-router';
import App from '@core/components/app/App';


import { ProtectedRoute } from '@core/guards/protected-route';
import { NotFoundPage } from '@core/components/not-found/not-found';
//const App = React.lazy(() => import('@core/components/app/App'));
const HomePage = React.lazy(() => import('@features/home/pages/home-page/home-page'));
const ServicesPage = React.lazy(() => import('@features/home/pages/services-page/services-page'));
const AboutPage = React.lazy(() => import('@features/home/pages/about-page/about-page'));
const ProfilePage = React.lazy(() => import('@features/profile/pages/profile-page'));

//const App = React.lazy(() => import('@core/components/app/App'));
const SignupPage = React.lazy(
  () => import('@features/auth/pages/signup/signup-page')
);
const SigninPage = React.lazy(() => import('@features/auth/pages/signin/signin-page'));

export const Router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect('/home'),
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: ProtectedRoute,
      },
      {
        path: 'chats',
        element: <ChatPage />,
        loader: ProtectedRoute,
        children: [
          {
            index: true,
            element: <ChatEmpty />,
            loader: ProtectedRoute,
          },
          {
            path: ':id',
            element: <ChatWindow />,
            loader: ProtectedRoute,
          },
        ],
      },

      {
        path: 'contacts',
        element: <ContactsPage />,
        loader: ProtectedRoute,
      },
      {
        path: 'status',
        element: <StatusPage />,
      },
      {
        path: 'games',
        element: (
          <UnderConstructionPage
            title="Juegos en construcción"
            description="Estamos preparando juegos para que puedas divertirte y compartir nuevos momentos con tus contactos."
          />
        ),
      },
      {
        path: 'calls',
        element: (
          <UnderConstructionPage
            title="Las llamadas llegarán pronto"
            description="Estamos trabajando en las llamadas para que puedas comunicarte con tus contactos directamente desde BebopChat."
          />
        ),
      },
    ],
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login',
    element: <SigninPage />,
  },
  {
    path: '/logout',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);