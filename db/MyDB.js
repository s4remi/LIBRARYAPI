import { query } from "express";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

const connection_url = process.env.MONGO_URL;
const MyDB = () => {
  const myDB = {};
  const connect = () => {
    const client = new MongoClient(connection_url);
    console.log(`this is a connection url: ${connection_url}`);
    const db = client.db("library");
    return { client, db };
  };
  // filter the query

  myDB.getBookByIsbn = async ({ query = {}, MaxElement = 2 }) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    console.log(" in the mongodb search for isbn");
    console.log(query);

    try {
      return await bookCollection.find(query).limit(MaxElement).toArray();
    } finally {
      console.log("db is closing");
      client.close();
    }
  };

  return myDB;
};

export const myDB = MyDB();
