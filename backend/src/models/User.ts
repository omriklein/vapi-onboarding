import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public service!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    service: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;

