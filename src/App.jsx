import React, { useState } from 'react';
import ResumeSection from './components/ResumeSection';
import VerificationButton from './components/VerificationButton';

function App() {
  const [verificationStatus, setVerificationStatus] = useState({}); // { sectionId: 'verified' | 'pending' | 'failed' | null }

  // Mock resume data
  const resumeData = {
    education: [
      { id: 'edu1', institution: 'University of Example', degree: 'B.Sc. Computer Science', years: '2018-2022', verified: false, claimHash: '0xabc123' }, // Added mock claimHash
      { id: 'edu2', institution: 'Online Course Platform', degree: 'Advanced Cryptography', years: '2023', verified: false, claimHash: '0xdef456' },
    ],
    experience: [
      { id: 'exp1', company: 'Tech Corp', role: 'Software Engineer', years: '2022-Present', description: 'Developed web applications.', verified: false, claimHash: '0xghi789' },
      { id: 'exp2', company: 'Startup Inc', role: 'Intern', years: 'Summer 2021', description: 'Assisted senior developers.', verified: false, claimHash: '0xjkl012' },
    ],
    skills: [
        { id: 'skill1', name: 'JavaScript', verified: false, claimHash: '0xmno345' },
        { id: 'skill2', name: 'React', verified: false, claimHash: '0xpqr678' },
        { id: 'skill3', name: 'Node.js', verified: false, claimHash: '0xstu901' },
        { id: 'skill4', name: 'Cryptography Basics', verified: false, claimHash: '0xvwx234' },
    ]
  };

  const handleVerify = async (sectionId, item) => {
    console.log(`Attempting to verify: ${sectionId} - ${item.id}`);
    setVerificationStatus(prev => ({ ...prev, [item.id]: 'pending' }));

    // --- MOCK ZK PROOF GENERATION ---
    // In a real app, this would involve:
    // 1. Gathering private inputs from the user (e.g., specific dates, grades, supervisor details).
    // 2. Preparing public inputs (e.g., hash of the claim, institution ID).
    // 3. Calling the ZK proving system (e.g., snarkjs.groth16.fullProve in a Web Worker).

    // Simulate generating proof and public inputs
    const mockPublicInputs = [
        item.claimHash || `0x${item.id}hash`, // Public input: Hash of the credential claim
        // Other public inputs depending on the circuit (e.g., time range, institution ID)
        "1" // Example: representing 'isEmployed' or 'isGraduated' signal
    ];

    const mockProof = {
        pi_a: ["0x...", "0x..."], // Mock proof data structure (simplified)
        pi_b: [["0x...", "0x..."], ["0x...", "0x..."]],
        pi_c: ["0x...", "0x..."],
        protocol: "groth16",
        curve: "bn128"
    };

    console.log(`[Frontend] Mock Proof generated for ${item.id}:`, mockProof);
    console.log(`[Frontend] Mock Public Inputs for ${item.id}:`, mockPublicInputs);
    // --- END MOCK PROOF GENERATION ---


    try {
      // Simulate API call to backend for verification
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send the mock proof and public inputs
        body: JSON.stringify({
            itemId: item.id,
            section: sectionId,
            proof: mockProof,
            publicInputs: mockPublicInputs
        }),
      });

      if (!response.ok) {
        throw new Error(`Verification failed: ${response.statusText}`);
      }

      const result = await response.json();

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (result.verified) {
        console.log(`Mock verification successful for ${item.id}`);
        setVerificationStatus(prev => ({ ...prev, [item.id]: 'verified' }));
        // In real app: Update item state or refetch data if verification status is stored elsewhere
        // Find the item and update its verified status (more robust than direct mutation)
        const updateItemVerified = (sectionKey) => {
            resumeData[sectionKey] = resumeData[sectionKey].map(i =>
                i.id === item.id ? { ...i, verified: true } : i
            );
        };
        if (resumeData[sectionId]) {
            updateItemVerified(sectionId);
        }

      } else {
        console.log(`Mock verification failed for ${item.id}`);
        setVerificationStatus(prev => ({ ...prev, [item.id]: 'failed' }));
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus(prev => ({ ...prev, [item.id]: 'failed' }));
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-400 mb-2">ZK-Verified Resume</h1>
        <p className="text-lg text-gray-400">Prove your credentials without revealing sensitive details.</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Pass down the updated resumeData sections */}
        <ResumeSection title="Education" items={resumeData.education} onVerify={(item) => handleVerify('education', item)} verificationStatus={verificationStatus} />
        <ResumeSection title="Work Experience" items={resumeData.experience} onVerify={(item) => handleVerify('experience', item)} verificationStatus={verificationStatus} />
        <ResumeSection title="Skills" items={resumeData.skills} onVerify={(item) => handleVerify('skills', item)} verificationStatus={verificationStatus} />
      </main>

      <footer className="text-center mt-12 text-gray-500">
        <p>Powered by Mock ZK Proofs</p>
      </footer>
    </div>
  );
}

export default App;
