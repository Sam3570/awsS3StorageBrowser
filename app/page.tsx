"use client";
import { Amplify, Auth } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { StorageBrowser } from "../components/StorageBrowser";
import "./../app/app.css";
import { useState, useEffect } from "react";

Amplify.configure(outputs);

// This is the new component to handle state and display logic.
function AppContent({ signOut, user }: { signOut: any; user: any }) {
  const [attributes, setAttributes] = useState<any | null>(null);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const userAttributes = await Auth.currentAuthenticatedUser();
        setAttributes(userAttributes.attributes);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };
    fetchAttributes();
  }, []);

  return (
    <main>
      <h1>Hello {attributes?.name || attributes?.nickname || attributes?.email}</h1>
      <button onClick={signOut}>Sign out</button>

      <h2>Your Files</h2>
      <StorageBrowser />
    </main>
  );
}

// The main App component now simply renders the Authenticator and the new component.
export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <AppContent signOut={signOut} user={user} />
      )}
    </Authenticator>
  );
}











// "use client";
// import { Amplify, Auth } from "aws-amplify";
// import outputs from "@/amplify_outputs.json";
// import "@aws-amplify/ui-react/styles.css";
// import { Authenticator } from "@aws-amplify/ui-react";
// import { StorageBrowser } from "../components/StorageBrowser";
// import "./../app/app.css";

// Amplify.configure(outputs);

// export default function App() {
//   return (
//     <Authenticator>
//       {({ signOut, user }) => {
//         let attributes: any = {};
//         console.log("User object:", user);

//         fetchUserAttributes().then((res) => {
//           console.log("Fetched attributes:", res);
//           attributes = res;
//         });

//         return (
//           <main>
//             <h1>Hello {attributes?.username}</h1>
//             <button onClick={signOut}>Sign out</button>

//             {/* StorageBrowser Component */}
//             <h2>Your Files</h2>
//             <StorageBrowser />
//           </main>
//         );
//       }}
//     </Authenticator>
//   );
// }
