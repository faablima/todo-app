import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export const GetAllTasks = () => {
    return taskApi.get('/')
}

export const GetTask = (id) => {
    return taskApi.get(`/${id}/`)
}

export const createTask = (task) => {
    return taskApi.post('/', task)
}

export const deleteTask = (id) => {
    return taskApi.delete(`/${id}`)
}

export const updateTask = (id, task) => {
    return taskApi.put(`/${id}/`, task)
}