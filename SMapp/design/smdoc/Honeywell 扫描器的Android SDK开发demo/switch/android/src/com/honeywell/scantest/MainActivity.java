package com.honeywell.scantest;

import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;

import com.honeywell.aidc.AidcManager;
import com.honeywell.aidc.BarcodeFailureEvent;
import com.honeywell.aidc.BarcodeReadEvent;
import com.honeywell.aidc.BarcodeReader;
import com.honeywell.aidc.TriggerStateChangeEvent;
import org.qtproject.qt5.android.bindings.QtActivity;
//import com.honeywell.scantest.R;

public class MainActivity extends org.qtproject.qt5.android.bindings.QtActivity implements BarcodeReader.BarcodeListener,
BarcodeReader.TriggerListener{

        AidcManager manager;
        BarcodeReader barcodeReader;

        EditText text1;
        String barcodeData;

        @Override
        public void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                     System.out.println("AAA");
            /**初始化扫描器的创建*/
            startScanCreate();

        }

        //第四步：实现触发键事件和条码事件的处理
        @Override
        public void onBarcodeEvent(BarcodeReadEvent barcodeReadEvent) {
                barcodeData = barcodeReadEvent.getBarcodeData();
                 System.out.println("扫描数据barcodeData："+barcodeData);
                //获取扫描数据
                //在UI线程中进行数据显示
//                runOnUiThread(new Runnable() {
//                        @Override
//                        public void run() {
//                              System.out.println("扫描数据："+barcodeData);
//                                text1.setText("扫描数据：" + barcodeData);
//                        }
//                });

        }

        @Override
        public void onFailureEvent(BarcodeFailureEvent barcodeFailureEvent) {
            System.out.println("扫描失败----");
       //     barcodeData = barcodeFailureEvent.getBarcodeData();
         //    System.out.println("扫描数据barcodeData："+barcodeData);
        }

        @Override
        public void onTriggerEvent(TriggerStateChangeEvent triggerStateChangeEvent) {
                try {
                //    System.out.println("扫描成功AA");

                        barcodeReader.light(triggerStateChangeEvent.getState());	//开关补光
                        barcodeReader.aim(triggerStateChangeEvent.getState());		//开关瞄准线
                        barcodeReader.decode(triggerStateChangeEvent.getState());	//开关解码功能

                        System.out.println("扫描成功AA"+triggerStateChangeEvent.getState());
                } catch(Exception e){
                  System.out.println("扫描失败BB");
                        Toast.makeText(this, "开关扫描功能失败", Toast.LENGTH_SHORT).show();
                }
        }
    //启动扫描器的创建
    public void startScanCreate()
     {
    //  第一步：创建Aidc管理器和BarcodeReader对象
        AidcManager.create(this, new AidcManager.CreatedCallback() {

            @Override
            public void onCreated(AidcManager aidcManager) {

                    manager = aidcManager;							//获得Aidc管理器对象
                    barcodeReader = manager.createBarcodeReader();	//创建BarcodeReader对象

                    //第二步：设置扫描属性
                    try {
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_CODE_128_ENABLED, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_GS1_128_ENABLED, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_QR_CODE_ENABLED, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_CODE_39_ENABLED, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_DATAMATRIX_ENABLED, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_UPC_A_ENABLE, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_EAN_13_ENABLED, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_AZTEC_ENABLED, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_CODABAR_ENABLED, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_INTERLEAVED_25_ENABLED, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_PDF_417_ENABLED, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_CODE_39_MAXIMUM_LENGTH, 10);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_CENTER_DECODE, true);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_NOTIFICATION_BAD_READ_ENABLED, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_DATA_PROCESSOR_LAUNCH_BROWSER, false);
                            barcodeReader.setProperty(BarcodeReader.PROPERTY_TRIGGER_CONTROL_MODE,
                                                      BarcodeReader.TRIGGER_CONTROL_MODE_CLIENT_CONTROL);
                            barcodeReader.claim();
                            //打开扫描功能
                    } catch(Exception e){
                            Toast.makeText(MainActivity.this, "修改属性失败", Toast.LENGTH_SHORT).show();
                    }

                    //第三步：注册Trigger监听器和Barcode监听器
                    barcodeReader.addTriggerListener(MainActivity.this);
                    barcodeReader.addBarcodeListener(MainActivity.this);
            }
    });
    }
        //第五步：扫描功能的关闭与恢复
        @Override
        protected void onResume() {
                super.onResume();
                if(barcodeReader != null){
                        try {
                                barcodeReader.claim();
                        } catch (Exception e){
                                Toast.makeText(this, "开启扫描失败", Toast.LENGTH_SHORT).show();
                        }
                }
        }

        @Override
        protected void onPause() {
                super.onPause();
                if(barcodeReader != null){
                        barcodeReader.release();
                }
        }

        @Override
        protected void onDestroy() {
                super.onDestroy();
                if(barcodeReader != null){
                        barcodeReader.removeTriggerListener(this);
                        barcodeReader.removeBarcodeListener(this);
                        barcodeReader.close();
                }

                if(manager != null){
                        manager.close();
                }
        }
}
