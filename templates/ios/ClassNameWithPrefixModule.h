#import <Foundation/Foundation.h>
#import <{{codegenName}}/{{codegenName}}.h>
#import <React/RCTInitializing.h>

NS_ASSUME_NONNULL_BEGIN

@class RCTHost;

@interface {{classNameWithPrefix}}Module : NSObject <Native{{className}}Spec, RCTInvalidating>

- (instancetype)initWithHost:(RCTHost *)host;

@end

NS_ASSUME_NONNULL_END
