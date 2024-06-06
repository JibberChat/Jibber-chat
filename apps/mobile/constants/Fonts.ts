import { useWindowDimensions } from "react-native";

const { fontScale } = useWindowDimensions();

export default {
    // Font family
    MONTSERRAT_BOLD: "Montserrat-Bold",
    MONTSERRAT_LIGHT: "Montserrat-Light",
    MONTSERRAT_REGULAR: "Montserrat-Regular",
    MONTSERRAT_MEDIUM: "Montserrat-Medium",
    MONTSERRAT_SEMIBOLD: "Montserrat-SemiBold",
    // Fonts size
    FONT_SIZE_SMALL: 14 / fontScale,
    FONT_SIZE_MEDIUM: 20 / fontScale,
    FONT_SIZE_BIG: 28 / fontScale,
};
