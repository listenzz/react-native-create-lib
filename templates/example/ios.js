module.exports = platform => [
  {
    name: () => 'ios/Podfile',
    content: ({ moduleName, className, clsssNameWithPrefix }) => `platform :ios, '9.0'
require_relative '../../node_modules/@react-native-community/cli-platform-ios/native_modules'

target '${className}' do
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
    pod '${clsssNameWithPrefix}', :path => '../../'
end`,
  },
  {
    name: ({ className }) => `ios/${className}/Info.plist`,
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
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIRequiredDeviceCapabilities</key>
    <array>
        <string>armv7</string>
    </array>
    <key>UIStatusBarHidden</key>
    <true/>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
    </array>
</dict>
</plist>`,
  },
  {
    name: ({ className }) => `ios/${className}.xcodeproj/project.pbxproj`,
    content: ({ packageIdentifier, className }) => `// !$*UTF8*$!
{
    archiveVersion = 1;
    classes = {
    };
    objectVersion = 50;
    objects = {

/* Begin PBXBuildFile section */
        91887264236AD544003DC79E /* AppDelegate.m in Sources */ = {isa = PBXBuildFile; fileRef = 91887263236AD544003DC79E /* AppDelegate.m */; };
        9188726F236AD545003DC79E /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 9188726E236AD545003DC79E /* Assets.xcassets */; };
        91887272236AD545003DC79E /* LaunchScreen.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 91887270236AD545003DC79E /* LaunchScreen.storyboard */; };
        91887275236AD545003DC79E /* main.m in Sources */ = {isa = PBXBuildFile; fileRef = 91887274236AD545003DC79E /* main.m */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
        9188725F236AD544003DC79E /* ${className}.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = ${className}.app; sourceTree = BUILT_PRODUCTS_DIR; };
        91887262236AD544003DC79E /* AppDelegate.h */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.h; path = AppDelegate.h; sourceTree = "<group>"; };
        91887263236AD544003DC79E /* AppDelegate.m */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.objc; path = AppDelegate.m; sourceTree = "<group>"; };
        9188726E236AD545003DC79E /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = "<group>"; };
        91887271236AD545003DC79E /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = Base.lproj/LaunchScreen.storyboard; sourceTree = "<group>"; };
        91887273236AD545003DC79E /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
        91887274236AD545003DC79E /* main.m */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.objc; path = main.m; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
        9188725C236AD544003DC79E /* Frameworks */ = {
            isa = PBXFrameworksBuildPhase;
            buildActionMask = 2147483647;
            files = (
            );
            runOnlyForDeploymentPostprocessing = 0;
        };
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
        91887256236AD544003DC79E = {
            isa = PBXGroup;
            children = (
                91887261236AD544003DC79E /* ${className} */,
                91887260236AD544003DC79E /* Products */,
            );
            sourceTree = "<group>";
        };
        91887260236AD544003DC79E /* Products */ = {
            isa = PBXGroup;
            children = (
                9188725F236AD544003DC79E /* ${className}.app */,
            );
            name = Products;
            sourceTree = "<group>";
        };
        91887261236AD544003DC79E /* ${className} */ = {
            isa = PBXGroup;
            children = (
                91887262236AD544003DC79E /* AppDelegate.h */,
                91887263236AD544003DC79E /* AppDelegate.m */,
                9188726E236AD545003DC79E /* Assets.xcassets */,
                91887270236AD545003DC79E /* LaunchScreen.storyboard */,
                91887273236AD545003DC79E /* Info.plist */,
                91887274236AD545003DC79E /* main.m */,
            );
            path = ${className};
            sourceTree = "<group>";
        };
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
        9188725E236AD544003DC79E /* ${className} */ = {
            isa = PBXNativeTarget;
            buildConfigurationList = 91887278236AD545003DC79E /* Build configuration list for PBXNativeTarget "${className}" */;
            buildPhases = (
                9188725B236AD544003DC79E /* Sources */,
                9188725C236AD544003DC79E /* Frameworks */,
                9188725D236AD544003DC79E /* Resources */,
                9188727D236AE5AB003DC79E /* Bundle React Native code and images */,
            );
            buildRules = (
            );
            dependencies = (
            );
            name = ${className};
            productName = ${className};
            productReference = 9188725F236AD544003DC79E /* ${className}.app */;
            productType = "com.apple.product-type.application";
        };
/* End PBXNativeTarget section */

