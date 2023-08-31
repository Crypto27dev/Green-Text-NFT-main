
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import GreenText from './components/GreenText';
import exportAsImage from './utils/exportAsImage';

import './css/index.css';

function App() {
    const gtContainer = useRef();
    const dispatch = useDispatch();
    const account = useSelector(state => state.account);

    const [imgData, setImgData] = useState({
        src: '',
        size: 0,
        type: 'none'
    });

    const mintNFT = () => {
        exportAsImage(gtContainer.current, (image) => {
            dispatch({ type: "MINT", payload: { image: image } });
        });
    };

    const selectImageFile = (event) => {
        const file = event.target.files[0];
        setImgData({
            src: URL.createObjectURL(file),
            size: Math.ceil(file.size / 1000),
            type: file.type.split('/')[1].toUpperCase(),
        });
    };

    const handleConnect = async () => {
        console.log("Dispatching CONNECT...");
        if (window.ethereum) {
            await window.ethereum.enable();
            dispatch({
                type: 'CONNECT',
                payload: {}
            });
        } else {
            toast.info('Please install metamask on your device', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="App">
            <div className="m-auto w-[90%] md:w-[512px]">
                <div className="w-full mt-5 flex flex-row items-center">
                    {
                        account ? 
                        <div className="mx-auto">{account}</div>
                        :
                        <button className="button" onClick={handleConnect}>Connect Wallet</button>
                    }
                </div>
                <div className="w-full mt-1 flex flex-row justify-between">
                    <input type="file" id="myImage" onChange={selectImageFile} hidden />
                    <label htmlFor="myImage" className="mx-auto button">Select Image</label>
                    <button className="mx-auto button" onClick={mintNFT}>Mint</button>
                </div>
                <GreenText ref={gtContainer}>
                    <GreenText.Header />
                    <GreenText.Body imgData={imgData} />
                </GreenText>
            </div>
        </div>
    );
}

export default App;
