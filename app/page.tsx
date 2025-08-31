// "use client";

// import { useState, useEffect } from "react";
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource";
// import "./../app/app.css";
// import { Amplify } from "aws-amplify";
// import outputs from "@/amplify_outputs.json";
// import "@aws-amplify/ui-react/styles.css";
// import { Authenticator } from '@aws-amplify/ui-react';
// import { StorageBrowser } from '../components/StorageBrowser';

// Amplify.configure(outputs);

// const client = generateClient<Schema>();

// export default function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   function listTodos() {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }

//   useEffect(() => {
//     listTodos();
//   }, []);

//   function createTodo() {
//     client.models.Todo.create({
//       content: window.prompt("Todo content"),
//     });
//   }

//   const formFields = {
//   signUp: {
//     preferred_username: {
//       // Custom label, placeholder, etc.
//       label: 'Preferred Username',
//       placeholder: 'Choose a display username',
//       isRequired: false,
//       order: 2
//     },
//   },
// };


//   return (
//     <Authenticator formFields={formFields}>
//   {({ signOut, user }) => {
//     console.log("User object:", user);  // 👈 Add here

//     return (
//       <main>
//         <h1>Hello {user?.username}</h1>
//         <button onClick={signOut}>Sign out</button>

//         {/* StorageBrowser Component */}
//         <h2>Your Files</h2>
//         <StorageBrowser />
//       </main>
//     );
//   }}
// </Authenticator>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify, Auth } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { StorageBrowser } from "../components/StorageBrowser";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [attrs, setAttrs] = useState<any>(null); // 👈 state for user attributes

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  const formFields = {
    signUp: {
      preferred_username: {
        label: "Preferred Username",
        placeholder: "Choose a display username",
        isRequired: false,
        order: 2,
      },
    },
  };

  return (
    <Authenticator formFields={formFields}>
      {({ signOut, user }) => {
        // Fetch full attributes after login
        useEffect(() => {
          async function fetchUser() {
            try {
              const currentUser = await Auth.currentAuthenticatedUser();
              console.log("Full attributes:", currentUser.attributes); // 👈 debug
              setAttrs(currentUser.attributes);
            } catch (err) {
              console.error("Error fetching user attributes", err);
            }
          }
          fetchUser();
        }, []);

        // Decide which name to show
        const displayName =
          attrs?.preferred_username || attrs?.email || user?.username || "User";

        return (
          <main>
            <h1>Hello {displayName}</h1>
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