/* Begin PBXProject section */
        91887257236AD544003DC79E /* Project object */ = {
            isa = PBXProject;
            attributes = {
                LastUpgradeCheck = 1110;
                ORGANIZATIONNAME = "李生";
                TargetAttributes = {
                    9188725E236AD544003DC79E = {
                        CreatedOnToolsVersion = 11.1;
                    };
                };
            };
            buildConfigurationList = 9188725A236AD544003DC79E /* Build configuration list for PBXProject "${className}" */;
            compatibilityVersion = "Xcode 9.3";
            developmentRegion = en;
            hasScannedForEncodings = 0;
            knownRegions = (
                en,
                Base,
            );
            mainGroup = 91887256236AD544003DC79E;
            productRefGroup = 91887260236AD544003DC79E /* Products */;
            projectDirPath = "";
            projectRoot = "";
            targets = (
                9188725E236AD544003DC79E /* ${className} */,
            );
        };
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
        9188725D236AD544003DC79E /* Resources */ = {
            isa = PBXResourcesBuildPhase;
            buildActionMask = 2147483647;
            files = (
                91887272236AD545003DC79E /* LaunchScreen.storyboard in Resources */,
                9188726F236AD545003DC79E /* Assets.xcassets in Resources */,
            );
            runOnlyForDeploymentPostprocessing = 0;
        };
/* End PBXResourcesBuildPhase section */

/* Begin PBXShellScriptBuildPhase section */
		9188727D236AE5AB003DC79E /* Bundle React Native code and images */ = {
			isa = PBXShellScriptBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			inputFileListPaths = (
			);
			inputPaths = (
			);
			name = "Bundle React Native code and images";
			outputFileListPaths = (
			);
			outputPaths = (
			);
			runOnlyForDeploymentPostprocessing = 0;
			shellPath = /bin/sh;
			shellScript = "export NODE_BINARY=node\\n../../node_modules/react-native/scripts/react-native-xcode.sh example/index.js\\n";
		};
/* End PBXShellScriptBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
        9188725B236AD544003DC79E /* Sources */ = {
            isa = PBXSourcesBuildPhase;
            buildActionMask = 2147483647;
            files = (
                91887264236AD544003DC79E /* AppDelegate.m in Sources */,
                91887275236AD545003DC79E /* main.m in Sources */,
            );
            runOnlyForDeploymentPostprocessing = 0;
        };
/* End PBXSourcesBuildPhase section */

/* Begin PBXVariantGroup section */
        91887270236AD545003DC79E /* LaunchScreen.storyboard */ = {
            isa = PBXVariantGroup;
            children = (
                91887271236AD545003DC79E /* Base */,
            );
            name = LaunchScreen.storyboard;
            sourceTree = "<group>";
        };
/* End PBXVariantGroup section */

