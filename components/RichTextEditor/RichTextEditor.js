'use client';
import { useRef, useEffect, useCallback } from 'react';
import styles from './RichTextEditor.module.css';

const TOOLS = [
  { label: 'B',      title: 'Bold',           cmd: 'bold',           style: { fontWeight: 'bold' } },
  { label: 'I',      title: 'Italic',         cmd: 'italic',         style: { fontStyle: 'italic' } },
  { label: 'U',      title: 'Underline',      cmd: 'underline',      style: { textDecoration: 'underline' } },
  { label: 'H1',     title: 'Heading 1',      cmd: 'formatBlock',    value: 'H1' },
  { label: 'H2',     title: 'Heading 2',      cmd: 'formatBlock',    value: 'H2' },
  { label: 'H3',     title: 'Heading 3',      cmd: 'formatBlock',    value: 'H3' },
  { label: '≡',      title: 'Bullet list',    cmd: 'insertUnorderedList' },
  { label: '1.',     title: 'Numbered list',  cmd: 'insertOrderedList' },
  { label: '✕',      title: 'Clear format',   cmd: 'removeFormat' },
];

export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  // Sync external value into editor only on first mount
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exec = useCallback((cmd, val) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val || null);
    // Fire onChange after command
    if (onChange) onChange(editorRef.current?.innerHTML || '');
  }, [onChange]);

  const handleInput = () => {
    if (onChange) onChange(editorRef.current?.innerHTML || '');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        {TOOLS.map((t) => (
          <button
            key={t.title}
            type="button"
            title={t.title}
            className={styles.toolBtn}
            style={t.style}
            onMouseDown={(e) => {
              e.preventDefault(); // keep editor focus
              exec(t.cmd, t.value);
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder="Write product description here…"
      />
    </div>
  );
}
