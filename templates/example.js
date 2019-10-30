module.exports = [
  {
    name: () => 'ios/Podfile',
    content: ({ moduleName }) => `platform :ios, '9.0'
require_relative '../../node_modules/@react-native-community/cli-platform-ios/native_modules'

target 'playground' do

  pod 'FBLazyVector', :path => "../../node_modules/react-native/Libraries/FBLazyVector"
  pod 'FBReactNativeSpec', :path => "../../node_modules/react-native/Libraries/FBReactNativeSpec"
  pod 'RCTRequired', :path => "../../node_modules/react-native/Libraries/RCTRequired"
  pod 'RCTTypeSafety', :path => "../../node_modules/react-native/Libraries/TypeSafety"
  pod 'React', :path => '../../node_modules/react-native/'
  pod 'React-Core', :path => '../../node_modules/react-native/'
  pod 'React-CoreModules', :path => '../../node_modules/react-native/React/CoreModules'
  pod 'React-Core/DevSupport', :path => '../../node_modules/react-native/'
  pod 'React-RCTActionSheet', :path => '../../node_modules/react-native/Libraries/ActionSheetIOS'
  pod 'React-RCTAnimation', :path => '../../node_modules/react-native/Libraries/NativeAnimation'
  pod 'React-RCTBlob', :path => '../../node_modules/react-native/Libraries/Blob'
  pod 'React-RCTImage', :path => '../../node_modules/react-native/Libraries/Image'
  pod 'React-RCTLinking', :path => '../../node_modules/react-native/Libraries/LinkingIOS'
  pod 'React-RCTNetwork', :path => '../../node_modules/react-native/Libraries/Network'
  pod 'React-RCTSettings', :path => '../../node_modules/react-native/Libraries/Settings'
  pod 'React-RCTText', :path => '../../node_modules/react-native/Libraries/Text'
  pod 'React-RCTVibration', :path => '../../node_modules/react-native/Libraries/Vibration'
  pod 'React-Core/RCTWebSocket', :path => '../../node_modules/react-native/'

  pod 'React-cxxreact', :path => '../../node_modules/react-native/ReactCommon/cxxreact'
  pod 'React-jsi', :path => '../../node_modules/react-native/ReactCommon/jsi'
  pod 'React-jsiexecutor', :path => '../../node_modules/react-native/ReactCommon/jsiexecutor'
  pod 'React-jsinspector', :path => '../../node_modules/react-native/ReactCommon/jsinspector'
  pod 'ReactCommon/jscallinvoker', :path => "../../node_modules/react-native/ReactCommon"
  pod 'ReactCommon/turbomodule/core', :path => "../../node_modules/react-native/ReactCommon"
  pod 'Yoga', :path => '../../node_modules/react-native/ReactCommon/yoga'

  pod 'DoubleConversion', :podspec => '../../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../../node_modules/react-native/third-party-podspecs/Folly.podspec'

  pod 'NavigationHybrid', :path => '../../node_modules/react-native-navigation-hybrid'
  pod '${moduleName}', :path => '../../'
end`,
  },
  {
    name: () => 'ios/playground/Info.plist',
    content: () => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>en</string>
	<key>CFBundleDisplayName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>CFBundleShortVersionString</key>
	<string>1.0</string>
	<key>CFBundleSignature</key>
	<string>????</string>
	<key>CFBundleVersion</key>
	<string>1</string>
	<key>LSRequiresIPhoneOS</key>
	<true/>
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
		<key>NSExceptionDomains</key>
		<dict>
			<key>localhost</key>
			<dict>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
	</dict>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string></string>
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIRequiredDeviceCapabilities</key>
	<array>
		<string>armv7</string>
	</array>
	<key>UISupportedInterfaceOrientations</key>
	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UIViewControllerBasedStatusBarAppearance</key>
	<false/>
</dict>
</plist>`,
  },
  {
    name: () => 'ios/playground/AppDelegate.h',
    content: () => `#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

@end`,
  },
  {
    name: () => 'ios/playground/AppDelegate.m',
    content: () => `#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridgeModule.h>
#import <NavigationHybrid/NavigationHybrid.h>

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"playground/index" fallbackResource:nil];
    [[HBDReactBridgeManager get] installWithBundleURL:jsCodeLocation launchOptions:launchOptions];
    
    UIViewController *splashViewController = [[UIViewController alloc] init];
    splashViewController.view.backgroundColor = UIColor.whiteColor;
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.windowLevel = UIWindowLevelStatusBar + 1;
    self.window.rootViewController = splashViewController;
    [self.window makeKeyAndVisible];
    return YES;
}

