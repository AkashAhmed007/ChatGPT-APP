import { IKContext, IKUpload} from 'imagekitio-react';
import PropTypes from 'prop-types';
const urlEndpoint = import.meta.env.VITE_IMAGE_KEY_POINT;
const publicKey = import.meta.env.VITE_IMAGE_PUBLIC_KEY; 

const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/api/upload');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

function Upload({setImg}) {
    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        setImg((prev) => ({...prev, isLoading: false, dbData: res}))
      };

      const onUploadStart = () =>{
        setImg((prev) => ({...prev, isLoading: true}))
      }
  return (
    <div>
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
        />
      </IKContext>
    </div>
  )
}
Upload.propTypes = {
  setImg: PropTypes.func
};
export default Upload