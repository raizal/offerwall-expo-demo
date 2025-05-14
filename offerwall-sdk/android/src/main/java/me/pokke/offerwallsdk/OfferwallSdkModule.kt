package me.pokke.offerwallsdk

import android.app.Activity
import android.app.AlertDialog
import android.app.Dialog
import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.GradientDrawable
import android.os.Handler
import android.os.Looper
import android.view.Gravity
import android.view.Window
import android.view.WindowManager
import android.widget.FrameLayout
import android.widget.TextView
import android.graphics.Typeface
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URL

class OfferwallSdkModule : Module() {
  private var appKey: String? = null
  private var hashKey: String? = null

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('OfferwallSdk')` in JavaScript.
    Name("OfferwallSdk")

    // Defines event names that the module can send to JavaScript.
    Events("onOfferwallInitialized", "onOfferwallClosed", "onCampaignCompleted")

    Function("setAppKey") { appKeyArg: String, hashKeyArg: String ->
      appKey = appKeyArg
      hashKey = hashKeyArg
      sendEvent("onOfferwallInitialized", emptyMap<String, Any>())
    }

    AsyncFunction("openOfferwall") {
      val currentActivity = appContext.currentActivity
      if (currentActivity != null) {
        Handler(Looper.getMainLooper()).post {
          val dialog = Dialog(currentActivity)
          dialog.window?.setBackgroundDrawable(ColorDrawable(Color.parseColor("#B3000000"))) // semi-transparent black
          dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
          dialog.setCancelable(false)

          val textView = TextView(currentActivity)
          textView.text = "Offerwall Demo"
          textView.setTextColor(Color.BLACK)
          textView.textSize = 32f
          textView.setTypeface(null, Typeface.BOLD)
          textView.setBackgroundColor(Color.WHITE)
          textView.gravity = Gravity.CENTER
          textView.setPadding(60, 40, 60, 40)
          textView.background = GradientDrawable().apply {
            cornerRadius = 32f
            setColor(Color.WHITE)
          }

          val layout = FrameLayout(currentActivity)
          layout.layoutParams = FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
          )
          layout.setBackgroundColor(Color.parseColor("#B3000000")) // semi-transparent black
          layout.addView(textView, FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.WRAP_CONTENT,
            FrameLayout.LayoutParams.WRAP_CONTENT,
            Gravity.CENTER
          ))

          dialog.setContentView(layout)
          dialog.window?.setLayout(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.MATCH_PARENT
          )
          dialog.show()
          Handler(Looper.getMainLooper()).postDelayed({
            dialog.dismiss()
            val campaignPayload = mapOf(
              "campaignId" to "${appKey}_${hashKey}",
              "reward" to 100
            )
            sendEvent("onCampaignCompleted", campaignPayload)
            sendEvent("onOfferwallClosed", emptyMap<String, Any>())
          }, 3000)
        }
      }
    }
  }
}
