import React, { useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'

function Picture({ id, url, onSwapPics }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "pic",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const [, dropRef] = useDrop(() => ({
    accept: "pic",
    item: { id },
    drop: (item, monitor) => {
      console.info(monitor.getInitialSourceClientOffset())
      console.info(monitor.getSourceClientOffset())
      return onSwapPics?.(item.id, id)
    },
  }))

  return (
    <span ref={dropRef}>
      <img
        ref={drag}
        alt={url}
        src={url}
        width="150px"
        style={{ border: isDragging ? "5px solid pink" : "0px" }}
      />
    </span>
  )
}

export default Picture