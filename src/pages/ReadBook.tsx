import React, { useEffect, useState } from "react";
import { fetchAllBooks, AllBooksResponse, BookObject, fetchBookFile } from "../api/books/books";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthToken } from "../redux/slices/auth/authSelectors";
import { useMutation } from "@tanstack/react-query";
import { setAccessToken } from "../redux/slices/auth/authSlice";
import { Button, Card, Col, Flex, Row, Tooltip } from "antd";
import { Document, Page, pdfjs } from "react-pdf";

import "pdfjs-dist/build/pdf.worker.mjs";
import { TextItem, TextMarkedContent } from "pdfjs-dist/types/src/display/api";
import { OnPageLoadSuccess } from "react-pdf/dist/cjs/shared/types";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function ReadBook() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const query = useQuery();
    const bookId = query.get('book'); // Получаем значение параметра id
    const accessToken = useSelector(getAuthToken);

    const [book, setBook] = useState<string>('');
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [textContent, setTextContent] = useState<JSX.Element[]>([]); 

    const mutation = useMutation<{ file: string }, { message: string }, { token: string, id: string }>(
        {
            mutationFn: fetchBookFile,
            onSuccess: (data) => {
                console.log(data?.file)
                setBook(data?.file)
            },
            onError: (error: { message: string }) => {
                console.log('Login failed:', error.message);
            },
        }
    );

    const initFunc = () => {
        mutation.mutate({ token: accessToken, id: bookId || '' });
    };

    useEffect(() => {
        if (accessToken && bookId) {
            initFunc();
        }
    }, [accessToken, bookId])

    const pdfData = `data:application/pdf;base64,${book}`;

    
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const renderWords = (text: string) => {
        return text.split(/\s+/).map((word, index) => (
            <Tooltip title={word} key={index}>
                <span style={{ marginRight: 4 }}>{word}</span>
            </Tooltip>
        ));
    };
    
    
    const extractText = (items: (TextItem | TextMarkedContent)[]) => {
        return items
            .filter((item): item is TextItem => 'str' in item) // Type guard to filter only TextItem
            .map(item => item.str)
            .join(' ');
    };
    
    return (
        <div style={{ padding: '20px' }}>
            {book ? (
                <>
                    <Document
                        file={pdfData}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => console.error('Error loading PDF:', error)}
                    >
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false} // Disable default text layer rendering
                            onGetTextSuccess={(b) => console.log(b)}
                            onLoadSuccess={(a) => {
                                console.log(a)
                                // try {
                                //     getTextContent().then(({ items }) => {
                                //         console.log(items)
                                //         const text = extractText(items); // Use extractText to get valid strings
                                //         setTextContent(renderWords(text));
                                //     })
                                // } catch(err) {
                                //     console.error('Error getting text content:', err);
                                // }
                            }}
                        />
                    </Document>
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(pageNumber - 1)}
                        >
                            Назад
                        </Button>
                        <Button
                            disabled={pageNumber >= (numPages || 1)}
                            onClick={() => setPageNumber(pageNumber + 1)}
                            style={{ marginLeft: '10px' }}
                        >
                            Вперёд
                        </Button>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        {textContent}
                    </div>
                </>
            ) : (
                <p>Загрузка книги...</p>
            )}
        </div>
    );
}