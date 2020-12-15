//The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. 
let streamArgValue;

process.argv.forEach((val, index) => { 
    
    if (val == '--stream'){
        streamArgValue = process.argv[index+1];
        console.log('streamArgValue',streamArgValue);
    };
});

//In the .env file you can add the Environment Variables; dotenv loads environment variables from .env file into process.env.
//create a .env file in the project folder and set NODE_ENV=production or development.
require('dotenv').config();

//Add an event listener to listen to the event ‘createFolders’ which should trigger a method to create the following folders if not exists based on the NODE_ENV variable from the environment variables:
//
//    development/src, development/dest OR
//
//    production/src, production/dest

const fs = require('fs');

var src_dir = './'+process.env.NODE_ENV+'/src';
var dest_dir = './'+process.env.NODE_ENV+'/dest';

const EventEmitter = require('events') ;
const eventEmitter = new EventEmitter();

eventEmitter.on('createFolders',()=>{
    
    if (fs.existsSync(src_dir)){
        console.log("Directory already exists!");
    }
    else{
        fs.mkdirSync(src_dir, { recursive: true });
        console.log("Source Directory Created!");
    };

    if (fs.existsSync(dest_dir)){
        console.log("Directory already exists!");
    }
    else{
        fs.mkdirSync(dest_dir, { recursive: true });
        console.log("Destination Directory Created!");
    };
});


//Add an event listener to listen to the event ‘createSourceFile’ which should trigger a method to create a file in the src folder with the filename as YYYY_MM_DD_HH_MM_SS.txt 

var file_name=require('moment')().format('YYYY_MM_DD_HH_MM_SS');
var src_file=src_dir+'/'+file_name+'.txt';

eventEmitter.on('createSourceFile',()=>{
    
    fs.writeFileSync(src_file, "Source File Content."); 
    console.log("Source File Created!");
});


//Add an event listener ‘createDestFile’ and upon listening event, based on the --stream argument value:
//
//    If true, create the dest file with the same filename as src file but in the dest directory using streaming mechanism. (Try creating individual streams and then use on data, on error, on end events and using pipe)
//
//    If false, create the dest file with the same filename as src file but in the dest directory using file system methods. (Try creating the file using both synchronous methods and asynchronous methods).

var dest_file=dest_dir+'/'+file_name+'.txt';

eventEmitter.on('createDestFile',()=>{
    
    if(streamArgValue=='true'){
        
        let writeStream = fs.createWriteStream(dest_file);

        // write some data.
        writeStream.write('Destination File Content using streams.');

        // the finish event is emitted when all data has been flushed from the stream.
        writeStream.on('finish', () => {
            console.log('Destination File saved using streams!');
        });

        // close the stream.
        writeStream.end();
    }
    
    else if(streamArgValue=='false'){
        
//        Asynchronous Method.
        fs.writeFile(dest_file, "Destination File Content saved Asynchronously.", function(err) {
            
        if(err) {
            return console.log(err);
        }
        console.log("Destination File saved Asynchronously!");
        }); 

//        Synchronous Method.
//        fs.writeFileSync(dest_file, "Destination File Content saved Synchronously.");
//        console.log("Destination File saved Synchronously!")
    }
});

eventEmitter.emit('createFolders');
eventEmitter.emit('createSourceFile');
eventEmitter.emit('createDestFile');

//Add a SIGINT listener to the process and upon listening to the event, console ‘Received Interrupt Signal’ to stdout and exit the process.

process.stdin.resume();
process.on('SIGINT',()=>{
    console.log("Received Interrupt Signal");
    process.exit();
});

//=============================================================================================================================================//
