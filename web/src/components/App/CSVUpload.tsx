import { useCallback } from 'react'

import { useDropzone } from 'react-dropzone'

const CSVUpload = ({ onSave }: { onSave: (value: any[]) => void }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      const csv = event.target.result

      const lines = (csv ? String(csv) : '')?.toLocaleLowerCase().split('\n')

      const result = []

      if (lines.includes(',')) {
        const headers = lines[0].split(',')

        for (let i = 1; i < lines.length; i++) {
          for (let j = 0; j < headers.length; j++) {
            if (![''].includes(headers[j])) {
              if (headers[j].replace('\r', '') !== '') {
                const data = headers[j].replace('\r', '').split(',')
                if (data[0])
                  result.push({
                    email: data[0],
                    name: data[1] ?? '',
                  })
              }
            }
          }
        }
      } else {
        for (let i = 0; i < lines.length; i++) {
          if (![''].includes(lines[i])) {
            if (lines[i].replace('\r', '') !== '') {
              const data = lines[i].replace('\r', '').split(',')
              if (data[0])
                result.push({
                  email: data[0],
                  name: data[1] ?? '',
                  twitter: data[2] ?? '',
                  phone: data[3],
                })
            }
          }
        }
      }

      onSave(result)
    }
    reader.readAsText(file)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      className="grid h-24   place-items-center rounded-lg border border-gray-800 bg-[#191919] p-5 text-sm text-gray-300"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop csv file here, or click to select files</p>
      )}
    </div>
  )
}

export default CSVUpload
