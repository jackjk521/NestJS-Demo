import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as Path from 'path';
import { cats } from './cats.json'
import { CreateCatDto, UpdateCatDto } from './cats.dto';

const fullPath = Path.resolve(__dirname, '../..//src/cats/cats.json');

@Injectable()
export class CatsService {

     createCat = (data: CreateCatDto) => {
        const id = (cats.length) ? Math.max(...cats.map((cat) => cat.id)) + 1 : 1;
        const cat = { id, ...data };
         cats.push(cat);
         fs.writeFileSync(fullPath, JSON.stringify({cats: [...cats]} , null, 2));
         return cat;

    }

     updateCat = (id: string, data: UpdateCatDto) => {
        const updated = cats.filter(cat => cat.id === parseInt(id));
        const updateCats = {
            cats : cats.map(cat => cat.id === parseInt(id) ? { "id": parseInt(id), ...data} : cat)
        }

        fs.writeFileSync(fullPath, JSON.stringify(updateCats, null, 2));
        return (updated.length != 0) ? [{ "id": parseInt(id), ...data }] : [];
    }
     deleteCat = (id: string) => {
        const deleted = cats.filter(cat => cat.id === parseInt(id));
        const remainder = {
            cats: cats.filter(cat => cat.id !== parseInt(id))
        }

        deleted && fs.writeFileSync(fullPath, JSON.stringify(remainder, null, 2));
        return deleted
    }

}