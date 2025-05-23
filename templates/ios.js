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
  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/ldrobot/${repoName}.git", :tag => "#{s.version}" }

  s.source_files = "ios/${className}/**/*.{h,m,mm}"
  s.dependency "React-Core"
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
    callback(@[NSNull.null, [NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
}

@end
`,
  },
  {
    name: ({ className }) => `${platform}/${className}.xcodeproj/project.pbxproj`,
    content: ({ className, clsssNameWithPrefix }) => `// !$*UTF8*$!
{
  archiveVersion = 1;
  classes = {
  };
  objectVersion = 48;
  objects = {

/* Begin PBXBuildFile section */
    91C884A6202C3E8600EC0A20 /* ${clsssNameWithPrefix}.m in Sources */ = {isa = PBXBuildFile; fileRef = 91C884A1202C3E8600EC0A20 /* ${clsssNameWithPrefix}.m */; };
/* End PBXBuildFile section */

/* Begin PBXCopyFilesBuildPhase section */
    910362D01FE9318600F4DA8E /* CopyFiles */ = {
      isa = PBXCopyFilesBuildPhase;
      buildActionMask = 2147483647;
      dstPath = "include/$(PRODUCT_NAME)";
      dstSubfolderSpec = 16;
      files = (
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
/* End PBXCopyFilesBuildPhase section */

/* Begin PBXFileReference section */
    910362D21FE9318600F4DA8E /* lib${className}.a */ = {isa = PBXFileReference; explicitFileType = archive.ar; includeInIndex = 0; path = lib${className}.a; sourceTree = BUILT_PRODUCTS_DIR; };
    91C884A1202C3E8600EC0A20 /* ${clsssNameWithPrefix}.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; path = ${clsssNameWithPrefix}.m; sourceTree = "<group>"; };
    91C884A2202C3E8600EC0A20 /* ${clsssNameWithPrefix}.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; path = ${clsssNameWithPrefix}.h; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
    910362CF1FE9318600F4DA8E /* Frameworks */ = {
      isa = PBXFrameworksBuildPhase;
      buildActionMask = 2147483647;
      files = (
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
    910362C91FE9318600F4DA8E = {
      isa = PBXGroup;
      children = (
        910362D41FE9318600F4DA8E /* ${className} */,
        910362D31FE9318600F4DA8E /* Products */,
      );
      sourceTree = "<group>";
    };
    910362D31FE9318600F4DA8E /* Products */ = {
      isa = PBXGroup;
      children = (
        910362D21FE9318600F4DA8E /* lib${className}.a */,
      );
      name = Products;
      sourceTree = "<group>";
    };
    910362D41FE9318600F4DA8E /* ${className} */ = {
      isa = PBXGroup;
      children = (
        91C884A2202C3E8600EC0A20 /* ${clsssNameWithPrefix}.h */,
        91C884A1202C3E8600EC0A20 /* ${clsssNameWithPrefix}.m */,
      );
      path = ${className};
      sourceTree = "<group>";
    };
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
    910362D11FE9318600F4DA8E /* ${className} */ = {
      isa = PBXNativeTarget;
      buildConfigurationList = 910362DB1FE9318600F4DA8E /* Build configuration list for PBXNativeTarget "${className}" */;
      buildPhases = (
        910362CE1FE9318600F4DA8E /* Sources */,
        910362CF1FE9318600F4DA8E /* Frameworks */,
        910362D01FE9318600F4DA8E /* CopyFiles */,
      );
      buildRules = (
      );
      dependencies = (
      );
      name = ${className};
      productName = ${className};
      productReference = 910362D21FE9318600F4DA8E /* lib${className}.a */;
      productType = "com.apple.product-type.library.static";
    };
/* End PBXNativeTarget section */

/* Begin PBXProject section */
    910362CA1FE9318600F4DA8E /* Project object */ = {
      isa = PBXProject;
      attributes = {
        LastUpgradeCheck = 0920;
        ORGANIZATIONNAME = Listen;
        TargetAttributes = {
          910362D11FE9318600F4DA8E = {
            CreatedOnToolsVersion = 9.2;
            ProvisioningStyle = Automatic;
          };
        };
      };
      buildConfigurationList = 910362CD1FE9318600F4DA8E /* Build configuration list for PBXProject "${className}" */;
      compatibilityVersion = "Xcode 8.0";
      developmentRegion = en;
      hasScannedForEncodings = 0;
      knownRegions = (
        en,
      );
      mainGroup = 910362C91FE9318600F4DA8E;
      productRefGroup = 910362D31FE9318600F4DA8E /* Products */;
      projectDirPath = "";
      projectRoot = "";
      targets = (
        910362D11FE9318600F4DA8E /* ${className} */,
      );
    };
/* End PBXProject section */

/* Begin PBXSourcesBuildPhase section */
    910362CE1FE9318600F4DA8E /* Sources */ = {
      isa = PBXSourcesBuildPhase;
      buildActionMask = 2147483647;
      files = (
        91C884A6202C3E8600EC0A20 /* ${clsssNameWithPrefix}.m in Sources */,
      );
      runOnlyForDeploymentPostprocessing = 0;
    };
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
    910362D91FE9318600F4DA8E /* Debug */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ALWAYS_SEARCH_USER_PATHS = NO;
        CLANG_ANALYZER_NONNULL = YES;
        CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
        CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
        CLANG_CXX_LIBRARY = "libc++";
        CLANG_ENABLE_MODULES = YES;
        CLANG_ENABLE_OBJC_ARC = YES;
        CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
        CLANG_WARN_BOOL_CONVERSION = YES;
        CLANG_WARN_COMMA = YES;
        CLANG_WARN_CONSTANT_CONVERSION = YES;
        CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
        CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
        CLANG_WARN_EMPTY_BODY = YES;
        CLANG_WARN_ENUM_CONVERSION = YES;
        CLANG_WARN_INFINITE_RECURSION = YES;
        CLANG_WARN_INT_CONVERSION = YES;
        CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
        CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
        CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
        CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
        CLANG_WARN_STRICT_PROTOTYPES = YES;
        CLANG_WARN_SUSPICIOUS_MOVE = YES;
        CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
        CLANG_WARN_UNREACHABLE_CODE = YES;
        CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
        CODE_SIGN_IDENTITY = "iPhone Developer";
        COPY_PHASE_STRIP = NO;
        DEBUG_INFORMATION_FORMAT = dwarf;
        ENABLE_STRICT_OBJC_MSGSEND = YES;
        ENABLE_TESTABILITY = YES;
        GCC_C_LANGUAGE_STANDARD = gnu11;
        GCC_DYNAMIC_NO_PIC = NO;
        GCC_NO_COMMON_BLOCKS = YES;
        GCC_OPTIMIZATION_LEVEL = 0;
        GCC_PREPROCESSOR_DEFINITIONS = (
          "DEBUG=1",
          "$(inherited)",
        );
        GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
        GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
        GCC_WARN_UNDECLARED_SELECTOR = YES;
        GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
        GCC_WARN_UNUSED_FUNCTION = YES;
        GCC_WARN_UNUSED_VARIABLE = YES;
        IPHONEOS_DEPLOYMENT_TARGET = 7.0;
        MTL_ENABLE_DEBUG_INFO = YES;
        ONLY_ACTIVE_ARCH = YES;
        SDKROOT = iphoneos;
      };
      name = Debug;
    };
    910362DA1FE9318600F4DA8E /* Release */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        ALWAYS_SEARCH_USER_PATHS = NO;
        CLANG_ANALYZER_NONNULL = YES;
        CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
        CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
        CLANG_CXX_LIBRARY = "libc++";
        CLANG_ENABLE_MODULES = YES;
        CLANG_ENABLE_OBJC_ARC = YES;
        CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
        CLANG_WARN_BOOL_CONVERSION = YES;
        CLANG_WARN_COMMA = YES;
        CLANG_WARN_CONSTANT_CONVERSION = YES;
        CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
        CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
        CLANG_WARN_EMPTY_BODY = YES;
        CLANG_WARN_ENUM_CONVERSION = YES;
        CLANG_WARN_INFINITE_RECURSION = YES;
        CLANG_WARN_INT_CONVERSION = YES;
        CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
        CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
        CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
        CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
        CLANG_WARN_STRICT_PROTOTYPES = YES;
        CLANG_WARN_SUSPICIOUS_MOVE = YES;
        CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
        CLANG_WARN_UNREACHABLE_CODE = YES;
        CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
        CODE_SIGN_IDENTITY = "iPhone Developer";
        COPY_PHASE_STRIP = NO;
        DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
        ENABLE_NS_ASSERTIONS = NO;
        ENABLE_STRICT_OBJC_MSGSEND = YES;
        GCC_C_LANGUAGE_STANDARD = gnu11;
        GCC_NO_COMMON_BLOCKS = YES;
        GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
        GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
        GCC_WARN_UNDECLARED_SELECTOR = YES;
        GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
        GCC_WARN_UNUSED_FUNCTION = YES;
        GCC_WARN_UNUSED_VARIABLE = YES;
        IPHONEOS_DEPLOYMENT_TARGET = 7.0;
        MTL_ENABLE_DEBUG_INFO = NO;
        SDKROOT = iphoneos;
        VALIDATE_PRODUCT = YES;
      };
      name = Release;
    };
    910362DC1FE9318600F4DA8E /* Debug */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        CODE_SIGN_STYLE = Automatic;
        DEVELOPMENT_TEAM = 9H9696K6NL;
        OTHER_LDFLAGS = "-ObjC";
        PRODUCT_NAME = "$(TARGET_NAME)";
        SKIP_INSTALL = YES;
        TARGETED_DEVICE_FAMILY = "1,2";
      };
      name = Debug;
    };
    910362DD1FE9318600F4DA8E /* Release */ = {
      isa = XCBuildConfiguration;
      buildSettings = {
        CODE_SIGN_STYLE = Automatic;
        DEVELOPMENT_TEAM = 9H9696K6NL;
        OTHER_LDFLAGS = "-ObjC";
        PRODUCT_NAME = "$(TARGET_NAME)";
        SKIP_INSTALL = YES;
        TARGETED_DEVICE_FAMILY = "1,2";
      };
      name = Release;
    };
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
    910362CD1FE9318600F4DA8E /* Build configuration list for PBXProject "${className}" */ = {
      isa = XCConfigurationList;
      buildConfigurations = (
        910362D91FE9318600F4DA8E /* Debug */,
        910362DA1FE9318600F4DA8E /* Release */,
      );
      defaultConfigurationIsVisible = 0;
      defaultConfigurationName = Release;
    };
    910362DB1FE9318600F4DA8E /* Build configuration list for PBXNativeTarget "${className}" */ = {
      isa = XCConfigurationList;
      buildConfigurations = (
        910362DC1FE9318600F4DA8E /* Debug */,
        910362DD1FE9318600F4DA8E /* Release */,
      );
      defaultConfigurationIsVisible = 0;
      defaultConfigurationName = Release;
    };
/* End XCConfigurationList section */
  };
  rootObject = 910362CA1FE9318600F4DA8E /* Project object */;
}    
`,
  },
]
