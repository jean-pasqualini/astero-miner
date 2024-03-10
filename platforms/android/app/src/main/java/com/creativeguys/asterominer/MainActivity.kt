package com.creativeguys.asterominer

import android.content.Context
import android.content.Intent
import android.media.AudioManager
import android.media.MediaPlayer
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        window.insetsController?.let {
            it.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
            it.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }

        var mediaPlayer = MediaPlayer.create(this, R.raw.bg)
        mediaPlayer.isLooping = true

        findViewById<TextView>(R.id.start).setOnClickListener {
            val intent = Intent(this, Game::class.java)
            startActivity(intent)
            mediaPlayer.stop()
            finish()
        }

        findViewById<TextView>(R.id.btnMuteUnmute).setOnClickListener {
            toggleMuteUnmute()
        }
        mediaPlayer.start()
    }

    private fun toggleMuteUnmute() {
        val streamType = AudioManager.STREAM_MUSIC

        val audioManager:AudioManager = getSystemService(AudioManager::class.java)

        // Check if the audio is currently muted.
        val isMuted = audioManager.isStreamMute(streamType)

        if (isMuted) {
            findViewById<TextView>(R.id.btnMuteUnmute).setText("Mute")
            // Unmute - Prior to Android N, there's no direct way to unmute, so we set the volume to a specific level.
            // You might want to remember the user's volume level before muting.
            audioManager.setStreamVolume(streamType, audioManager.getStreamMaxVolume(streamType) / 2, 0)
        } else {
            // Mute the audio
            findViewById<TextView>(R.id.btnMuteUnmute).setText("Unmute")
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                audioManager.adjustStreamVolume(streamType, AudioManager.ADJUST_MUTE, 0)
            } else {
                audioManager.setStreamMute(streamType, true)
            }
        }
    }
}