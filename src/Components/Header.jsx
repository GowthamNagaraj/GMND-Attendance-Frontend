import React from 'react'

export const Header = ({header,subHeader}) => {
  return (
      <div className="flex flex-col gap-y-2">
          <h1 className="text-4xl font-bold text-sky-800">{header}:</h1>
          <p className="text-lg font-medium">{subHeader}</p>
      </div>
  )
}
