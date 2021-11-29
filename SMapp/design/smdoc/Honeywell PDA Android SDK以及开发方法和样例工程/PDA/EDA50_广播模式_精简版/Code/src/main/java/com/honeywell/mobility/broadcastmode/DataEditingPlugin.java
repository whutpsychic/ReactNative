package com.honeywell.mobility.broadcastmode;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

/**
 * This handles the Data Editing intent
 */
public class DataEditingPlugin extends BroadcastReceiver {
    private final static String TAG = "DataEditingPlugin";
    private static final String INTENT_ACTION_EDIT_DATA = "com.honeywell.decode.intent.action.EDITDATA";
    private static final String INTENT_ACTION_SCAN_RESULT = "com.honeywell.tools.action.scan_result";

    @Override
    public void onReceive(final Context context, Intent intent) {
        if (INTENT_ACTION_EDIT_DATA.equals(intent.getAction())) {
            Log.d(TAG, "Got intent for data editing");
            int version = intent.getIntExtra("version", 0);
            Log.d(TAG, "Version: " + Integer.toString(version));

                    // Only the extra string "data" is available
                    String data = intent.getStringExtra("data");

                    Log.d(TAG, "Barcode: " + data);

            Intent scanResultIntent = new Intent(INTENT_ACTION_SCAN_RESULT);
            scanResultIntent.putExtra("decode_rslt", data);
            context.sendBroadcast(scanResultIntent);
        }
    }
}
