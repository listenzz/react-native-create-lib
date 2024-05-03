module.exports = platform => [
  {
    name: () => `${platform}/build.gradle`,
    content: () => `// ${platform}/build.gradle

def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

apply plugin: 'com.android.library'

android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }

    compileSdkVersion safeExtGet('compileSdkVersion', 33)
    buildToolsVersion safeExtGet('buildToolsVersion', '33.0.0')

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 21)
        targetSdkVersion safeExtGet('targetSdkVersion', 33)
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            consumerProguardFiles 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.facebook.react:react-native:+'
}
`,
  },
  {
    name: () => `${platform}/proguard-rules.pro`,
    content: () => '',
  },
  {
    name: () => `${platform}/src/main/AndroidManifest.xml`,
    content: ({ packageIdentifier }) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="${packageIdentifier}">

</manifest>
`,
  },
  {
    name: ({ packageIdentifier, className }) =>
      `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${className}Module.java`,
    content: ({ packageIdentifier, className, classNameWithPrefix }) =>
      `package ${packageIdentifier};

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class ${className}Module extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ${className}Module(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "${classNameWithPrefix}";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke(null, "Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
`,
  },
  {
    name: ({ packageIdentifier, className }) =>
      `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${className}Package.java`,
    content: ({ packageIdentifier, className }) =>
      `package ${packageIdentifier};

import androidx.annotation.NonNull;

import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class ${className}Package implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        return Collections.singletonList(new ${className}Module(reactContext));
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
`,
  },
]
