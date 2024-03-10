package com.creativeguys.asterominer

import android.os.Bundle
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.webkit.ValueCallback
import android.webkit.WebView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class Game : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.content_game)

        window.insetsController?.let {
            it.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
            it.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }

        var webView: WebView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.settings.allowFileAccess = true
        webView.settings.allowContentAccess = true
        webView.settings.domStorageEnabled = true
        webView.settings.allowFileAccessFromFileURLs = true
        webView.settings.allowUniversalAccessFromFileURLs = true

        webView.addJavascriptInterface(JavascriptInterface(this), "App")

        webView.evaluateJavascript("document.location.href") {
            Toast.makeText(this, "returned " + it, Toast.LENGTH_LONG).show()
        }

        webView.loadUrl("file:///android_asset/index.html")
    }
}