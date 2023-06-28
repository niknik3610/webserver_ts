import * as http from "http" ;
import {promises as fs} from 'fs';
import * as response_handler from "./response_handler";

const OUT_PORT: number = 8000;
const HOST_NAME = '127.0.0.1';
const HEADER_PATH = "web_files/header.html";

export async function read_file(path: string) {
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
        console.log("Received Request");
        try {
            response_handler.serve_file(HEADER_PATH, res);
        }
        catch (e) {
            response_handler.serve_404_error(res);
        }
    });    

    server.listen(OUT_PORT, HOST_NAME, () => {
        console.log(`Server Running on http://${HOST_NAME}:${OUT_PORT}/`);
    });
}

main();
