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
import { uploadData, downloadData, list, getUrl } from "aws-amplify/storage";

Amplify.configure(outputs);

const client = generateClient();

function App() {
  const [userAttributes, setUserAttributes] = useState({ fullname: '', configurations: [] });
  const [selectedDashboardIndex, setSelectedDashboardIndex] = useState(0);
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // Fetch user attributes
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

    // Fetch list of files in storage
    async function fetchFiles() {
      try {
        const result = await list({ path: 'picture-submissions/' });
        console.log('Files:', result.items);

        // Get URLs for each file
        const filesWithUrls = await Promise.all(result.items.map(async (file) => {
          const url = await getUrl({ path: file.path });
          console.log('URL:', url);
          console.log('URL:', url.url);
          return { ...file, url: url.url };
        }));

        setFileList(filesWithUrls || []);
      } catch (error) {
        console.error('Error listing files:', error);
        setFileList([]);
      }
    }

    getUserAttributes();
    fetchFiles();
  }, []);

  const handleLinkClick = (index) => {
    setSelectedDashboardIndex(index);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      await uploadData({
        data: file,
        path: `picture-submissions/${file.name}`
      });
      // Refresh file list after upload
      const files = await list({ path: 'picture-submissions/' });
      setFileList(files);
    } catch (e) {
      console.log("error", e);
    }
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
              <div className="mt-4">
              <h1>Upload a File:</h1>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <input type="file" id="file" onChange={handleFileChange} />
                <button id="upload" onClick={handleUploadClick} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Upload File
                </button>
                </div>
              </div>
              <div className="mt-4">
                <h1>Uploaded Files:</h1>
                <div className="grid grid-cols-3 gap-4">
                  {Array.isArray(fileList) && fileList.map(file => (
                    <div key={file.path} className="bg-white p-4 rounded-lg shadow-md">
                      <div className="font-semibold">{file.path.split('/').pop()}</div>
                      <div className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      <a href={file.url.toString()} target="_blank" rel="noopener noreferrer">
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Download
                        </button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <br />
              <br />
              <br />
              <button onClick={signOut} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600">Sign out</button>
            </main>
          </div>
        </Layout>
      )}
    </Authenticator>
  );
}

export default App;
