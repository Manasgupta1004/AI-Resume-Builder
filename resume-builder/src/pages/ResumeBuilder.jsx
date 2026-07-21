import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResumePreview from '../components/resume_preview'
import dummyResumeData from '../assets/assets'
import PersonalInfo from '../components/personal_info'
import { ArrowLeftIcon, EyeIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeOffIcon, FileText, FolderIcon, FoldVerticalIcon, GraduationCap, Share2, Sparkle, User } from 'lucide-react'
import TemplateSelector from '../components/template_selector'
import ColorPicker from '../components/color_picker'
import ProfessionalSummary from '../components/professional_summary'
import ExperienceForm from '../components/exprience_form'
import EducationForm from '../components/education_form'
import ProjectForm from '../components/project_form'
import SkillsForm from '../components/skills_form'
const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = React.useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'Classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const loadExitingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0)
  const [removeBackground, setRemoveBackground] = React.useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Exprience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkle }
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExitingResume()
  }, [])

  const changeResumeVisibility = async () => {
    setResumeData({...resumeData, public: !resumeData.public})
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = frontendUrl + '/view/' + resumeId

    if(navigator.share){
      navigator.share({url: resumeUrl, text: 'My Resume'})
    }else{
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = () => {
    window.print();
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link className='inline-flex gap-1 items-center text-slate-500 hover:text-slate-700 transition-all'
          to={'/app'}>
          <ArrowLeftIcon className='size-4' />back to Dashboard
        </Link>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* left panel - form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }}
                className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' />
              {/* section navigation */}
              <div className='flex items-center justify-between mb-6 border-b border-gray-300 py-1'>
                <div className='flex justify-center gap-2'>
                  <TemplateSelector selected_template={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker Selected_Color={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex > 0 && (
                    <button onClick={() => { setActiveSectionIndex(activeSectionIndex - 1) }} disabled={activeSectionIndex === 0} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'>
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}
                  <button onClick={() => { setActiveSectionIndex(activeSectionIndex + 1) }} disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50
                      transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}>
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>
              {/* form content */}
              <div className='space-y-6'>
                {
                  activeSection.id === 'personal' && (
                    <div>
                      <PersonalInfo removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}
                        data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} />
                    </div>
                  )
                }
                {
                  activeSection.id === 'summary' && (
                    <div>
                      <ProfessionalSummary data={resumeData.professional_summary}
                        onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                        setResumeData={setResumeData} />
                    </div>
                  )
                }
                {
                  activeSection.id === 'experience' && (
                    <div>
                      <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                    </div>
                  )
                }
                {
                  activeSection.id === 'education' && (
                    <div>
                      <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                    </div>
                  )
                }
                {
                  activeSection.id === 'project' && (
                    <div>
                      <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                    </div>
                  )
                }
                {activeSection.id === 'skills' && (
                  <div>
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                  </div>
                )
                }
              </div>
              <button className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>


          {/* right panel - preview*/}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className="relative w-full">
              {/* buttons */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button onClick={handleShare}
                    className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2 className='size-4' />Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors">
                  {
                    resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />
                  }
                  {
                    resumeData.public ? 'Public' : 'Private'
                  }
                </button>
                <button onClick={downloadResume}
                 className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                  <DownloadIcon className='size-4' />Download
                </button>
              </div>
            </div>
            {/* resume preview */}
            <ResumePreview data={resumeData} accentColor={resumeData.accent_color} template={resumeData.template} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
