import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import db from '../db';

export default function JournalEntry() {
    const { id } = useParams();
    const [entry, setEntry] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const entryRef = doc(db, 'journalEntries', id);
        getDoc(entryRef).then(docSnap => {
            setLoading(false);

            if (docSnap.exists()) {
                // store in state
                setEntry(docSnap.data());
            } else {
                // show error
                setError(true);
            }
        });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error, that document may not exist</p>;
    }

    return (
        <div>
            <h1>Journal Entry: {id}</h1>
            {entry.entry}
        </div>
    );
}
