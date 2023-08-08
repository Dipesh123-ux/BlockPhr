"use client"
import React, { useEffect, useState, useContext } from 'react'
import { ethers } from "ethers"
import { userExists } from '@/apis/address';
import AuthContext from '@/context/authContext';
import Landing from '@/components/Landing/page';
import { useRouter } from 'next/navigation';

const CONTRACT_ADDRESS = "0xbae56e96ea899f672cbc9094b93142b477f6caad";

const Home = () => {

  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chainId = await ethereum.request({ method: 'eth_chainId' });

    console.log("Connected to chain " + chainId);

    // // String, hex code of the chainId of the Rinkebey test network
    // const rinkebyChainId = "0x4";
    // const polygonChainId = "0x137";
    // const polygonChainId2 = "0x89";
    // if (chainId !== polygonChainId && chainId !== polygonChainId2) {
    //   alert("You are not connected to the Polygon Network!");
    // }

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setUser(account);
      localStorage.setItem("user", JSON.stringify(user));



      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      // setupEventListener()
    } else {
      console.log("No authorized account found")
    }
  }

  const connectWallet = async () => {
    try {


      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setUser(accounts[0]);

      const response = await userExists(accounts[0]);
      if (response.message === 'exist') {
        if (response.isDoctor) {
          router.push('/doctordashboard')
        }
        else {
          router.push('/patientdashboard')
        }
      }
      else {
        router.push('/selectrole')
      }



      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      // setupEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft.
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, IdeaNFT, signer);

        // For capturing event on the smart contract.
        connectedContract.on("IdeaNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up 
        on OpenSea. Here's the link: https://opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])



  return (
    <Landing connectWallet={connectWallet} />
  )
}

export default Home