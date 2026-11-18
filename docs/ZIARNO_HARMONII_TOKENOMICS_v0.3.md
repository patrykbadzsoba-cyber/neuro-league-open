# ZIARNO HARMONII (ZH) — TOKENOMICS v0.3
**Initiative:** NEURAL LINK / NEURO LEAGUE OPEN  
**Token identity:** NL-ZH-000001  
**Working name / ticker:** Ziarno Harmonii / ZH  
**Proposed network / standard:** Ethereum / ERC-20  
**Model status:** APPROVED FOR PREPARATION ONLY  
**Issuance status:** NOT AUTHORIZED — NO DEPLOYMENT, MINTING, SALE OR DISTRIBUTION  
**Version date:** 18 November 2026

> This document defines a proposed tokenomics model for review. It is not an offer, investment recommendation, legal opinion, promise of value, or authorization to issue or deploy a crypto-asset.

## 1. Decisions confirmed for this preparation

| Parameter | Approved preparation assumption |
|---|---|
| Maximum supply | 1,000,000,000 ZH (1B) |
| Function | Ecosystem utility |
| Intended ecosystem | NEURAL LINK / NEURO LEAGUE OPEN and separately approved applications |
| Network | Ethereum |
| Token standard | ERC-20, 18 decimals (technical candidate) |
| Supply policy | Fixed cap; no discretionary post-deployment minting in the current contract candidate |
| Issuance | Not approved |
| Initial circulating supply | 0 before any separately approved launch |
| Price / valuation | Not set; no target or guarantee |
| Fundraising / public sale | Not approved |
| Exchange listing / liquidity | Not approved |

The 1B figure is the proposed maximum total supply for the model. It does not mean that 1B tokens currently exist on-chain. There is no contract address and no issued token.

## 2. Design objective

ZH is being designed as an optional utility instrument for interoperable participation in the NEURAL LINK ecosystem. Its purpose is to support practical use of participating applications and transparent coordination—not to sell ownership of the initiative, monetize basic human participation, or promise financial returns.

The token must remain subordinate to the project's principles:
- Human dignity and autonomy.
- Freedom of thought and the right to leave.
- Cooperation and equality.
- Privacy by design.
- Transparency and responsibility.
- Technology serving life; LIFE IS THE CENTER.

No token balance may grant ownership of NEURAL LINK, control over another person's data, exclusive rights to ecological outcomes, or the power to override the initiative's foundational principles.

## 3. Proposed allocation of the 1B maximum supply

The following allocation is the proposed planning model. All allocations are unissued and unavailable until legal and technical release gates are passed. Percentages are portions of the 1,000,000,000 ZH maximum.

| Allocation bucket | Share | ZH | Purpose |
|---|---:|---:|---|
| Ecosystem development reserve | 25% | 250,000,000 | Long-term development, integrations, infrastructure and ecosystem grants |
| Common-good reserve | 20% | 200,000,000 | Mission-aligned public-benefit work, governed transparently and independently |
| Strategic partners | 15% | 150,000,000 | Conditional partner integrations and measurable delivery milestones |
| Liquidity reserve | 15% | 150,000,000 | Possible future DEX liquidity, only after legal approval and a separate liquidity policy |
| Technology and security | 10% | 100,000,000 | Engineering, audits, infrastructure, security response and maintenance |
| Community contributions | 10% | 100,000,000 | Optional rewards for independently verified contributions under published rules |
| Contingency reserve | 5% | 50,000,000 | Security incidents, legal/operational contingencies and continuity |
| **Total** | **100%** | **1,000,000,000** | |

### Allocation safeguards

- These are accounting buckets in a proposal, not wallet balances or existing token holdings.
- No allocation is automatically released at deployment.
- No private individual receives a personal allocation merely by virtue of authorship or project initiation.
- Any future treasury must use disclosed multisignature custody, independent signers, spending limits and a public transaction register.
- No allocation may be used to fabricate trading volume, create misleading demand, pay for undisclosed promotion, or manipulate a market.
- The common-good reserve is not a personal fund and cannot be distributed for private enrichment.
- The liquidity reserve is not a promise that a pool will be created or that liquidity will be maintained.

## 4. Proposed vesting and release schedule

Vesting is a proposed control against immediate concentration and short-term extraction. It is not a commitment that tokens will be issued or that any recipient will receive them.

| Bucket | Proposed release condition |
|---|---|
| Ecosystem development (25%) | 12-month cliff, then linear quarterly release over 48 months; each grant requires a published scope, budget and milestone |
| Common-good reserve (20%) | No automatic vesting to a person; releases only by a published mission-specific decision, independent review and transparent reporting |
| Strategic partners (15%) | 12-month cliff, then linear release over 36 months, conditional on verified contractual milestones and legal approval |
| Liquidity reserve (15%) | Locked until a separate liquidity launch decision; any release disclosed in advance with amount, pair, venue, custody and risk policy |
| Technology and security (10%) | 12-month cliff, then linear quarterly release over 48 months against documented work and security milestones |
| Community contributions (10%) | Earned only after verification under published eligibility, anti-sybil and appeal rules; no guaranteed allocation |
| Contingency (5%) | Remains reserved; use requires documented incident/need, multisig approval and public disclosure, subject to lawful confidentiality limits |

Before any deployment, exact vesting contracts, start dates, cliff dates, recipient categories and wallet controls must be specified and independently tested. No vesting clock starts merely because this document exists.

## 5. Utility model — what ZH may do

All utility below is a design direction, not a currently available feature. Each use case requires product implementation, partner agreement and legal review.

### 5.1 Ecosystem access and optional service utility
ZH may be accepted for optional features or services in participating applications. Basic access to NEURAL LINK information, public discussion, safety resources and core participation must not be paywalled by token ownership.

### 5.2 Partner integrations
Independent partners may choose to accept ZH for clearly described optional services, benefits or discounts. A partner is not required to accept ZH, and no partner relationship is implied until a written agreement exists.

### 5.3 Contribution recognition
A future programme may recognize verified contributions—such as documentation, translation, software, research support or approved field observations. Rules must be public, privacy-preserving, appealable and resistant to sybil abuse. Token rewards must never purchase scientific conclusions, ecological verification or influence over results.

### 5.4 Interoperability
ZH may later be integrated through documented APIs and smart-contract interfaces. Cross-chain bridges, wrapped representations and token swaps are excluded from the initial scope until separately threat-modelled and audited.

### 5.5 Governance boundaries
ZH must not become a plutocratic voting instrument over human rights, personal data, research integrity, ecological findings or the foundational principles of NEURAL LINK. If community consultation is introduced, token-weighted signals may be only one non-binding input and must not replace accountable human governance.

## 6. Explicit exclusions

ZH does not confer, by this model:
- equity, shares, ownership or a claim on NEURAL LINK or its assets;
- dividends, interest, yield, revenue share or a right to profits;
- redemption at a fixed value or a claim against a reserve;
- guaranteed access to a future exchange or guaranteed liquidity;
- a guaranteed market price, price floor or appreciation;
- guaranteed buybacks, burns or market support;
- control over ecological assets, land, water, research data or verified outcomes;
- the right to direct another person's participation or personal information.

No revenue-sharing, buyback, yield, redemption or profit mechanism may be added without a new legal and governance review and a revised tokenomics version.

## 7. Supply and contract policy

The current technical candidate is an ERC-20 contract with a one-time constructor mint, no owner and no post-deployment mint function. The proposed 1B cap must be reflected in the final deployment parameters only after approval.

Technical release requirements:
1. Pin the Solidity compiler and OpenZeppelin dependency versions.
2. Make the constructor supply and recipient model match the approved allocation and custody design.
3. Avoid minting the entire supply to an uncontrolled personal wallet.
4. Use audited vesting/treasury contracts or an independently reviewed distribution architecture.
5. Test total supply, allocation accounting, vesting, access controls, edge cases and failure recovery.
6. Verify source code and constructor parameters on the relevant block explorer.
7. Complete independent audit and remediate all critical/high findings.
8. Publish contract addresses, deployment transaction, allocation wallets and vesting contracts only after authorized deployment.

The proposed supply is fixed. No hidden minting, discretionary inflation, rebasing, transfer tax, blacklist or concealed administrative control is part of this model. A burn is not assumed and must not be marketed as a price-support mechanism.

## 8. TAR-001 and the existing financial gate

This tokenomics document does not amend or override TAR-001's existing status. The TAR-001 financial gate remains INACTIVE unless the project governance explicitly changes it after verification.

Accordingly:
- No ZH allocation is earmarked to purchase, control or claim ecological outcomes in TAR-001.
- No token sale, token fundraising or token-based promise is attached to TAR-001.
- No ecological result, land/water right, research conclusion or verification record may be sold or represented as token-holder property.
- TAR-001 fieldwork and verification must remain independent of token price, holder demand or market activity.

A separate governance decision must resolve whether and how an ecosystem token can coexist with the TAR-001 restrictions before any issuance or public offer.

## 9. Treasury and transparency policy

Before any issuance, publish a treasury policy that identifies:
- the legal entity or accountable body, if any, responsible for custody;
- the purpose and limits of each treasury bucket;
- multisig threshold and independent signer roles;
- approval workflow, conflict-of-interest rules and emergency procedure;
- periodic public reporting of balances, transfers, grants and vesting;
- accounting, tax and audit responsibilities;
- privacy safeguards for recipients and contributors.

Never publish private keys, seed phrases or recovery credentials. No single person or AI system may hold unilateral control of the treasury.

## 10. Legal and regulatory gate — EU / Germany

No legal classification is asserted in this draft. The actual classification depends on the final rights, functionality, distribution, offer structure, parties and marketing. Qualified counsel must assess at least:
- whether ZH is a crypto-asset within MiCA and which title/requirements apply;
- whether any feature could make it an asset-referenced token, e-money token or financial instrument under other EU rules;
- who is the issuer, offeror, person seeking admission to trading and responsible legal entity;
- whether an offer, admission to trading, white paper, notification, publication or exemption applies;
- German supervisory, consumer-protection, AML/sanctions, tax, accounting and data-protection obligations;
- cross-border restrictions and the legal position of each participating partner;
- whether any proposed utility, reward or partner discount changes the analysis.

MiCA requires in-scope communications to be fair, clear and not misleading and consistent with the relevant white paper; the Regulation also sets conditions for offers and admission to trading, subject to scope and exemptions. This summary is not legal advice. See the official sources in the project research record and obtain a written opinion before any public offer, sale or admission-to-trading step.

## 11. Risk register

| Risk | Control required |
|---|---|
| Regulatory reclassification | Written EU/German legal opinion before launch; reassess after material feature changes |
| Smart-contract exploit | Independent audit, test suite, reproducible build, staged testnet validation |
| Treasury concentration or misuse | Multisig, independent signers, spending policy, public reporting |
| Speculative volatility / illiquidity | No price promises; clear risk disclosures; no assumption that holders can sell |
| Allocation concentration | Published vesting, recipient disclosure where lawful, lockups and conflict controls |
| Sybil/fraud in contribution rewards | Verification, rate limits, appeals, privacy-preserving controls |
| Governance capture | No token control over foundational principles, personal data or scientific conclusions |
| Bridge/integration failure | No bridge at initial launch; independent threat model and audit for later integrations |
| Mission drift / pay-to-participate | Keep basic participation free; mission and human rights cannot be bought with tokens |

## 12. Release gates — no automatic progression

The following gates must all be completed before issuance is even considered:

- [ ] Written governance decision confirming compatibility with NEURAL LINK principles and TAR-001 restrictions.
- [ ] Written EU/German legal opinion on classification, issuer, offer, white paper, notification and marketing.
- [ ] Legal entity/accountability and treasury custody model confirmed, if required.
- [ ] Final token rights, utility and exclusions approved.
- [ ] Final allocation recipients/categories and vesting schedule approved.
- [ ] Contract and distribution architecture independently reviewed.
- [ ] Reproducible build, tests and testnet validation completed.
- [ ] Independent smart-contract audit completed and findings resolved.
- [ ] Security, treasury, privacy, tax and operational procedures published.
- [ ] Public documentation and risk disclosures finalized.
- [ ] Separate explicit authorization for mainnet deployment and issuance.

Passing these gates does not guarantee an exchange listing, liquidity, adoption or value. Any mainnet deployment, token mint, sale, distribution, liquidity provision or listing application requires a separate explicit decision.

## 13. Current status declaration

As of this version:
- 1B ZH is approved as the preparation model's maximum supply.
- Ecosystem utility is the approved intended function.
- Allocation and vesting are proposed tokenomics, not issued balances or binding grants.
- No token has been minted on Ethereum.
- No contract address, market price, trading pair or liquidity pool exists.
- No public sale, distribution or exchange listing is authorized.
- No partner acceptance or ecosystem integration is implied.
- TAR-001's financial gate remains inactive.

**Preparation only. No issuance. No deployment. No sale. No listing.**

**LIFE IS THE CENTER.**
