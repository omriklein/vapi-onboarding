// models/agent.ts
import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../sequelize";

// Types for TypeScript
interface AgentAttributes {
  id: number;
  vapiAgentId: string;
  name: string;
  greetingMsg: string;
  userId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AgentCreationAttributes extends Optional<AgentAttributes, "id" | "userId" | "createdAt" | "updatedAt"> {}

class Agent extends Model<AgentAttributes, AgentCreationAttributes> implements AgentAttributes {
  public id!: number;
  public vapiAgentId!: string;
  public name!: string;
  public greetingMsg!: string;
  public userId!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Agent.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    vapiAgentId: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    greetingMsg: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "agents",
    modelName: "Agent",
  }
);

import User from "./user";
Agent.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Agent;
