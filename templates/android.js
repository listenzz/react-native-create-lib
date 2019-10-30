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
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }

    compileSdkVersion safeExtGet('compileSdkVersion', 28)
    buildToolsVersion safeExtGet('buildToolsVersion', '28.0.3')

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 16)
        targetSdkVersion safeExtGet('targetSdkVersion', 28)
        versionCode 1
        versionName "1.0.0"
    }
}

dependencies {
    implementation 'com.facebook.react:react-native:+'
}
`,
  },
  {
    name: () => `${platform}/src/main/AndroidManifest.xml`,
    content: ({ packageIdentifier }) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="${packageIdentifier}">

</manifest>
`,
  },
  {
    // for module without view:
    name: ({ packageIdentifier, name, view }) =>
      !view && `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${name}Module.java`,
    content: ({ packageIdentifier, name, view }) =>
      !view &&
      `package ${packageIdentifier};

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class ${name}Module extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ${name}Module(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "${name}";
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement some actually useful functionality
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
`,
  },
  {
    // manager for view:
    name: ({ packageIdentifier, name, view }) =>
      view && `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${name}Manager.java`,
    content: ({ packageIdentifier, name, view }) =>
      view &&
      `package ${packageIdentifier};

import android.view.View;
import androidx.appcompat.widget.AppCompatCheckBox;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class ${name}Manager extends SimpleViewManager<View> {

    public static final String REACT_CLASS = "${name}";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public View createViewInstance(ThemedReactContext c) {
        // TODO: Implement some actually useful functionality
        AppCompatCheckBox cb = new AppCompatCheckBox(c);
        cb.setChecked(true);
        return cb;
    }
}
`,
  },
  {
    // package for module without view:
    name: ({ packageIdentifier, name, view }) =>
      !view && `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${name}Package.java`,
    content: ({ packageIdentifier, name, view }) =>
      !view &&
      `package ${packageIdentifier};

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class ${name}Package implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new ${name}Module(reactContext));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
`,
  },
  {
    // package for manager for view:
    name: ({ packageIdentifier, name, view }) =>
      view && `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${name}Package.java`,
    content: ({ packageIdentifier, name, view }) =>
      view &&
      `package ${packageIdentifier};

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class ${name}Package implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new ${name}Manager());
    }
}
`,
  },
];
