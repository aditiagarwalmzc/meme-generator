import { useState, useEffect, useRef } from "react";
import './main.css';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import * as htmlToImage from 'html-to-image';

export default function Main() {
    const [formData, setFormData] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1otk96.jpg"
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const [allMemes, setAllMemes] = useState([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setFormData(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    // DOWNLOAD BUTTON
    const handleDownload = () => {
        const container = document.getElementById("meme");
        html2canvas(container, {
          scale: 25, // Set scale to 25x for full HD resolution (1920x1080)
          useCORS: true // Enable CORS to allow screenshot of external images
        }).then(canvas => {
          canvas.toBlob(blob => saveAs(blob, "download.png"));
        });
    };

    // const printRef = useRef();
    // const handleDownload = async () => {
    //     const element = printRef.current;
    //     const canvas = await html2canvas(element);
    
    //     const data = canvas.toDataURL('image/jpg');
    //     const link = document.createElement('a');
    
    //     if (typeof link.download === 'string') {
    //       link.href = data;
    //       link.download = 'image.jpg';
    
    //       document.body.appendChild(link);
    //       link.click();
    //       document.body.removeChild(link);
    //     } else {
    //       window.open(data);
    //     }
    //   };

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top Text"
                    name="topText"
                    value={formData.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom Text"
                    name="bottomText"
                    value={formData.bottomText}
                    onChange={handleChange}
                />
                <button className="form-button" onClick={getMemeImage}>Get a random Image</button>
            </div>
            <div id="meme" className="meme">
                <img src={formData.randomImage} className="meme-image"/>
                <h1 className="meme-text top-text">{formData.topText}</h1>
                <h1 className="meme-text bottom-text">{formData.bottomText}</h1>
            </div>
            <button onClick={handleDownload}>Download Image</button>
        </main>
    )
}