import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import LobbyBg from "./assets/lobby.jpeg";
const serverURL = import.meta.env.VITE_SERVER_URL;

interface LobbyProps {
  socket: Socket;
}

import contractABI from './abi.json';
import { useAppContext } from './Context';
import { ethers } from 'ethers';
declare global {
  interface Window {
    ethereum?: any;
  }
}
const contractAddress = '0x9E08806eaB4111322Df0Bb6186B0210F68346aAB'; // deployed contract address


function Lobby({ socket }: LobbyProps) {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const {account, setAccount, setContract, checkShapeKey } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const connectWallet = async () => {
    const desiredChainId = '0x1f47b';
  
    if (window.ethereum) {
      try {
        setLoading(true);

        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log('Current chain ID:', currentChainId);
        console.log('Desired chain ID:', desiredChainId);
  
        if (currentChainId !== desiredChainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: desiredChainId }],
            });
          } catch (switchError) {
            if ((switchError as any).code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: desiredChainId,
                      chainName: 'Etherlink Testnet',
                      rpcUrls: ['https://etherlink-testnet.rpc.thirdweb.com/'],
                      nativeCurrency: {
                        name: 'Ethereum',
                        symbol: 'ETH',
                        decimals: 18,
                      },
                      blockExplorerUrls: ['https://testnet-explorer.etherlink.com'],
                    },
                  ],
                });
              } catch (addError) {
                console.error('Error adding new chain:', addError);
                setLoading(false);
                return;
              }
            } else {
              console.error('Error switching chain:', switchError);
              setLoading(false);
              return;
            }
          }
        }
  
        const [selectedAccount] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
  
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.ready;
  
        const signer = await provider.getSigner();
  
        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
  
        setAccount(selectedAccount);
        setContract(contractInstance);
        setLoading(false);
        checkShapeKey(selectedAccount);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask or an Ethereum-compatible wallet.');
    }
  };
  

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post(`${serverURL}/create-room`);
      if (response.data.roomCode) {
        setTimeout(() => {
          socket.emit('joinRoom', { roomCode: response.data.roomCode, walletConnected: account });
        }, 500);
        navigate(`/board?roomCode=${response.data.roomCode}`);
      } else {
        setError('Failed to create room. Please try again');
      }
    } catch (err) {
      console.error('Error creating room:', err);
      setError('Error creating room. Please try again');
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode) {
      setError('Please enter room code');
      return;
    }

    try {
      const response = await axios.post(`${serverURL}/join-room`, { roomCode });
      if (response.data.success) {
        setTimeout(() => {
          socket.emit('joinRoom', { roomCode: roomCode, walletConnected: account });
        }, 500);
        navigate(`/board?roomCode=${roomCode}`);
      } else {
        setError('Failed to join the room. Please check the room code');
      }
    } catch (err) {
      console.error('Error joining room:', err);
      setError('Error joining room. Please try again');
    }
  };

  return (
    <div className="arena-container" style={{
      backgroundImage: `url(${LobbyBg})`}}>
      <h1 className="arena-title medievalsharp-bold">Adventurer's Arena</h1>
      <button className="arena-button medievalsharp-regular" onClick={handleCreateRoom}>
        Create a Room
      </button>
      <div className="room-input-container">
        <input
          type="text"
          className="room-input merienda-regular"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button className="arena-button medievalsharp-regular" onClick={handleJoinRoom}>
          Join a Room
        </button>
      </div>
      {error && <p className="error-text merienda-regular">{error}</p>}
      <button
        className="arena-button medievalsharp-regular"
        onClick={() => navigate('/how-to-play')}
      >
        How to Play
      </button>

      {!account && 
        <button onClick={connectWallet} className="arena-button medievalsharp-regular" disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>}
      {account && 
        <button className='arena-button medievalsharp-regular' onClick={() => navigate('/skins')}>
          Select Skins
        </button>}
    </div>
  );
}

export default Lobby;
