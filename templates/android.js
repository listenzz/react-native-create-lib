module.exports = platform => [
  {
    name: () => `${platform}/build.gradle`,
    content: ({ packageIdentifier }) => `apply plugin: 'com.android.library'
apply plugin: 'com.facebook.react'

def safeExtGet(prop, fallback) {
	rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

android {

	def agpVersion = com.android.Version.ANDROID_GRADLE_PLUGIN_VERSION.tokenize('.')
	// Check AGP version for backward compatibility w/react-native versions still on gradle plugin 6
	def major = agpVersion[0].toInteger()
	def minor = agpVersion[1].toInteger()
	if ((major == 7 && minor >= 3) || major >= 8) {
		namespace "${packageIdentifier}"
		buildFeatures {
			buildConfig true
		}
	}

	compileSdkVersion safeExtGet('compileSdkVersion', 35)
	buildToolsVersion safeExtGet('buildToolsVersion', '35.0.0')

	defaultConfig {
		minSdkVersion safeExtGet('minSdkVersion', 24)
		targetSdkVersion safeExtGet('targetSdkVersion', 35)
	}

	sourceSets {
		main {
			java.srcDirs += [
				"generated/java",
				"generated/jni"
			]
		}
	}
}

repositories {
	google()
	mavenCentral()
}

dependencies {
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
    name: ({ packageIdentifier, className, moduleType }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      if (!isModule) return null;
      return `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${className}Module.java`;
    },
    content: ({ packageIdentifier, className, classNameWithPrefix }) =>
      `package ${packageIdentifier};

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactHost;
import com.facebook.react.defaults.DefaultReactHost;

public class ${className}Module extends Native${className}Spec {

    private final ReactApplicationContext reactContext;
    private final ReactHost reactHost;

    public ${className}Module(ReactApplicationContext reactContext, ReactNativeHost reactNativeHost) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactHost = DefaultReactHost.getDefaultReactHost(reactContext, reactNativeHost, null);
    }

    @NonNull
    @Override
    public String getName() {
        return "${classNameWithPrefix}";
    }

    @Override
    public void sampleMethod(String str, double num, com.facebook.react.bridge.Promise promise) {
        // TODO: Implement some actually useful functionality
        promise.resolve("Received num: " + num + " str: " + str);
    }
}
`,
  },
  {
    name: ({ packageIdentifier, className }) =>
      `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${className}Package.java`,
    content: ({ packageIdentifier, className, moduleType }) => {
      const isModule = moduleType === 'modules' || moduleType === 'all';
      const isComponent = moduleType === 'components' || moduleType === 'all';
      
      let nativeModulesCode = 'return Collections.emptyList();';
      let viewManagersCode = 'return Collections.emptyList();';
      
      if (isModule) {
        nativeModulesCode = `return Collections.singletonList(new ${className}Module(reactContext, reactNativeHost));`;
      }
      
      if (isComponent) {
        viewManagersCode = `return Arrays.asList(new ${className}ViewManager());`;
      }
      
      const imports = isComponent ? 
        `import java.util.Arrays;
import java.util.Collections;
import java.util.List;` :
        `import java.util.Collections;
import java.util.List;`;
      
      return `package ${packageIdentifier};

import androidx.annotation.NonNull;

${imports}

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class ${className}Package implements ReactPackage {

	private final ReactNativeHost reactNativeHost;

	public ${className}Package(ReactNativeHost reactNativeHost) {
		this.reactNativeHost = reactNativeHost;
	}

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        ${nativeModulesCode}
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        ${viewManagersCode}
    }
}
`;
    },
  },
  {
    name: ({ packageIdentifier, className, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (!isComponent) return null;
      return `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${className}ViewManager.java`;
    },
    content: ({ packageIdentifier, className, classNameWithPrefix }) =>
      `package ${packageIdentifier};

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.viewmanagers.${className}ViewManagerDelegate;
import com.facebook.react.viewmanagers.${className}ViewManagerInterface;

import java.util.Map;

