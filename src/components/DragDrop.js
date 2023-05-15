import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Picture from './Picture'

const Picturelist = [
  {
    id: 1,
    url: "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
  },
  {
    id: 2,
    url: "https://a-z-animals.com/media/2023/02/iStock-1353635479-1024x683.jpg"
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXujDVn0IMzRIlsJ0Ofs4XAVU4o2jKn8KLQ&usqp=CAU"
  },
]

function DragDrop() {
  const [board, setBoard] = useState([])
  const [{isOver}, drop] = useDrop(() => ({
    accept: 'pic',
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const addImageToBoard = (id) => {
    const picList = Picturelist.filter((pic) => id === pic.id)
    setBoard((board) => [...board, picList[0]])
  }

  return (
    <>
      <div className='Pictures'>{Picturelist.map((pic) => {
        return <Picture url={pic.url} id={pic.id} />
      })}</div>
      <div className='Board' ref={drop}>
        {board.map((pic) => {
          return <Picture url={pic.url} id={pic.id} />
        })}
      </div>
    </>
  )
}

export default DragDrop