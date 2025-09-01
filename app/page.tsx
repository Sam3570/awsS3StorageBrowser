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


import { useEffect, useState } from "react";
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
        const [attributes, setAttributes] = useState({});

        useEffect(() => {
          async function fetchAttrs() {
            // Replace with your actual fetch function or logic
            let res = await Auth.userAttributes(user);
            const attrObj = {};
            res.forEach(({ Name, Value }) => { attrObj[Name] = Value; });
            setAttributes(attrObj);
          }
          if (user) fetchAttrs();
        }, [user]);

        return (
          <main>
            <h1>Hello {attributes?.username || user?.username || "User"}</h1>
            <button onClick={signOut}>Sign out</button>
            <h2>Your Files</h2>
            <StorageBrowser />
          </main>
        );
      }}
    </Authenticator>
  );
}
