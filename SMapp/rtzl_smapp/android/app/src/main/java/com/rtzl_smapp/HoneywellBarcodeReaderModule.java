package com.rtzl_smapp;

import java.lang.reflect.Method;
import java.util.Set;
import javax.annotation.Nullable;
import java.util.HashMap;
import java.util.Map;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.os.Build;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.honeywell.aidc.AidcManager;
import com.honeywell.aidc.AidcManager.CreatedCallback;
import com.honeywell.aidc.BarcodeFailureEvent;
import com.honeywell.aidc.BarcodeReadEvent;
import com.honeywell.aidc.BarcodeReader;
import com.honeywell.aidc.ScannerUnavailableException;

@SuppressWarnings("unused")
public class HoneywellBarcodeReaderModule extends ReactContextBaseJavaModule implements BarcodeReader.BarcodeListener {

    private static BarcodeReader barcodeReader;
    private AidcManager manager;
    private BarcodeReader reader;
    private ReactApplicationContext mReactContext;

    private static final String BARCODE_READ_SUCCESS = "barcodeReadSuccess";
    private static final String BARCODE_READ_FAIL = "barcodeReadFail";

    public HoneywellBarcodeReaderModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "HoneywellBarcodeReader";
    }

    /**
     * Send event to javascript
     * @param eventName Name of the event
     * @param params Additional params
     */
    private void sendEvent(String eventName, @Nullable WritableMap params) {
        if (mReactContext.hasActiveCatalystInstance()) {
            mReactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
        }
    }

    public void onBarcodeEvent(BarcodeReadEvent barcodeReadEvent) {
        WritableMap params = Arguments.createMap();
        params.putString("data", barcodeReadEvent.getBarcodeData());
        sendEvent(BARCODE_READ_SUCCESS, params);
    }

    public void onFailureEvent(BarcodeFailureEvent barcodeFailureEvent) {
        sendEvent(BARCODE_READ_FAIL, null);
    }

    /*******************************/
    /** Methods Available from JS **/
    /*******************************/

    @ReactMethod
    public void startReader(final Promise promise) {
        AidcManager.create(mReactContext, new CreatedCallback() {
            @Override
            public void onCreated(AidcManager aidcManager) {
                manager = aidcManager;
                reader = manager.createBarcodeReader();
                if(reader != null){
                    reader.addBarcodeListener(HoneywellBarcodeReaderModule.this);
                    try {
                        reader.claim();
                        promise.resolve(true);
                    } catch (ScannerUnavailableException e) {
                        promise.resolve(false);
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    @ReactMethod
    public void reading()throws Exception{
        try{
            if(reader!=null){
                reader.aim(true);
                reader.light(true);
                reader.decode(true);
            }
            else{
                Toast.makeText(getReactApplicationContext(), "reader 是 null", Toast.LENGTH_SHORT).show();
            }
        } catch(ScannerUnavailableException e){
            Toast.makeText(getReactApplicationContext(), "未知的错误", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void stopReader(Promise promise) {
        if (reader != null) {
            reader.close();
        }
        if (manager != null) {
            manager.close();
        }
        promise.resolve(null);
    }

    private boolean isCompatible() {
        // This... is not optimal. Need to find a better way to performantly check whether device has a Honeywell scanner 
        return Build.BRAND.toLowerCase().contains("honeywell");
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("BARCODE_READ_SUCCESS", BARCODE_READ_SUCCESS);
        constants.put("BARCODE_READ_FAIL", BARCODE_READ_FAIL);
        constants.put("isCompatible", isCompatible());
        return constants;
    }

}
