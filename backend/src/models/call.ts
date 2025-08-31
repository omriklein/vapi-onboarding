import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../sequelize";

interface CallAttributes {
  id: number;
  callId: string;
  startedAt: Date;
  durationMs: number;
  summary: string;
  transcript: string;
  agentId: number;
}

export interface CallCreationAttributes extends Optional<CallAttributes, "id"> {}

class Call extends Model<CallAttributes, CallCreationAttributes> implements CallAttributes {
  public id!: number;
  public callId!: string;
  public agentId!: number;
  public startedAt!: Date;
  public durationMs!: number;
  public summary!: string;
  public transcript!: string;
}

Call.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    callId: { type: DataTypes.STRING, allowNull: false },
    startedAt: { type: DataTypes.DATE, allowNull: false, unique: true },
    durationMs: { type: DataTypes.INTEGER, allowNull: true },
    summary: { type: DataTypes.STRING, allowNull: true },
    transcript: { type: DataTypes.STRING, allowNull: true },
    agentId: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    tableName: "calls",
    modelName: "Call",
  }
);

import Agent from "./agent";
Call.belongsTo(Agent, { foreignKey: "agentId", as: "agent" });

export default Call;

