import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import Picture from './Picture'

const pics = [
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
  const [readyPics, setReadyPics] = useState(pics)
  const [boardPics, setBoardPics] = useState([])
  const [, drop] = useDrop(() => ({
    accept: 'pic',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      console.info('say one')
      addImageToBoard(item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }))

  const [, notBoardDrop] = useDrop(() => ({
    accept: 'pic',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      console.info('say two')
      addImageToBoard(item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }))

  const addImageToBoard = (id) => {
    const pic = pics.find((pic) => id === pic.id)

    setBoardPics((board) => [...new Set([...board, pic])])
    setReadyPics(pics => pics.filter(pic => pic.id !== id))
  }

  const handleSwapPics = (pic1Id, pic2Id) => {
    const pic1Index = readyPics.findIndex(pic => pic.id === pic1Id)
    const pic2Index = readyPics.findIndex(pic => pic.id === pic2Id)

    setReadyPics(readyPics => {
      const nextReadyPics = [...readyPics]

      // FIXME: Can only work within ready pics
      if (readyPics[pic1Index] && readyPics[pic2Index]) {
        nextReadyPics[pic2Index] = readyPics[pic1Index]
        nextReadyPics[pic1Index] = readyPics[pic2Index]
      }

      return nextReadyPics
    })
  }

  return (
    <>
      <div className='Pictures'>
        {readyPics.map((pic) => {
          return <Picture key={pic.id} url={pic.url} id={pic.id} onSwapPics={handleSwapPics} />
        })}
      </div>
      <div className='Board' ref={drop}>
        <div style={{width: '200px', height: '200px', border: '1px solid black'}} ref={notBoardDrop}></div>
        {boardPics.map((pic) => {
          return <Picture key={pic.id} url={pic.url} id={pic.id} />
        })}
      </div>
    </>
  )
}

export default DragDrop