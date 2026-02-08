module.exports = platform => [
  {
    name: ({ classNameWithPrefix }) => `${classNameWithPrefix}.podspec`,
    content: ({ repoName, className, classNameWithPrefix, githubAccount, authorName, authorEmail }) => `require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "${classNameWithPrefix}"
  s.version      = package["version"]
  s.summary      = package["description"]
 
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/ldrobot/${repoName}.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"
  install_modules_dependencies(s)
end`,
  },
  {
    name: ({ className, classNameWithPrefix, moduleType }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      if (!isModule) return null;
      return `${platform}/${classNameWithPrefix}Module.h`;
    },
    content: ({ classNameWithPrefix, className, name }) => {
      const codegenName = name.toLowerCase().replace(/-/g, '');
      return `#import <Foundation/Foundation.h>
#import <${codegenName}/${codegenName}.h>
#import <React/RCTInitializing.h>

NS_ASSUME_NONNULL_BEGIN

@class RCTHost;

@interface ${classNameWithPrefix}Module : NSObject <Native${className}Spec, RCTInvalidating>

- (instancetype)initWithHost:(RCTHost *)host;

@end

NS_ASSUME_NONNULL_END
`;
    },
  },
  {
    name: ({ className, classNameWithPrefix, moduleType }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      if (!isModule) return null;
      return `${platform}/${classNameWithPrefix}Module.mm`;
    },
    content: ({ classNameWithPrefix, className, moduleName }) => {
      return `#import "${classNameWithPrefix}Module.h"

#import <React/RCTLog.h>
#import <React-RuntimeApple/ReactCommon/RCTHost.h>
#import <React/RCTConversions.h>

@interface ${classNameWithPrefix}Module ()

@property(nonatomic, strong) RCTHost *host;

@end

@implementation ${classNameWithPrefix}Module

+ (BOOL)requiresMainQueueSetup {
	return YES;
}

- (dispatch_queue_t)methodQueue {
	return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(${classNameWithPrefix})

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::Native${className}SpecJSI>(params);
}

- (instancetype)init {
    if (self = [super init]) {
    }
    return self;
}

- (instancetype)initWithHost:(RCTHost *)host {
	if (self = [super init]) {
		_host = host;
	}
	return self;
}

- (void)invalidate {
    // Cleanup if needed
}

- (void)sampleMethod:(NSString *)str num:(double)num resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    // TODO: Implement some actually useful functionality
    resolve([NSString stringWithFormat: @"num: %@ str: %@", @(num), str]);
}

@end
`;
    },
  },
  {
    name: ({ className, classNameWithPrefix, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (!isComponent) return null;
      return `${platform}/${classNameWithPrefix}View.h`;
    },
    content: ({ classNameWithPrefix }) => `#import <UIKit/UIKit.h>
#import <React/RCTViewComponentView.h>

NS_ASSUME_NONNULL_BEGIN

@interface ${classNameWithPrefix}View : RCTViewComponentView

@end

NS_ASSUME_NONNULL_END
`,
  },
  {
    name: ({ className, classNameWithPrefix, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (!isComponent) return null;
      return `${platform}/${classNameWithPrefix}View.mm`;
    },
    content: ({ classNameWithPrefix, className, name }) => {
      const codegenName = name.toLowerCase().replace(/-/g, '');
      return `#import "${classNameWithPrefix}View.h"

#import <react/renderer/components/${codegenName}/ComponentDescriptors.h>
#import <react/renderer/components/${codegenName}/EventEmitters.h>
#import <react/renderer/components/${codegenName}/Props.h>
#import <react/renderer/components/${codegenName}/RCTComponentViewHelpers.h>

#import <React/RCTConversions.h>
#import <React/RCTLog.h>

using namespace facebook::react;

@interface ${classNameWithPrefix}View() <RCT${className}ViewViewProtocol>

// TODO: Add properties for component props
// Example:
// @property(nonatomic, copy, nonnull) NSString *sampleProperty;

@end

@implementation ${classNameWithPrefix}View

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load {
	[super load];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
	return concreteComponentDescriptorProvider<${className}ViewComponentDescriptor>();
}

+ (BOOL)shouldBeRecycled {
	return NO;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if ((self = [super initWithFrame:frame])) {
		static const auto defaultProps = std::make_shared<const ${className}ViewProps>();
		_props = defaultProps;
		// TODO: Initialize default property values
    }
    return self;
}

- (void)updateProps:(const facebook::react::Props::Shared &)props oldProps:(const facebook::react::Props::Shared &)oldProps {
	const auto &oldViewProps = static_cast<const ${className}ViewProps &>(*_props);
	const auto &newViewProps = static_cast<const ${className}ViewProps &>(*props);

	// TODO: Handle property updates
	// Example:
	// if (newViewProps.sampleProperty != oldViewProps.sampleProperty) {
	// 	self.sampleProperty = RCTNSStringFromStringNilIfEmpty(newViewProps.sampleProperty);
	// }

	[super updateProps:props oldProps:oldProps];
}

- (const ${className}ViewEventEmitter &)eventEmitter {
	return static_cast<const ${className}ViewEventEmitter &>(*_eventEmitter);
}

- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
	RCT${className}ViewHandleCommand(self, commandName, args);
}

// TODO: Implement command methods
// Example:
// - (void)sampleMethod {
// 	// Implement method logic
// 	// Emit event if needed:
// 	// [self eventEmitter].on${className}(${className}ViewEventEmitter::On${className}{
// 	// 	.data = RCTStringFromNSString(@"data")
// 	// });
// }

@end
`;
    },
  },
]
