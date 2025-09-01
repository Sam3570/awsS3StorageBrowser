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


"use client";
import { useEffect, useState } from "react";
import { Amplify, fetchUserAttributes } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { StorageBrowser } from "../components/StorageBrowser";
import "./../app/app.css";

Amplify.configure(outputs);

export default function App() {
  const [attributes, setAttributes] = useState<any>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!user) return; // wait for user to be set

    const getAttributes = async () => {
      try {
        const res = await fetchUserAttributes();
        console.log("Fetched attributes:", res);
        setAttributes(res);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    getAttributes();
  }, [user]);

  return (
    <Authenticator>
      {({ signOut, user: authUser }) => {
        // Set user in state so top-level useEffect can run
        useEffect(() => {
          setUser(authUser);
        }, [authUser]);

        return (
          <main>
            <h1>Hello {attributes?.name || authUser?.attributes?.name}</h1>
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
