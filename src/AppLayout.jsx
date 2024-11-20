import React from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Login from './components/auth/Login';
import { getAuthToken } from './redux/slices/auth/authSelectors';
import { Flex } from 'antd';
import AppHeader from './components/app/AppHeader';
import BooksMain from './pages/BooksMain';
import ReadBook from './pages/ReadBook';

function AppLayout() {
  const location = useLocation();

  return (
    <Flex
      className='w-full !h-screen'
      style={{
        height: '100vh'
      }}
      vertical
    >
      <AppHeader />
      <Flex
        className='w-full h-full'
      >
        <Routes>
          <Route
            path="/main"
            element={<BooksMain/>}
          />
          <Route
            path='/books'
            element={<ReadBook />}
          />
          <Route
            path='/bookmarks'
            element={<div />}
          />
        </Routes>
      </Flex>
    </Flex>
  );
}

export default AppLayout;
