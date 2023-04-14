// import express from "express";
// file accessing packages

// import * as fs from 'fs'; 
const express = require ("express")
const fs = require("fs")
const path = require("path");
// path
const dirPath = path.join(__dirname,"timestamps");
console.log("dirPath",dirPath)

const data =[
    {
        id: "1",
        numberOfSeats: 100,
        amenities: ["Ac","chairs", "discolights"],
        price: 5000,
        ifBooked: "true",
        customerName: "Sanjay",
        date: "05-feb-2022",
        startTime: "10-feb-2022 at 12PM",
        endTime: "11-feb-2020 at 11am",
        RoomId: 201,
        RoomName: "Duplex",
    },
        {
            id: "2",
            numberOfSeats: 100,
            amenities: ["Ac", "chairs", "discolights"],
            price: 5000,
            ifBooked: "false",
            customerName: "kani",
            date: "22-april-2023",
            startTime: "23-april-2023 at 11am",
            endTime: "25-april-2023 at 11am",
            RoomId: 202,
            RoomName: "Duplex"
        },
        {
            id: "3",
            numberOfSeats: 100,
            amenities: ["Ac", "chairs", "discolights"],
            price: 9000,
            ifBooked: "true",
            customerName: "anu",
            date: "22-june-2023",
            startTime: "23-june-2023 at 10am",
            endTime: "25-april-2023 at 11am",
            RoomId: 203,
            RoomName: "suits"
        },
        {
            id: "4",
            numberOfSeats: 100,
            amenities: ["Ac", "chairs", "discolights"],
            price: 6000,
            ifBooked: "false",
            customerName: "anitha",
            date: "22-nov-2023",
            startTime: "23-nov-2023 at 11am",
            endTime: "25-nov-2023 at 11am",
            RoomId: 204,
            RoomName: "Duplex"
        }
    ]

// initializing express server
const app = express()

// middlewars
app.use(express.static("timestamps"))
app.use(express.json())

// api's

app.get("/",(req,res)=>{
    res.send("working fine")
})
app.get ("/static",(req,res)=>{
    let time = new Date();
    let dateString = time.toUTCString().slice(0,-3);
    let content = `Last updated timestamp is ${dateString}`
    

fs.writeFileSync(`${dirPath}/date-time.txt`,content,(err)=>{
    if(err){
        console.log(err)
    } else{
        console.log("file created")
    }
   })

  
res.sendFile(path.join(__dirname,"timestamps/date-time.txt"))
})
// get hall details
app.get("/hall-details",(req,res)=>{
    if(req.query){
        const {ifBooked} = req.query;
        console.log(ifBooked)
        let filteredHall = data;
        if(ifBooked) {
            filteredHall = filteredHall.filter((halls)=>halls.ifBooked === ifBooked)
        }
        res.send(filteredHall)
    }else{
    res.send(data)
   }
})

app.get("/hall/details/:id",(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const specificHall = data.find(hall=>hall.id === id);
    res.send(specificHall)
})

// new hall
app.post("/hall/details",(req,res)=>{
    // numberOfSeats: 100,
    //         amenities: ["Ac", "chairs", "discolights"],
    //         price: 5000,
    //         ifBooked: "false",
    //         customerName: "kani",
    //         date: "22-april-2023",
    //         startTime: "23-april-2023 at 11am",
    //         endTime: "25-april-2023 at 11am",
    //         RoomId: 202,
    //         RoomName: "Duplex"
    const newHall={
        id : data.length+1,
        numberOfSeats : req.body.numberOfSeats,
        amenities :req.body.amenities,
        price : req.body.price,
        ifBooked : req.body.ifBooked,
        RoomId : req.body.RoomId,
        RoomName : req.body.RoomName,
        customerName : "",
        date : "",
        startTime : "",
        endTime : ""
    }
    console.log(req.body)
    data.push(newHall);
    res.send(data)
})

app.put("/hall/details/:id",(req,res)=>{
    const {id} = req.params;
    const halls = data.find(hall=>hall.id === id);

    if(halls.ifBooked === "true") {
        res.status(400).send("already booked")
    }else{
        halls.date = req.body.date;
        halls.startTime = req.body.startTime;
        halls.endTime = req.body.endTime;
        halls.customerName = req.body.customerName;
        halls.ifBooked = "true"
        res.status(200).send(data)
    }
})

app.listen(9000,()=>console.log(`server started in localhost:9000`));

