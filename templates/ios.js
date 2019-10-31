module.exports = platform => [
  {
    name: ({ moduleName }) => `${moduleName}.podspec`,
    content: ({ moduleName, githubAccount, authorName, authorEmail }) => `require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "${moduleName}"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  ${moduleName}
                   DESC
  s.homepage     = "https://github.com/${githubAccount}/${moduleName}"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "${authorName}" => "${authorEmail}" }
  s.platforms    = { :ios => "9.0", :tvos => "10.0" }
  s.source       = { :git => "https://github.com/${githubAccount}/${moduleName}.git", :tag => "#{s.version}" }

  s.source_files = "ios/Classes/**/*.{h,m,swift}"
  s.dependency "React"
end`,
  },
  {
    name: ({ className }) => `${platform}/Classes/${className}Module.h`,
    content: ({ className }) => `#import <React/RCTBridgeModule.h>

@interface ${className}Module : NSObject <RCTBridgeModule>

@end
`,
  },
  {
    name: ({ className }) => `${platform}/Classes/${className}Module.m`,
    content: ({ className }) => `#import "${className}Module.h"

@implementation ${className}Module

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
{
    // TODO: Implement some actually useful functionality
    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

@end
`,
  },
];
