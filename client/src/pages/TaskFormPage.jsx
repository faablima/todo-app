import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, GetTask } from '../api/task.api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function TaskFormPage() {
    const { register, handleSubmit, formState: {
        errors
    }, setValue } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const postSubmit = handleSubmit( async (data) => {
        try {
            // Exibir toast de carregamento
            const loadingToastId = toast.loading('Saving task...', {
              position: 'top-right',
              style: {
                background: '#101010',
                color: '#fff'
              }
            });

            if (params.id){
                await updateTask(params.id, data)

                toast.success('Task update', {
                    id: loadingToastId, // Remove o toast de carregamento pelo ID
                    position: 'top-right',
                    style: {
                    background: '#101010',
                    color: '#fff'
                    }
                });
            } else {
                await createTask(data)

                 // Remover toast de carregamento e exibir toast de sucesso
                toast.success('Task Created', {
                    id: loadingToastId, // Remove o toast de carregamento pelo ID
                    position: 'top-right',
                    style: {
                    background: '#101010',
                    color: '#fff'
                    }
                });
                
            }
            navigate("/tasks");

        } catch (error) {
            // Em caso de erro, exibir toast de erro
            toast.error('Error to save a task.', {
              position: 'top-right',
              });
          }
    });

    useEffect( () => {
        async function loadTask() {
            if(params.id){
                const {data: {title, description}} = await GetTask(params.id);
                setValue('title', title);
                setValue('description', description);
            }
        }
        loadTask();
    }, []);

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={postSubmit}>
                <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Title"
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>Title is required</span>}

                <textarea  
                    rows="3"
                    {...register("description", { required: true })} 
                    placeholder="Description"
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3' 
                />
                {errors.description && <span>Description is required</span>}

                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>
            </form>

            {params.id && (
                <div className='flex justify-end'>
                    <button className='bg-red-500 p-3 rounded-lg w-48 mt-3' onClick={async () => {
                        const accepted = window.confirm('Are you sure?')
                        if (accepted) {
                            try {
                                // Exibir toast de carregamento
                                const loadingToastId = toast.loading('Deleting task...', {
                                position: 'top-right',
                                style: {
                                    background: '#101010',
                                    color: '#fff'
                                }
                                });

                                await deleteTask(params.id);
                                
                                // Remover toast de carregamento e exibir toast de sucesso
                                toast.success('Deleted Task', {
                                    id: loadingToastId, // Remove o toast de carregamento pelo ID
                                    position: 'top-right',
                                    style: {
                                    background: '#101010',
                                    color: '#fff'
                                    }
                                });

                                navigate('/tasks');
                            } catch (error) {
                                // Em caso de erro, exibir toast de erro
                                toast.error('Error to excluded a task.', {
                                position: 'top-right',
                                });
                            }
                            }
                        }
                    }
                    >
                    Delete
                    </button>
                </div>
            )}
        </div>
    )
}