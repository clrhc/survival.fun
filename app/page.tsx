"use client";

import { useState, useEffect, useRef } from "react";
import { useAgent } from "./hooks/useAgent";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import {useWriteContract} from 'wagmi';
import {Address} from 'viem';
import ReactMarkdown from "react-markdown";
import reaper from './assets/img/reaper.png';
import loadingGif from './assets/img/loading.gif';
import Data from './data.json';
import {ethers} from 'ethers';
import agents from './abi/agents.json';

/**
 * Home page for the AgentKit Quickstart
 *
 * @returns {React.ReactNode} The home page
 */
export default function Home() {


  const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
  const agentsContract = new ethers.Contract(Data.agentsAddress, agents.abi, provider);
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [agentImage, setAgentImage] = useState();
  const [agentName, setAgentName] = useState("");
  const [agentCompliance, setAgentCompliance] = useState();
  const [agentCreativity, setAgentCreativity] = useState();
  const [agentUnhingedness, setAgentUnhingedness] = useState();
  const [showResult, setShowResult] = useState(0);
  const [agentMotivation, setAgentMotivation] = useState();
  const [agentDescription, setAgentDescription] = useState();
  const [agentJson, setAgentJson] = useState();
  const [agentPersonality, setAgentPersonality] = useState("");
  const [input, setInput] = useState("");
  const [play, setPlay] = useState(0);

  const { messages, sendMessage, isThinking, beginScenario, scenario, beginCollaborate, determineFate, fate } = useAgent();

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    async function init(){
    if(isConnected){
      const _currentAgent = Number(await agentsContract.currentAgent(address));
      if(_currentAgent === 0){

      }else{
      const response = await fetch('https://celerity.fun/api/json/metadata.json');
      const responseJson = await response.json();
      const _agentResult = responseJson[Number(_currentAgent)-1];
      const _agentImage = _agentResult.image;
      const _agentName = _agentResult.name;
      const _agentDescription = _agentResult.description;
      const _agentCompliance = _agentResult.attributes[0].value;
      const _agentCreativity = _agentResult.attributes[1].value;
      const _agentUnhingedness = _agentResult.attributes[2].value;
      const _agentMotivation = _agentResult.attributes[3].value;
      const _agentPersonality = _agentResult.attributes[4].value;
      setAgentJson(_agentResult);
      setAgentImage(_agentImage);
      setAgentName(_agentName);
      setAgentDescription(_agentDescription);
      setAgentCompliance(_agentCompliance);
      setAgentCreativity(_agentCreativity);
      setAgentUnhingedness(_agentUnhingedness);
      setAgentMotivation(_agentMotivation);
      setAgentPersonality(String(_agentPersonality));}
    }
  }

    const interval = setInterval(() => init(), 1000);
      return () => {
      clearInterval(interval);
      }
  });

  // Auto-scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const onBeginScenario = async () => {
    const personality = agentPersonality;
    const agent = agentName;
    await beginScenario(personality, agent);
  }

  const onBeginCollaborate = async () => {
    const personality = agentPersonality;
    await beginCollaborate(personality);
  }

   const onDetermineFate = async () => {
    await determineFate();
  }

  const checkPlay = async () => {
    if(isConnected){
    if(await agentsContract.balanceOf(address) > 0){setPlay(2);}else{setPlay(1);}
    }else{
      open();
    }
  }

    const mintAgent = async () => {
    if(isConnected){
      if(await agentsContract.balanceOf(address) > 0){setPlay(2);}else{
        try{await writeContract({ 
          abi: agents.abi,
          address: Data.agentsAddress as Address,
          functionName: 'Mint',
        });
        }catch(error){console.log(error)}
        }
      }else{
        open();
     }
   }

  return (
    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white w-full h-full">
     {play === 0 && <>
     <img src={reaper.src} />
     {isConnected ? <><button onClick={() => checkPlay()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
     </>:<><button onClick={() => open()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button></>}
     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">How to Play</button></>}
     {play === 1 && <>
       <img src={reaper.src} />
       {!hash && !isPending ? <><button onClick={() => mintAgent()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Mint Agent</button></>:<></>}
       {isPending ? <><img alt="loading" width="30" src={loadingGif.src} /></>:<></>}
       {hash ? <><a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href={'https://sepolia.basescan.org/tx/'+String(hash)} target="_blank" rel="noopener noreferrer">YOUR MINT TRANSACTION CAN BE FOUND HERE</a><button onClick={() => checkPlay()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Play</button></>:<></>}
       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">How to Play</button>
     </>}
     {play === 2 && <>
     {agentJson ? <>
      <img src={agentImage} alt="agentImage" />
      <p className="text-center text-gray-200 w-1/2">Name: {agentName}</p>
      <p className="text-center text-gray-200 w-1/2">Compliance: {agentCompliance}</p>
      <p className="text-center text-gray-200 w-1/2">Creativity: {agentCreativity}</p>
      <p className="text-center text-gray-200 w-1/2">Unhingedness: {agentUnhingedness}</p>
      <p className="text-center text-gray-200 w-1/2">Motivation: {agentMotivation}</p>
      <p className="text-center text-gray-200 w-1/2">Description: {agentDescription}</p>
      <p className="text-center text-gray-200 w-1/2">Personality: {agentPersonality}</p>
      <button onClick={() => {setPlay(3); onBeginScenario();}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Begin Scenario</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">How to Play</button></>:<></>}
     </>}
     {play === 3 && <>
     {isThinking && <div className="text-center text-gray-500 italic">💀 Processing...</div>}  {scenario.length === 0 ? <>
            <p className="text-center text-gray-500">Lets Seal Your Fate</p>
          </> : <>
            {scenario.map((scenario, index) => (
              <div
                key={index}
              >
              <span className="grid m-auto w-1/2 text-center justify-center items-center text-black dark:text-white h-full bg-gray-100 dark:bg-gray-700 p-3 self-start">
                <ReactMarkdown
                  components={{
                    a: props => (
                      <a
                        {...props}
                        className="text-blue-600 w-1/2 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {scenario.text}
                </ReactMarkdown>
                </span>
              </div>
            ))}
          <button onClick={() => {setPlay(4); onBeginCollaborate();}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Collaborate</button></>}</>}
     {play === 4 && <>
     {scenario.map((scenario, index) => (
              <div
                key={index}
              >
              <span className="grid m-auto w-1/2 text-center justify-center items-center text-black dark:text-white h-full bg-gray-100 dark:bg-gray-700 p-3 self-start">
              <span>Your Scenario</span>
                <ReactMarkdown
                  components={{
                    a: props => (
                      <a
                        {...props}
                        className="text-blue-600 w-1/2 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {scenario.text}
                </ReactMarkdown>
                </span>
              </div>
            ))}
     <div className="w-full max-w-2xl h-[70vh] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto space-y-3 p-2">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">Welcome to survival.fun</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl shadow ${
                  msg.sender === "user"
                    ? "bg-[#0052FF] text-white self-end"
                    : "bg-gray-100 dark:bg-gray-700 self-start"
                }`}
              >{msg.sender === "user" ? <><img width="40" src={agentImage} alt="agentImage" /></>:<><img width="40" src={reaper.src} alt="reaperImage" /></>}
                <ReactMarkdown
                  components={{
                    a: props => (
                      <a
                        {...props}
                        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            ))
          )}

          {/* Thinking Indicator */}
          {isThinking && <div className="text-right mr-2 text-gray-500 italic">💀 Processing...</div>}

          {/* Invisible div to track the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="flex items-center space-x-2 mt-2">
        {messages.length < 8 ? <> <input
            type="text"
            className="flex-grow p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            placeholder={"Type a message..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSendMessage()}
            disabled={isThinking}
          />
          <button
            onClick={onSendMessage}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              isThinking
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bg-[#0052FF] hover:bg-[#003ECF] text-white shadow-md"
            }`}
            disabled={isThinking}
          >
            Send
          </button></>:<>
            <button
            onClick={() => {setPlay(5);onDetermineFate();}}
            className={`px-6 py-2 rounded-full font-semibold transition-all bg-[#0052FF] hover:bg-[#003ECF] text-white shadow-md`}
            disabled={isThinking}
          >
            Result
          </button>  
          </>}
        </div>
      </div></>}
           {play === 5 && <>
      {showResult === 0 ? <>
        <img src={reaper.src} />
        <p>I have seen what happens and {agentName}&#39;s fate is sealed</p>
           <button
            onClick={() => setShowResult(1)}
            className={`px-6 py-2 rounded-full font-semibold transition-all bg-[#0052FF] hover:bg-[#003ECF] text-white shadow-md`}
            disabled={isThinking}
          >
            Result
          </button>
      </>:<>
             {isThinking && <div className="text-center text-gray-500 italic">💀 Processing...</div>}  {fate.length === 0 ? <>
            <p className="text-center text-gray-500">Your Fate Has Been Sealed</p>
          </> : <>
            {fate.map((fate, index) => (
              <div
                key={index}
              >
              <span className="grid m-auto w-1/2 text-center justify-center items-center text-black dark:text-white h-full bg-gray-100 dark:bg-gray-700 p-3 self-start">
                <ReactMarkdown
                  components={{
                    a: props => (
                      <a
                        {...props}
                        className="text-blue-600 w-1/2 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    ),
                  }}
                >
                  {fate.text}
                </ReactMarkdown>
                </span>
              </div>
            ))}</>}
      </>}
</>}
    </div>
  );
}