public class ${className}ViewManager extends ViewGroupManager<${className}View>
	implements ${className}ViewManagerInterface<${className}View> {
	private final ${className}ViewManagerDelegate<${className}View, ${className}ViewManager> mDelegate = new ${className}ViewManagerDelegate<>(this);
	private static final String REACT_CLASS = "${className}View";

	@Override
	protected ViewManagerDelegate<${className}View> getDelegate() {
		return mDelegate;
	}

	@NonNull
	@Override
	public String getName() {
		return REACT_CLASS;
	}

	@NonNull
	@Override
	protected ${className}View createViewInstance(@NonNull ThemedReactContext reactContext) {
		return new ${className}View(reactContext);
	}

	// TODO: Add property setters
	// Example:
	// @Override
	// public void setSampleProperty(${className}View view, @Nullable String value) {
	// 	view.setSampleProperty(value);
	// }

	// TODO: Add command handlers
	// Example:
	// @Override
	// public void sampleMethod(${className}View view) {
	// 	view.sampleMethod();
	// }

	@Override
	protected void onAfterUpdateTransaction(@NonNull ${className}View view) {
		super.onAfterUpdateTransaction(view);
		// TODO: Call view initialization if needed
		// view.initProperties();
	}

	@Nullable
	@Override
	public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
		// TODO: Add event names
		// return MapBuilder.of(
		// 	On${className}Event.Name, MapBuilder.of("registrationName", On${className}Event.JSEventName)
		// );
		return null;
	}

	@Override
	protected void addEventEmitters(@NonNull ThemedReactContext reactContext, @NonNull ${className}View view) {
		super.addEventEmitters(reactContext, view);
		// TODO: Set up event emitters
		// Example:
		// view.setOn${className}EventListener((data) -> {
		// 	int surfaceId = UIManagerHelper.getSurfaceId(reactContext);
		// 	int viewId = view.getId();
		// 	EventDispatcher eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, viewId);
		// 	if (eventDispatcher != null) {
		// 		On${className}Event event = new On${className}Event(surfaceId, viewId, data);
		// 		eventDispatcher.dispatchEvent(event);
		// 	}
		// });
	}
}
`,
  },
  {
    name: ({ packageIdentifier, className, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (!isComponent) return null;
      return `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/${className}View.java`;
    },
    content: ({ packageIdentifier, className }) =>
      `package ${packageIdentifier};

import android.content.Context;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;

public class ${className}View extends View {
	private final ReactContext reactContext;
	
	// TODO: Add event listener interface
	// Example:
	// public interface On${className}EventListener {
	// 	void onEvent(String data);
	// }
	// private On${className}EventListener on${className}EventListener;

	public ${className}View(@NonNull Context context) {
		super(context);
		this.reactContext = (ReactContext) context;
		// TODO: Initialize your view
	}

	// TODO: Add property setters
	// Example:
	// public void setSampleProperty(String value) {
	// 	// Handle property change
	// }

	// TODO: Add methods that can be called via Commands
	// Example:
	// public void sampleMethod() {
	// 	// Implement method logic
	// 	// Trigger event if needed:
	// 	// if (on${className}EventListener != null) {
	// 	// 	on${className}EventListener.onEvent("data");
	// 	// }
	// }

	// TODO: Add event listener setter
	// Example:
	// public void setOn${className}EventListener(On${className}EventListener listener) {
	// 	this.on${className}EventListener = listener;
	// }
}
`,
  },
  {
    name: ({ packageIdentifier, className, moduleType }) => {
      const isComponent = moduleType === 'components' || moduleType === 'all';
      if (!isComponent) return null;
      return `${platform}/src/main/java/${packageIdentifier.split('.').join('/')}/On${className}Event.java`;
    },
    content: ({ packageIdentifier, className }) =>
      `package ${packageIdentifier};

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;

public class On${className}Event extends Event<On${className}Event> {
	public static final String Name = "top${className}";
	public static final String JSEventName = "on${className}";

	// TODO: Add event payload fields
	// Example:
	// private final String data;

	public On${className}Event(int surfaceId, int viewTag) {
		super(surfaceId, viewTag);
		// TODO: Initialize event payload
		// Example:
		// this.data = data;
	}

	@NonNull
	@Override
	public String getEventName() {
		return Name;
	}

	@Nullable
	@Override
	protected WritableMap getEventData() {
		WritableMap event = Arguments.createMap();
		// TODO: Add event data
		// Example:
		// event.putString("data", data);
		return event;
	}
}
`,
  },
]
