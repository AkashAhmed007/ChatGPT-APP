import { Link } from "react-router-dom";
import "./chatlist.css";
import { useQuery } from "@tanstack/react-query";
function ChatList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json())
  });

  return (
    <div className="chatlist">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore RESHMI AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending? "Loading..." : error ? "something went wrong":
          data?.map((chat)=>
            (<Link key={chat._id} to={`/dashboard/chats/${chat._id}`}>{chat.title}</Link>)
          )
        }
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.PNG" alt="logo" />
        <div className="text">
          <span>Upgrate to RESMI AI Pro</span>
          <span>Get Unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
