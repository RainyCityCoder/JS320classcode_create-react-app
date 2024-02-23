import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import db from '../db';

export default function AddJournal() {
    const [entry, setEntry] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        setEntry('');
        const entriesRef = collection(db, 'journalEntries');
        addDoc(entriesRef, {
            entry,
            createdAt: new Date()
        });
    }

    return (
        <div>
            <h2>Add Journal</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="entry-input">Entry: </label>
                <textarea
                    id="entry-input"
                    value={entry}
                    onChange={e => setEntry(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
