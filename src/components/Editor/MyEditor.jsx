import React, { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';





const MyEditor = () => {
  const editor = useState(() => withHistory(withReact(createEditor())))[0];
  const [value, setValue] = useState(initialValue);

  const renderElement = (props) => <Element {...props} />;
  const renderLeaf = (props) => <Leaf {...props} />;



  return (
    <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Type here..."
      />
    </Slate>
  );

};


const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children }) => {
  return <span {...attributes}>{children}</span>;
};

export default MyEditor;
