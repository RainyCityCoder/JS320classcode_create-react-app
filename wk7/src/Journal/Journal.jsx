import React, { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../db';
import { Link } from 'react-router-dom';
import AddJournal from './AddJournal';

export default function Journal() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // const getData = async () => {
        //     const querySnapshot = await getDocs(
        //         collection(db, 'journalEntries')
        //     );
        // };

        // getData();
        // getDocs(
        //     collection(db, 'journalEntries')
        // ).then(
        //     snapshot => {
        //         // snapshot.forEach(doc => {
        //         //     console.log(
        //         //         doc.id, doc.data()
        //         //     );
        //         // });
        //         setEntries(snapshot.docs);
        //         setLoading(false);
        //     },
        //     reason => {
        //         setError(true);
        //         setLoading(false);
        //     }
        // );

        const entriesQuery = query(
            collection(db, 'journalEntries'),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(
            entriesQuery,
            snapshot => {
                setEntries(snapshot.docs);
                setLoading(false);
            },
            reason => {
                setError(true);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if (error) {
        return <p>An error occurred, please try again.</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Journal</h1>
            <AddJournal />
            {entries.map(entry => {
                return (
                    <div key={entry.id}>
                        <p>{entry.data().entry}</p>
                        <span>
                            <Link to={`/journal/${entry.id}`}>View</Link>
                        </span>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
}
