import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios';
import parse from "html-react-parser";
import "./RefreshButton.css"
import refresh from "../assest/refresh.svg"




const configuration = new Configuration({
  apiKey: "sk-iM25gxxxx6pIJMuWzaW3T3BlbkFJ2ChMBug2PdyG6JW5mIp5"
});

const openai = new OpenAIApi(configuration);

function RefreshButton({ promptString, refreshKey }) {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const chapGPT = async (prompt) => {
      setIsLoading(true);

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a Master Chef, Generate a Real meal/dish/snack/food based on the collected data provided. Provide a detailed description of the dish and clear cooking instructions. note: Always return the data in html ie headings and paragraph so i can render it in a div and use h2 for the title"
          },
          { role: "user", content: prompt }
        ]
      });

      setResponses([response["data"]["choices"][0]["message"]["content"]]);

      const searchTerm = response["data"]["choices"][0]["message"]["content"].match(/<h2>(.*?)<\/h2>|<p>(.*?)<\/p>/);
      if (searchTerm) {
        const API_KEY = 'AIzaSyD9Pv32lZcs2sJwdwr08pX1NdSPTkJOkgQ'
        const SEARCH_ENGINE_ID = '53f6af5cd93114e8e'

        const responseImage = await axios.get(
          `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${searchTerm[1] || searchTerm[2]}&searchType=image`
        );

        setImageUrl(responseImage.data.items[0].link);
      }

      setIsLoading(false);
    };

    chapGPT(promptString);
  }, [promptString, refreshKey]);

  const parsedResponses = responses.map(htmlString => {
    const parsedHtml = parse(htmlString);
    const h3Index = parsedHtml.findIndex(element => element.type === 'h3');

    if (h3Index !== -1 && imageUrl) {
      const defaultStyle = { maxWidth: '500px', maxHeight: '400px' };
      const mediaQueryStyle = { maxWidth: '400px', maxHeight: '300px' };

      parsedHtml.splice(h3Index, 0, <img src={imageUrl} alt="search result" 
        style={Object.assign({}, defaultStyle, { "@media screen and (minWidth: 768px)": mediaQueryStyle })} />);
    }

    return parsedHtml;
  });

  return (
    <>
      <div className="center">
        {/* <button className="refresh-btn" onClick={handleClick}>
          <img src={refresh} alt="Refresh" className="refreshbtn"/>
        </button> */}
        {isLoading && (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        )}
      </div>
    
      <div style={{ textAlign: 'center' }}>
        {parsedResponses}
      </div>
    </>  
  )
};

export default RefreshButton;