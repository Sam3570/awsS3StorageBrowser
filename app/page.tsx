
"use client";
import { Amplify, Auth } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { StorageBrowser } from "../components/StorageBrowser";
import "./../app/app.css";

Amplify.configure(outputs);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => {
        let attributes: any = {};
        console.log("User object:", user);

        fetchUserAttributes().then((res) => {
          console.log("Fetched attributes:", res);
          attributes = res;
        });
        
        return (
          <main>
            <h1>Hello {attributes?.name}</h1>
            <button onClick={signOut}>Sign out</button>

            {/* StorageBrowser Component */}
            <h2>Your Files</h2>
            <StorageBrowser />
          </main>
        );
      }}
    </Authenticator>
  );
}