/* Begin XCBuildConfiguration section */
        91887276236AD545003DC79E /* Debug */ = {
            isa = XCBuildConfiguration;
            buildSettings = {
                ALWAYS_SEARCH_USER_PATHS = NO;
                CLANG_ANALYZER_NONNULL = YES;
                CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
                CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
                CLANG_CXX_LIBRARY = "libc++";
                CLANG_ENABLE_MODULES = YES;
                CLANG_ENABLE_OBJC_ARC = YES;
                CLANG_ENABLE_OBJC_WEAK = YES;
                CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
                CLANG_WARN_BOOL_CONVERSION = YES;
                CLANG_WARN_COMMA = YES;
                CLANG_WARN_CONSTANT_CONVERSION = YES;
                CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
                CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
                CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
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
                CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
                CLANG_WARN_UNREACHABLE_CODE = YES;
                CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
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
                IPHONEOS_DEPLOYMENT_TARGET = 13.1;
                MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
                MTL_FAST_MATH = YES;
                ONLY_ACTIVE_ARCH = YES;
                SDKROOT = iphoneos;
            };
            name = Debug;
        };
        91887277236AD545003DC79E /* Release */ = {
            isa = XCBuildConfiguration;
            buildSettings = {
                ALWAYS_SEARCH_USER_PATHS = NO;
                CLANG_ANALYZER_NONNULL = YES;
                CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
                CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
                CLANG_CXX_LIBRARY = "libc++";
                CLANG_ENABLE_MODULES = YES;
                CLANG_ENABLE_OBJC_ARC = YES;
                CLANG_ENABLE_OBJC_WEAK = YES;
                CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
                CLANG_WARN_BOOL_CONVERSION = YES;
                CLANG_WARN_COMMA = YES;
                CLANG_WARN_CONSTANT_CONVERSION = YES;
                CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
                CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
                CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
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
                CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
                CLANG_WARN_UNREACHABLE_CODE = YES;
                CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
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
                IPHONEOS_DEPLOYMENT_TARGET = 13.1;
                MTL_ENABLE_DEBUG_INFO = NO;
                MTL_FAST_MATH = YES;
                SDKROOT = iphoneos;
                VALIDATE_PRODUCT = YES;
            };
            name = Release;
        };
        91887279236AD545003DC79E /* Debug */ = {
            isa = XCBuildConfiguration;
            buildSettings = {
                ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
                CODE_SIGN_STYLE = Automatic;
                INFOPLIST_FILE = ${className}/Info.plist;
                IPHONEOS_DEPLOYMENT_TARGET = 9.0;
                LD_RUNPATH_SEARCH_PATHS = (
                    "$(inherited)",
                    "@executable_path/Frameworks",
                );
                PRODUCT_BUNDLE_IDENTIFIER = ${packageIdentifier}.example;
                PRODUCT_NAME = "$(TARGET_NAME)";
                TARGETED_DEVICE_FAMILY = "1";
            };
            name = Debug;
        };
        9188727A236AD545003DC79E /* Release */ = {
            isa = XCBuildConfiguration;
            buildSettings = {
                ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
                CODE_SIGN_STYLE = Automatic;
                INFOPLIST_FILE = ${className}/Info.plist;
                IPHONEOS_DEPLOYMENT_TARGET = 9.0;
                LD_RUNPATH_SEARCH_PATHS = (
                    "$(inherited)",
                    "@executable_path/Frameworks",
                );
                PRODUCT_BUNDLE_IDENTIFIER = ${packageIdentifier}.example;
                PRODUCT_NAME = "$(TARGET_NAME)";
                TARGETED_DEVICE_FAMILY = "1";
            };
            name = Release;
        };
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
        9188725A236AD544003DC79E /* Build configuration list for PBXProject "${className}" */ = {
            isa = XCConfigurationList;
            buildConfigurations = (
                91887276236AD545003DC79E /* Debug */,
                91887277236AD545003DC79E /* Release */,
            );
            defaultConfigurationIsVisible = 0;
            defaultConfigurationName = Release;
        };
        91887278236AD545003DC79E /* Build configuration list for PBXNativeTarget "${className}" */ = {
            isa = XCConfigurationList;
            buildConfigurations = (
                91887279236AD545003DC79E /* Debug */,
                9188727A236AD545003DC79E /* Release */,
            );
            defaultConfigurationIsVisible = 0;
            defaultConfigurationName = Release;
        };
/* End XCConfigurationList section */
    };
    rootObject = 91887257236AD544003DC79E /* Project object */;
}`,
  },
  {
    name: ({ className }) => `ios/${className}/Base.lproj/LaunchScreen.storyboard`,
    content: () => `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<document type="com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB" version="3.0" toolsVersion="13122.16" targetRuntime="iOS.CocoaTouch" propertyAccessControl="none" useAutolayout="YES" launchScreen="YES" useTraitCollections="YES" useSafeAreas="YES" colorMatched="YES" initialViewController="01J-lp-oVM">
    <dependencies>
        <plugIn identifier="com.apple.InterfaceBuilder.IBCocoaTouchPlugin" version="13104.12"/>
        <capability name="Safe area layout guides" minToolsVersion="9.0"/>
        <capability name="documents saved in the Xcode 8 format" minToolsVersion="8.0"/>
    </dependencies>
    <scenes>
        <!--View Controller-->
        <scene sceneID="EHf-IW-A2E">
            <objects>
                <viewController id="01J-lp-oVM" sceneMemberID="viewController">
                    <view key="view" contentMode="scaleToFill" id="Ze5-6b-2t3">
                        <rect key="frame" x="0.0" y="0.0" width="375" height="667"/>
                        <autoresizingMask key="autoresizingMask" widthSizable="YES" heightSizable="YES"/>
                        <color key="backgroundColor" xcode11CocoaTouchSystemColor="systemBackgroundColor" cocoaTouchSystemColor="whiteColor"/>
                        <viewLayoutGuide key="safeArea" id="6Tk-OE-BBY"/>
                    </view>
                </viewController>
                <placeholder placeholderIdentifier="IBFirstResponder" id="iYj-Kq-Ea1" userLabel="First Responder" sceneMemberID="firstResponder"/>
            </objects>
            <point key="canvasLocation" x="53" y="375"/>
        </scene>
    </scenes>
</document>`,
  },
];
