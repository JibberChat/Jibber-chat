declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.jpg" {
    import type { ImageSourcePropType } from "react-native";
    const value: ImageSourcePropType;
    export default value;
}

declare module "*.png" {
    import type { ImageSourcePropType } from "react-native";
    const value: ImageSourcePropType;
    export default value;
}

declare module "*.ttf" {
    import type { FontSource } from "expo-font";
    const value: FontSource;
    export default value;
}
