import React, { useState, useEffect } from "react";
import ReactMde from "react-mde";
import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorState } from "draft-js";
import { Editor } from "draft-js";
import { markdownToEditorState, editorStateToMarkdown } from "../utils/contentConversion";

const DualEditor = ({ initialContent, onContentChange }) => {
    const [currentTab, setCurrentTab] = useState('write');
    const [markdownContent, setMarkdownContent] = useState(initialContent || '');
    const [draftEditorState, setDraftEditorState] = useState(() => {
        return initialContent ? markdownToEditorState(initialContent) : EditorState.createEmpty();
    })

    useEffect(() => {
        if (currentTab === 'rich') {
            const markdown = editorStateToMarkdown(draftEditorState);
            setMarkdownContent(markdown);
            onContentChange(markdown);
        }
    }, [draftEditorState])

    useEffect(() => {
        if (currentTab === 'rich') {
            const newEditorState = markdownToEditorState(markdownContent);
            setDraftEditorState(newEditorState);
        }
    }, [currentTab])

    const handleMarkdownChange = (value) => {
        setMarkdownContent(value);
        onContentChange(value);
    }

    const handleDraftChange = (state) => {
        setDraftEditorState(state);
    }

    return (
        <div>
            <div className="flex mb-2">
                <button
                    className={`px-4 py-2 mr-2 rounded ${
                        currentTab === 'write' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setCurrentTab('write')}
                >
                    Markdown Editor
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        currentTab === 'rich' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => setCurrentTab('rich')}
                >
                    Rich Text Editor
                </button>
            </div>
            {currentTab === 'write' || currentTab === 'preview' ? (
                <ReactMde
                    value={markdownContent}
                    onChange={handleMarkdownChange}
                    selectedTab={currentTab}
                    onTabChange={(tab) => setCurrentTab(tab === 'preview' ? 'write' : 'write')}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(<div className="prose">{markdown}</div>)
                    }
                    minEditorHeight={200}
                    heightUnits="px"
                />
            ) : (
                <div className="border border-gray-300 rounded p-2 min-h-[200px]">
                    <Editor
                        editorState={draftEditorState}
                        onChange={handleDraftChange}
                        placeholder="Write your content here..."
                    />
                </div>
            )}
        </div>
    )
}

export default DualEditor;