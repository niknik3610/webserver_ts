import {Server} from "socket.io";
import * as http from "http" ;
import {promises as fs} from 'fs';

const OUT_PORT: number = 8000;
const HOST_NAME = '127.0.0.1';
const HEADER_PATH = "web_files/header.htm";
const ERROR_PATH = "web_files/404.html";

function init_io(port_num: number): Server { 
    return new Server(
        port_num,
        {}
    );
}

async function read_file(path: string) {
    try {
        const file_contents = await fs.readFile(path);
        return file_contents.toString();
    }
    catch (e){
        throw `Error Reading file: ${e}`;
    }
}


async function main() {
    const server = http.createServer(async (req, res) => {
        try {
            let header: string;
            header = await read_file(HEADER_PATH);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'html');
            res.end(header);
        }
        catch (e) {
            let e_header: string;
            e_header = await read_file(ERROR_PATH); 
            res.statusCode = 404;
            res.setHeader('Content-Type', 'html');
            res.end(e_header);
        }
    });    

    const io = init_io(OUT_PORT);
    io.on("connection", (socket) => {
        console.log(socket);
    }) 

    server.listen(OUT_PORT, HOST_NAME, () => {
        console.log(`Server Running at http://${HOST_NAME}:${OUT_PORT}/`);
    });
}

main();
