import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline'; // For underline
import TextAlign from '@tiptap/extension-text-align'; // For alignment
import Color from '@tiptap/extension-color'; // For font color
import Highlight from '@tiptap/extension-highlight'; // For background color
import BulletList from '@tiptap/extension-bullet-list'; // For bullet points
import OrderedList from '@tiptap/extension-ordered-list'; // For ordered lists
import ListItem from '@tiptap/extension-list-item'; // Required for list items
import FontFamily from '@tiptap/extension-font-family'; // For font family

import { FaBold, FaItalic } from 'react-icons/fa';
import { Redo, UnderlineIcon, Undo } from 'lucide-react';


const fontFamilies = [
    'Arial',
    'Times New Roman',
    'Georgia',
    'Courier New',
    'Verdana',
    'Tahoma',
];


const Tiptap = ({ content, onContentChange }) => {
    // Initialize the editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle, // Enables text styling
            FontSize,  // Enables font size changes
            Bold,      // Enables bold text
            Italic,    // Enables italic text
            Underline, // Enable underline
            TextAlign.configure({ types: ['heading', 'paragraph'] }), // Enable text alignment
            Color, // Enable font color
            Highlight, // Enable background highlight
            BulletList, // Enable unordered list
            OrderedList, // Enable ordered list
            ListItem, // Required for list functionality
            FontFamily.configure({
                types: ['textStyle'], // Required for font family styling
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            onContentChange(html);
        },
        editorProps: {
            attributes: {
                class: 'prose focus:ring focus:ring-blue-500 px-4 py-2 text-gray-900 dark:text-gray-50 min-h-[80px] border border-gray-300 rounded ',
            },
        },

    });

    // Apply formatting through editor commands
    const setBold = () => editor.chain().focus().toggleBold().run();
    const setItalic = () => editor.chain().focus().toggleItalic().run();
    const setFontSize = (size) => editor.chain().focus().setFontSize(size).run();
    const setFontFamily = (font) => editor.chain().focus().setFontFamily(font).run();
    const setUnderline = () => editor.chain().focus().toggleUnderline().run();
    const setTextAlign = (alignment) => editor.chain().focus().setTextAlign(alignment).run();
    const setTextColor = (color) => editor.chain().focus().setColor(color).run();
    const setHighlight = (color) => editor.chain().focus().toggleHighlight({ color: color }).run();
    const setBulletList = () => editor.chain().focus().toggleBulletList().run();
    const setOrderedList = () => editor.chain().focus().toggleOrderedList().run();
    const undo = (e) => { e.preventDefault(); editor.chain().focus().undo().run(); console.log('undo') };
    const redo = () => editor.chain().focus().redo().run();


    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div>
            {/* Toolbar */}
            <div className="border px-5 py-1 rounded-sm mb-1 shadow-sm flex items-center space-x-2">
                <button
                    type="button"
                    className="border px-2 py-1 rounded font-bold hover:bg-gray-200 hover:ring-1"
                    onClick={undo}
                >
                    <Undo size={15} />
                </button>
                <button
                    type="button"
                    className="border px-2 py-1 rounded font-bold hover:bg-gray-200 hover:ring-1"
                    onClick={redo}
                >
                    <Redo size={15} />
                </button>
                {/* font family */}
                <div className="flex items-center space-x-2">
                    <select
                        className="border px-2 py-1 rounded hover:bg-gray-200 max-w-[150px] truncate text-sm"
                        onChange={(e) => setFontFamily(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select Font Family
                        </option>
                        {fontFamilies.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                                {font}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type='button'
                    className='border px-2 py-1 rounded font-bold hover:bg-gray-200 hover:ring-1'
                    onClick={setBold}
                >
                    <FaBold size={15} />
                </button>
                <button
                    type='button'
                    className='border px-2 py-1 rounded font-bold hover:bg-gray-200 hover:ring-1'
                    onClick={setItalic}
                >
                    <FaItalic size={15} />
                </button>
                <button
                    type='button'
                    className='border px-2 py-1 rounded font-bold hover:bg-gray-200 hover:ring-1'
                    onClick={setUnderline}
                >
                    <UnderlineIcon size={15} />
                </button>
                <select onChange={(e) => setFontSize(e.target.value)} className="dropdown text-xs p-1 border-gray-200">
                    <option value="12px">12px</option>
                    <option value="16px">16px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                </select>
            </div>
            <EditorContent editor={editor} />

            {/* Editor */}
        </div>
    );
};

export default Tiptap;
