import { Controller, Get, Post, Res, HttpStatus, Body, Put, Param, Delete } from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './cats.dto';
import { cats } from './cats.json'
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Post()
    create(@Res() res : Response, @Body() createCatDto: CreateCatDto) {
        res.status(HttpStatus.CREATED).send(this.catsService.createCat(createCatDto));
    }

    @Get()
    findAll(@Res() res: Response) {
        res.status(HttpStatus.OK).json(cats);
    }

    @Get(':id')
    findOne( @Res()  res : Response, @Param('id') id: string ) {
        const cat = cats.filter((cat) => cat.id === parseInt(id));
        (cat.length != 0) ? res.status(HttpStatus.OK).json(cat) : res.status(HttpStatus.NOT_FOUND).send('Data not found');
    }

    @Put(':id')
    update(@Res() res: Response, @Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        const updated = this.catsService.updateCat(id, updateCatDto);
        (updated.length != 0) ? res.status(HttpStatus.OK).json(updated):res.status(HttpStatus.NOT_FOUND).send('Data not found');
    }

    @Delete(':id')
    remove(@Res() res: Response, @Param('id') id: string) {
        const deleted = this.catsService.deleteCat(id);
        (deleted.length != 0) ? res.status(HttpStatus.OK).json(deleted) :
            res.status(HttpStatus.NOT_FOUND).send('Data not found');
    }
}