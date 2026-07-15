import {
    getActiveRoadmap,
    getRoadmapById,
    updateRoadmap,
} from "./storage";

/**
 * Returns current active roadmap
 */
export function getCurrentRoadmap() {
    return getActiveRoadmap();
}

/**
 * Returns roadmap by id
 */
export function getRoadmap(id) {
    return getRoadmapById(id);
}

/**
 * Helper: Find a day by day number
 */
function findDay(roadmap, dayNumber) {
    return roadmap.days.find((day) => day.day === dayNumber);
}

/**
 * Helper: Find a task by task id
 */
function findTask(day, taskId) {
    return day.tasks.find((task) => task.id === taskId);
}

/**
 * Returns current day
 */
export function getCurrentDay(roadmapId) {
    const roadmap = getRoadmapById(roadmapId);

    if (!roadmap) return null;

    return roadmap.days[roadmap.currentDayIndex];
}

/**
 * Toggle task completion
 */
export function completeTask(
    roadmapId,
    dayNumber,
    taskId
) {
    const roadmap = getRoadmapById(roadmapId);

    if (!roadmap) return null;

    const day = findDay(roadmap, dayNumber);

    if (!day) return null;

    const task = findTask(day, taskId);

    if (!task) return null;

    task.isCompleted = !task.isCompleted;

    updateRoadmap(roadmap);

    return roadmap;
}

/**
 * Returns true if every task is completed
 */
export function isDayCompleted(
    roadmapId,
    dayNumber
) {
    const roadmap = getRoadmapById(roadmapId);

    if (!roadmap) return false;

    const day = findDay(roadmap, dayNumber);

    if (!day) return false;

    return day.tasks.every(
        (task) => task.isCompleted
    );
}

/**
 * Complete current day
 */
export function completeDay(roadmapId) {
    const roadmap = getRoadmapById(roadmapId);

    if (!roadmap) return null;

    const day =
        roadmap.days[roadmap.currentDayIndex];

    const completed = day.tasks.every(
        (task) => task.isCompleted
    );

    if (!completed) {
        return {
            success: false,
            message:
                "Complete all tasks before continuing.",
        };
    }

    day.completed = true;
    day.status = "completed";

    if (
        roadmap.currentDayIndex <
        roadmap.days.length - 1
    ) {
        roadmap.currentDayIndex++;

        roadmap.days[roadmap.currentDayIndex].status =
            "current";
    } else {
        roadmap.isCompleted = true;
    }

    updateRoadmap(roadmap);

    return {
        success: true,
        roadmap,
    };
}

/**
 * Save notes
 */
export function saveNotes(
    roadmapId,
    dayNumber,
    notes
) {
    const roadmap = getRoadmapById(roadmapId);

    if (!roadmap) return null;

    const day = findDay(roadmap, dayNumber);

    if (!day) return null;

    day.notes = notes;

    updateRoadmap(roadmap);

    return roadmap;
}

/**
 * Reset one roadmap
 */
export function resetRoadmap(
    roadmapId
) {
    const roadmap = getRoadmapById(roadmapId);

    if (!roadmap) return null;

    roadmap.currentDayIndex = 0;

    roadmap.isCompleted = false;

    roadmap.days.forEach((day) => {
        day.completed = false;

        day.status =
            day.day === 1
                ? "current"
                : "locked";

        day.notes = "";

        day.tasks.forEach((task) => {
            task.isCompleted = false;
        });
    });

    updateRoadmap(roadmap);

    return roadmap;
}

/**
 * Returns the UI status of a day
 */
export function getDayStatus(
    roadmap,
    dayIndex
) {
    if (!roadmap?.days)
        return "locked";

    const day =
        roadmap.days[dayIndex];

    if (!day)
        return "locked";

    return (
        day.status ??
        (day.completed
            ? "completed"
            : dayIndex ===
              roadmap.currentDayIndex
            ? "current"
            : "locked")
    );
}