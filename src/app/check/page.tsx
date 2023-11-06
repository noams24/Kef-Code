"use client";

import React, { useState, useEffect } from "react";
// import Dexie from "dexie";
// import { db } from "@/indexedDB/db"
import { db } from "@/indexedDB"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface IItem {
  id: number;
  title: string;
}

// const db = indexedDB.open("myDatabase");
// if (!db) {
//   const db = new Dexie("myDatabase");
//   db.version(1).stores({
//     items: "[id+title]", // Create an object store with an auto-incrementing primary key called 'id' and an index on the 'title' property
//   });
// }


const App: React.FC = () => {
  //   const [items, setItems] = useState<IItem[]>([]);

//   const [name, setName] = useState("");
//   const [age, setAge] = useState(0);
//   const [status, setStatus] = useState("");

//   async function addFriend() {
//     try {
//       // Add the new friend!
//       const id = await db.friends.add({
//         name,
//         age,
//       });

//       setStatus(`Friend ${name} successfully added. Got id ${id}`);
//       setName("");
//       setAge(0);
//     } catch (error) {
//       setStatus(`Failed to add ${name}: ${error}`);
//     }
//   }

//   const { data } = useQuery({
//     queryKey: ['friends'],
//     queryFn: async () => {
//         // const query = `/api/check`
//         // const { data } = await axios.get(query)
//         const data = await db.friends.toArray()
//         return data
//     },
// },)

//   async function getFriends () {
//     const friends = await db.friends.toArray()
//     console.log(friends)
//     }
  
// if (data)
// console.log(data)

  return (
    <div>
      {/* <p>{status}</p>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={(ev) => setAge(Number(ev.target.value))}
      />
      <button onClick={addFriend}>Add</button> */}
      {/* <button onClick={getFriends}>Get</button> */}
    </div>
  );
};

export default App;

