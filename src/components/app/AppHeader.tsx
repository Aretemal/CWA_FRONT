import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, HomeOutlined, DownOutlined, BookOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../redux/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menu = (
        <Menu>
            <Menu.Item key="1">Профиль</Menu.Item>
            <Menu.Item key="2">Главная</Menu.Item>
            <Menu.Item key="3">Моя библиотека</Menu.Item>
            <Menu.Item
                onClick={() => dispatch(setAccessToken(null))}
                key="4"
            >
                Выйти
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ background: '#001529', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="mr-5" style={{ color: '#fff', fontSize: '20px', marginLeft: '20px' }}>
            ЛитераТек
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
                <Menu.Item 
                onClick={() => navigate('/main')}
                key="1" icon={<BookOutlined />}
                >
                    Книги
                </Menu.Item>
                <Menu.Item
                onClick={() => navigate('/bookmarks')}
                key="2"
                 icon={<BookOutlined />}>
                    Закладки
                </Menu.Item>
            </Menu>
            <div style={{ marginRight: '20px' }}>
                <Dropdown overlay={menu} trigger={['hover']}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                        <span style={{ color: '#fff' }}>Имя Фамилия</span>
                        <DownOutlined style={{ color: '#fff', marginLeft: '4px' }} />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default AppHeader;