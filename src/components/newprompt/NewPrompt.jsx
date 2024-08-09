import "./newprompt.css";
import { IoMdAttach } from "react-icons/io";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useEffect, useRef } from "react";
function NewPrompt() {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="endchat" ref={endRef}></div>
      <form className="newForm">
        <label htmlFor="file" multiple={false}>
          <IoMdAttach className="icon" />
        </label>
        <input type="file" id="file" hidden />
        <input type="text" placeholder="Ask me Anything.." />
        <button>
          <FaLongArrowAltUp className="icon" />
        </button>
      </form>
    </>
  );
}

export default NewPrompt;
