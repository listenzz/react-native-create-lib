module.exports = platform => [
  {
    name: () => `android/settings.gradle`,
    content: ({ moduleName, className }) => `rootProject.name = '${className}'
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
		entryFile      : "example/index.js",
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
package="${packageIdentifier}.example">

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
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/example/MainActivity.java`,
    content: ({ packageIdentifier }) => `package ${packageIdentifier}.example;
  
import com.navigationhybrid.ReactAppCompatActivity;

public class MainActivity extends ReactAppCompatActivity {

}`,
  },
  {
    name: ({ packageIdentifier }) =>
      `android/app/src/main/java/${packageIdentifier.split('.').join('/')}/example/MainApplication.java`,
    content: ({ packageIdentifier, className }) => `package ${packageIdentifier}.example;

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
}`,
  },
];
