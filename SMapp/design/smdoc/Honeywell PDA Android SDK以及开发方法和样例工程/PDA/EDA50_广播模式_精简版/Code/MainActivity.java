package com.honeywell.mobility.broadcastmode;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;


public class MainActivity extends AppCompatActivity {
    private final static String TAG = "ScanResultReceiver";
    private static final String INTENT_ACTION_SCAN_RESULT = "com.honeywell.tools.action.scan_result";
    //private ArrayAdapter<String> barcodeList;
    private BroadcastReceiver barcodeReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (INTENT_ACTION_SCAN_RESULT.equals(intent.getAction())) {
                if (intent.hasExtra("decode_rslt")) {
                    final String barcodeData = intent.getStringExtra("decode_rslt");
                    TextView tv = (TextView)findViewById(R.id.textView2);
                    tv.append(barcodeData);
                }
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    protected void onResume() {
        super.onResume();
        registerReceiver(barcodeReceiver, new IntentFilter(INTENT_ACTION_SCAN_RESULT));
    }

    @Override
    protected void onPause() {
        super.onPause();
        unregisterReceiver(barcodeReceiver);
    }
}
