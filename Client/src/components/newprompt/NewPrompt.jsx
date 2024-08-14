import "./newprompt.css";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
function NewPrompt() {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });
const endRef = useRef(null);

useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KEY_POINT}
          path={img.dbData?.filePath}
          width="200px"
        />
      )}
      <div className="endchat" ref={endRef}></div>
      <form className="newForm">
        <Upload setImg={setImg}></Upload>
        <input type="text" placeholder="Ask me Anything.." />
        <button>
          <FaLongArrowAltUp className="icon" />
        </button>
      </form>
    </>
  );
}

export default NewPrompt;
