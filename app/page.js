'use client';
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';

Amplify.configure(outputs);

const client = generateClient();

function App() {
  const [userAttributes, setUserAttributes] = useState({ fullname: '', configurations: [] });
  const [selectedDashboardIndex, setSelectedDashboardIndex] = useState(0);

  useEffect(() => {
    async function getUserAttributes() {
      try {
        const attributes = await fetchUserAttributes();
        const authString = attributes['custom:auth_string'];
        if (authString) {
          const parsedAttributes = JSON.parse(authString);
          setUserAttributes(parsedAttributes);
        }
      } catch (error) {
        console.error('Error fetching user attributes:', error);
      }
    }

    getUserAttributes();
  }, []);

  const handleLinkClick = (index) => {
    setSelectedDashboardIndex(index);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Layout>
          <div className="flex">
            <Sidebar
              links={userAttributes.configurations}
              onLinkClick={handleLinkClick}
            />
            <main className="flex-grow p-4">
              <div>
                {userAttributes.configurations.length > 0 && (
                  <iframe
                    width="100%"
                    height="800px"
                    src={userAttributes.configurations[selectedDashboardIndex]?.url}
                    title={userAttributes.configurations[selectedDashboardIndex]?.linkname}
                  />
                )}
              </div>
              <button onClick={signOut}>Sign out</button>
            </main>
          </div>
        </Layout>
      )}
    </Authenticator>
  );
}

export default App;
