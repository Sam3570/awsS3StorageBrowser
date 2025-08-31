"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from '@aws-amplify/ui-react';
import { StorageBrowser } from '../components/StorageBrowser';
import { fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
      const [attributes, setAttributes] = useState(null);

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
  return (
    <Authenticator>
  {({ signOut, user }) => {
    fetchUserAttributes().then(res => {
      setAttributes(res)
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