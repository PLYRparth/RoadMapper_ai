import { APP_VERSION, STORAGE_KEY } from "./constants";

/* ---------- App Data ---------- */

export function getAppData() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return {
      version: APP_VERSION,
      activeRoadmapId: null,
      roadmaps: [],
      settings: {
        darkMode: false,
      },
    };
  }

  return JSON.parse(data);
}

export function saveAppData(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function clearAppData() {
  localStorage.removeItem(STORAGE_KEY);
}

/* ---------- Roadmaps ---------- */

export function initializeRoadmap(
  roadmap
) {
  const appData = getAppData();

  appData.roadmaps.push(roadmap);

  appData.activeRoadmapId =
    roadmap.id;

  saveAppData(appData);

  return roadmap;
}

export function getAllRoadmaps() {
  return getAppData().roadmaps;
}

export function getRoadmapById(id) {
  return getAppData().roadmaps.find(
    (roadmap) => roadmap.id === id
  );
}

export function getActiveRoadmap() {
  const appData = getAppData();

  return appData.roadmaps.find(
    (roadmap) =>
      roadmap.id ===
      appData.activeRoadmapId
  );
}

export function setActiveRoadmap(
  id
) {
  const appData = getAppData();

  appData.activeRoadmapId = id;

  saveAppData(appData);
}

export function updateRoadmap(
  updatedRoadmap
) {
  const appData = getAppData();

  appData.roadmaps =
    appData.roadmaps.map((roadmap) =>
      roadmap.id ===
      updatedRoadmap.id
        ? updatedRoadmap
        : roadmap
    );

  saveAppData(appData);
}

/* ---------- Archive ---------- */

export function archiveRoadmap(id) {
  const appData = getAppData();

  const roadmap =
    appData.roadmaps.find(
      (roadmap) => roadmap.id === id
    );

  if (!roadmap) return;

  roadmap.status = "archived";

  if (
    appData.activeRoadmapId === id
  ) {
    appData.activeRoadmapId = null;
  }

  saveAppData(appData);
}

export function restoreRoadmap(id) {
  const appData = getAppData();

  const roadmap =
    appData.roadmaps.find(
      (roadmap) => roadmap.id === id
    );

  if (!roadmap) return;

  roadmap.status = "active";

  saveAppData(appData);
}

/* ---------- Delete ---------- */

export function deleteRoadmap(id) {
  const appData = getAppData();

  appData.roadmaps =
    appData.roadmaps.filter(
      (roadmap) =>
        roadmap.id !== id
    );

  if (
    appData.activeRoadmapId === id
  ) {
    appData.activeRoadmapId =
      appData.roadmaps.length > 0
        ? appData.roadmaps[0].id
        : null;
  }

  saveAppData(appData);
}

/* ---------- Settings ---------- */

export function updateSettings(
  settings
) {
  const appData = getAppData();

  appData.settings = {
    ...appData.settings,
    ...settings,
  };

  saveAppData(appData);
}