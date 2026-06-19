---
title: "LedgerLens: an A2A-first agent for on-chain data"
date: 2026-01-22T17:31
excerpt: "Wrapping Alchemy's MCP server in an Agent-to-Agent interface so other agents and developers get predictable, composable on-chain facts, without stitching APIs together."
cover: https://pbs.twimg.com/media/G_GraSIW0AAMOEf?format=jpg&name=medium
originalSource: x
originalUrl: https://x.com/Saisunkari19/status/2014338731659215058
tags:
  - web3
  - aiagents
draft: false
---

Like many of you in the Web3 space, I spend my days exploring the latest tech stack. I've been obsessed with the intersection of Web3 and AI lately. 

It's my "nights and weekends" have been consumed by a specific idea: We need better agents for our decentralised data.  


We are witnessing an explosion of  AI Agents  in Web2, ranging from standalone chatbots to agent collaborations, designed to solve complex problems. 

But in the Web3 space, we have great data providers, token price oracle and many more with fragmented data. Getting reliable on-chain data includes 
token prices, wallet balances, and NFT Metadata usually invloving stiching together APIs that weren't designed for AI Agents. 


Then I started to build a project by focusing on an A2A- first interface, that gives other agents and developers a predictable, composable way to get on-chain facts without stitching together multiple APIs. 

How It Started :

 I didn't want to reinvent the wheel. When  I stumbled upon the [Alchemy MCP Server](https://github.com/alchemyplatform/alchemy-mcp-server). I knew I had a perfect foundation.  Alchemy has released this incredible open-source tool thta standardized how apps fetch blockchain data using the Model Context Protocol (MCP).

It was powerful, reliable, and completely open source. But I realised it was still a tool for developers.  I wanted to turn it into an  Agent  for everyone. 

This is Just  the Beginning: 
LedgerLens - an open-source AI Agent that wraps the Alchemy MCP Server into an Agent-to-Agent(A2A)  interface. Isn't just a throwaway experiment. It's a live, deployed agent that represents my commitment to this space. 

Think of it as the Social Skills  layer for blockchain data. Instead of writing a Python script to query an API, you can treat LedgerLens like a teammate by asking 

"Hey, check the ETH price and tell me {wallet-address} holding". 

![Using A2A Inspector to test LedgerLens Agent](/uploads/20260619-172754.png)

Using A2A Inspector to test LedgerLens Agent

**With LedgerLens, you can :**
- **Interact Directly:** It is deployed live. You (or bots) can query it right now. 
- **Inspect the Code:** It's open-source. See how I implemented the A2A logic. 
- **Fork and Build:** Use it as a template for your own agents. 

**What LedgerLens Provides :**

Currently, it utilises the Alchemy MCP tools as a start,  with an A2A wrapper around MCP, it publishes an AgentCard, registers MCP tools, normalises outputs, and exposes a secure endpoint that anyone can call.

**- Real-time Token Prices:** By symbol  or contract address. 
**- Wallet Analysis:** ERC-20 balances and NFT holdings across chains. 
**- Transfer Tracking:** Deep dive into transaction history.

![Accessing LedgerLens Server using A2A Inspector](/uploads/20260619-172919.png)

Accessing LederLens Server using A2A Inspector


**What's Next:** 

I'm treating this side hustle as a playground for serious innovations. I plan to keep building, shipping, and open-sourcing more tools that help AI Agents understand the crypto world. 


Try it out:

- LedgerLens Server : [http://provider.dal.leet.haus:31181](http://provider.dal.leet.haus:31181/)
- Agent Card : [http://provider.dal.leet.haus:31181/.well-known/agent-card.json](http://provider.dal.leet.haus:31181/.well-known/agent-card.json)
- Using [Google A2A Inspector ](https://github.com/a2aproject/a2a-inspector) you can test :  [https://a2a-inspector-908687846511.us-central1.run.app/](https://a2a-inspector-908687846511.us-central1.run.app/)

- LedgerLens repo : [https://github.com/saiSunkari19/AIxBlockchain-monorepo/tree/main/a2a/LedgerLens](https://github.com/saiSunkari19/AIxBlockchain-monorepo/tree/main/a2a/LedgerLens)

The LedgerLens server is deployed on [@akashnet](https://x.com/@akashnet).
