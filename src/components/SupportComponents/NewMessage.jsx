import React from 'react'

const NewMessage = () => {
  return (
    <form className="new-message">
      <input type="text" placeholder="Subject"/>
      <textarea rows="5" placeholder="Type a message" />
      <button type="submit" className="hrm-btn clr-blue">Send</button>
    </form>
  )
}

export default NewMessage;