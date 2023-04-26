import { MdSend } from "react-icons/md";
import EmptyChat from "../../assets/images/empty_chat.svg";

const ChatBoard = () => {
  return (
    <div className="chat-board">
      <h3>Subject</h3>
      <div className="chat-container">
        <div className="chat-box">
          <div className="empty-chat">
            <img src={EmptyChat} alt="Empty Chat" />
          </div>
        </div>
        <form>
          <input
            type="text"
            placeholder="Type a message"
          // disabled
          />
          <button
            style={{ margin: "6px" }}
            type="submit"
          // disabled
          >
            <MdSend size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBoard;
