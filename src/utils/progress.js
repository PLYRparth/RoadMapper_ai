/**
 * Calculates roadmap statistics
 */
export function calculateProgress(
  roadmap
) {
  if (!roadmap) {
    return {
      progress: 0,
      completedLessons: 0,
      totalLessons: 0,
      completedTasks: 0,
      totalTasks: 0,
      xp: 0,
    };
  }

  const totalLessons =
    roadmap.lessons.length;

  const completedLessons =
    roadmap.lessons.filter(
      (lesson) => lesson.completed
    ).length;

  const totalTasks =
    roadmap.lessons.reduce(
      (total, lesson) =>
        total + lesson.tasks.length,
      0
    );

  const completedTasks =
    roadmap.lessons.reduce(
      (total, lesson) =>
        total +
        lesson.tasks.filter(
          (task) => task.completed
        ).length,
      0
    );

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
        (completedTasks /
          totalTasks) *
        100
      );

  const xp =
    completedTasks * 10 +
    completedLessons * 50;

  return {
    progress,

    completedLessons,

    totalLessons,

    completedTasks,

    totalTasks,

    xp,
  };
}

/**
 * Percentage of current lesson
 */
export function getCurrentLessonProgress(
  lesson
) {
  if (!lesson)
    return {
      completed: 0,
      total: 0,
      progress: 0,
    };

  const total = lesson.tasks.length;

  const completed =
    lesson.tasks.filter(
      (task) => task.completed
    ).length;

  return {
    completed,

    total,

    progress:
      total === 0
        ? 0
        : Math.round(
          (completed / total) *
          100
        ),
  };
}

/**
 * Returns remaining lessons
 */
export function getRemainingLessons(
  roadmap
) {
  return roadmap.lessons.filter(
    (lesson) => !lesson.completed
  ).length;
}

/**
 * Returns next lesson
 */
export function getNextLesson(
  roadmap
) {
  if (
    roadmap.currentDayIndex >=
    roadmap.lessons.length
  )
    return null;

  return roadmap.lessons[
    roadmap.currentDayIndex
  ];
}

export function calculateOverallProgress(roadmaps) {
  if (!roadmaps.length) {
    return {
      progress: 0,
      completedTasks: 0,
      totalTasks: 0,
      completedDays: 0,
      totalDays: 0,
    };
  }

  let completedTasks = 0;
  let totalTasks = 0;

  let completedDays = 0;
  let totalDays = 0;

  roadmaps.forEach((roadmap) => {
    roadmap.days.forEach((day) => {
      totalDays++;

      if (day.isCompleted)
        completedDays++;

      totalTasks += day.tasks.length;

      completedTasks += day.tasks.filter(
        (task) => task.isCompleted
      ).length;
    });
  });

  return {
    progress:
      totalTasks === 0
        ? 0
        : Math.round(
          (completedTasks /
            totalTasks) *
          100
        ),

    completedTasks,

    totalTasks,

    completedDays,

    totalDays,
  };
}

export function getTodaysTasks(
  roadmaps
) {
  return roadmaps
    .filter(
      (roadmap) => !roadmap.isCompleted
    )
    .map((roadmap) => ({
      roadmapId: roadmap.id,

      goal: roadmap.goal,

      currentDay:
        roadmap.days[
        roadmap.currentDayIndex
        ],
    }));
}

export function calculateRoadmapProgress(roadmap) {
  const totalTasks = roadmap.days.reduce(
    (total, day) => total + day.tasks.length,
    0
  );

  const completedTasks = roadmap.days.reduce(
    (total, day) =>
      total +
      day.tasks.filter((task) => task.isCompleted).length,
    0
  );

  return totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);
}

export function getCurrentDayTasks(roadmap) {

  const day =
    roadmap.days[
    roadmap.currentDayIndex
    ];

  return {

    pending:
      day.tasks.filter(
        task => !task.isCompleted
      ),

    completed:
      day.tasks.filter(
        task => task.isCompleted
      ),

    day

  };

}