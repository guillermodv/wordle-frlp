import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';

export function TabBarIcon({ style, ...rest }: ComponentProps<typeof Ionicons>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}
