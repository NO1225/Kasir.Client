import Layout from "../types/utils/Layout";

const modification = Layout.window.width <= 360 ? 2 : Layout.isSmallDevice ? 4 : 0
export enum FontSize {
    xxxxxSmall = 6 - modification,
    xxxxSmall = 8 - modification,
    xxxSmall = 10 - modification,
    xxSmall = 12 - modification,
    xSmall = 14 - modification,
    Small = 16 - modification,
    Regular = 18 - modification,
    Large = 20 - modification,
    xLarge = 22 - modification,
    xxLarge = 24 - modification,
    xxxLarge = 26 - modification,
    xxxxLarge = 28 - modification,
    xxxxxLarge = 30 - modification,
    xxxxxxLarge = 34 - modification,
    xxxxxxxLarge = 38 - modification,
    xxxxxxxxLarge = 42 - modification,
    xxxxxxxxxLarge = 50 - modification,

}

