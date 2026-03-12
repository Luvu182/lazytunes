import { watch } from "@tauri-apps/plugin-fs";

let stopWatching: (() => void) | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const DEBOUNCE_MS = 5000;

/** Start watching a music folder for file changes, trigger callback on change */
export async function startFileWatcher(
  folderPath: string,
  onChanged: () => void,
): Promise<void> {
  // Stop any existing watcher
  await stopFileWatcher();

  try {
    const unwatch = await watch(folderPath, () => {
      // Debounce: wait 5s of quiet before triggering rescan
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        onChanged();
      }, DEBOUNCE_MS);
    }, { recursive: true });

    stopWatching = () => {
      unwatch();
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  } catch (err) {
    console.warn("File watcher setup failed:", err);
  }
}

/** Stop the current file watcher */
export async function stopFileWatcher(): Promise<void> {
  if (stopWatching) {
    stopWatching();
    stopWatching = null;
  }
}
