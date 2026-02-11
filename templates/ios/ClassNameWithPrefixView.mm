#import "{{classNameWithPrefix}}View.h"

#import <react/renderer/components/{{codegenName}}/ComponentDescriptors.h>
#import <react/renderer/components/{{codegenName}}/EventEmitters.h>
#import <react/renderer/components/{{codegenName}}/Props.h>
#import <react/renderer/components/{{codegenName}}/RCTComponentViewHelpers.h>

#import <React/RCTConversions.h>
#import <React/RCTLog.h>

using namespace facebook::react;

@interface {{classNameWithPrefix}}View() <RCT{{className}}ViewViewProtocol>

// TODO: Add properties for component props
// Example:
// @property(nonatomic, copy, nonnull) NSString *sampleProperty;

@end

@implementation {{classNameWithPrefix}}View

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load {
	[super load];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
	return concreteComponentDescriptorProvider<{{className}}ViewComponentDescriptor>();
}

+ (BOOL)shouldBeRecycled {
	return NO;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if ((self = [super initWithFrame:frame])) {
		static const auto defaultProps = std::make_shared<const {{className}}ViewProps>();
		_props = defaultProps;
		// TODO: Initialize default property values
    }
    return self;
}

- (void)updateProps:(const facebook::react::Props::Shared &)props oldProps:(const facebook::react::Props::Shared &)oldProps {
	const auto &oldViewProps = static_cast<const {{className}}ViewProps &>(*_props);
	const auto &newViewProps = static_cast<const {{className}}ViewProps &>(*props);

	// TODO: Handle property updates
	// Example:
	// if (newViewProps.sampleProperty != oldViewProps.sampleProperty) {
	// 	self.sampleProperty = RCTNSStringFromStringNilIfEmpty(newViewProps.sampleProperty);
	// }

	[super updateProps:props oldProps:oldProps];
}

- (const {{className}}ViewEventEmitter &)eventEmitter {
	return static_cast<const {{className}}ViewEventEmitter &>(*_eventEmitter);
}

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
	RCT{{className}}ViewHandleCommand(self, commandName, args);
}

// TODO: Implement command methods
// Example:
// - (void)sampleMethod {
// 	// Implement method logic
// 	// Emit event if needed:
// 	// [self eventEmitter].on{{className}}({{className}}ViewEventEmitter::On{{className}}{
// 	// 	.data = RCTStringFromNSString(@"data")
// 	// });
// }

@end
