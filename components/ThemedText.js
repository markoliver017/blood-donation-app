import { Text } from 'react-native';
// import useThemeColor from '@/hooks/useThemeColor';

export default function ThemedText({ children, ...props }) {
    return <Text {...props}>{children}</Text>;
}
