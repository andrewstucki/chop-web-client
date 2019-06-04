// @flow
import React, { useState, useEffect } from 'react';
import Download from '../icons/download';
import styled from 'styled-components';
import { EditorState } from 'draft-js';
import { Draftable, DraftableState, FORMAT_HTML, defaultToolbarConfig } from '@lifechurch/react-draftable';

type EventNotesProps = {
  eventNotes: string,
  generatePdf: (html:string) => void,
  updateEventNotes: (eventNotes:string) => void,
};

const Wrapper = styled.div`
   padding: 0 1rem;
   
   @media (min-width: 640px) {
    padding-top: 48px;
  }
`;

const EventNotes = ({ eventNotes, generatePdf, updateEventNotes }:EventNotesProps) => {
  const initialState = eventNotes ? DraftableState.createFromString(eventNotes,FORMAT_HTML) : EditorState.createEmpty();
  const [editorState, setEditorState] = useState<?EditorState>(initialState);

  const getEditorStateAsHTML = () => DraftableState.toString(editorState,FORMAT_HTML);
  const handleGeneratePdf = () => generatePdf(getEditorStateAsHTML());
  const handleEditorChange = (editorState:EditorState) => setEditorState(editorState);

  // Save the event notes on unmount
  useEffect(() => (
    () => updateEventNotes(getEditorStateAsHTML())
  ),[editorState]);

  const toolbarConfig = {
    ...defaultToolbarConfig,
    groups: [
      ...defaultToolbarConfig.groups,
      'download',
    ],
    download: [
      {
        label: 'Download',
        Icon: Download,
        type: 'custom',
        action: handleGeneratePdf,
      },
    ],
  };

  return (
    <Wrapper data-testid='eventNotes'>
      <Draftable initialState={initialState} onChange={handleEditorChange} toolbarConfig={toolbarConfig} />
    </Wrapper>
  );
};

export default React.memo<EventNotesProps>(EventNotes);
