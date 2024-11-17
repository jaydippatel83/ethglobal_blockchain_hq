import { pixelArt } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const generateAvatar = (user) => {
    const avatar = createAvatar(pixelArt, {
        seed: user,
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
        size: 32,
        backgroundType: ["gradientLinear"],
        clothingColor: ["00b159", "5bc0de", "44c585"],
        eyes: ["variant01", "variant02", "variant03"],
        eyesColor: ["5b7c8b", "647b90", "697b94"],
        glasses: ["dark01", "dark02", "dark03"],
        glassesColor: ["4b4b4b", "5f705c", "43677d"],
        hair: ["long01", "long02", "long03"],
        hairColor: ["009bbd", "91cb15", "603a14"],
        hat: ["variant01", "variant02", "variant03"],
        skinColor: ["8d5524", "a26d3d", "b68655"]
    })
    const picture = avatar.toDataUri();
    return picture;
}