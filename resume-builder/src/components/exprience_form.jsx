import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React from 'react'
import api from '../configs/api'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const exprience_form = ({ data, onChange }) => {

    const { token } = useSelector(state => state.auth)
    const [isGeneratingIndex, setIsGeneratingIndex] = useState(-1)


    const addexperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false
        }
        onChange([...data, newExperience])
    }
    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }
    const updatedExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = {
            ...updated[index], [field]: value
        }
        onChange(updated)
    }

    const generateDescription = async (index) => {
        setIsGeneratingIndex(index)
        const experience = data[index]
        const propmt = `enhace this job description ${experience.description} for the position of
         ${experience.position} at ${experience.company}.`
        try {
            const { data } = await api.post('/api/ai/enhance-job-desc', {
                userContent: propmt
            }, { headers: { Authorization: token } })
            updatedExperience(index, 'description', data.enhancedContent)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setIsGeneratingIndex(-1)
        }
    }
    return (
        <div className='space-y-4'>
            <div className="flex items-center justify-between">
                <div className="">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        Professional experience
                    </h3>
                    <p className="text-sm text-gray-500">Add your job experience here.</p>
                </div>
                <button onClick={addexperience} className="flex items-center gap-2 px-3 py-1 text-sm
                 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors ">
                    <Plus className='size-4' />Add Experience
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No work experience added yet.</p>
                    <p>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {
                        data.map((experience, index) => (
                            <div className='p-4 border border-gray-200 rounded-lg space-y-3' key={index}>
                                <div className="flex items-start justify-between">
                                    <h4> Experience #{index + 1}</h4>
                                    <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                        <Trash2 className='size-4' />
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <input value={experience.company || ''} onChange={(e) => updatedExperience(index, 'company', e.target.value)}
                                        type="text" placeholder="Company Name" className='border border-gray-300 px-3 py-2 text-sm rounded-lg' />
                                    <input value={experience.position || ''} onChange={(e) => updatedExperience(index, 'position', e.target.value)}
                                        type="text" placeholder="Job Title" className='border border-gray-300 px-3 py-2 text-sm rounded-lg' />
                                    <input type="month" value={experience.start_date || ''}
                                        onChange={(e) => updatedExperience(index, 'start_date', e.target.value)}
                                        className='border border-gray-300 px-3 py-2 text-sm rounded-lg' />
                                    <input type="month" disabled={experience.is_current} value={experience.end_date || ''}
                                        onChange={(e) => updatedExperience(index, 'end_date', e.target.value)}
                                        className='border border-gray-300 px-3 py-2 disabled:bg-gray-100 text-sm rounded-lg' />
                                </div>
                                <label className='flex items-center gap-2 text-sm text-gray-600 mt-5'>
                                    <input className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                        onChange={(e) => { updatedExperience(index, 'is_current', e.target.checked ? true : false) }}
                                        type='checkbox' checked={experience.is_current || false} />
                                    <span className="text-sm text-gray-700">Currently Working Here.</span>
                                </label>
                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between mt-5'>
                                        <label className='text-sm font-semibold text-gray-700'>Job Description</label>
                                        <button disabled={isGeneratingIndex === index || !experience.position || !experience.company} onClick={() => generateDescription(index)} className="flex items-center gap-1 px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                                            {isGeneratingIndex === index ? (<Loader2 className='animate-spin h-3 w-3' />) : <Sparkles className='w-3 h-3' />}
                                            Enhance with AI
                                        </button>
                                    </div>
                                    <textarea rows={4} value={experience.description || ''}
                                        onChange={(e) => updatedExperience(index, 'description', e.target.value)}
                                        className='w-full text-sm px-3 py-2 rounded-lg border border-gray-300 resize-none'
                                        placeholder='Describe your key responsibilities and achievements...' />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default exprience_form
