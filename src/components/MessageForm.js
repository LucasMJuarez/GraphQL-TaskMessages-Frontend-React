import React, { useState } from 'react'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


//crea una funcion y luego internamente hace la llamada a la rut ade grahql
const CREATE_MESSAGE = gql`
    mutation CreateMessage( 
        $title: String!, 
        $content: String!,
        $author: String!
    )  
    {
        createMessage(title: $title, content: $content,
        author: $author){
            _id
        }
    }

    
`


const MessageList = () => {

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [createMessage] = useMutation(CREATE_MESSAGE)



    return (
        <div className="container p-5">
            <div className="row p-5">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={async e => {
                                e.preventDefault();
                                await createMessage({ variables: { title, author, content } })
                                window.location.href = "/"
                            }}>

                                <div className="form-group">
                                    <input type="text"
                                        placeholder="Author"
                                        className="form-control"
                                        required
                                        value={author}
                                        onChange={e => setAuthor(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        placeholder="Write a Title"
                                        className="form-control"
                                        required
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea name="2" placeholder="Content..."
                                        className="form-control"
                                        required
                                        value={content}
                                        onChange={e => setContent(e.target.value)}></textarea>
                                </div>
                                <button className="btn btn-success btn-block">
                                    Save
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>

    )
}

export default MessageList;