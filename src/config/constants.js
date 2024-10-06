export const GRAVITATIONAL_CONSTANT = 6.6743e-11
export const SCALE_FACTOR = 0.0001

export const SPAWN_RADIUS = 250

export const SUN_RADIUS = 15

export const SUN_MASS = Math.round((4 / 3) * Math.PI * Math.pow(SUN_RADIUS, 3) * 1410) / 100

export const EARTH_RADIUS = (1 / 109) * SUN_RADIUS;
//export const EARTH_DISTANCE_FROM_SUN = 215.1 * SUN_RADIUS;
export const EARTH_DISTANCE_FROM_SUN = 3 * SUN_RADIUS;
export const EARTH_ROTATION_SPEED = 0.01;