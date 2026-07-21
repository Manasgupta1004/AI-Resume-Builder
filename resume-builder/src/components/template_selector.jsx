import { Check, Layout } from 'lucide-react'
import React from 'react'

const template_selector = ({ selected_template, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const templates = [
    {
      id: 'Classic',
      name: 'Classic',
      preview: 'A clean, traditional resume format with clear section and professional typography'
    },
    {
      id: 'Mordern',
      name: 'Mordern',
      preview: 'Sleek design with strategic use of color and mordern font choice'
    },
    {
      id: 'Minimal-Image',
      name: 'Minimal-Image',
      preview: 'Minimal design with a singale image and clean typography'
    },
    {
      id: 'Minimal',
      name: 'Minimal',
      preview: 'Ultra-clean design that puts yoour content front and center'
    },
  ]
  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm
             text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring
             cursor-pointer transition-all px-3 py-2 rounded-lg'>
        <Layout className='size-4' /> <span className='max-sm:hidden'>Template</span>
      </button>
      {isOpen && (
        <div className='absolute top-full left-0 min-w-[300px] p-3 mt-2 space-y-3 z-50 bg-white rounded-md border border-gray-200 shadow-lg max-h-[400px] overflow-y-auto'>
          {templates.map((template) => (
            <div className={`relative p-3 border rounded-md cursor-pointer transition-all
               ${selected_template === template.id ? 'border-blue-400 bg-blue-100' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-100'}`}
                key={template.id}
              onClick={() => { onChange(template.id); setIsOpen(false) }}
            >
              {selected_template === template.id && (
                <div className='absolute top-2 right-2'>
                  <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                    <Check className='w-3 h-3 text-white' />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className='font-medium text-gray-800'>{template.name}</h4>
                <div className='mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic'>{template.preview}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default template_selector
