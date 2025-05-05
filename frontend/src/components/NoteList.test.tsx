import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteList from './NoteList';
import { Note } from '../types';

describe('NoteList', () => {
  test('renders list of notes correctly', () => {
    const mockNotes: Note[] = [
      { id: '1', text: 'First Note', timestamp: 1609459200000 }, // Jan 1, 2021
      { id: '2', text: 'Second Note', timestamp: 1609545600000 } // Jan 2, 2021
    ];
    
    render(<NoteList notes={mockNotes} />);
    
    // Check that notes are rendered
    expect(screen.getByText('First Note')).toBeInTheDocument();
    expect(screen.getByText('Second Note')).toBeInTheDocument();
    
    // Check that empty state is not shown
    expect(screen.queryByText(/no notes yet/i)).not.toBeInTheDocument();
  });
  
  test('renders empty state when no notes are provided', () => {
    render(<NoteList notes={[]} />);
    
    expect(screen.getByText(/no notes yet/i)).toBeInTheDocument();
  });
});