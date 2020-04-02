import React, { useState } from 'react'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


const CREATE_TASKS = gql`
    mutation CreateTask(
        $title: String!,
        $description: String!
    ){
        createTask(title: $title, description: $description)
        {
            _id
        }
    }

`;


const TaskList = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createTask] = useMutation(CREATE_TASKS)

    return (
        <div className="container p-5">
            <div className="row p-5">
                <div className="col-md-6 offset-md-3">
                    <div className="card" >
                        <div className="card-body ">
                            <form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    await createTask({ variables: { title, description } })
                                    window.location.href = "/tasks"

                                }}>
                                <div className="form-group">
                                    <input type="text" placeholder="Title"
                                        className="form-control"
                                        required="true"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)} />

                                </div>
                                <div className="form-group">
                                    <textarea name="3" placeholder="Description ..."
                                        className="form-control"
                                        required="true"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>

                                    <button className="btn btn-info btn-block" >
                                        Save Task
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TaskList