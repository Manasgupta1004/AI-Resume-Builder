import { FilePenIcon, FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, UploadIcon, XIcon } from 'lucide-react'
import React from 'react'
import DummyResumeData from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [allResumes, setAllResumes] = React.useState([])
  const [ShowCreateResume, setShowCreateResume] = React.useState(false)
  const [showUploadResume, setShowUploadResume] = React.useState(false)
  const [title, settitle] = React.useState('')
  const [resume, setresume] = React.useState(null)
  const [resumeToEdit, setResumeToEdit] = React.useState(false)
  const navigate = useNavigate()
  const colors = ["#9333ea", '#d97706', '#dc2626', '#0284c7', '#16a34a', '#dc2424']

  const loadAllResumes = () => {
    setAllResumes(DummyResumeData)
  }

  const createResume = (e) => {
    e.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/${title}`)
  }
  const uploadResume = (e) => {
    e.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/${title}`)
  }
  const updateTitle = (e) => {
    e.preventDefault()
  }
  const deleteresume = (resumeid) => {
    const confirm = window.confirm("Are you sure you want to delete this resume?")
    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeid))
    }
  }
  React.useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium bg-gradient-to-r bg-clip-text text-transparent sm:hidden from-slate-600 to-slate-700 text-transparent bg-clip-text mb-6'>Welcome, Joe Doe</p>
        <div className='flex gap-4'>
          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500
             text-white rounded-full' />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-all'>Create Resume</p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg
          gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg
          transition-all duration-300 cursor-pointer'>
            <UploadIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300
                to-purple-500 text-white rounded-full'/>
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Uplode Existing.</p>
          </button>
        </div>
        <hr className='border-slate-300 my-6 sm:w-[305px]' />
        <div className='grid grid-cols-2 sm:flex gap-6'>
          {
            allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length]
              return (
                <button onClick={() => navigate(`/app/builder/${resume._id}`)} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center 
                justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                  style={{ background: `linear-gradient(136deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}>
                  <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
                  <p>{resume.title}</p>
                  <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500
                      transition-all duration-300 px-2 text-center'
                    style={{ color: baseColor + '90' }}>Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div onClick={e => e.stopPropagation()} className='top-1 right-1 absolute group-hover:flex item-center hidden'>
                    <TrashIcon onClick={()=>{deleteresume(resume._id)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                    <PencilIcon onClick={() => { setResumeToEdit(resume._id), settitle(resume.title) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                  </div>
                </button>
              )
            })
          }
        </div>
        {
          ShowCreateResume && (
            <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-4'>
                <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                <input onChange={(e) => settitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' required className='w-full px-4 py-2 mb-4 focus:border-green-600
                      ring-green-600 border-2 border-gray-300 rounded outline-none' />
                <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
                <XIcon onClick={() => { setShowCreateResume(false), settitle('') }} className='absolute top-4 right-4 text-slate-400
                       hover:text-slate-600 cursor-pointer transition-colors' />
              </div>
            </form>
          )
        }
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-4'>
              <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
              <input onChange={(e) => settitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' required className='w-full px-4 py-2 mb-4 focus:border-green-600
                      ring-green-600 border-2 border-gray-300 rounded outline-none' />
              <div>
                <label htmlFor="resume-input" className='block text-sm text-slate-700'>Select resume file
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400
                  border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500
                  hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className='text-green-700'>{resume.name}</p>
                    ) : <><UploadCloud className='size-14 stroke-1' />
                      <p>Upload resume</p>
                    </>}
                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => setresume(e.target.files[0])} />
              </div>
              <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
              <XIcon onClick={() => { setShowUploadResume(false), settitle('') }} className='absolute top-4 right-4 text-slate-400
                       hover:text-slate-600 cursor-pointer transition-colors' />
            </div>
          </form>
        )}
        {
          resumeToEdit && (
            <form onSubmit={updateTitle} onClick={() => setResumeToEdit('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-4'>
                <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
                <input onChange={(e) => settitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' required className='w-full px-4 py-2 mb-4 focus:border-green-600
                      ring-green-600 border-2 border-gray-300 rounded outline-none' />
                <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
                <XIcon onClick={() => { setResumeToEdit(''), settitle('') }} className='absolute top-4 right-4 text-slate-400
                       hover:text-slate-600 cursor-pointer transition-colors' />
              </div>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard
