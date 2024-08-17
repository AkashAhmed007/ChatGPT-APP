import { IKContext, IKUpload } from "imagekitio-react";
import { IoIosAttach } from "react-icons/io";

import PropTypes from "prop-types";
import { useRef } from "react";
const urlEndpoint = import.meta.env.VITE_IMAGE_KEY_POINT;
const publicKey = import.meta.env.VITE_IMAGE_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function Upload({ setImg }) {
  const imgUploadRef = useRef(null);

  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file)
  };
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        useUniqueFileName={true}
        style={{ display: "none" }}
        ref={imgUploadRef}
      />

      <label onClick={() => imgUploadRef.current.click()}>
        <IoIosAttach />
      </label>
    </IKContext>
  );
}
Upload.propTypes = {
  setImg: PropTypes.func,
};
export default Upload;