@end`,
  },
  {
    name: () => 'ios/playground.xcodeproj/project.pbxproj',
    content: ({ packageIdentifier, name }) => {
      return `// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 46;
	objects = {

/* Begin PBXBuildFile section */
		13B07FBC1A68108700A75B9A /* AppDelegate.m in Sources */ = {isa = PBXBuildFile; fileRef = 13B07FB01A68108700A75B9A /* AppDelegate.m */; };
		13B07FBD1A68108700A75B9A /* LaunchScreen.xib in Resources */ = {isa = PBXBuildFile; fileRef = 13B07FB11A68108700A75B9A /* LaunchScreen.xib */; };
		13B07FBF1A68108700A75B9A /* Images.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 13B07FB51A68108700A75B9A /* Images.xcassets */; };
		13B07FC11A68108700A75B9A /* main.m in Sources */ = {isa = PBXBuildFile; fileRef = 13B07FB71A68108700A75B9A /* main.m */; };
		B6409ADE75CC7A644E490622 /* libPods-playground.a in Frameworks */ = {isa = PBXBuildFile; fileRef = 0B9CB0AA7A6C6CEDFE1D92AB /* libPods-playground.a */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
		008F07F21AC5B25A0029DE68 /* main.jsbundle */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text; path = main.jsbundle; sourceTree = "<group>"; };
		0B9CB0AA7A6C6CEDFE1D92AB /* libPods-playground.a */ = {isa = PBXFileReference; explicitFileType = archive.ar; includeInIndex = 0; path = "libPods-playground.a"; sourceTree = BUILT_PRODUCTS_DIR; };
		13B07F961A680F5B00A75B9A /* playground.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = "${name} Playground.app"; sourceTree = BUILT_PRODUCTS_DIR; };
		13B07FAF1A68108700A75B9A /* AppDelegate.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; name = AppDelegate.h; path = playground/AppDelegate.h; sourceTree = "<group>"; };
		13B07FB01A68108700A75B9A /* AppDelegate.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; name = AppDelegate.m; path = playground/AppDelegate.m; sourceTree = "<group>"; };
		13B07FB21A68108700A75B9A /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.xib; name = Base; path = Base.lproj/LaunchScreen.xib; sourceTree = "<group>"; };
		13B07FB51A68108700A75B9A /* Images.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; name = Images.xcassets; path = playground/Images.xcassets; sourceTree = "<group>"; };
		13B07FB61A68108700A75B9A /* Info.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; name = Info.plist; path = playground/Info.plist; sourceTree = "<group>"; };
		13B07FB71A68108700A75B9A /* main.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; name = main.m; path = playground/main.m; sourceTree = "<group>"; };
		18E4DF7D990B68718F4AC85D /* Pods-playground.debug.xcconfig */ = {isa = PBXFileReference; includeInIndex = 1; lastKnownFileType = text.xcconfig; name = "Pods-playground.debug.xcconfig"; path = "Target Support Files/Pods-playground/Pods-playground.debug.xcconfig"; sourceTree = "<group>"; };
		DA1B8FEEA3A1D69975C90959 /* Pods-playground.release.xcconfig */ = {isa = PBXFileReference; includeInIndex = 1; lastKnownFileType = text.xcconfig; name = "Pods-playground.release.xcconfig"; path = "Target Support Files/Pods-playground/Pods-playground.release.xcconfig"; sourceTree = "<group>"; };
		ED297162215061F000B7C4FE /* JavaScriptCore.framework */ = {isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = JavaScriptCore.framework; path = System/Library/Frameworks/JavaScriptCore.framework; sourceTree = SDKROOT; };
		ED2971642150620600B7C4FE /* JavaScriptCore.framework */ = {isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = JavaScriptCore.framework; path = Platforms/AppleTVOS.platform/Developer/SDKs/AppleTVOS12.0.sdk/System/Library/Frameworks/JavaScriptCore.framework; sourceTree = DEVELOPER_DIR; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		13B07F8C1A680F5B00A75B9A /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				B6409ADE75CC7A644E490622 /* libPods-playground.a in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		13B07FAE1A68108700A75B9A /* playground */ = {
			isa = PBXGroup;
			children = (
				008F07F21AC5B25A0029DE68 /* main.jsbundle */,
				13B07FAF1A68108700A75B9A /* AppDelegate.h */,
				13B07FB01A68108700A75B9A /* AppDelegate.m */,
				13B07FB51A68108700A75B9A /* Images.xcassets */,
				13B07FB61A68108700A75B9A /* Info.plist */,
				13B07FB11A68108700A75B9A /* LaunchScreen.xib */,
				13B07FB71A68108700A75B9A /* main.m */,
			);
			name = playground;
			sourceTree = "<group>";
		};
		2D16E6871FA4F8E400B85C8A /* Frameworks */ = {
			isa = PBXGroup;
			children = (
				ED297162215061F000B7C4FE /* JavaScriptCore.framework */,
				ED2971642150620600B7C4FE /* JavaScriptCore.framework */,
				0B9CB0AA7A6C6CEDFE1D92AB /* libPods-playground.a */,
			);
			name = Frameworks;
			sourceTree = "<group>";
		};
		83CBB9F61A601CBA00E9B192 = {
			isa = PBXGroup;
			children = (
				13B07FAE1A68108700A75B9A /* playground */,
				83CBBA001A601CBA00E9B192 /* Products */,
				2D16E6871FA4F8E400B85C8A /* Frameworks */,
				BD2B861DB5B7B92619B3669A /* Pods */,
			);
			indentWidth = 2;
			sourceTree = "<group>";
			tabWidth = 2;
			usesTabs = 0;
		};
		83CBBA001A601CBA00E9B192 /* Products */ = {
			isa = PBXGroup;
			children = (
				13B07F961A680F5B00A75B9A /* playground.app */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		BD2B861DB5B7B92619B3669A /* Pods */ = {
			isa = PBXGroup;
			children = (
				18E4DF7D990B68718F4AC85D /* Pods-playground.debug.xcconfig */,
				DA1B8FEEA3A1D69975C90959 /* Pods-playground.release.xcconfig */,
			);
			path = Pods;
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		13B07F861A680F5B00A75B9A /* playground */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 13B07F931A680F5B00A75B9A /* Build configuration list for PBXNativeTarget "playground" */;
			buildPhases = (
				CBB80BC4FBAE71D79C378864 /* [CP] Check Pods Manifest.lock */,
				FD10A7F022414F080027D42C /* Start Packager */,
				13B07F871A680F5B00A75B9A /* Sources */,
				13B07F8C1A680F5B00A75B9A /* Frameworks */,
				13B07F8E1A680F5B00A75B9A /* Resources */,
				00DD1BFF1BD5951E006B06BC /* Bundle React Native code and images */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = playground;
			productName = playground;
			productReference = 13B07F961A680F5B00A75B9A /* playground.app */;
			productType = "com.apple.product-type.application";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		83CBB9F71A601CBA00E9B192 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				LastUpgradeCheck = 0940;
				ORGANIZATIONNAME = Facebook;
			};
			buildConfigurationList = 83CBB9FA1A601CBA00E9B192 /* Build configuration list for PBXProject "playground" */;
			compatibilityVersion = "Xcode 3.2";
			developmentRegion = English;
			hasScannedForEncodings = 0;
			knownRegions = (
				English,
				en,
				Base,
			);
			mainGroup = 83CBB9F61A601CBA00E9B192;
			productRefGroup = 83CBBA001A601CBA00E9B192 /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				13B07F861A680F5B00A75B9A /* playground */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		13B07F8E1A680F5B00A75B9A /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				13B07FBF1A68108700A75B9A /* Images.xcassets in Resources */,
				13B07FBD1A68108700A75B9A /* LaunchScreen.xib in Resources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXShellScriptBuildPhase section */
		00DD1BFF1BD5951E006B06BC /* Bundle React Native code and images */ = {
			isa = PBXShellScriptBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			inputPaths = (
			);
			name = "Bundle React Native code and images";
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "export NODE_BINARY=node\n../../node_modules/react-native/scripts/react-native-xcode.sh playground/index.js\n";
		};
		CBB80BC4FBAE71D79C378864 /* [CP] Check Pods Manifest.lock */ = {
			isa = PBXShellScriptBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			inputFileListPaths = (
			);
			inputPaths = (
				"\${PODS_PODFILE_DIR_PATH}/Podfile.lock",
				"\${PODS_ROOT}/Manifest.lock",
			);
			name = "[CP] Check Pods Manifest.lock";
			outputFileListPaths = (
			);
			outputPaths = (
				"$(DERIVED_FILE_DIR)/Pods-playground-checkManifestLockResult.txt",
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "diff \\"\${PODS_PODFILE_DIR_PATH}/Podfile.lock\\" \\"\${PODS_ROOT}/Manifest.lock\\" > /dev/null\\nif [ $? != 0 ] ; then\\n    # print error to STDERR\\n    echo \\"error: The sandbox is not in sync with the Podfile.lock. Run 'pod install' or update your CocoaPods installation.\\" >&2\\n    exit 1\\nfi\\n# This output is used by Xcode 'outputs' to avoid re-running this script phase.\\necho \\"SUCCESS\\" > \\"\${SCRIPT_OUTPUT_FILE_0}\\"\\n";
			showEnvVarsInLog = 0;
		};
		FD10A7F022414F080027D42C /* Start Packager */ = {
			isa = PBXShellScriptBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			inputFileListPaths = (
			);
			inputPaths = (
			);
			name = "Start Packager";
			outputFileListPaths = (
			);
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "export RCT_METRO_PORT=\\"\${RCT_METRO_PORT:=8081}\\"\\necho \\"export RCT_METRO_PORT=\${RCT_METRO_PORT}\\" > \\"\${SRCROOT}/../node_modules/react-native/scripts/.packager.env\\"\\nif [ -z \\"\${RCT_NO_LAUNCH_PACKAGER+xxx}\\" ] ; then\\n  if nc -w 5 -z localhost \${RCT_METRO_PORT} ; then\\n    if ! curl -s \\"http://localhost:\${RCT_METRO_PORT}/status\\" | grep -q \\"packager-status:running\\" ; then\\n      echo \\"Port \${RCT_METRO_PORT} already in use, packager is either not running or not running correctly\\"\\n      exit 2\\n    fi\\n  else\\n    open \\"$SRCROOT/../node_modules/react-native/scripts/launchPackager.command\\" || echo \\"Can't start packager automatically\\"\\n  fi\\nfi\\n";
			showEnvVarsInLog = 0;
		};
/* End PBXShellScriptBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		13B07F871A680F5B00A75B9A /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				13B07FBC1A68108700A75B9A /* AppDelegate.m in Sources */,
				13B07FC11A68108700A75B9A /* main.m in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin PBXVariantGroup section */
		13B07FB11A68108700A75B9A /* LaunchScreen.xib */ = {
			isa = PBXVariantGroup;
			children = (
				13B07FB21A68108700A75B9A /* Base */,
			);
			name = LaunchScreen.xib;
			path = playground;
			sourceTree = "<group>";
		};
/* End PBXVariantGroup section */

/* Begin XCBuildConfiguration section */
		13B07F941A680F5B00A75B9A /* Debug */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = 18E4DF7D990B68718F4AC85D /* Pods-playground.debug.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CURRENT_PROJECT_VERSION = 1;
				DEAD_CODE_STRIPPING = NO;
				INFOPLIST_FILE = playground/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/Frameworks";
				OTHER_LDFLAGS = (
					"$(inherited)",
					"-ObjC",
					"-lc++",
				);
				PRODUCT_BUNDLE_IDENTIFIER = "${packageIdentifier}.playground";
				PRODUCT_NAME = "${name} Playground";
				VERSIONING_SYSTEM = "apple-generic";
			};
			name = Debug;
		};
		13B07F951A680F5B00A75B9A /* Release */ = {
			isa = XCBuildConfiguration;
			baseConfigurationReference = DA1B8FEEA3A1D69975C90959 /* Pods-playground.release.xcconfig */;
			buildSettings = {
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				CURRENT_PROJECT_VERSION = 1;
				INFOPLIST_FILE = playground/Info.plist;
				LD_RUNPATH_SEARCH_PATHS = "$(inherited) @executable_path/Frameworks";
				OTHER_LDFLAGS = (
					"$(inherited)",
					"-ObjC",
					"-lc++",
				);
				PRODUCT_BUNDLE_IDENTIFIER = "${packageIdentifier}.playground";
				PRODUCT_NAME = "${name} Playground";
				VERSIONING_SYSTEM = "apple-generic";
			};
			name = Release;
		};
		83CBBA201A601CBA00E9B192 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
				COPY_PHASE_STRIP = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_SYMBOLS_PRIVATE_EXTERN = NO;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 9.0;
				MTL_ENABLE_DEBUG_INFO = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
			};
			name = Debug;
		};
		83CBBA211A601CBA00E9B192 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				"CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
				COPY_PHASE_STRIP = YES;
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 9.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = iphoneos;
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		13B07F931A680F5B00A75B9A /* Build configuration list for PBXNativeTarget "playground" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				13B07F941A680F5B00A75B9A /* Debug */,
				13B07F951A680F5B00A75B9A /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		83CBB9FA1A601CBA00E9B192 /* Build configuration list for PBXProject "playground" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				83CBBA201A601CBA00E9B192 /* Debug */,
				83CBBA211A601CBA00E9B192 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = 83CBB9F71A601CBA00E9B192 /* Project object */;
}

      
      `;
    },
  },
  {
    name: () => `android/settings.gradle`,
    content: ({ moduleName, name }) => `rootProject.name = '${name}Playground'
apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")
applyNativeModulesSettingsGradle(settings, "../..")

include ':app'

include ':${moduleName}'
project(':${moduleName}').projectDir = new File(rootProject.projectDir, '../../android')`,
  },
  {
    name: () => `android/build.gradle`,
    content: () => `// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    ext {
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 28
    }
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:3.4.2")

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../../node_modules/jsc-android/dist")
        }

        google()
        jcenter()
        maven { url 'https://jitpack.io' }
    }
}
    `,
  },
  {
    name: () => 'android/app/build.gradle',
    content: ({ moduleName, packageIdentifier }) => `apply plugin: 'com.android.application'

