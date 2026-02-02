'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});

export default function MarkdownEditor({ value, onChange }) {
    const editorRef = useRef(null);

    const options = {
        spellChecker: false,
        placeholder: 'Write your blog content in Markdown...',
        status: ['lines', 'words', 'cursor'],
        toolbar: [
            'bold',
            'italic',
            'heading',
            '|',
            'quote',
            'unordered-list',
            'ordered-list',
            '|',
            'link',
            'image',
            '|',
            'preview',
            'side-by-side',
            'fullscreen',
            '|',
            'guide',
        ],
        minHeight: '400px',
        maxHeight: '600px',
    };

    return (
        <div className="markdown-editor-wrapper">
            <SimpleMDE
                value={value}
                onChange={onChange}
                options={options}
                ref={editorRef}
            />
        </div>
    );
}
