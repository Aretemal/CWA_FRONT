import React, { useEffect, useState } from "react";
import { fetchAllBooks, AllBooksResponse, BookObject } from "../api/books/books";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../redux/slices/auth/authSelectors";
import { useMutation } from "@tanstack/react-query";
import { setAccessToken } from "../redux/slices/auth/authSlice";
import { Card, Col, Flex, Row } from "antd";

export default function BooksMain() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const accessToken = useSelector(getAuthToken);

    const [books, setBooks] = useState<BookObject[]>([]);
    
    const mutation = useMutation<AllBooksResponse, { message: string }, { token: string }>(
        {
            mutationFn: fetchAllBooks,
            onSuccess: (data: { data: BookObject[] }) => {
                setBooks(data.data);
            },
            onError: (error: { message: string }) => {
                console.error('Login failed:', error.message);
            },
        }
    );

    const initFunc = () => {
        mutation.mutate({ token: accessToken });
    };

    useEffect(() => {
        if (accessToken) {
            initFunc();
        }
    }, [accessToken])

    console.log(books)
    return ( <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        <Row gutter={16}>
            {books.map(book => (
                <Col span={6} key={book.id} style={{ marginBottom: '20px' }}>
                    <Card
                        hoverable
                        style={{
                            width: '100%',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                        cover={
                            <img
                                alt={book.title}
                                src="https://via.placeholder.com/300x400" // Дефолтное изображение книги
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        }
                        className="!p-0"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }}
                        onClick={() => navigate(`/books?book=${book.id}`)}
                    >
                        <Flex style={{
                            width: '100%',
                            // position: 'absolute',
                            // bottom: '10px',
                            // left: '10px',
                            color: '#fff',
                            backgroundColor: 'rgba(0, 21, 41, 0.7)',
                            padding: '8px',
                            borderRadius: '4px',
                            fontWeight: 'bold'
                        }}
                        justify="center"
                        className=""
                        >
                            {book.title}
                        </Flex>
                    </Card>
                </Col>
            ))}
        </Row>
    </div>)
}
