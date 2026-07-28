import React from 'react'
import { Plus, Trash2} from 'lucide-react'

const project_form = ({ data, onChange }) => {
    const Addproject = () => {
        const newproject = {
            name: '',
            type: '',
            description: '',
        }
        onChange([...data, newproject])
    }
    const removeproject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updatedproject = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    console.log("project data", data)
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Project</h3>
                    <p className="">Add your Projects</p>
                </div>
                <button onClick={Addproject} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100
                 text-green-700 rounded hover:bg-green-200 transition-colors'>
                    <Plus className='size-4' /> Add Project
                </button>
            </div>
            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div className='p-4 border border-gray-200 rounded-lg space-y-3' key={index}>
                        <div className='flex justify-between items-start'>
                            <h4>Project #{index + 1}</h4>
                            <button onClick={() => removeproject(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className='size-4' />
                            </button>
                        </div>
                        <div className='grid  gap-3'>
                            <input value={project.name || ''} onChange={(e) => updatedproject(index, 'name', e.target.value)}
                                type="text" placeholder='Project Name' className='border rounded-lg border-gray-300 px-3 py-2 text-sm ' />
                            <input value={project.type || ''} onChange={(e) => updatedproject(index, 'type', e.target.value)}
                                type="text" placeholder='Project Type' className='border rounded-lg border-gray-300 px-3 py-2 text-sm ' />
                            <textarea rows={4} value={project.description || ''} onChange={(e) => updatedproject(index, 'description', e.target.value)}
                                type="text" placeholder='Desribe your project...' border className=' border border-gray-300 w-full px-3 py-2 text-sm rounded-lg resize-none' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default project_form
