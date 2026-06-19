---
title: 'What I Built in a Weekend: A Free Mutual Fund Analyser on Akash Network'
date: 2026-02-25T09:43
excerpt: ''
cover: https://pbs.twimg.com/media/HBReOhwbYAAAbaR?format=jpg&name=medium
originalSource: x
originalUrl: https://x.com/Saisunkari19/status/2026510734570697046
tags:
  - Mf
  - Akash
draft: false
---

_I spent entire weekends researching mutual funds... until I built this free tool that does it in seconds._ 

_\_

![List of funds that qualify golden criteria](https://pbs.twimg.com/media/HBRQv_bb0AAr0sR?format=jpg&name=medium)


## The Problem

I'm a builder. I build things that solve my own problems first.

Last year, I wanted to start investing in mutual funds. So I did what anyone would do,  I researched.

Blogs. YouTube videos. Paid courses. Social media threads.

Here's what I learned: Finding the right mutual fund takes forever.

Every fund needs the same drill: 
- Check historical returns, 
- Compare with benchmark, 
- Analyse risk metrics, 
- Read the fund manager's philosophy.
- etc ....
 
Multiply that by 5-10 funds, and you've lost an entire weekend.

The information was scattered. The process was repetitive. And I kept thinking: **_There has to be a better way._**


```plain
BEFORE                          AFTER
─────────────────────────────   ─────────────────────────────
Research: 8 hours               Research: 2 seconds
5 funds: 1 weekend              2500 funds: instant
Manual comparison               Automated ranking
Emotional decisions             Data-driven choices
```

## The Insight

That's when I came across the Golden Triangle framework from [Mutual Funds Telugu](https://www.youtube.com/@Mutualfundstelugu.).

The concept was simple but powerful: instead of chasing last year's winners, focus on Consistency. Find funds that beat their benchmarks year after year, not just in bull markets.

The framework introduced a metric called COB (Consistency of Beating) how often a fund outperforms its benchmark over time.

A fund with 90% COB has beaten its benchmark 9 out of every 10 years. That's a pattern worth betting on.

```plain

COB 90% = Beats benchmark 9 out of 10 years
Year 1:  ✓ Beat
Year 2:  ✓ Beat
Year 3:  ✗ Missed
Year 4:  ✓ Beat
Year 5:  ✓ Beat
...
Year 10: ✓ Beat
Result: 9/10 = 90% COB


```

I backtested it myself. The data held up.

**But I didn't want to do this manually every time.**

So I turned a weekend into a side project. The side project became a tool. The tool became this.

## What I Built

**Golden Triangle** is a mutual fund analysis engine that does in seconds what took me days.

### Core Features

**Golden Fund Discovery:**  Scans 2,500+ equity mutual funds and ranks them by COB score. Instantly see which funds consistently beat their benchmarks.

**Sell Zone Alerts:** Tracks funds that have underperformed for 3+ years. If cumulative underperformance exceeds 15%, you get a sell signal. No emotions. No, "it will recover."

**Portfolio Health Check:**  Update your current holdings. Get instant recommendations. Find out which funds to keep, which to sell, and what to buy instead.

**Real-Time Gap Scores:**  Moving average crossovers identify optimal buy and sell zones. Know when to enter, when to exit.

## The Open-Source Stack

I needed three things: reliable data, computing power, and a deployment platform that wouldn't bankrupt me.

Here's what I used, all open-source, all free to start.

```plain

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   MFAPI.in   │────▶│   FastAPI    │────▶│    Akash     │
│  (NAV Data)  │     │  (Analysis)  │     │ (Deployment) │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Next.js    │
                     │  (Frontend)  │
                     └──────────────┘

```

[MFAPI.in](https://mfapi.in/): The Unsung Hero

[MFAPI.in](https://mfapi.in/) is the backbone of this project. It's an open-source initiative by Anand Chawla that provides:

- NAV data for all Indian mutual funds

- No API keys required

- No rate limits

- Government-backed AMFI data

- Completely free

Before MFAPI, getting mutual fund data meant scraping websites or paying for expensive APIs. This project democratized access to financial data in India.

**If you're building anything with Indian mutual funds, start with MFAPI.**

It's maintained, reliable, and free. 
The kind of infrastructure the developer community needs more of. Start the repo. This project deserves more recognition.

**FastAPI + Python: The Engine**

The analysis engine crunches 12+ years of NAV data for every fund. Rolling returns. Sharpe ratios. Alpha calculations. COB scores.

The math looks like this:

COB=(DaysFundReturn>BenchmarkReturn)/TotalTradingDays×100




Every fund. Every benchmark. Every trading day.

Then we rank them.

**###  Akash Network: Decentralised by Design**

![The logs of deployed Golden Triangle Backend server on Akash](https://pbs.twimg.com/media/HBRTnY5aQAAfsRu?format=jpg&name=medium)

[](https://x.com/Saisunkari19/article/2026510734570697046/media/2023334068759445504)

I could've used AWS. GCP. Azure. Any centralised cloud.

I chose [Akash Network](https://akash.network/) for reasons that go beyond cost.

**1. Cost Efficiency**

A comparable AWS deployment (t3.medium instance + managed database) runs $40-60/month. On Akash? I'm paying in AKT tokens at a fraction of that.

For a free tool with no monetisation, this isn't a nice-to-have.  It's survival.

**2. Permissionless Deployment**

No credit card verification. No KYC. No, "your account is under review."

I deploy what I want, when I want. The network doesn't ask questions.

**3. Censorship Resistance**

Financial tools get shut down. Terms of service change overnight. Platforms deplatform.

On Akash, my deployment lives as long as I want it to. No one can pull the plug.

**4. Walking the Talk**

I believe in a decentralised future. Using Akash isn't just a technical choice. It's a vote for the world I want to see.

Financial tools should be uncensorable. Data should be owned by users, not platforms.

Shoutout to the Akash community: the documentation, the Discord support, the SDL templates. Building on a new network has learning curves, but the community made it smooth.

##  Who This Is For

I built this for:

- New investors: who don't know where to start

- Busy professionals:  who don't have weekends to research

- Existing investors:  wondering if they should switch funds

- Builders:  who want to validate their portfolio without paying an advisor

If you've ever looked at your mutual fund statement and thought, "Is this actually good?", this one is for you.

## Try It Now

→ [Explore Golden Funds](https://mf.prithvidev.in/golden) : See top-performing funds ranked by COB

→ [Check Your Portfolio](https://mf.prithvidev.in/portfolio):  Update holdings, get instant recommendations

→ [Monitor Sell Zone](https://mf.prithvidev.in/sell-zone): See funds triggering exit signals

No signup. No data collection. No "we'll email you later."

What's Next

This started as a weekend project. It's now a production tool.

The roadmap includes:

- Email alerts: when your funds enter the Sell Zone

- SIP optimiser: for timing new investments

- Open-source release of the analysis engine

## The Bottom Line

Your mutual fund advisor charges 1% of your portfolio every year.

This tool charges 0%.

And it's built on open-source infrastructure (MFAPI), deployed on a decentralised cloud (Akash), inspired by proven frameworks (Mutual Funds Telugu).

Stop guessing. Start analysing.

👉[Explore the Dashboard](https://mf.prithvidev.in/) 

- Built with data from [MFAPI.in](https://mfapi.in/), 
- Deployed on [Akash Network](https://akash.network/), 
- Inspired by [Mutual Funds Telugu](https://www.youtube.com/@Mutualfundstelugu).

> \*Disclaimer: This is not financial advice. Past performance doesn't guarantee future returns. Do your own research.\*

[#MutualFunds](https://x.com/search?q=%23MutualFunds&src=hashtag_click) [#InvestingIndia](https://x.com/search?q=%23InvestingIndia&src=hashtag_click) [#GoldenTriangle](https://x.com/search?q=%23GoldenTriangle&src=hashtag_click) [#AkashNetwork](https://x.com/search?q=%23AkashNetwork&src=hashtag_click) [#DeFi](https://x.com/search?q=%23DeFi&src=hashtag_click) [#OpenSource](https://x.com/search?q=%23OpenSource&src=hashtag_click) [#FinTech](https://x.com/search?q=%23FinTech&src=hashtag_click) [#IndianInvesting](https://x.com/search?q=%23IndianInvesting&src=hashtag_click) [#PersonalFinance](https://x.com/search?q=%23PersonalFinance&src=hashtag_click)

[@akashnet_](https://x.com/@akashnet_)  [@SkyRocknRoll](https://x.com/@SkyRocknRoll)
