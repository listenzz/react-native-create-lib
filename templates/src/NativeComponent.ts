import type { CodegenTypes, HostComponent, ViewProps } from 'react-native';
import { codegenNativeComponent, codegenNativeCommands } from 'react-native';

export type On{{className}}EventPayload = {
	// TODO: Add event payload properties
};

export interface NativeProps extends ViewProps {
	// TODO: Add your component props here
	on{{className}}?: CodegenTypes.DirectEventHandler<On{{className}}EventPayload>;
}

export interface NativeCommands {
	// TODO: Add your native commands here
	// Example: sampleMethod: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
	supportedCommands: [], // TODO: Add supported command names, e.g. ['sampleMethod']
});

export default codegenNativeComponent<NativeProps>('{{className}}View') as HostComponent<NativeProps>;
