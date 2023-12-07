import { Injectable } from '@nestjs/common';

@Injectable()
export class LibraryTestService {
    constructor(){}
    
    async console(message:string){
        console.log(message)
        return {message}
    }
}
