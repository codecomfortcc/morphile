#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Runtime, Window};


#[tauri::command]
fn get_platform() -> String {
    std::env::consts::OS.to_string()  
}


#[tauri::command]
fn is_window_maximized<R: Runtime>(window: Window<R>) -> Result<bool, String> {
    window.is_maximized().map_err(|e| e.to_string())
}


#[tauri::command]
fn minimize_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    window.minimize().map_err(|e| e.to_string())
}


#[tauri::command]
fn maximize_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    window.maximize().map_err(|e| e.to_string())
}


#[tauri::command]
fn unmaximize_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    window.unmaximize().map_err(|e| e.to_string())
}

#[tauri::command]
fn close_window<R: Runtime>(window: Window<R>) -> Result<(), String> {
    window.close().map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_platform,
            is_window_maximized,
            minimize_window,
            maximize_window,
            unmaximize_window,
            close_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
} 
