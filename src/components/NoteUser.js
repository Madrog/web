import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

// import our GET_ME query
import { GET_ME } from '../gql/query';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if theere is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    return (
        <React.Fragment>
            Favorites: {props.note.favoriteCount}
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edit</Link>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default NoteUser;

