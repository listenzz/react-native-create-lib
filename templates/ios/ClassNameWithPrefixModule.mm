#import "{{classNameWithPrefix}}Module.h"

#import <React/RCTLog.h>
#import <React-RuntimeApple/ReactCommon/RCTHost.h>
#import <React/RCTConversions.h>

@interface {{classNameWithPrefix}}Module ()

@property(nonatomic, strong) RCTHost *host;

@end

@implementation {{classNameWithPrefix}}Module

+ (BOOL)requiresMainQueueSetup {
	return YES;
}

- (dispatch_queue_t)methodQueue {
	return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE({{classNameWithPrefix}})

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::Native{{className}}SpecJSI>(params);
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
