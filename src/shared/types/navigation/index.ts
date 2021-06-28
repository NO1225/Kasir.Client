import { ParamListBase, RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export interface PropsWithNavigationRoute<ParamList extends ParamListBase, RouteName extends keyof ParamList> {
    navigation: StackNavigationProp<ParamList, RouteName>;
    route: RouteProp<ParamList, RouteName>
}