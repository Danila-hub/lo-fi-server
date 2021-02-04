
import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({tableName:"users"})
export class User extends Model<User> {
    @PrimaryKey
    @Column
    id: string;

    @Column
    login: string;

    @Column
    password: string;

    @Column
    email: string;
    
    //images array in future


};
