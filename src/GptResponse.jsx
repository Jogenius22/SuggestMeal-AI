import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

function GptResponse() {
  
  const prompt = `FormData`;
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chapGPT = async (prompt) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an AI Master Chef, Generate a meal/dish/snack/food type name based on the collected data provided. If no answers were given, assume there are no restrictions. Provide a description of the dish and clear cooking instructions. Finally, please leave this with the user. If there are no matches to the specifications provided, inform the user that no meal could be found.."
          },
          { role: "user", content: prompt }
        ]
      });
      setResponses([response["data"]["choices"][0]["message"]["content"]
      ]);
    };

    
  };

  
}

export {responses};