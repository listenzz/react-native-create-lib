module.exports = (platform) => [
  {
    name: () => `android/settings.gradle`,
    content: ({ repoName, className }) => `rootProject.name = '${className}'
apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle")
applyNativeModulesSettingsGradle(settings, "../..")

include ':app'

include ':${repoName}'
project(':${repoName}').projectDir = new File(rootProject.projectDir, '../../android')`,
  },
  {
    name: () => `android/build.gradle`,
    content: () => `// Top-level build file where you can add configuration options common to all sub-projects/modules.
  
buildscript {
    ext {
        buildToolsVersion = "29.0.2"
        minSdkVersion = 21
        compileSdkVersion = 29
        targetSdkVersion = 29
    }
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:3.5.3")

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
    content: ({ repoName, packageIdentifier }) => `apply plugin: 'com.android.application'
  
project.ext.react = [
		root           : "../../../",
		entryFile      : "example/index.js",
		bundleInRelease: true,
		bundleInDebug  : true,
		enableHermes   : false,
		hermesCommand  : "../../../node_modules/hermes-engine/%OS-BIN%/hermes",
]

apply from: "../../../node_modules/react-native/react.gradle"

def enableHermes = project.ext.react.get("enableHermes", false)
def enableSeparateBuildPerCPUArchitecture = false
def enableProguardInReleaseBuilds = false
def jscFlavor = 'org.webkit:android-jsc:+'

android {

	compileSdkVersion rootProject.ext.compileSdkVersion

	compileOptions {
		sourceCompatibility JavaVersion.VERSION_1_8
		targetCompatibility JavaVersion.VERSION_1_8
	}

	defaultConfig {
		applicationId "${packageIdentifier}.example"
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
    packagingOptions {
		pickFirst "lib/armeabi-v7a/libc++_shared.so"
		pickFirst "lib/arm64-v8a/libc++_shared.so"
		pickFirst "lib/x86/libc++_shared.so"
		pickFirst "lib/x86_64/libc++_shared.so"
	}
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation 'com.facebook.react:react-native:+'
    implementation "androidx.swiperefreshlayout:swiperefreshlayout:1.0.0"
	if (enableHermes) {
		def hermesPath = "../../../node_modules/hermes-engine/android/"
		debugImplementation files(hermesPath + "hermes-debug.aar")
		releaseImplementation files(hermesPath + "hermes-release.aar")
	} else {
		implementation jscFlavor
	}
	implementation project(':${repoName}')
}

task copyDownloadableDepsToLibs(type: Copy) {
from configurations.compile
into 'libs'
}

apply from: file("../../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle");
applyNativeModulesAppBuildGradle(project, "../..")`,
  },
  {
    name: () => `android/app/src/main/res/values/strings.xml`,
    content: ({ className }) => `<resources>
    <string name="app_name">${className}</string>
</resources>
`,
  },
  {
    name: () => `android/app/src/main/AndroidManifest.xml`,
    content: ({
      packageIdentifier,
    }) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	package="${packageIdentifier}.example">

	<uses-permission android:name="android.permission.INTERNET" />

	<application
		android:name=".MainApplication"
		android:label="@string/app_name"
		android:icon="@mipmap/ic_launcher"
		android:roundIcon="@mipmap/ic_launcher_round"
		android:allowBackup="false"
		tools:targetApi="28"
		tools:ignore="GoogleAppIndexingWarning"
		android:theme="@style/AppTheme">

		<meta-data
			android:name="android.max_aspect"
			android:value="2.4" />
		<meta-data
			android:name="android.notch_support"
			android:value="true" />
		<meta-data
			android:name="notch.config"
			android:value="portrait|landscape" />

		<activity
			android:name=".MainActivity"
			android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize|uiMode"
			android:launchMode="singleTask"
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
      `android/app/src/main/java/${packageIdentifier
        .split('.')
        .join('/')}/example/MainActivity.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier}.example;
  
import com.navigationhybrid.ReactAppCompatActivity;

public class MainActivity extends ReactAppCompatActivity {

}`,
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier
        .split('.')
        .join('/')}/example/MainApplication.java`,
    content: ({ packageIdentifier, className }) => `package ${packageIdentifier}.example;

import android.app.Application;

import com.facebook.common.logging.FLog;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;
import com.navigationhybrid.ReactBridgeManager;
import ${packageIdentifier}.${className}Package;

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
				packages.add(new ${className}Package());
				return packages;
			}

			@Override
			protected String getJSMainModuleName() {
				return "example/index";
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
		ReactBridgeManager bridgeManager = ReactBridgeManager.get();
		bridgeManager.install(getReactNativeHost());
		FLog.setMinimumLoggingLevel(FLog.INFO);
	}
}`,
  },
]