project.ext.react = [
        root           : "../../../",
        entryFile      : "playground/index.js",
        bundleInRelease: true,
        bundleInDebug  : true,
        enableHermes   : false,
        hermesCommand  : "../../../node_modules/hermesvm/%OS-BIN%/hermes",
]

apply from: "../../../node_modules/react-native/react.gradle"

def enableHermes = project.ext.react.get("enableHermes", false)
def enableSeparateBuildPerCPUArchitecture = false
def enableProguardInReleaseBuilds = false

android {

    compileSdkVersion rootProject.ext.compileSdkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    defaultConfig {
        applicationId "${packageIdentifier}.playground"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    splits {
        abi {
            reset()
            enable enableSeparateBuildPerCPUArchitecture
            universalApk false  // If true, also generate a universal APK
            include "armeabi-v7a", "x86", "arm64-v8a", "x86_64"
        }
    }
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://facebook.github.io/react-native/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    implementation 'com.facebook.react:react-native:+'
    if (enableHermes) {
        def hermesPath = "../../../node_modules/hermesvm/android/"
        debugImplementation files(hermesPath + "hermes-debug.aar")
        releaseImplementation files(hermesPath + "hermes-release.aar")
    } else {
        implementation 'org.webkit:android-jsc:+'
    }
    implementation project(':${moduleName}')
}

task copyDownloadableDepsToLibs(type: Copy) {
  from configurations.compile
  into 'libs'
}

apply from: file("../../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");
applyNativeModulesAppBuildGradle(project, "../..")`,
  },
  {
    name: () => `android/app/src/main/AndroidManifest.xml`,
    content: ({ packageIdentifier }) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="${packageIdentifier}.playground">

  <uses-permission android:name="android.permission.INTERNET" />

  <application
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:allowBackup="false"
    android:theme="@style/AppTheme">
    <activity
      android:name=".MainActivity"
      android:label="@string/app_name"
      android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
      android:windowSoftInputMode="adjustResize">
      <intent-filter>
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
    <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
  </application>

</manifest>`,
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/playground/MainActivity.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier}.playground;

