import "./chatpage.css";
import NewPrompt from "../../components/newprompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
function ChatPage() {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();
  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatpage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "something went wrong"
            : data?.history?.map((message, i) => (
                <div key={i} className={message.role ==="user" ? "message user": "message"}>
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              ))}

          <NewPrompt data={data}></NewPrompt>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
