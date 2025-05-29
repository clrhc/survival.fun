"use client";

import { useState, useEffect, useRef } from "react";
import "./globals.css";
import '@coinbase/onchainkit/styles.css';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useAgent } from "./hooks/useAgent";
import { useAccount, useWriteContract, useChainId, useSwitchChain, useWaitForTransactionReceipt } from 'wagmi';
import {Address} from 'viem';
import { ConnectWallet} from '@coinbase/onchainkit/wallet';
import ReactMarkdown from "react-markdown";
import userImage from './assets/img/user.png';
import loadingGif from './assets/img/loading.gif';
import heartImage from './assets/img/heart.png';
import ghostImage from './assets/img/ghost.png';
import fire from './assets/img/fire.png';
import party from './assets/img/party.png';
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

  const { setFrameReady, isFrameReady } = useMiniKit();
  const provider = new ethers.JsonRpcProvider('https://base-mainnet.public.blastapi.io');
  const agentsContract = new ethers.Contract(Data.agentsAddress, agents.abi, provider);
  const account = useAccount();
  const { writeContractAsync: writeMint } = useWriteContract();
  const { writeContractAsync: writeResult, data: resultHash, isPending: isResultPending } = useWriteContract();
  const {isSuccess: isCompleted} = useWaitForTransactionReceipt({
      hash: resultHash,
  });
  const isConnected = account.isConnected;
  const address = account.address;
  const [agentImage, setAgentImage] = useState();
  const [baseId] = useState(8453);
  const {switchChain} = useSwitchChain();
  const networkId = useChainId();
  const [loading, setLoading] = useState(0);
  const [agentName, setAgentName] = useState("");
  const [activeAgent, setActiveAgent] = useState(false);
  const [results, setResults] = useState(2);
  const [walletActive, setWalletActive] = useState(0);
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
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  useEffect(() => {
    async function init(){
    if(isConnected){
      if(networkId !== baseId){
        switchChain({chainId: baseId});
      }
      
   try{
      const _currentAgent = Number(await agentsContract.currentAgent(address));
      const _activeAgent = await agentsContract.activeAgent(address);
      setActiveAgent(_activeAgent);
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
      setAgentPersonality(String(_agentPersonality));}}catch(error){console.log(error)};
    }
  }

    const interval = setInterval(() => init(), 1000);
      return () => {
      clearInterval(interval);
      }
  });

  useEffect(() => {
    function checkWallet(){
         const walletActive_ = document.querySelectorAll("[aria-label^='Connect Wallet']");
         setWalletActive(walletActive_.length);
         if(isCompleted && play === 6){
          setPlay(7);
         }
    }
    const interval = setInterval(() => checkWallet(), 10);
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
    beginCollaborate(scenario, agentCompliance, agentCreativity, agentUnhingedness, agentMotivation, advice, agentName);
  }

   const onDetermineFate = async () => {
    const finalAction = messages[4].text;
   await determineFate(scenario, agentName, finalAction);
  }

  const onResult = async () => {
     if(isConnected && networkId === baseId){
    let result_;
    if(String(fate[0].text).includes("Survived")){
      setResults(1);
      result_ = 1;
    }else{
      setResults(0);
      result_ = 0;
    }
    try{
      setLoading(1);
    await writeResult({
      abi: agents.abi,
      address: Data.agentsAddress as Address,
      functionName: 'decideFate',
      args: [result_],
    });
    setLoading(0);
        }catch(error){console.log(error);setLoading(0);}
        
      }else{
      
     }
  }

  const checkPlay = async () => {
    if(isConnected){
      if(await agentsContract.activeAgent(address)){
        setPlay(2)
      }else{
        setPlay(1)
      }
    }else{

    }
  }


    const mintAgent = async () => {
    if(isConnected && networkId === baseId){
      if(await agentsContract.activeAgent(address)){setPlay(2)}else{
        try{   
          setLoading(1);
      await writeMint({
        abi: agents.abi,
        address: Data.agentsAddress as Address,
        functionName: 'Mint',
      });
      setPlay(2);
      setLoading(0);
        }catch(error){console.log(error);setLoading(0);}
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
      ${play === 6 && "bg-[url(./assets/img/survBg.png)]"}
      ${play === 7 && "bg-[url(./assets/img/deathBg.png)]"}
      ${play === 8 && "bg-[url(./assets/img/deathBg.png)]"}`}>
        {/* Header (Fixed Height) */}
   
        <header className="mainLogo py-6 flex items-center justify-between relative top-0">
         {play === 0 && <><img
            src={survivalLogo.src}
            alt="survival.fun"
            className="logoHead h-10 m-auto relative top-0"
          /></>}
          <span className="h-10 mr-6 wallet relative top-0"><WalletComponents /></span>
        </header>
          <main className="flex-grow flex items-center justify-center px-4">
    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white w-full h-full absolute top-0">
     {play === 0 && <>
     {isConnected ? <><span className="absolute bottom-0"><p className="addressDisplay relative bottom-10">{String(address).slice(0, 4)+'....'+String(address).slice(38, 42)}</p>
      <span className="relative bottom-5 text-white font-bold py-2 px-4 rounded"><button onClick={() => checkPlay()} className="startMinting relative bottom-5 text-white font-bold py-2 px-4 rounded"></button></span></span>
     </>:<>
     <span className="appConnect absolute bottom-0"><p className="addressDisplay relative bottom-10" style={{height: '48px', visibility: 'hidden'}}></p>
      <span className="relative bottom-5 text-white font-bold py-2 px-4 rounded" style={{visibility: walletActive === 1 ? "hidden" : "initial"}}><ConnectWallet /></span>
      {walletActive === 1 && (<><span className="relative bottom-5 text-white font-bold py-2 px-4 rounded"><div className="loadButton"><img alt="loading" width="30" src={loadingGif.src} /></div></span></>)}
      </span></>}
     </>}
     {play === 1 && <>
       <span className="absolute bottom-0"><p className="mintHead relative bottom-20 m-auto text-white font-bold py-2 px-4 rounded"></p>
        <p className="mintText relative bottom-20  m-auto text-white font-bold py-2 px-4 rounded"></p>
        {!loading ? <>{activeAgent ? <><button onClick={() => setPlay(2)} className="collabButton relative bottom-10 text-white font-bold py-2 px-4 rounded">Continue</button>
        </>:<>
        {loading ? <><button className="collabButton relative bottom-10 text-white font-bold py-2 px-4 rounded"><img alt="loading" width="30" src={loadingGif.src} /></button></>:<><button onClick={() => mintAgent()} className="mintAgent relative bottom-10 text-white font-bold py-2 px-4 rounded"></button></>}</>}
        </>:<><button className="collabButton relative bottom-10 text-white font-bold py-2 px-4 rounded"><img alt="loading" width="30" src={loadingGif.src} /></button></>}</span>
     </>}
     {play === 2 && <>
     {agentJson ? <>
     {activeAgent ? <><img src={agentImage} className="agentImage" alt="agentImage" />
      <p className="addressDisplay absolute top-5">{String(address).slice(0, 4)+'....'+String(address).slice(38, 42)}</p>
      <div className="absolute bottom-0 bgStats"><span className="topInfoStats">
      <img src={agentImage} alt="avatar" className="agentAvatar relative bottom-5" />
      <span className="nameSectionStats relative bottom-0"><p className="agentBio nameHeader">Name</p>
      <p className="agentBio nameStat text-center text-gray-200 w-1/2">{agentName}</p></span></span>
      <p className="agentBio text-center relative bottom-5 agentStats text-gray-200 w-1/2">Compliance: <span className="white">{agentCompliance}</span> | Creativity: <span className="white">{agentCreativity}</span> | <br/> Unhingedness: <span className="white">{agentUnhingedness}</span> | Motivation: <span className="white">{agentMotivation}</span></p>
      <p className="agentBio relative bottom-5" style={{color: '#D983F9'}}>Bio</p>
         <p className="text-center agentBio agentDesc relative bottom-5 text-gray-200 w-1/2">{agentPersonality}</p>
      <button onClick={() => {setPlay(3); onBeginScenario();}} className="startGame relative bottom-0 m-auto justify-center grid   text-white font-bold py-2 px-4 rounded"></button></div><img alt="loading" width="30" src={loadingGif.src} /></>:<><img alt="loading" width="30" src={loadingGif.src} /></>} 
     </>:<><img alt="loading" width="30" src={loadingGif.src} /></>}</>}
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
           
              
          {advice.length === 0 ? <><button style={{visibility: 'hidden'}} className="absolute bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Collaborate</button></>:<><button onClick={() => {setPlay(4); onBeginCollaborate();}} className="absolute bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Collaborate</button></>}</>}
     {play === 4 && <>
             
              <span className="msgRemain absolute top-0 w-full text-center p-3">
                  {messages.length === 0 && <>{"Messages Remaining: 2"}</>}
                  {messages.length === 1 && <>{"Messages Remaining: 2"}</>}
                  {messages.length === 2 && <>{"Messages Remaining: 1"}</>}
                  {messages.length === 3 && <>{"Messages Remaining: 1"}</>}
                  {messages.length === 4 && <>{"Messages Remaining: 0"}</>}
                  {messages.length === 5 && <>{"Messages Remaining: 0"}</>}
                </span>
              <p className="scenarioChat absolute top-10 grid m-auto w-full text-center justify-center items-center text-black dark:text-white p-3 self-start">
                  {scenario+"..."}
                </p>
           
     <div className="chatArea w-full max-w-2xl h-[55vh] rounded-lg p-4 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto p-2">
        <span className="flex adviceFlex">
                 <p className="adviceChat grid m-auto w-full text-left items-center text-black dark:text-white p-3 self-start">
                  {advice+"..."}
                </p><img src={userImage.src} className="userChat" alt="userImage" />
                </span>
          {messages.length === 0 ? (
            <p className="text-center text-gray-500"></p>
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
       
        {messages.length < 5 ? <> <div className="replyBox flex items-center justify-center space-x-2 m-auto absolute bottom-0"> <input
            type="text"
            className="inputBox flex-grow p-3 rounded border dark:bg-gray-700 dark:border-gray-600"
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
             className="resultButton relative bottom-0"
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
              <span className="scenarioTextTwo grid m-auto w-1/2 text-center relative bottom-20 items-center text-black dark:text-white h-full p-3 self-start">
                  {messages[4].text+"..."}
                </span> 
           {loading ? <><img alt="loading" width="30" src={loadingGif.src} /></>:<><button onClick={() => {onDetermineFate();setPlay(6)}} className="relative bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Continue</button></>}</div></>}
          {play === 6 && <>
          
               <div className="absolute bottom-0"> 
             <span className="fateHead grid w-1/2 text-left relative bottom-60 items-center text-black dark:text-white h-full p-1 self-start">Determing Your Fate</span>
              <span className="scenarioText grid m-auto w-1/2 text-center relative bottom-60 items-center text-black dark:text-white h-full p-3 self-start">
               {fate.length === 0 ? <><img alt="loading" width="30" src={loadingGif.src} /></>:<>Your Fate Has Been Sealed</>}   
               </span> 
         {fate.length === 0 ? <>
         <button style={{visibility: 'hidden'}} className="relative bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Result</button>
         </>:<>{isResultPending ? <><button className="relative bottom-5 collabButton text-white font-bold py-2 px-4 rounded"><img alt="loading" width="30" src={loadingGif.src} /></button>
         </>:<><button onClick={() => onResult()} className="relative bottom-5 collabButton text-white font-bold py-2 px-4 rounded">Result</button></>}
          </>}</div></>}
         {play === 7 && <>
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
              <br/>
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

      </div>  {fate.length === 0 ? <><button style={{visibility: 'hidden'}} className="absolute bottom-5 finishButton text-white font-bold py-2 px-4 rounded">Continue</button></>:<><p className="survStatus absolute bottom-20">{results === 1 ? <><img src={heartImage.src} /> {agentName} Survived</>:<><img src={ghostImage.src} /> {agentName} Died</>}</p><button onClick={() => setPlay(8)} className="absolute bottom-5 finishButton text-white font-bold py-2 px-4 rounded">Continue</button></>}</>}
      {play === 8 && <>
               <div className="absolute top-20"> 
                <span className="ResultSpan grid m-auto w-full text-center relative top-0 items-center text-black dark:text-white h-full p-3 self-start">
                <p className="resultHead">{results === 1 ? <>{agentName} Survived</>:<>You Killed {agentName}</>}</p>
                <p className="resultText w-full">{results === 1 ? <><img src={heartImage.src} /> CONGRATS</>:<><img src={ghostImage.src} /> RIP</>}</p>
                </span> 
              
             
      </div>{results === 1 ? <><img className="resultAliveImage absolute bottom-50 m-auto" src={agentImage} /><img className="partyImage absolute bottom-50 m-auto" src={party.src} /></>:<><img className="resultImage absolute bottom-50 m-auto" src={agentImage} /><img className="fireImage absolute bottom-50 m-auto" src={fire.src} /></>}<button className="absolute bottom-5 finishButton text-white font-bold py-2 px-4 rounded"><a href="https://survival-fun.vercel.app" rel="noopener noreferrer">Play Again</a></button></>}
    </div>
       </main>
     {/* Footer (Fixed Height) */}
        <footer className="py-4 text-center text-gray-500 dark:text-gray-400 flex-none">
      
        </footer>
       
      </body>
    </html>
 
  );
}
