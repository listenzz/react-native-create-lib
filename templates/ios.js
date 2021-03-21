module.exports = platform => [
  {
    name: ({ classNameWithPrefix }) => `${classNameWithPrefix}.podspec`,
    content: ({ repoName, className, classNameWithPrefix, githubAccount, authorName, authorEmail }) => `require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "${classNameWithPrefix}"
  s.version      = package["version"]
  s.summary      = package["description"]
 
  s.homepage     = "https://github.com/${githubAccount}/${repoName}"
  s.license      = "MIT"
  s.authors      = { "${authorName}" => "${authorEmail}" }
  s.platforms    = { :ios => "10.0", :tvos => "10.0" }
  s.source       = { :git => "https://github.com/${githubAccount}/${repoName}.git", :tag => "#{s.version}" }

  s.source_files = "ios/${className}/**/*.{h,m,swift}"
  s.dependency "React"
end`,
  },
  {
    name: ({ className, classNameWithPrefix }) => `${platform}/${className}/${classNameWithPrefix}.h`,
    content: ({ classNameWithPrefix }) => `#import <React/RCTBridgeModule.h>

@interface ${classNameWithPrefix} : NSObject <RCTBridgeModule>

@end
`,
  },
  {
    name: ({ className, classNameWithPrefix }) => `${platform}/${className}/${classNameWithPrefix}.m`,
    content: ({ classNameWithPrefix }) => `#import "${classNameWithPrefix}.h"

@implementation ${classNameWithPrefix}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Implement some actually useful functionality
    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

@end
`,
  },
]
