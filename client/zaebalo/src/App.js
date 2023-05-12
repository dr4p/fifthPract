import React, {useEffect, useState} from 'react';
import './App.css'
import axios from "axios";
import { Button, Modal} from 'react-bootstrap'


function App() {
    const [todos, setTodos] =  useState([]);
    //edit
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const handleEditClose = () => { SetEditShow(false) }
    const [RowData, SetRowData] = useState([])
    const [id,setId] = useState("");

    const handleEdit = async() =>{
        try {
            const Credentials = { title, description }
            await axios.patch(`http://localhost:3100/todos/${id}`, Credentials)
            await fetchData()
        } catch (e) {
            console.log(e)
        }
    }
    async function fetchData() {
        try {
            const res = await axios.get('http://localhost:3100/todos/')
            setTodos(res.data.todos)

            console.log('good!')
            console.log(todos)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        fetchData();
    }, [])

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const postData = async() => {
        try {
            await axios.post(`http://localhost:3100/todos/`, {
                title: title,
                description: description
            })
            await fetchData()
        } catch (e) {
            console.log(e)
        }
        }
    const deleteAll = async () => {
        try {
            await axios.delete(`http://localhost:3100/todos`)
            await fetchData()

        } catch (e) {
            console.log(e)
        }

    }
    const deletePost = async(id) => {
        try {
            await axios.delete('http://localhost:3100/todos/' + id)
            await fetchData()
        } catch (e) {
            console.log(e)
        }
    }

    return (<div>
        <div>
            <h1>TODO-LIST app</h1>
            <div className="input-container">
                <input type="text" id="input-field" placeholder="Write ur todo title here" onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" id="input-field" placeholder="Write ur todo description here" onChange={(e) => setDescription(e.target.value)}></input>
                <button type="button" id="submit-btn" onClick={postData}>Add</button>
                <Button variant='danger' onClick={deleteAll}>Delete all</Button></div>

                {
                    todos.map((post) => (
                    <div key={post.id} className="card">
                        <h2>{post.title}</h2>
                        <a>{post.description}</a>
                        <div className="button-container">
                            <a className="btn btn-primary" onClick={()=> {handleEditShow(SetRowData(post),setId(post.id))}}>Edit</a>
                            <a className="btn btn-danger" onClick={() => {deletePost(post.id)}}>Delete</a>
                        </div>
                    </div>))}

        </div>
    <div className='model-box-view'>
        <Modal
            show={ViewEdit}
            onHide={handleEditClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit ToDo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className='form-group'>
                        <label>Title</label>
                        <input type="text" className='form-control' onChange={(e) => setTitle(e.target.value)} placeholder="Please enter title" defaultValue={RowData.title}/>
                    </div>
                    <div className='form-group mt-3'>
                        <label>Description</label>
                        <input type="email" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder="Please enter description" defaultValue={RowData.description} />
                    </div>
                    <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Confrim</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleEditClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
</div>

    )


}

export default App;