import { EditorState, ContentState } from "draft-js";
import { markdownToDraft, draftToMarkdown } from "markdown-draft-js";

// Convert markdown to draft.js editorstate
export const markdownToEditorState = (markdown) => {
    const contentState = markdownToDraft(markdown);
    return EditorState.createWithContent(contentState);
}

// Convert Draft.js EditorState to markdown
export const editorStateToMarkdown = (editorState) => {
    const contentState = editorState.getCurrentContent();
    return draftToMarkdown(contentState);
}