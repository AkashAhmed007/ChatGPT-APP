import "./newprompt.css";
import PropTypes from "prop-types";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/geminiAI";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function NewPrompt({ data }) {
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const endRef = useRef(null);
  const formRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset()
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {}
          });
        });
    },
  });

  const add = async (text) => {
    setQuestion(text);
    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, text] : [text]
    );
    try {
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate()
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
  };
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
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endchat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg}></Upload>
        <input type="file" id="file" multiple={false} hidden></input>
        <input type="text" name="text" placeholder="Ask me Anything.." />
        <button>
          <FaLongArrowAltUp className="icon" />
        </button>
      </form>
    </>
  );
}
NewPrompt.propTypes = {
  data: PropTypes.func,
};
export default NewPrompt;
