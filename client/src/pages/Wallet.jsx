import React, { useState } from "react";
import { ethers } from 'ethers';
import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

const wallet__data = [
  // {
  //   title: "Bitcoin",
  //   desc: "DOJO",
  //   icon: "ri-bit-coin-line",
  // },

  // {
  //   title: "Coinbase",
  //   desc: "DOJO",
  //   icon: "ri-coin-line",
  // },

  {
    title: "Metamask",
    desc: "DOJO",
    icon: "ri-money-cny-circle-line",
  },

  // {
  //   title: "Authereum",
  //   desc: "DOJO",
  //   icon: "ri-bit-coin-line",
  // },
];


const Wallet = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');

  const connectWallet = async (title) => {
    try {
      if (title !== ('Metamask')) {
        return;
      }
      // Request access to the MetaMask wallet
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      alert('Wallet connected successfully!');

      // Get the current account address
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const truncatedAddress = accounts[0].substring(0, 5);
        setAccountAddress(truncatedAddress);
        setIsWalletConnected(true);
      }

    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };


  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>
                  DOJO
                </p>
              </div>
            </Col>

            {wallet__data.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                <div onClick={() => connectWallet(item.title)} className="wallet__item">
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
                {isWalletConnected && <p>Connected Account: {accountAddress}</p>}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
