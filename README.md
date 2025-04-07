# ZK-Verified Resume Protocol

## Overview

This project aims to build a resume system where work experience and educational credentials can be verified using Zero-Knowledge Proofs (ZKPs). This allows individuals to prove the validity of their resume items without revealing the underlying sensitive details to the verifier, enhancing privacy while maintaining trust.

This repository contains the initial setup for the frontend and backend components, currently using **mocked** ZK proof verification and blockchain interactions due to environment limitations.

## Tech Stack

*   **Frontend:** React, TailwindCSS, Vite
*   **Backend:** Node.js, Express
*   **ZK Stack (Conceptual / Mocked):** zkSNARKs / zk-STARKs (e.g., using Circom, SnarkJS)
*   **Blockchain (Conceptual / Mocked):** Ethereum or Polygon zkEVM

## Current Status

*   **Foundation Setup:** Basic project structure, dependencies, and build configurations are in place.
*   **Frontend UI:** Displays mock resume sections (Education, Experience, Skills) with placeholders for verification status.
*   **Backend API:** A simple Express server provides a mock `/api/verify` endpoint.
*   **Mock Verification:** Clicking "Request Verification" simulates a call to the backend, which returns a mock success/failure response after a delay. The UI updates accordingly (shows "Verifying...", then a "Verified" badge on success).
*   **No Real ZK:** Zero-Knowledge proof generation and verification logic are **not** implemented. The current verification is purely simulated.
*   **No Blockchain Interaction:** No connection or interaction with any blockchain network is implemented.

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository (or have the project files).
2.  Navigate to the project directory:
    ```bash
    cd zk-resume
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

To run both the frontend development server and the backend server concurrently:

```bash
npm run dev
```

*   The React frontend will be available at `http://localhost:3000`.
*   The Node.js backend will be running at `http://localhost:5000`.

The Vite development server is configured to proxy API requests from `/api` on the frontend to the backend server.

## Key Features (Current Implementation)

*   Displays resume sections with individual items.
*   Provides a button to initiate a (mock) verification process for each item.
*   Shows visual feedback during and after the mock verification (`Verifying...`, `Verified` badge, `Verification Failed`).
*   Basic API endpoint on the backend to handle verification requests.

## Future Work (Conceptual)

*   **Implement Real ZK Circuits:** Design and implement Circom circuits for verifying different types of credentials (e.g., degree validity, employment duration).
*   **Integrate ZK Proving:** Implement proof generation (potentially client-side using WebAssembly versions of libraries like SnarkJS, or via a dedicated proving service).
*   **Implement ZK Verification:** Integrate proof verification logic into the backend using the appropriate verification keys.
*   **Blockchain Integration:** Connect to a chosen blockchain (e.g., Polygon zkEVM) to:
    *   Register verification keys.
    *   Potentially store proof hashes or verification statuses on-chain.
    *   Manage decentralized identities (DIDs) if applicable.
*   **Credential Issuance Flow:** Design a secure mechanism for trusted institutions (universities, employers) to issue verifiable credentials compatible with the ZK circuits.
*   **Enhanced UI/UX:** Improve the user interface for managing credentials, viewing verification status, and sharing verified resumes.
*   **Security Hardening:** Implement robust security measures for handling private keys, proofs, and user data.
