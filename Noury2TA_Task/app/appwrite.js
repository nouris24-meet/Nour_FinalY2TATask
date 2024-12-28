import { Client, Account } from "appwrite";


const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")  
  .setProject("6770251c00164ee6df61");  

const account = new Account(client);

export default account;
