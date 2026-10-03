import ChatPage from '@features/chats/pages/chat-page/chat-page';
import ChatEmpty from '@features/chats/pages/chat-empty/chat-empty';
import ChatWindow from '@features/chats/pages/chat-window/chat-window';
import React from 'react';
import { createBrowserRouter } from 'react-router';
import { redirect } from 'react-router';
import App from '@core/components/app/App';


// import { ProtectedRoute } from '@core/guards/protected-route';
// import { NotFoundPage } from '@core/components/not-found/not-found';
//const App = React.lazy(() => import('@core/components/app/App'));
const HomePage = React.lazy(() => import('@features/home/pages/home-page/home-page'));
const ServicesPage = React.lazy(() => import('@features/home/pages/services-page/services-page'));
const AboutPage = React.lazy(() => import('@features/home/pages/about-page/about-page'));
const ProfilePage = React.lazy(() => import('@features/profile/pages/profile-page'));

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
      },
      {
        path: 'chats',
        element: <ChatPage />,
        children: [
          {
            index: true,
            element: <ChatEmpty />,
          },
          {
            path: ':id',
            element: <ChatWindow />,
          },
        ],
      },

      // {
      //   path: 'products/:id',
      //   element: <ProductDetailPage />,
      // },
      // {
      //   path: 'products/new',
      //   loader: ProtectedRoute,
      //   element: <ProductNew />,
      // },
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

  /*
  {
    path: '/logout',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  */
]);