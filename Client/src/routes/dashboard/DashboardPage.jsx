import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboard.css";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
 const queryClient = useQueryClient()
 const navigate = useNavigate()
 
 const mutation = useMutation({
  mutationFn: (text)=>{
  return fetch(`${import.meta.env.VITE_API_URL}/api/chats`,{
      method: 'POST',
      credentials:'include',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({text})
    }).then(res=>res.json())
  },
  onSuccess: (id) => {
    queryClient.invalidateQueries({ queryKey: ['userChats'] })
    navigate(`/dashboard/chats/${id}`)
  },
})
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;
    mutation.mutate(text)
  }
  return (
    <div className="dashboardpage">
      <div className="text">
        <div className="logo">
          <img src="/logo.PNG" alt="logo" />
          <h1>RESMI AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/img2.jpg" alt="" />
            <span>Create a new Chat</span>
          </div>
          <div className="option">
            <img src="/img3.jpg" alt="" />
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src="/bannerimage.jpg" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
          <FaLongArrowAltUp className="arrow" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;
