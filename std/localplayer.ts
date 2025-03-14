import { call } from "../";
import { Vector3 } from "../types/vector";
import { Angle3 } from "../types/angle";

/**
 * Returns Local Player's username
 */
export async function getUsername(): Promise<string> {
  return call("getUsername");
}

/**
 * Returns Local Player's health
 */
export async function getHealth(): Promise<number> {
  return call("getHealth");
}

/**
 * Returns Local Player's armor
 */
export async function getArmor(): Promise<number> {
  return call("getArmor");
}

/**
 * Returns Local Player's group
 */
export async function getGroup(): Promise<string> {
  return call("getGroup");
}

/**
 * Returns Local Player's team index
 */
export async function getTeam(): Promise<number> {
  return call("getTeam");
}

/**
 * Returns Local Player's data from PData
 */
export async function getPData(key: string, def: string = ""): Promise<string> {
  return call("getPData", key, def);
}

/**
 * Returns Local Player's position
 */
export async function getPos(): Promise<Awaited<Vector3>> {
  const pos = await call<string>("getPos");

  return new Vector3(pos);
}

/**
 * Returns Local Player's position
 */
export async function getAngle(): Promise<Awaited<Angle3>> {
  const angle = await call<string>("getAngle");

  return new Angle3(angle);
}

/**
 * Returns is Local Player in vehicle
 */
export async function inVehicle(): Promise<boolean> {
  return call("inVehicle");
}