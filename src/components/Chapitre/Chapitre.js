
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';

export default function Chapitre() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const docRef = doc(db, 'Chapitres', id);
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id });
        });
    }, []);
    return (
        <div className="container border bg-light" style={{ marginTop: 70 }}>
            {article && (
                <div className="row">
                    <div className="col-3">
                        <img src={article.imageUrl} alt={article.title} style={{ width: '100%', padding: 10 }} />
                    </div>
                    <div className="col-9 mt-3">
                        <h2>{article.title}</h2>
                        <h5>Author: {article.createdBy}</h5>
                        <div> Posted on: {article.createdAt.toDate().toDateString()}</div>
                        <hr />
                        <h4>{article.description}</h4>

                        
                    </div>
                </div>
            )}
        </div>
    );
}