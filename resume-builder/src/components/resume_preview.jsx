import React from 'react'
import MordernTemplate from '../assets/templates/ModernTemplate'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import MinimalImage from '../assets/templates/MinimalImageTemplate'
import Minimal from '../assets/templates/MinimalTemplate'

const resume_preview = ({data, template, accentColor, classes = ''}) => {
    const renderTemplate = () => {
        switch(template){
            case 'Mordern':
                return <MordernTemplate data={data} accentColor={accentColor} />
            case 'Classic':
                return <ClassicTemplate data={data} accentColor={accentColor} />
            case 'Minimal':
                return <Minimal data={data} accentColor={accentColor} />
            default:
                return <MinimalImage data={data} accentColor={accentColor} />    
        }
    }
  return (
    <div className='w-full bg-gray-100'>
      <div id="resume-preview" className={'border border-gray-200 print:shadow-none print:border-none' + classes}>
        {renderTemplate()}
      </div>
      <style>
        {`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {

          /* Hide all page content */
          body * {
            visibility: hidden !important;
          }

          /* Only resume visible */
          #resume-preview, #resume-preview * {
            visibility: visible !important;
          }

          /* Force A4 layout */
          html, body {
            width: 210mm;
            height: 297mm;
            padding: 0;
            margin: 0;
            background: white !important;  
            overflow: hidden !important;
          }

          /* Resume page style */
          #resume-preview {
            position: absolute !important;
            left: 0;
            top: 0;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0;
            padding: 0;
            background: white !important;
            box-shadow: none !important;
            background: white !important;  
            border: none !important;
          }
        }
        `}
      </style>
    </div>
  )
}

export default resume_preview
