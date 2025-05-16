"use client";

import { useState, useEffect, useRef } from "react";
import "./globals.css";
import '@coinbase/onchainkit/styles.css';
import { useAgent } from "./hooks/useAgent";
import {useWriteContract, useAccount} from 'wagmi';
import { ConnectWallet} from '@coinbase/onchainkit/wallet';
import {Address} from 'viem';
import ReactMarkdown from "react-markdown";
import userImage from './assets/img/user.png';
import loadingGif from './assets/img/loading.gif';
import Data from './data.json';
import {ethers} from 'ethers';
import agents from './abi/agents.json';
import {WalletComponents} from './wallet';
import survivalLogo from './assets/img/survivorLogo.png';

/**
 * Home page for the AgentKit Quickstart
 *
 * @returns {React.ReactNode} The home page
 */
export default function Home() {


  const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
  const agentsContract = new ethers.Contract(Data.agentsAddress, agents.abi, provider);
  const { data: hash, writeContract, isPending } = useWriteContract();
  const account = useAccount();
  const isConnected = account.isConnected;
  const address = account.address;
  const [agentImage, setAgentImage] = useState();
  const [agentName, setAgentName] = useState("");
  const [advice, setAdvice] = useState("");
  const [scenario, setScenario] = useState("");
  const [agentCompliance, setAgentCompliance] = useState("");
  const [agentCreativity, setAgentCreativity] = useState("");
  const [agentUnhingedness, setAgentUnhingedness] = useState("");
  const [agentMotivation, setAgentMotivation] = useState("");
  const [agentJson, setAgentJson] = useState();
  const [agentPersonality, setAgentPersonality] = useState("");
  const [input, setInput] = useState("");
  const [play, setPlay] = useState(0);

  const { messages, sendMessage, isThinking, beginCollaborate, determineFate, fate } = useAgent();

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
      const _agentCompliance = _agentResult.attributes[0].value;
      const _agentCreativity = _agentResult.attributes[1].value;
      const _agentUnhingedness = _agentResult.attributes[2].value;
      const _agentMotivation = _agentResult.attributes[3].value;
      const _agentPersonality = _agentResult.attributes[4].value;
      setAgentJson(_agentResult);
      setAgentImage(_agentImage);
      setAgentName(_agentName);
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
   const scenarioArray = ['Your agent is in a gladiator match with SBF.',
    'A judge is about to delete your agent for collaborating with a crypto bro.',
    'Your agent has been cursed with incredibly bad luck.',
    'Your agent is allergic to laughter.',
    'The goblin king demands your agent entertain him—or die.',
    'Jesse is chasing your agent to put them onchain.',
    'Your agent fell off a yacht at a crypto conference.',
    'Your agent is aging rapidly.',
    'Your agent is trapped on a flight with a bomb.',
    'If your agent farts again, they die, and a big one is coming.'];
    const randomIndex = Math.floor(Math.random() * scenarioArray.length);
    const chosenScenario = scenarioArray[randomIndex];
    setScenario(chosenScenario);
  }

  const onBeginCollaborate = async () => {
    const adviceText = advice;
    const compliance = agentCompliance;
    const creativity = agentCreativity;
    const unhingedness = agentUnhingedness;
    const motivation = agentMotivation;
    beginCollaborate(scenario, compliance, creativity, unhingedness, motivation, adviceText);
  }

   const onDetermineFate = async () => {
    const finalAction = messages[4].text;
   await determineFate(scenario, agentName, finalAction);
  }

  const checkPlay = async () => {
    if(isConnected){
    if(await agentsContract.balanceOf(address) > 0){setPlay(2);}else{setPlay(1);}
    }else{
    
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
        setPlay(2);
        }catch(error){console.log(error)}
        }
      }else{
      
     }
   }

  return (
     <html lang="en">
     <meta name="viewport" content="width=device-width, initial-scale=1, max-scale=1" />
      <body className={`bodyClient dark flex flex-col bg-no-repeat bg-top absolute top-0 m-auto w-full
      ${play === 0 && "bg-[url(./assets/img/bg.png)]"}
      ${play === 1 && "bg-[url(./assets/img/mintBg.png)]"}
      ${play === 2 && "bg-[url(./assets/img/mintStatsBg.png)]"}
      ${play === 3 && "bg-[url(./assets/img/fateBg.png)]"}
      ${play === 4 && "bg-[url(./assets/img/chatBg.png)]"}
      ${play === 5 && "bg-[url(./assets/img/survBg.png)]"}
      ${play === 6 && "bg-[url(./assets/img/resultBg.png)]"}`}>
        {/* Header (Fixed Height) */}
   
        <header className="mainLogo py-6 flex items-center justify-between relative top-0">
         {play === 0 && <><img
            src={survivalLogo.src}
            alt="survival.fun"
            className="logoHead h-10 ml-6 relative top-0"
          /></>}
          <span className="h-10 mr-6 wallet relative top-0"><WalletComponents /></span>
        </header>
          <main className="flex-grow flex items-center justify-center px-4">
    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white w-full h-full absolute top-0">
     {play === 0 && <>
     
     {isConnected ? <><span className="absolute bottom-0"><p className="addressDisplay relative bottom-10">{String(address).slice(0, 4)+'....'+String(address).slice(38, 42)}</p><button onClick={() => checkPlay()} className="startMinting relative bottom-5 text-white font-bold py-2 px-4 rounded"></button></span>
     </>:<><span className="appConnect absolute bottom-0"><p className="addressDisplay relative bottom-10" style={{height: '48px'}}></p><ConnectWallet className="relative bottom-5 text-white font-bold py-2 px-4 rounded" /></span></>}
     </>}
     {play === 1 && <>
       {!hash && !isPending ? <><span className="absolute bottom-0"><p className="mintHead relative bottom-20 m-auto text-white font-bold py-2 px-4 rounded"></p><p className="mintText relative bottom-10  m-auto text-white font-bold py-2 px-4 rounded"></p><button onClick={() => mintAgent()} className="mintAgent relative bottom-5 text-white font-bold py-2 px-4 rounded"></button></span></>:<></>}
       {isPending ? <><img alt="loading" width="30" src={loadingGif.src} /></>:<></>}
     </>}
     {play === 2 && <>
     {agentJson ? <>
      <img src={agentImage} className="agentImage" alt="agentImage" />
      <p className="addressDisplay absolute top-5">{String(address).slice(0, 4)+'....'+String(address).slice(38, 42)}</p>
      <div className="absolute bottom-0 bgStats"><span className="topInfoStats">
      <img src={agentImage} alt="avatar" className="agentAvatar relative bottom-5" />
      <span className="nameSectionStats relative bottom-0"><p className="agentBio nameHeader">Name</p>
      <p className="agentBio nameStat text-center text-gray-200 w-1/2">{agentName}</p></span></span>
      <p className="agentBio text-center relative bottom-5 agentStats text-gray-200 w-1/2">Compliance: <span className="white">{agentCompliance}</span> | Creativity: <span className="white">{agentCreativity}</span> | <br/> Unhingedness: <span className="white">{agentUnhingedness}</span> | Motivation: <span className="white">{agentMotivation}</span></p>
      <p className="agentBio relative bottom-5" style={{color: '#D983F9'}}>Bio</p>
         <p className="text-center agentBio agentDesc relative bottom-5 text-gray-200 w-1/2">{agentPersonality}</p>
      <button onClick={() => {setPlay(3); onBeginScenario();}} className="startGame relative bottom-0 m-auto justify-center grid   text-white font-bold py-2 px-4 rounded"></button></div>
      </>:<></>}
     </>}
     {play === 3 && <>
              <div className="absolute top-0">
              <span className="scenarioHead grid w-1/2 text-left relative top-20 items-center text-black dark:text-white h-full p-1 self-start">Scenario</span>
              <span className="scenarioText grid m-auto w-1/2 text-center relative top-20 items-center text-black dark:text-white h-full p-3 self-start">
                  {scenario+"..."}
                </span><input
            type="text"
            className="p-2 rounded adviceBox relative top-30"
            placeholder={"Give advice..."}
            onChange={e => setAdvice(e.target.value)}
          /></div>
           
              
          <button onClick={() => {setPlay(4); onBeginCollaborate();}} className="absolute bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Collaborate</button></>}
     {play === 4 && <>
             
              <span className="msgRemain absolute top-0 w-full text-center p-3">
                  {messages.length === 0 && <>{"Messages Remaining: 2"}</>}
                  {messages.length === 1 && <>{"Messages Remaining: 2"}</>}
                  {messages.length === 2 && <>{"Messages Remaining: 1"}</>}
                  {messages.length === 3 && <>{"Messages Remaining: 1"}</>}
                  {messages.length === 4 && <>{"Messages Remaining: 0"}</>}
                  {messages.length === 5 && <>{"Messages Remaining: 0"}</>}
                </span>
              <span className="scenarioChat grid m-auto w-full text-center justify-center items-center text-black dark:text-white h-full p-3 self-start">
                  {scenario+"..."}
                </span>
                <span className="flex">
                 <span className="adviceChat grid m-auto w-full text-center justify-center items-center text-black dark:text-white h-full p-3 self-start">
                  {advice+"..."}
                </span><img src={userImage.src} className="userChat" alt="userImage" />
                </span>
           
     <div className="chatArea w-full max-w-2xl h-[70vh] rounded-lg p-4 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-2">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">Welcome to survival.fun</p>
          ) : (
            messages.map((msg, index) => (
              <div
              className="flex p-3"
                key={index}
              
              >{msg.sender === "agent" && <><img src={agentImage} className="agentChat" alt="agentImage" /></>}
              <div className={`${msg.sender === "agent" ? "chatBackdropAgent" : "chatBackdropUser"}`}>
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
                {msg.sender === "user" && <><img src={userImage.src} className="userChat" alt="userImage" /></>}
              </div>
            ))
          )}

          {/* Thinking Indicator */}
          {isThinking && <div className="text-right mr-2 text-gray-500 italic">💀 Processing...</div>}

          {/* Invisible div to track the bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
       
        {messages.length < 5 ? <> <div className="replyBox flex items-center justify-center space-x-2 m-auto absolute bottom-5"> <input
            type="text"
            className="inputBox flex-grow p-3 rounded border dark:bg-gray-700 dark:border-gray-600 w-full"
            placeholder={"Type your suggestion..."}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && onSendMessage()}
            disabled={isThinking}
          />
          <button
            onClick={onSendMessage}
            className={`px-6 py-2 font-semibold transition-all ${
              isThinking
                ? "bg-gray-300 cursor-not-allowed text-gray-500"
                : "bgSend bg-[url(./assets/img/sendButton.png)] bg-contain bg-no-repeat text-white shadow-md"
            }`}
            disabled={isThinking}
          >
          </button></div></>:<>
          <div className="resultDiv absolute bottom-0">
            <button
            onClick={() => {setPlay(5);}}
             className="resultButton relative bottom-5"
            disabled={isThinking}
          >
            Result
          </button>  
          </div>
          </>}
        
      </div></>}
           {play === 5 && <>
               <div className="absolute bottom-0"> 
             <span className="fateHead grid w-1/2 text-left relative bottom-20 items-center text-black dark:text-white h-full p-1 self-start">Survival Strategy</span>
              <span className="scenarioText grid m-auto w-1/2 text-center relative bottom-20 items-center text-black dark:text-white h-full p-3 self-start">
                  {messages[4].text+"..."}
                </span> 
          <button onClick={() => {setPlay(6); onDetermineFate()}} className="relative bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Continue</button></div></>}
          {play === 6 && <>
               <div className="absolute top-10"> 
                <img className="fateImage relative top-20 m-auto" src={agentImage} />
              <span className="fateText grid m-auto w-1/2 text-center relative top-10 items-center text-black dark:text-white h-full p-3 self-start">

                   {fate.length === 0 ? (
            <p className="text-center text-gray-500">Determining Your Fate...</p>
          ) : (
            fate.map((fate, index) => (
              <div
              className="flex p-3"
                key={index}
              
              >
              <div>
              <p>Scenario:<span className="bold">{" "+scenario}....</span></p>
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
                  {fate.text}
                </ReactMarkdown>
                </div>
              </div>
            ))
          )} {isThinking && <div className="text-right mr-2 text-gray-500 italic">💀 Processing...</div>}
                </span> 
      </div></>}
    </div>
       </main>
     {/* Footer (Fixed Height) */}
        <footer className="py-4 text-center text-gray-500 dark:text-gray-400 flex-none">
      
        </footer>
       
      </body>
    </html>
 
  );
}
