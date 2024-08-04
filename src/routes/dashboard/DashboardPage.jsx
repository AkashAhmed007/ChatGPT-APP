import "./dashboard.css";
function DashboardPage() {
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
        <form>
          <input type="text" placeholder="Ask me anything..." />
          <button>
            <img src="" alt="arrow" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;
