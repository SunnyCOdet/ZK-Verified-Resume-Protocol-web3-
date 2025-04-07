import express from 'express';
import cors from 'cors';
// import snarkjs from 'snarkjs'; // Would import snarkjs in a real app
// import fs from 'fs'; // Would use fs to load verification keys

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from frontend (Vite dev server)
app.use(express.json()); // Parse JSON bodies

// --- Mock Verification Key Store ---
// In a real app, these would be loaded from files specific to each circuit/credential type
const mockVerificationKeys = {
    'education': { /* Mock verification key data for education */ vkey: "vkey_edu_data..." },
    'experience': { /* Mock verification key data for experience */ vkey: "vkey_exp_data..." },
    'skills': { /* Mock verification key data for skills */ vkey: "vkey_skill_data..." },
    'default': { /* Default mock key */ vkey: "vkey_default_data..." }
};

// --- Verification Endpoint ---
app.post('/api/verify', async (req, res) => { // Make async for potential real verification
  // 1. Receive the proof and public inputs from the request body.
  const { itemId, section, proof, publicInputs } = req.body;

  console.log(`[Backend] Received verification request for Item ID: ${itemId}, Section: ${section}`);
  console.log('[Backend] Received Proof:', JSON.stringify(proof, null, 2)); // Log the mock proof
  console.log('[Backend] Received Public Inputs:', publicInputs); // Log the mock public inputs

  if (!proof || !publicInputs) {
      console.error('[Backend] Missing proof or public inputs in request');
      return res.status(400).json({ verified: false, message: 'Missing proof or public inputs.' });
  }

  let isVerified = false; // Default to false

  try {
    // 2. Load the verification key for the specific credential type.
    const verificationKey = mockVerificationKeys[section] || mockVerificationKeys['default'];
    console.log(`[Backend] Loaded mock verification key for section: ${section}`);
    // In a real app: const verificationKey = JSON.parse(fs.readFileSync(`path/to/${section}_verification_key.json`));

    // 3. Use a library like SnarkJS to verify the proof.
    console.log('[Backend] Simulating ZK proof verification...');
    // In a real app:
    // const isValid = await snarkjs.groth16.verify(verificationKey, publicInputs, proof);
    // console.log(`[Backend] snarkjs.groth16.verify result: ${isValid}`);

    // --- MOCK VERIFICATION LOGIC ---
    // Simulate verification success based on received mock data.
    // Example: succeed if publicInputs includes a hash starting with '0x' and proof exists.
    const isValid = publicInputs && publicInputs.length > 0 && typeof publicInputs[0] === 'string' && publicInputs[0].startsWith('0x') && proof.protocol === "groth16";
    console.log(`[Backend] Mock verification result: ${isValid}`);
    // --- END MOCK VERIFICATION LOGIC ---

    isVerified = isValid;

    // 4. Optionally, interact with a blockchain (check registry, store verification hash, etc.).
    if (isVerified) {
        console.log('[Backend] Simulating blockchain interaction (e.g., recording verification)...');
        // Example: await recordVerificationOnChain(itemId, publicInputs[0]);
        console.log('[Backend] Mock blockchain interaction complete.');
    }

  } catch (error) {
      console.error('[Backend] Error during mock verification:', error);
      // Keep isVerified as false
  }


  console.log(`[Backend] Final verification status for ${itemId}: ${isVerified}`);

  // Simulate network delay
  setTimeout(() => {
    if (isVerified) {
      res.json({ verified: true, message: `Item ${itemId} verified successfully (mock proof).` });
    } else {
      // Send 400 for failed verification, or 500 if an internal error occurred during simulation
      res.status(400).json({ verified: false, message: `Item ${itemId} verification failed (mock proof).` });
    }
  }, 500); // 0.5 second delay
});

// Basic root route
app.get('/api', (req, res) => {
  res.send('ZK Resume Backend is running');
});

app.listen(port, () => {
  console.log(`[Backend] Server listening at http://localhost:${port}`);
});
