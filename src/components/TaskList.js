import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import { gql } from 'apollo-boost';

const GET_TASKS = gql`
    {
        tasks {
            _id
            title
            description
        }
    }`;

const DELETE_TASK = gql`

    mutation DeleteTask(
        $_id: ID!
    )
    {
        deleteTask(_id: $_id){
            _id
        }

    }
`;



const TaskList = () => {

    const [deleteTask] = useMutation(DELETE_TASK)

    const { loading, error, data } = useQuery(GET_TASKS)
    if (loading) return <p>Loading Messages...</p>
    if (error) {
        return (
            <p>error</p>
        )
    }
    return (
        <div className="container p-5">
            <div className="row" >
                <div className="col-md-6 offset-md-3 p-4 ">
                    {
                        data.tasks.map(({ _id, title, description }) => (
                            <div key={_id} className="card border-primary text-white bg-dark mb-3">
                                <div className="card-body text-white mb-3">
                                    <h4 className="card-title text-white">{title}</h4>
                                    <p>{description}</p>
                                    <button className="btn btn-outline-danger btn-sm" onClick={async e => {
                                        e.preventDefault();
                                        await deleteTask({ variables: { _id, title, description } })
                                        window.location.href = '/tasks'
                                    }} >
                                        Delete Task
                                </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default TaskList

