'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useId } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
}

function ToolbarButton({
  onClick,
  active,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      style={{
        padding: '2px 8px',
        borderRadius: 4,
        fontSize: '0.875rem',
        fontWeight: 500,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.15s, color 0.15s',
        backgroundColor: active ? '#6D0091' : 'transparent',
        color: active ? '#FFFFFF' : '#242729',
      }}
      onMouseEnter={e => {
        if (!active) (e.currentTarget.style.backgroundColor = '#E5E7EB');
      }}
      onMouseLeave={e => {
        if (!active) (e.currentTarget.style.backgroundColor = 'transparent');
      }}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ content, onChange, label }: RichTextEditorProps) {
  const editorId = useId();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': label || 'Rich text editor',
        style: 'max-width:none; padding:12px; min-height:120px; outline:none; background:#FFFFFF; color:#242729;',
        class:
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 ' +
          '[&_h2]:text-lg [&_h2]:font-semibold [&_h3]:text-base [&_h3]:font-semibold [&_p]:mb-1',
      },
    },
    onUpdate({ editor: e }) {
      onChange(e.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!editor) return null;

  return (
    <div
      style={{
        border: '1px solid #D1D5DB',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Toolbar */}
      <div
        role="toolbar"
        aria-label="Formatting options"
        aria-controls={editorId}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          padding: '6px 8px',
          backgroundColor: '#F9FAFB',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          label="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          label="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <div style={{ width: 1, backgroundColor: '#D1D5DB', margin: '0 4px' }} aria-hidden="true" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          label="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          label="Heading 3"
        >
          H3
        </ToolbarButton>
        <div style={{ width: 1, backgroundColor: '#D1D5DB', margin: '0 4px' }} aria-hidden="true" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          label="Bullet list"
        >
          &bull; List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          label="Numbered list"
        >
          1. List
        </ToolbarButton>
      </div>
      {/* Editor */}
      <div id={editorId}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export { arrayToHtml, htmlToArray } from './richTextHelpers';
