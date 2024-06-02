import { Textarea, Button } from "@nextui-org/react";
import './App.css'
import { useEffect, useState } from "react";
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type Prediction = {
  text: string;
  classficiation: string;
}

const samplePrediction: Prediction[] = [{
  text: 'There are a variety of emerging applications for NLP, including the following:, voice-controlled computer interfaces (such as in aircraft cockpits), programs that can assist with planning or other tasks ,, more-realistic interactions with computer-controlled game characters, robots that interact with humans in various settings such as hospitals, automatic analysis or summarization of news stories and other text, intelligence and surveillance applications (analysis of communication, etc. ), data mining, creating consumer profiles, and other ecommerce applications, search-engine improvements, such as in determining relevancy',
  classficiation: 'Human-written'
}]

function App() {

  const [prediction, _setPredicition] = useState<Prediction[]>(samplePrediction)
  const [textInput, setTextInput] = useState<string>('')

  const predictionMutation = useMutation(
    {
      mutationFn: (text: string) => {
        return axios.post('http://localhost:5000/predict', text)
      },
    }
  )

  useEffect(() => {
    console.log({ error: predictionMutation.error, data: predictionMutation.data, loading: predictionMutation.isPending })
  }, [predictionMutation])
  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        {prediction.map((p, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "row",
            width: '600px',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}>
            <Textarea value={p.text} disabled variant="faded" />
            <p>{p.classficiation}</p>
          </div>
        ))}
        <div
          style={{
            marginTop: '20px',
            display: "flex",
            flexDirection: "row",
            width: '600px',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <Textarea
            placeholder="Enter text to classify"
            style={{ width: '390px' }}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <Button onClick={() => {
            console.log({ textInput })
            predictionMutation.mutate(textInput)
          }}>Classify</Button></div>
      </div>
    </div>
  )
}

export default App