import com.navigationhybrid.ReactAppCompatActivity;

public class MainActivity extends ReactAppCompatActivity {

}`,
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/playground/MainApplication.java`,
    content: ({ packageIdentifier, name }) => `package ${packageIdentifier}.playground;

import android.app.Application;
import android.content.Context;

import com.facebook.common.logging.FLog;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.navigationhybrid.ReactBridgeManager;
import ${packageIdentifier}.${name}Package;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          packages.add(new ${name}Package());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "playground/index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    ReactBridgeManager bridgeManager = ReactBridgeManager.get();
    bridgeManager.install(getReactNativeHost());
    FLog.setMinimumLoggingLevel(FLog.INFO);
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
          We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
    `,
  },
  {
    name: () => `App.js`,
    content: ({ moduleName, name, view }) =>
      `import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default class App extends Component {
  static navigationItem = {
    titleItem: {
      title: '${name} 演示',
    },
  };

  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    console.log('You have pressed me.');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello World!</Text>

        <TouchableOpacity
          onPress={this.handlePress}
          activeOpacity={0.2}
          style={styles.button}>
          <Text style={styles.buttonText}>press me</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

  buttonText: {
    backgroundColor: 'transparent',
    color: 'rgb(34,88,220)',
  },

  welcome: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center',
    margin: 8,
  },
});
`,
  },
  {
    name: () => 'index.js',
    content: () => `import {
  ReactRegistry,
  Navigator,
  Garden,
  BarStyleDarkContent,
} from 'react-native-navigation-hybrid';
import App from './App';

Garden.setStyle({
  screenBackgroundColor: '#F8F8F8',
  topBarStyle: BarStyleDarkContent,
});

ReactRegistry.startRegisterComponent();
ReactRegistry.registerComponent('App', () => App);
ReactRegistry.endRegisterComponent();

Navigator.setRoot({
  stack: {
    children: [
      {
        screen: {
          moduleName: 'App',
        },
      },
    ],
  },
});`,
  },
];
