import dotenv from 'dotenv';
dotenv.config();

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessagePromptTemplate, ChatPromptTemplate } from '@langchain/core/prompts';


import {TextLoader} from "langchain/document_loaders/fs/text"; // load a text file
import {CSVLoader} from "langchain/document_loaders/fs/csv"; // load a csv file
import {PDFLoader} from "langchain/document_loaders/fs/pdf"; // load a pdf file



const chat = new ChatOpenAI({})

// Example 1 loading a sample txt file 
// const loader = new TextLoader("data/sample.txt")
// const mydata = await loader.load()

// // console.log("My data is", mydata)

// // console.log("My data is", mydata[0])

// // console.log("My data is", mydata[0].metadata)

// console.log("My data is", mydata[0].pageContent)


// // Example 2 loading a csv file 
// const loader = new CSVLoader("data/sample.csv")
// const mydata = await loader. load ()
// // console.log("My Data:", mydata);

// // console.log("My data is", mydata[0]) // to get the first row of the csv file

// console.log("My data is", mydata[0].pageContent) // to get the page content of the first row of the csv file


// Example 3 Loading a PDF file



// const loader = new PDFLoader("data/sample.pdf")
// const mydata = await loader. load ()
// // console.log("My Data:", mydata);

// // console.log("My data is", mydata[0]) 

// console.log("My data is", mydata[0].pageContent) // to get the page content of the pdf file


// Example 4 

const loader = new TextLoader("data/legal.txt")
const mydata = await loader.load()
const my_legal_doc = mydata[0].pageContent
const human_template = "{question}\n{company_legal_doc}"
const chatPrompt = ChatPromptTemplate.fromMessages([
    ["human", human_template]
])

const formattedChatPrompt = await chatPrompt.formatMessages({
    question: "How can i apply for pan card",
    company_legal_doc: my_legal_doc
    })

// console.log("Formatted Chat Prompt :",formattedChatPrompt); 

const response = await chat.invoke(formattedChatPrompt)
console.log("Response :", response.content);

