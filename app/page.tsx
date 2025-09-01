"use client";

import { useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { StorageBrowser } from "../components/StorageBrowser";
import "./../app/app.css";

// Configure Amplify
Amplify.configure(outputs);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => <AuthenticatedApp user={user} signOut={signOut} />}
    </Authenticator>
  );
}

function AuthenticatedApp({ user, signOut }: { user: any; signOut: () => void }) {
  const [attributes, setAttributes] = useState<any>(null);

  // Fetch user attributes without useEffect
  if (!attributes) {
    Auth.fetchUserAttributes()
      .then((res) => setAttributes(res))
      .catch((err) => console.error("Error fetching attributes:", err));
  }

  const username = attributes?.username || user.username || "User";

  return (
    <main>
      <h1>Hello {username}</h1>
      <button onClick={signOut}>Sign out</button>

      <section>
        <h2>Your Files</h2>
        <StorageBrowser />
      </section>
    </main>
  );
}
