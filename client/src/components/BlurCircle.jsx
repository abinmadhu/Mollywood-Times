import React from 'react'

const BlurCircle = ({top = "auto", left= "auto" , right='right', bottom='auto'}) => {
  return (
    <div className='absolute -z-50 blur-[100px] w-[200px] h-[200px] bg-secondary/80 opacity-50' style={{top, left, right, bottom}}>

    </div>
  )
}

export default BlurCircle