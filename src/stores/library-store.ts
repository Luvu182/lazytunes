import { create } from "zustand";
import type { Song, ScanProgress } from "@/lib/song-types";
import { getAllSongs } from "@/lib/song-queries";
import { selectMusicFolder, getSavedFolderPath, scanFolder } from "@/lib/library-scanner";

interface LibraryStore {
  songs: Song[];
  isScanning: boolean;
  scanProgress: ScanProgress | null;
  folderPath: string | null;
  initialized: boolean;

  initialize: () => Promise<void>;
  loadSongs: () => Promise<void>;
  selectFolder: () => Promise<void>;
  startScan: () => Promise<void>;
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  songs: [],
  isScanning: false,
  scanProgress: null,
  folderPath: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;
    const folderPath = await getSavedFolderPath();
    set({ folderPath, initialized: true });

    // Load existing songs from DB
    await get().loadSongs();

    // Auto-scan if folder is set
    if (folderPath) {
      await get().startScan();
    }
  },

  loadSongs: async () => {
    const songs = await getAllSongs();
    set({ songs });
  },

  selectFolder: async () => {
    const path = await selectMusicFolder();
    if (path) {
      set({ folderPath: path });
      await get().startScan();
    }
  },

  startScan: async () => {
    const { folderPath, isScanning } = get();
    if (!folderPath || isScanning) return;

    set({ isScanning: true, scanProgress: null });
    try {
      await scanFolder(folderPath, (progress) => {
        set({ scanProgress: progress });
      });
      await get().loadSongs();
    } catch (err) {
      console.error("Scan failed:", err);
    } finally {
      set({ isScanning: false, scanProgress: null });
    }
  },
}));
