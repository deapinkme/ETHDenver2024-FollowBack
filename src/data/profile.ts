import { useEffect } from 'react';

export const profile = {
  name: "Follow Back",
  role: "Community Game",
  bio: "Social Media Growth and Engagment Game",
  imageUrl: "followBackLogo.png",
  address: "", // AMS - 2ill be populated with user's address by MetaMask SDK
};

// AMS - updating addressed based on who is signed into MetaMask
function MyComponent() {
    useEffect(() => {
        async function updateAddress() {
            // Check if window is defined (client-side environment)
            if (typeof window !== 'undefined' && window.ethereum) {
                try {
                    // Request accounts
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    // Further code logic with accounts
                } catch (error) {
                    console.error('Error requesting accounts:', error);
                    // Handle error gracefully
                }
            } else {
                console.warn('MetaMask is not installed or not enabled.');
                // Handle missing MetaMask or client-side environment gracefully
            }
        }
        
        updateAddress(); // Call the function when component mounts
    }, []); // Empty dependency array ensures this effect runs only once after component mounts

    // Your component JSX code here
}

export default MyComponent;

