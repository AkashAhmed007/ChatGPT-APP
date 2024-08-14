import "./newprompt.css";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/geminiAI";
import Markdown from 'react-markdown'
function NewPrompt() {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData:{}
  });
const [question,setQuestion]= useState('')
const [answer,setAnswer]= useState('')
const endRef = useRef(null);

useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question,answer,img.dbData]);

const add = async (text)=>{
  setQuestion(text)
  const result = await model.generateContent(Object.entries(img.aiData).length ? [img.aiData, text]:[text]);
  const response = await result.response;
   setAnswer(response.text());
   setImg({
    isLoading: false,
    error: "",
    dbData: {},
    aiData:{}
  })
}
const handleSubmit = async (e)=>{
  e.preventDefault()
  const text = e.target.text.value;
  if(!text) return;
  add(text)
}
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
        {question && <div className="message user">{question}</div>}
        {answer && <div className="message"><Markdown>{answer}</Markdown></div>}
      <div className="endchat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg}></Upload>       
        <input type="file" id='file' multiple={false} hidden></input>
        <input type="text" name="text" placeholder="Ask me Anything.." />
        <button>
          <FaLongArrowAltUp className="icon" />
        </button>
      </form>
    </>
  );
}

export default NewPrompt;
