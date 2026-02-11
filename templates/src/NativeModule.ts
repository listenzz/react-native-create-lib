import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  sampleMethod(str: string, num: number): Promise<string>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('{{classNameWithPrefix}}');
