import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import { gql } from 'apollo-boost';

const GET_MESSAGES = gql`
   {
    messages {
        _id
        title
        content
        author
    }
}
`;
const DELETE_MESSAGE = gql`
    mutation DeleteMessage(
        $_id: ID!
    )
    {
        deleteMessage(_id: $_id){
            _id
        }

    }

`


const MessageList = () => {

    const [deleteMessage] = useMutation(DELETE_MESSAGE)



    const { loading, error, data } = useQuery(GET_MESSAGES)
    if (loading) return <p>Loading Messages...</p>
    if (error) {
        return (
            <p>Error</p>
        )
    }
    return (
        <div className="row p-5" >
            <div className="col-md-6 offset-md-3 p-5">
                {
                    data.messages.map(({ _id, title, content, author }) => (
                        <div key={_id} className="card border-primary text-white bg-primary mb-3 ">
                            <div className="card-body text-white mb-3 ">
                                <h4 className="card-title text-white">{title}</h4>
                                <p>{content}</p>
                                <p>{author}</p>
                                <button className="btn btn-outline-danger btn-sm mr-3" onClick={async e => {
                                    e.preventDefault();
                                    await deleteMessage({ variables: { _id, title, content, author } })
                                    window.location.href = '/'
                                }} >
                                    Delete Message
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageList;