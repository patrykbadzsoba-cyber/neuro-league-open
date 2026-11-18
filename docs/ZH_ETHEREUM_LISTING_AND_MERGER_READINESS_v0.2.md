# ZIARNO HARMONII (ZH) — ETHEREUM, LISTING & MERGER READINESS v0.2

**Initiative:** NEURAL LINK / NEURO LEAGUE OPEN  
**Token identity:** NL-ZH-000001  
**Proposed network:** Ethereum  
**Proposed standard:** ERC-20  
**Status:** TECHNICAL PREPARATION — NOT DEPLOYED, NOT OFFERED, NOT LISTED  
**Date:** 18 November 2026

## 1. Objective

Prepare Ziarno Harmonii for a future Ethereum deployment, decentralized-market liquidity, possible centralized-exchange applications, and future integrations or a formally governed merger with another project/token.

This document does not claim that a token has been issued, that a market exists, that an exchange has accepted it, or that its price will rise. Adoption, liquidity and market value are uncertain and cannot be engineered or guaranteed by wording in a specification.

## 2. Proposed technical baseline

- Network: Ethereum Mainnet for a production launch; Sepolia for test deployments.
- Token interface: ERC-20, 18 decimals.
- Working name/symbol: Ziarno Harmonii / ZH (must be checked for naming and ticker conflicts before public use).
- Contract candidate: `contracts/ZiarnoHarmonii.sol`.
- Candidate supply model: fixed supply minted once at deployment to a designated initial-holder address; no owner, no post-deployment mint function, no transfer tax, no rebasing, no blacklist, no hidden pause switch.
- The initial supply and initial-holder address are deliberately not hard-coded. They must be approved before deployment.
- Contract imports OpenZeppelin Contracts; dependency version must be pinned in the build configuration before reproducible compilation.

This conservative baseline is intended to maximize ERC-20 compatibility. It is not a final tokenomics decision.

## 3. What “being on an exchange” actually requires

### Decentralized exchange (DEX)

After a verified Ethereum mainnet deployment, a pool can be created on a DEX such as Uniswap by pairing ZH with an asset such as ETH or a suitable stablecoin and depositing both assets as liquidity. The pool's initial price is determined by the liquidity provider's deposit ratio. A pool does not guarantee trading volume, market depth, price stability or demand.

Liquidity provision exposes the provider to market and impermanent-loss risks. No liquidity amount, starting price or market-making commitment is assumed here.

### Centralized exchange (CEX)

A CEX listing is a separate application and due-diligence process. The exchange controls acceptance, supported jurisdictions, trading pairs, custody and timing. There is no guaranteed listing and no listing can be promised on the token's behalf.

## 4. Adoption and value-capture design

The project may develop genuine utility and integrations over time, but must not promise appreciation. Any future utility must be concrete, documented, independently usable and legally reviewed.

Possible future integration paths, subject to separate approval:
- optional access or participation utility that never makes basic participation pay-to-enter;
- transparent recognition of verified contributions without selling influence over research or ecological outcomes;
- integrations with independent applications and partner systems through documented interfaces;
- public reporting of token supply, treasury movements and relevant contract events;
- optional cross-project interoperability only where each project independently consents.

No automatic “price growth”, guaranteed buy pressure, guaranteed redemption, profit share or claim on NEURAL LINK assets is created by this document.

## 5. Merger and migration readiness

“Merger-ready” means technical and governance preparation, not an automatic merger or permission to absorb another project's assets.

Any future merger, token swap, acquisition, consolidation or migration requires:
1. independent legal review of both projects and their token rights;
2. explicit approval under each project's governance rules;
3. a published exchange-ratio methodology and snapshot date;
4. independent contract/security review;
5. a migration mechanism with clear eligibility, deadlines, error handling and a public audit trail;
6. protection against replay, double claims and unauthorized supply creation;
7. a documented treatment for holders who do not migrate;
8. public disclosure of conflicts of interest and material risks.

Do not add proxy upgradeability or privileged minting solely to make a future merger easier. A migration contract can be designed and audited when a real counterparty and approved terms exist.

## 6. EU/Germany legal gate

Before a public offer or an application for admission to trading in the EU, determine the issuer/offeror and applicable MiCA classification and obligations. For crypto-assets in scope of MiCA Title II, Article 5 sets requirements for seeking admission to trading, including legal-person status and a crypto-asset white paper that is notified and published, subject to the Regulation's conditions and exemptions. The white paper must be fair, clear and not misleading and disclose material risks.

This is a legal workstream, not a box that can be bypassed by deploying code. Obtain qualified German/EU crypto-asset legal advice before public marketing, sale or listing steps. Also assess AML, sanctions, tax, consumer-protection, data-protection and any financial-instrument classification issues.

## 7. Security and release gates

- [ ] Confirm legal issuer/offeror and governance authority.
- [ ] Decide whether issuing/trading a token is consistent with the NEURAL LINK governance and TAR-001 financial gate; this technical document does not override existing project restrictions.
- [ ] Approve utility, holder rights, total supply, allocation and treasury policy.
- [ ] Verify name and ticker availability.
- [ ] Pin Solidity compiler and OpenZeppelin dependency versions.
- [ ] Compile reproducibly and run unit, fuzz and invariant tests.
- [ ] Deploy only to Sepolia for initial validation.
- [ ] Verify source code and deployment parameters on the relevant explorer.
- [ ] Complete independent smart-contract audit and remediate findings.
- [ ] Complete legal review and required MiCA documentation/notifications, where applicable.
- [ ] Obtain explicit production deployment approval and wallet signatures.
- [ ] Only then consider Ethereum Mainnet deployment, DEX liquidity and CEX applications.

## 8. Operational custody

Never put seed phrases, private keys, recovery phrases or signing credentials in this repository, Dropbox Paper, chat, or public documentation. Production administration and treasury custody require a properly designed multisig and independent signers. A deployer wallet is not a substitute for a treasury-governance process.

## 9. Current verified status

- Token identity NL-ZH-000001 is recorded in the Dropbox vault.
- This repository contains a candidate ERC-20 source file and this readiness plan.
- No contract address has been assigned.
- No Ethereum transaction has been signed or broadcast.
- No token has been minted on-chain.
- No DEX pool or liquidity position exists.
- No centralized exchange has approved a listing.
- No merger partner or merger terms have been agreed.
- No market price or appreciation is established.

**LIFE IS THE CENTER.**
