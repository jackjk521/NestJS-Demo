import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express'
import * as users from './users.json';
import { UserSchema } from './user.dto';

@Controller('users')
export class UserController {

    @Get() 
    getAllUsers(): UserSchema[] { //custom function to fetch all the data from json
        return users;
    }

    @Get(':id') // get a specific user
    getUser(
        @Param() params,
        @Res({ passthrough: true }) res: Response, // search about this
    ): UserSchema {
        const user = users.find((user) => user.id == Number(params.id));
        return user;
    }
   
    @Post() // create new user
    createUser(@Body() body: UserSchema): UserSchema {
        const id = Math.max(...users.map((user) => user.id)) + 1;
        const newUser = { id, ...body };
        users.push(newUser);
/*        saveData(users);*/
        return newUser;
    }

    @Put(':id')
    updateUser(
        @Param() params,
        @Body() body: UserSchema,
        @Res({ passthrough: true }) res: Response,
    ) : any {
        const index = users.findIndex((user) => user.id === Number(params.id));

        if (index === -1) res.status(404).json({ error: " User doesn't exist. " }); // to search
        users[index] = { ...users[index], ...body };

        return users[index];
    }


    @Delete(':id')
    removeUser(
        @Param() params,
        @Res({ passthrough: true }) res: Response,
    ): UserSchema {
        const user = users.find((user) => user.id === Number(params.id));
        if (!user) res.status(404).json({ error: "User does not exist" });
        const updatedUsers = users.filter((user) => user.id !== Number(params.id));
        /*saveData(updatedUsers);*/
        return user;
    }
}