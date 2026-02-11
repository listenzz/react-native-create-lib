import React, { useImperativeHandle, useRef } from 'react';
import {{className}}NativeComponent, { Commands } from './{{className}}NativeComponent';
import type { On{{className}}EventPayload, NativeProps } from './{{className}}NativeComponent';
import type { NativeSyntheticEvent } from 'react-native';

export type On{{className}}Event = NativeSyntheticEvent<On{{className}}EventPayload>;

export interface {{className}}ViewInstance {
	// TODO: Add methods exposed via ref
	// Example: sampleMethod: () => void;
}

export type {{className}}ViewProps = NativeProps;

const {{className}}View = React.forwardRef<{{className}}ViewInstance, {{className}}ViewProps>((props, ref) => {
	const viewRef = useRef<React.ComponentRef<typeof {{className}}NativeComponent>>(null);
	useImperativeHandle(ref, () => ({
		// TODO: Implement methods exposed via ref
		// Example:
		// sampleMethod: () => {
		// 	if (viewRef.current) {
		// 		Commands.sampleMethod(viewRef.current);
		// 	}
		// },
	}));
	return <{{className}}NativeComponent {...props} ref={viewRef} />;
});

export default {{className}}View;
