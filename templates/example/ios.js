module.exports = platform => [
  {
    name: () => 'ios/Podfile',
    content: ({ exampleName, classNameWithPrefix }) => `platform :ios, '10.0'
require_relative '../../node_modules/react-native/scripts/react_native_pods'
require_relative '../../node_modules/@react-native-community/cli-platform-ios/native_modules'

target '${exampleName}' do
    pod '${classNameWithPrefix}', :path => '../../'

    config = use_native_modules!
    use_react_native!(
        :path => config[:reactNativePath],
        :hermes_enabled => false
    )
                        
    post_install do |installer|
        installer.pods_project.targets.each do |target|
            target.build_configurations.each do |config|
                config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "amd64"
                if config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'].to_f < 9.0
                    config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '9.0'
                end
            end
        end
    end
end`,
  },
  {
    name: ({ exampleName }) => `ios/${exampleName}/Info.plist`,
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
    name: ({ exampleName }) => `ios/${exampleName}.xcodeproj/project.pbxproj`,
    content: ({ packageIdentifier, exampleName }) => `// !$*UTF8*$!
{
    archiveVersion = 1;
    classes = {
    };
    objectVersion = 55;
    objects = {

/* Begin PBXBuildFile section */
        047B8517EA7B5047F0A2DD5B /* libPods-${exampleName}.a in Frameworks */ = {isa = PBXBuildFile; fileRef = E122DC6660A2FD7515F28ED7 /* libPods-${exampleName}.a */; };
        13B07FBC1A68108700A75B9A /* AppDelegate.m in Sources */ = {isa = PBXBuildFile; fileRef = 13B07FB01A68108700A75B9A /* AppDelegate.m */; };
        13B07FC11A68108700A75B9A /* main.m in Sources */ = {isa = PBXBuildFile; fileRef = 13B07FB71A68108700A75B9A /* main.m */; };
        91459E512605ACD000EFBE6E /* Assets.xcassets in Resources */ = {isa = PBXBuildFile; fileRef = 91459E502605ACD000EFBE6E /* Assets.xcassets */; };
        91459E552605ACE600EFBE6E /* LaunchScreen.storyboard in Resources */ = {isa = PBXBuildFile; fileRef = 91459E532605ACE600EFBE6E /* LaunchScreen.storyboard */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
        075B3E117F0418BAAAC1F540 /* Pods-${exampleName}.release.xcconfig */ = {isa = PBXFileReference; includeInIndex = 1; lastKnownFileType = text.xcconfig; name = "Pods-${exampleName}.release.xcconfig"; path = "Target Support Files/Pods-${exampleName}/Pods-${exampleName}.release.xcconfig"; sourceTree = "<group>"; };
        13B07F961A680F5B00A75B9A /* ${exampleName}.app */ = {isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = ${exampleName}.app; sourceTree = BUILT_PRODUCTS_DIR; };
        13B07FAF1A68108700A75B9A /* AppDelegate.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; name = AppDelegate.h; path = ${exampleName}/AppDelegate.h; sourceTree = "<group>"; };
        13B07FB01A68108700A75B9A /* AppDelegate.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; name = AppDelegate.m; path = ${exampleName}/AppDelegate.m; sourceTree = "<group>"; };
        13B07FB61A68108700A75B9A /* Info.plist */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; name = Info.plist; path = ${exampleName}/Info.plist; sourceTree = "<group>"; };
        13B07FB71A68108700A75B9A /* main.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; name = main.m; path = ${exampleName}/main.m; sourceTree = "<group>"; };
        514699031AF404FCBE8E8782 /* Pods-${exampleName}.debug.xcconfig */ = {isa = PBXFileReference; includeInIndex = 1; lastKnownFileType = text.xcconfig; name = "Pods-${exampleName}.debug.xcconfig"; path = "Target Support Files/Pods-${exampleName}/Pods-${exampleName}.debug.xcconfig"; sourceTree = "<group>"; };
        91459E502605ACD000EFBE6E /* Assets.xcassets */ = {isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; name = Assets.xcassets; path = ${exampleName}/Assets.xcassets; sourceTree = "<group>"; };
        91459E542605ACE600EFBE6E /* Base */ = {isa = PBXFileReference; lastKnownFileType = file.storyboard; name = Base; path = ${exampleName}/Base.lproj/LaunchScreen.storyboard; sourceTree = "<group>"; };
        E122DC6660A2FD7515F28ED7 /* libPods-${exampleName}.a */ = {isa = PBXFileReference; explicitFileType = archive.ar; includeInIndex = 0; path = "libPods-${exampleName}.a"; sourceTree = BUILT_PRODUCTS_DIR; };
        ED297162215061F000B7C4FE /* JavaScriptCore.framework */ = {isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = JavaScriptCore.framework; path = System/Library/Frameworks/JavaScriptCore.framework; sourceTree = SDKROOT; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
        13B07F8C1A680F5B00A75B9A /* Frameworks */ = {
            isa = PBXFrameworksBuildPhase;
            buildActionMask = 2147483647;
            files = (
                047B8517EA7B5047F0A2DD5B /* libPods-${exampleName}.a in Frameworks */,
            );
            runOnlyForDeploymentPostprocessing = 0;
        };
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
        13B07FAE1A68108700A75B9A /* ${exampleName} */ = {
            isa = PBXGroup;
            children = (
                91459E532605ACE600EFBE6E /* LaunchScreen.storyboard */,
                91459E502605ACD000EFBE6E /* Assets.xcassets */,
                13B07FAF1A68108700A75B9A /* AppDelegate.h */,
                13B07FB01A68108700A75B9A /* AppDelegate.m */,
                13B07FB61A68108700A75B9A /* Info.plist */,
                13B07FB71A68108700A75B9A /* main.m */,
            );
            name = ${exampleName};
            sourceTree = "<group>";
        };
        244BF2D3CD7C5A603856DFAB /* Pods */ = {
            isa = PBXGroup;
            children = (
                514699031AF404FCBE8E8782 /* Pods-${exampleName}.debug.xcconfig */,
                075B3E117F0418BAAAC1F540 /* Pods-${exampleName}.release.xcconfig */,
            );
            path = Pods;
            sourceTree = "<group>";
        };
        2D16E6871FA4F8E400B85C8A /* Frameworks */ = {
            isa = PBXGroup;
            children = (
                ED297162215061F000B7C4FE /* JavaScriptCore.framework */,
                E122DC6660A2FD7515F28ED7 /* libPods-${exampleName}.a */,
            );
            name = Frameworks;
            sourceTree = "<group>";
        };
        832341AE1AAA6A7D00B99B32 /* Libraries */ = {
            isa = PBXGroup;
            children = (
            );
            name = Libraries;
            sourceTree = "<group>";
        };
        83CBB9F61A601CBA00E9B192 = {
            isa = PBXGroup;
            children = (
                13B07FAE1A68108700A75B9A /* ${exampleName} */,
                832341AE1AAA6A7D00B99B32 /* Libraries */,
                83CBBA001A601CBA00E9B192 /* Products */,
                2D16E6871FA4F8E400B85C8A /* Frameworks */,
                244BF2D3CD7C5A603856DFAB /* Pods */,
            );
            indentWidth = 4;
            sourceTree = "<group>";
            tabWidth = 4;
            usesTabs = 0;
        };
        83CBBA001A601CBA00E9B192 /* Products */ = {
            isa = PBXGroup;
            children = (
                13B07F961A680F5B00A75B9A /* ${exampleName}.app */,
            );
            name = Products;
            sourceTree = "<group>";
        };
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
        13B07F861A680F5B00A75B9A /* ${exampleName} */ = {
            isa = PBXNativeTarget;
            buildConfigurationList = 13B07F931A680F5B00A75B9A /* Build configuration list for PBXNativeTarget "${exampleName}" */;
            buildPhases = (
                13B07F871A680F5B00A75B9A /* Sources */,
                13B07F8C1A680F5B00A75B9A /* Frameworks */,
                13B07F8E1A680F5B00A75B9A /* Resources */,
                00DD1BFF1BD5951E006B06BC /* Bundle React Native code and images */,
            );
            buildRules = (
            );
            dependencies = (
            );
            name = ${exampleName};
            productName = ${exampleName};
            productReference = 13B07F961A680F5B00A75B9A /* ${exampleName}.app */;
            productType = "com.apple.product-type.application";
        };
/* End PBXNativeTarget section */

/* Begin PBXProject section */
        83CBB9F71A601CBA00E9B192 /* Project object */ = {
            isa = PBXProject;
            attributes = {
                LastUpgradeCheck = 1320;
                TargetAttributes = {
                    13B07F861A680F5B00A75B9A = {
                        LastSwiftMigration = 1120;
                    };
                };
            };
            buildConfigurationList = 83CBB9FA1A601CBA00E9B192 /* Build configuration list for PBXProject "${exampleName}" */;
            compatibilityVersion = "Xcode 13.0";
            developmentRegion = en;
            hasScannedForEncodings = 0;
            knownRegions = (
                en,
                Base,
            );
            mainGroup = 83CBB9F61A601CBA00E9B192;
            productRefGroup = 83CBBA001A601CBA00E9B192 /* Products */;
            projectDirPath = "";
            projectRoot = "";
            targets = (
                13B07F861A680F5B00A75B9A /* ${exampleName} */,
            );
        };
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
        13B07F8E1A680F5B00A75B9A /* Resources */ = {
            isa = PBXResourcesBuildPhase;
            buildActionMask = 2147483647;
            files = (
                91459E512605ACD000EFBE6E /* Assets.xcassets in Resources */,
                91459E552605ACE600EFBE6E /* LaunchScreen.storyboard in Resources */,
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
            shellScript = "set -e\n\nexport NODE_BINARY=node\n../../node_modules/react-native/scripts/react-native-xcode.sh\n";
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
        91459E532605ACE600EFBE6E /* LaunchScreen.storyboard */ = {
            isa = PBXVariantGroup;
            children = (
                91459E542605ACE600EFBE6E /* Base */,
            );
            name = LaunchScreen.storyboard;
            sourceTree = "<group>";
        };
/* End PBXVariantGroup section */

/* Begin XCBuildConfiguration section */
        13B07F941A680F5B00A75B9A /* Debug */ = {
            isa = XCBuildConfiguration;
            baseConfigurationReference = 514699031AF404FCBE8E8782 /* Pods-${exampleName}.debug.xcconfig */;
            buildSettings = {
                ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
                CLANG_ENABLE_MODULES = YES;
                CURRENT_PROJECT_VERSION = 1;
                ENABLE_BITCODE = NO;
                INFOPLIST_FILE = ${exampleName}/Info.plist;
                LD_RUNPATH_SEARCH_PATHS = (
                    "$(inherited)",
                    "@executable_path/Frameworks",
                );
                OTHER_LDFLAGS = (
                    "$(inherited)",
                    "-ObjC",
                    "-lc++",
                );
                PRODUCT_BUNDLE_IDENTIFIER = "${packageIdentifier}.example";
                PRODUCT_NAME = ${exampleName};
                SWIFT_OPTIMIZATION_LEVEL = "-Onone";
                SWIFT_VERSION = 5.0;
                VERSIONING_SYSTEM = "apple-generic";
            };
            name = Debug;
        };
        13B07F951A680F5B00A75B9A /* Release */ = {
            isa = XCBuildConfiguration;
            baseConfigurationReference = 075B3E117F0418BAAAC1F540 /* Pods-${exampleName}.release.xcconfig */;
            buildSettings = {
                ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
                CLANG_ENABLE_MODULES = YES;
                CURRENT_PROJECT_VERSION = 1;
                INFOPLIST_FILE = ${exampleName}/Info.plist;
                LD_RUNPATH_SEARCH_PATHS = (
                    "$(inherited)",
                    "@executable_path/Frameworks",
                );
                OTHER_LDFLAGS = (
                    "$(inherited)",
                    "-ObjC",
                    "-lc++",
                );
                PRODUCT_BUNDLE_IDENTIFIER = "${packageIdentifier}.example";
                PRODUCT_NAME = ${exampleName};
                SWIFT_VERSION = 5.0;
                VERSIONING_SYSTEM = "apple-generic";
            };
            name = Release;
        };
        83CBBA201A601CBA00E9B192 /* Debug */ = {
            isa = XCBuildConfiguration;
            buildSettings = {
                ALWAYS_SEARCH_USER_PATHS = NO;
                CLANG_ANALYZER_LOCALIZABILITY_NONLOCALIZED = YES;
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
                CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
                CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
                CLANG_WARN_STRICT_PROTOTYPES = YES;
                CLANG_WARN_SUSPICIOUS_MOVE = YES;
                CLANG_WARN_UNREACHABLE_CODE = YES;
                CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
                "CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
                COPY_PHASE_STRIP = NO;
                ENABLE_STRICT_OBJC_MSGSEND = YES;
                ENABLE_TESTABILITY = YES;
                "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = "arm64 ";
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
                IPHONEOS_DEPLOYMENT_TARGET = 10.0;
                LD_RUNPATH_SEARCH_PATHS = (
                    /usr/lib/swift,
                    "$(inherited)",
                );
                LIBRARY_SEARCH_PATHS = (
                    "\\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\\"",
                    "\\"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)\\"",
                    "\\"$(inherited)\\"",
                );
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
                CLANG_ANALYZER_LOCALIZABILITY_NONLOCALIZED = YES;
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
                CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
                CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
                CLANG_WARN_STRICT_PROTOTYPES = YES;
                CLANG_WARN_SUSPICIOUS_MOVE = YES;
                CLANG_WARN_UNREACHABLE_CODE = YES;
                CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
                "CODE_SIGN_IDENTITY[sdk=iphoneos*]" = "iPhone Developer";
                COPY_PHASE_STRIP = YES;
                ENABLE_NS_ASSERTIONS = NO;
                ENABLE_STRICT_OBJC_MSGSEND = YES;
                "EXCLUDED_ARCHS[sdk=iphonesimulator*]" = "arm64 ";
                GCC_C_LANGUAGE_STANDARD = gnu99;
                GCC_NO_COMMON_BLOCKS = YES;
                GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
                GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
                GCC_WARN_UNDECLARED_SELECTOR = YES;
                GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
                GCC_WARN_UNUSED_FUNCTION = YES;
                GCC_WARN_UNUSED_VARIABLE = YES;
                IPHONEOS_DEPLOYMENT_TARGET = 10.0;
                LD_RUNPATH_SEARCH_PATHS = (
                    /usr/lib/swift,
                    "$(inherited)",
                );
                LIBRARY_SEARCH_PATHS = (
                    "\\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\\"",
                    "\\"$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)\\"",
                    "\\"$(inherited)\\"",
                );
                MTL_ENABLE_DEBUG_INFO = NO;
                SDKROOT = iphoneos;
                VALIDATE_PRODUCT = YES;
            };
            name = Release;
        };
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
        13B07F931A680F5B00A75B9A /* Build configuration list for PBXNativeTarget "${exampleName}" */ = {
            isa = XCConfigurationList;
            buildConfigurations = (
                13B07F941A680F5B00A75B9A /* Debug */,
                13B07F951A680F5B00A75B9A /* Release */,
            );
            defaultConfigurationIsVisible = 0;
            defaultConfigurationName = Release;
        };
        83CBB9FA1A601CBA00E9B192 /* Build configuration list for PBXProject "${exampleName}" */ = {
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
}`,
  },
  {
    name: ({ exampleName }) => `ios/${exampleName}/Base.lproj/LaunchScreen.storyboard`,
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
]
