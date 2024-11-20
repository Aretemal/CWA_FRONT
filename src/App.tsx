import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import { getAuthToken } from './redux/slices/auth/authSelectors';
import { Flex } from 'antd';
import AppLayout from './AppLayout';
import BooksMain from './pages/BooksMain';
import ReadBook from './pages/ReadBook';
import AppHeader from './components/app/AppHeader';

function App() {
  const accessToken = useSelector(getAuthToken);

  return (
    <Flex
      className='w-full !h-screen'
      style={{
        height: '100vh'
      }}
      vertical
    >
      {accessToken && <AppHeader />}
      <Flex
        className='w-full h-full'
      >
        <Routes>
          <Route path="/login" element={<Login />} />
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

export default App;
